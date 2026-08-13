/**
 * log-writer.ts — 维护 wiki/log.md 摄取日志（OKF §7 / llm-wiki 时间线，OQ-10）。
 *
 * 每次摄取一个源后追加一条日期分组的条目，最新在前，便于 grep 与人工回溯：
 *   ## YYYY-MM-DD
 *   * **ingest** <源文件名> — 写入 N 页
 *
 * log.md 是结构性文件（page/write/rm 禁改），但 ingest 可维护它。
 * 无 frontmatter（OKF 约定）。纯文本追加，不调用 LLM。
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HEADER = "# Ingest Log";

/** 取本地日期 YYYY-MM-DD。 */
function today(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * 渲染一条日志条目行。导出以便单测。
 */
export function renderLogEntry(sourceName: string, pageCount: number): string {
  return `* **ingest** ${sourceName} — wrote ${pageCount} pages`;
}

/**
 * 追加一条摄取日志到 wiki/log.md（最新日期分组在前）。
 *
 * @param projectPath wiki 项目根
 * @param sourceName  本次摄取的源文件名
 * @param pageCount   本次写入/更新的页数
 * @param now         注入时间（测试用）
 */
export function appendIngestLog(
  projectPath: string,
  sourceName: string,
  pageCount: number,
  now = new Date(),
): void {
  const logPath = join(projectPath, "wiki", "log.md");
  const day = today(now);
  const entry = renderLogEntry(sourceName, pageCount);

  let body = "";
  if (existsSync(logPath)) {
    try {
      body = readFileSync(logPath, "utf-8");
    } catch {
      body = "";
    }
  }

  const next = mergeEntry(body, day, entry);
  writeFileSync(logPath, next, "utf-8");
}

/**
 * 把一条 entry 并入日志文本：若已有当天分组则插到该组最前，否则在 header 后新建当天分组。
 * 最新日期分组始终在最前。导出以便单测。
 */
export function mergeEntry(existing: string, day: string, entry: string): string {
  const dayHeading = `## ${day}`;
  const lines = (existing || `${HEADER}\n`).split("\n");

  // 找 header 行索引（无则补）。
  let headerIdx = lines.findIndex((l) => l.trim() === HEADER);
  if (headerIdx === -1) {
    lines.unshift(HEADER, "");
    headerIdx = 0;
  }

  // 找当天分组。
  const dayIdx = lines.findIndex((l) => l.trim() === dayHeading);
  if (dayIdx !== -1) {
    // 插到当天分组标题的下一行（该组最前）。
    lines.splice(dayIdx + 1, 0, entry);
  } else {
    // 在 header（及其后可能的空行）之后插入新当天分组，使其位于所有旧分组之前。
    let insertAt = headerIdx + 1;
    if (lines[insertAt]?.trim() === "") insertAt++;
    lines.splice(insertAt, 0, dayHeading, entry, "");
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\n+$/, "") + "\n";
}
