/**
 * index.ts — ingest 引擎入口，编排 ingestSource()。
 *
 * 处理流程（INTERFACE §5）：
 *   1. 读 sourcePath 全文。
 *   2. 读模板 schema.md/purpose.md（loadTemplate）。
 *   3. 扫 wiki/ 得到已有页清单作为"已有知识"上下文。
 *   4. （超长则分块）按 mode 调 LLM 生成 FILE 块：
 *      - two-stage（默认，OQ-4）：先分析产出抽取计划，再据此生成 FILE 块。
 *      - single-stage：源全文直接产出 FILE 块（少一次 LLM 调用）。
 *   5. 解析 FILE 块 → path 白名单 → dedup：命中已存在页则按 locked / 合并处理。
 *   6. 不写结构性文件（index/schema/purpose），其余写盘。
 *   7. 返回实际写入页的相对路径数组（跳过的 locked 页不计入）。
 *
 * 跑在后台 worker（PRD §3.6），失败直接 throw，由上层 runIngest 兜成
 * { source, filesWritten:[], error }。
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { createLlmClient, type LlmClient, type RawLlmConfig } from "./llm.js";
import { loadTemplate } from "./template.js";
import {
  buildSystemPrompt,
  buildGeneratePrompt,
  buildAnalysisSystemPrompt,
  buildAnalysisPrompt,
  buildGenerateFromAnalysisPrompt,
  type ExistingPageInfo,
} from "./prompts.js";
import { parseFileBlocks } from "./file-protocol.js";
import { parseFrontmatter, buildPage } from "./frontmatter.js";
import { mergePage } from "./merge.js";
import { chunkText } from "./chunker.js";
import { slugify, dirForType } from "./slug.js";
import { rebuildIndexFile } from "./index-builder.js";
import { appendIngestLog } from "./log-writer.js";
import { createLogger } from "../../../logger.js";

const log = createLogger("wiki-ingest");

/** 不允许 ingest 写入/覆盖的结构性文件（PRD §3.7-2）。 */
const STRUCTURAL_FILES = new Set([
  "wiki/index.md",
  "wiki/schema.md",
  "wiki/purpose.md",
  "wiki/log.md",
  "wiki/overview.md",
]);

/** 粗略上下文预算（字符）：保留余量给 prompt 框架与输出。 */
const SOURCE_CHAR_BUDGET = 28_000;

export interface IngestOptions {
  /** 注入的 LLM 客户端（测试用）；不传则用 llmConfig 构造真实客户端。 */
  llm?: LlmClient;
  /** 合并时旧页正文超过此字符数则走追加模式（OQ-1）；不传用 merge 默认值。 */
  mergeFullRewriteMaxChars?: number;
  /**
   * 摄取流程（OQ-4）：
   *   - "two-stage"（默认）：先分析（抽取计划）再生成 FILE 块，质量更稳。
   *   - "single-stage"：源全文直接产出 FILE 块（少一次 LLM 调用，省 token）。
   */
  mode?: "two-stage" | "single-stage";
}

/**
 * 摄取单个源文件 → 写入/更新若干 wiki 页。
 *
 * @param projectPath wiki 项目根绝对路径
 * @param sourcePath  raw/sources/ 下某个 .md|.txt 的绝对路径
 * @param llmConfig   上层传入的 LLM 配置（兼容多种命名，见 llm.ts）
 * @returns 本次写入/更新的 wiki 页相对路径数组
 */
export async function ingestSource(
  projectPath: string,
  sourcePath: string,
  llmConfig: RawLlmConfig,
  options: IngestOptions = {},
): Promise<string[]> {
  if (!existsSync(sourcePath)) throw new Error(`源文件不存在: ${sourcePath}`);
  const sourceText = readFileSync(sourcePath, "utf-8");
  const sourceName = basename(sourcePath);
  if (!sourceText.trim()) throw new Error(`源文件为空: ${sourceName}`);

  const llm = options.llm ?? createLlmClient(llmConfig);
  const template = loadTemplate(projectPath);
  const systemPrompt = buildSystemPrompt(template);
  const existingPages = scanExistingPages(projectPath);
  const mode = options.mode ?? "two-stage";

  // 超长源：分块逐块生成，汇总所有 FILE 块。MVP 简化（OQ-5）。
  const chunks =
    sourceText.length > SOURCE_CHAR_BUDGET
      ? chunkText(sourceText, { targetChars: SOURCE_CHAR_BUDGET })
      : [sourceText];

  log.info("ingestSource 开始", {
    source: sourceName,
    sourceChars: sourceText.length,
    mode,
    chunks: chunks.length,
    existingPages: existingPages.length,
    templateCustomized: template.customized,
  });

  const candidates = new Map<string, string>(); // relPath → content（同 path 后块覆盖前块）
  const warnings: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunkLabel = chunks.length > 1 ? `${sourceName} (chunk ${i + 1}/${chunks.length})` : sourceName;
    const tag = chunks.length > 1 ? `${sourceName}#${i + 1}` : sourceName;

    let out: string;
    if (mode === "two-stage") {
      // OQ-4 阶段 A：分析 —— 产出结构化抽取计划。
      log.debug("阶段A 分析开始", { chunk: tag });
      const analysis = await llm.chat({
        system: buildAnalysisSystemPrompt(template),
        prompt: buildAnalysisPrompt({ sourceName: chunkLabel, sourceText: chunks[i], existingPages }),
        label: `analysis:${tag}`,
      });
      log.debug("阶段A 分析完成", { chunk: tag, analysisChars: analysis.length, empty: !analysis.trim() });
        // 诊断日志：打出分析文本前 200 字符，方便确认语言（排查"标题英文、正文中文"类问题）
        log.debug("阶段A 分析内容预览", { chunk: tag, preview: analysis.slice(0, 200) });
      // OQ-4 阶段 B：生成 —— 依据分析产出 FILE 块。
      // 分析为空时（LLM 异常）降级为单阶段，避免空分析拖累生成。
      const genPrompt = analysis.trim()
        ? buildGenerateFromAnalysisPrompt({ sourceName: chunkLabel, sourceText: chunks[i], analysis, existingPages })
        : buildGeneratePrompt({ sourceName: chunkLabel, sourceText: chunks[i], existingPages });
      if (!analysis.trim()) log.warn("分析为空，降级单阶段生成", { chunk: tag });
      out = await llm.chat({ system: systemPrompt, prompt: genPrompt, label: `generate:${tag}` });
    } else {
      // 单阶段：源全文直接产出 FILE 块。
      const prompt = buildGeneratePrompt({ sourceName: chunkLabel, sourceText: chunks[i], existingPages });
      out = await llm.chat({ system: systemPrompt, prompt, label: `generate:${tag}` });
    }

    const { files, warnings: w } = parseFileBlocks(out);
    warnings.push(...w);
    log.debug("FILE 块解析", { chunk: tag, outChars: out.length, files: files.length, warnings: w.length });
    for (const f of files) {
      // OQ-6: 不完全信任 LLM 选的目录/文件名。用页面 frontmatter 的 type + title
      // 重新规范化落盘路径，保证「同一实体二次摄取 → 同一路径」的 dedup 不变量
      // （否则 LLM 可能把 entity 落到 wiki/entity/ 而非 wiki/entities/，导致漏合并）。
      const canonicalPath = canonicalizePagePath(f.path, f.content);
      // 跳过结构性文件
      if (STRUCTURAL_FILES.has(canonicalPath)) {
        warnings.push(`跳过结构性文件: ${canonicalPath}`);
        continue;
      }
      candidates.set(canonicalPath, ensureSources(f.content, sourceName));
    }
  }

  if (candidates.size === 0) {
    log.error("未生成任何合法 wiki 页", { source: sourceName, warnings });
    throw new Error(`未生成任何合法 wiki 页（no files generated）: ${sourceName}${warnings.length ? ` [${warnings.join("; ")}]` : ""}`);
  }

  log.info("候选页解析完成，开始落盘合并", { source: sourceName, candidates: candidates.size });

  // 落盘 + dedup 合并
  const written: string[] = [];
  let skipped = 0;
  for (const [relPath, candidateContent] of candidates) {
    const fullPath = join(projectPath, relPath);
    const existing = existsSync(fullPath) ? readFileSync(fullPath, "utf-8") : null;
    const decision = await mergePage(existing, candidateContent, llm, {
      fullRewriteMaxChars: options.mergeFullRewriteMaxChars,
    });
    if (decision.action === "skip") {
      warnings.push(`${relPath}: ${decision.reason}`);
      log.debug("跳过页（locked）", { relPath });
      skipped++;
      continue;
    }
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, decision.content, "utf-8");
    log.debug("写盘", { relPath, merged: existing != null, bytes: decision.content.length });
    written.push(relPath);
  }

  if (written.length === 0) {
    // 全部命中 locked 被跳过：不算失败，但也没写东西。返回空数组。
    log.warn("无页写入（全部 locked 跳过）", { source: sourceName, skipped });
    return [];
  }

  // 维护 wiki/index.md（OKF 渐进式披露 / llm-wiki「先看目录再钻取」）。
  // 失败不影响摄取主流程（index 可由后续 sync 或下次 ingest 重建）。
  try {
    const n = rebuildIndexFile(projectPath);
    log.debug("index.md 重建", { entries: n });
  } catch (err) {
    warnings.push("index.md 重建失败（不影响页产出）");
    log.warn("index.md 重建失败", { error: err instanceof Error ? err.message : String(err) });
  }

  // 追加 wiki/log.md 摄取日志（OKF §7 / llm-wiki，OQ-10）。纯文本，不调 LLM。
  try {
    appendIngestLog(projectPath, sourceName, written.length);
  } catch (err) {
    log.warn("log.md 追加失败", { error: err instanceof Error ? err.message : String(err) });
  }

  log.info("ingestSource 完成", { source: sourceName, written: written.length, skipped, warnings: warnings.length });
  return written;
}

/** 扫 wiki/ 得到已有页的精简信息（供 LLM 判断新建/更新）。不含结构性文件。 */
function scanExistingPages(projectPath: string): ExistingPageInfo[] {
  const wikiDir = join(projectPath, "wiki");
  if (!existsSync(wikiDir)) return [];
  const out: ExistingPageInfo[] = [];
  walk(wikiDir, wikiDir, out);
  return out;
}

function walk(baseDir: string, dir: string, out: ExistingPageInfo[]): void {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (entry !== "media") walk(baseDir, full, out);
    } else if (entry.endsWith(".md")) {
      const rel = `wiki/${full.slice(baseDir.length + 1).replace(/\\/g, "/")}`;
      if (STRUCTURAL_FILES.has(rel)) continue;
      try {
        const content = readFileSync(full, "utf-8");
        const { frontmatter } = parseFrontmatter(content);
        out.push({
          relPath: rel,
          title: typeof frontmatter.title === "string" ? frontmatter.title : basename(entry, ".md"),
          type: frontmatter.type,
          description: typeof frontmatter.description === "string" ? frontmatter.description : undefined,
        });
      } catch {
        /* 坏页跳过 */
      }
    }
  }
}

/**
 * 确保候选页 frontmatter 的 sources 至少包含当前源文件名（§3.7-3 / AC-10）。
 * LLM 可能漏写或写错 sources，这里强制补上当前源。
 */
function ensureSources(content: string, sourceName: string): string {
  const parsed = parseFrontmatter(content);
  const cur = Array.isArray(parsed.frontmatter.sources)
    ? parsed.frontmatter.sources.filter((x): x is string => typeof x === "string")
    : [];
  if (cur.includes(sourceName)) return content;
  // 用 buildPage 重建以保证 sources 落入 frontmatter。
  return buildPage({ ...parsed.frontmatter, sources: [...cur, sourceName] }, parsed.body);
}

/**
 * OQ-6: 规范化页面落盘路径，保证 dedup 稳定性。
 *
 * LLM 选的 path（如 `wiki/entity/redis.md`）可能与我方目录约定（`wiki/entities/redis.md`）
 * 不一致，或对同一实体在不同次摄取里给出不同 slug，破坏「同一实体 → 同一路径」的去重不变量。
 *
 * 策略：优先用页面 frontmatter 的 `type` + `title` 通过 `pageRelPath` 推导规范路径
 * （目录由 type 决定、文件名由 title slug 决定，与 dedup 命中逻辑一致）。
 * 当 frontmatter 缺 type/title 时，回退到「规范化 LLM 原路径的目录段」——
 * 即把目录通过 `dirForType` 归一（entity→entities），文件名沿用原 slug。
 *
 * @param llmPath  LLM 在 FILE 块里声明的 path（已过 normalizeWikiPath 白名单校验）
 * @param content  页面完整内容（含 frontmatter）
 * @returns 规范化后的 wiki 相对路径（始终以 `wiki/` 开头）
 */
export function canonicalizePagePath(llmPath: string, content: string): string {
  const { frontmatter } = parseFrontmatter(content);
  const type = typeof frontmatter.type === "string" ? frontmatter.type.trim() : "";
  const title = typeof frontmatter.title === "string" ? frontmatter.title.trim() : "";

  // 首选：type + title 推导（与 dedup 命中、merge 落盘完全一致）。
  if (type && title) {
    const slug = slugify(title);
    if (slug) return `wiki/${dirForType(type)}/${slug}.md`;
  }

  // 回退：保留 LLM 原文件名 slug，只把目录段按 type/dirForType 归一。
  // llmPath 形如 wiki/<dir>/<...>/<file>.md
  const segments = llmPath.split("/");
  // segments[0] === "wiki"（normalizeWikiPath 已保证）
  const fileName = segments[segments.length - 1];
  if (segments.length >= 3) {
    const dirSeg = segments[1];
    // 若有 type，用 type→dir；否则把 LLM 的目录段本身过一遍 dirForType（entity→entities）。
    const canonicalDir = type ? dirForType(type) : dirForType(dirSeg);
    const middle = segments.slice(2, -1); // 保留可能的深层子目录
    return ["wiki", canonicalDir, ...middle, fileName].join("/");
  }
  // 兜底：路径太短，原样返回（已过白名单，安全）。
  return llmPath;
}
