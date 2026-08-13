/**
 * Knowledge Tools Injector — injects a `<knowledge_tools>` block listing
 * team knowledge resources (wiki / code-graph) with a two-step self-discovery
 * flow (tools/list → tools/call).
 *
 * v7 progressive exposure: prompt only contains resource list + discovery
 * entry points. Agent calls tools/list to discover available tools, then
 * tools/call to execute. Tool definitions live in the knowledge service,
 * not in the proxy.
 *
 * Strategy:
 *   - cacheStrategy: "session_init" — knowledge list fetched once at prewarm,
 *     reused for all turns in the session.
 *   - **Per-agent** (设计 §0.6): 读 meta agent-fixed-asset 绑定（过滤
 *     llm_wiki/code_graph）→ asset_ids(=knowledge_id) → 按 id 联查 entity_knowledge
 *     取渲染字段。绑定权威在 meta；明细缺失（未 ready）则不注入。
 *   - Fallback: 无 caller user-key / 无 agent → 退回 team 全量 list（过渡兼容）。
 *   - Failure / empty → 0 blocks (graceful degradation).
 *
 * See `docs/design/knowledge-injection-v7.md`。
 */

import type {
  AgentContext,
  AnchorTarget,
  AssetCapabilityFlags,
  CacheStrategy,
  ContextBlock,
  HookPriority,
  InjectionHook,
  PrewarmInput,
} from "../types.js";
import { HOOK_PRIORITY } from "../types.js";
import {
  CoreKnowledgeClient,
  getCoreKnowledgeClient,
  type KnowledgeItem,
} from "../../knowledge/core-client.js";
import type { CoreSkillConfig } from "../../types.js";

const TAG = "[knowledge-tools-injector]";

export interface KnowledgeToolsInjectorConfig {
  /** Core kernel config (same endpoint as skill — 8420). */
  coreSkill: CoreSkillConfig;
}

/**
 * Render the `<knowledge_tools>` block from a list of knowledge resources.
 * Pure function for ease of testing.
 *
 * `service_url` is the tools self-discovery base (already includes the API
 * prefix, e.g. `http://host:8421/v3`). The tools endpoints are service-level
 * (`{service_url}/tools/list` | `/tools/call`); the target resource is selected
 * via the `knowledge_id` field in the body, NOT via the URL path.
 *
 * `serviceId` is the tenant identity (= `x-tdai-service-id`, unified with the
 * kernel routing key). The knowledge service REQUIRES it as a header on every
 * tools call, so we bake it into the curl examples the agent runs.
 */
function filterResourcesByCapabilities(
  resources: KnowledgeItem[],
  caps: AssetCapabilityFlags | undefined,
): KnowledgeItem[] {
  if (!caps) return resources;
  return resources.filter((r) => {
    if (r.type === "wiki") return caps.llm_wiki !== false;
    if (r.type === "code-graph") return caps.code_graph !== false;
    return true;
  });
}

export function renderKnowledgeToolsBlock(resources: KnowledgeItem[], serviceId: string): string | null {
  if (!resources || resources.length === 0) return null;

  const resourceTags = resources
    .map((r) => {
      const summaryAttr = r.summary ? `\n  summary="${r.summary}"` : "";
      const repoAttrs = r.repo_url ? `\n  repo_url="${r.repo_url}"\n  branch="${r.branch ?? "main"}"` : "";
      return `<knowledge type="${r.type}" id="${r.knowledge_id}"\n  url="${r.service_url}"\n  name="${r.name}"${summaryAttr}${repoAttrs} />`;
    })
    .join("\n\n");

  return [
    "<knowledge_tools>",
    "你有一批**团队知识库资源**（列表见下），用来**加速理解代码**——是参考/导航工具，",
    "不替代读源码。分两类：",
    "  - code-graph：仓库的预建代码索引（符号 / 调用图 / 文件结构），可能就对应当前本地仓库",
    "  - wiki：工程设计文档",
    "",
    "定位：优先用它快速定位「符号在哪、调用关系、模块结构、大致实现」，省去大量 grep/翻找。",
    "把它当作「先看地图，再按图读源码」的加速层。",
    "",
    "## 优先直接作答，别重复 grep/翻找（省 token）",
    "- code-graph 就是预建好的搜索索引。回答「X 怎么工作 / 在哪 / 调用关系 / 架构」这类问题，直接用 1-3 次调用作答；",
    "  **不要**再自己起 grep + Read 循环，也**不要**把探索丢给子任务/子 agent——那是在重复 code-graph 已经做过的工作，更慢更贵。",
    "- **信任它的返回**（来自完整解析，不是文本匹配），不要再用 grep 二次核对；explore/node 返回的源码是逐字的、等价于 Read，**已给出的文件不要再重复 Read**。",
    "- 仅在两种情况才回退去读实际源码：① 索引明显滞后于最新改动；② **你即将真正动手修改这段代码、需按最新内容做最终确认**（我们的场景常有本地更新，落笔前务必以实际源码为准）。",
    "",
    "## 何时用哪个（按意图选——用来替代盲目的 grep/翻找，而不是替代读源码）",
    "",
    "### code-graph（代码索引）",
    "  - 「看某函数/模块的实现骨架」「追踪一条调用流程 X→Y」 → 首选 explore（一次返回沿途源码，先建立整体认知）",
    "  - 「某个符号定义在哪 / 叫什么名字」                    → search",
    "  - 「只要某一个符号的定义与源码」                      → node",
    "  - 「谁调用了它 / 它又调用了谁」                        → callers / callees",
    "  - 「改动某符号会波及哪些地方」（重构前评估影响面）    → impact",
    "  - 「需要一次性总览整个项目目录结构」                  → files（**仅此场景**，见下方硬性约定）",
    "  组合链：重构规划 = search → callers → impact；理解一块功能 = explore（不够再 node）。",
    "",
    "### wiki（工程设计文档）",
    "  - 「某设计/架构/概念的背景」                          → search（BM25 关键词），命中后用 read_page 读正文",
    "  - 「wiki 里有哪些文档」                               → list_pages",
    "  - 「文档之间的关系 / 知识图谱」                       → get_graph",
    "  - 「要看原始上传的文件」                              → list_raw / read_raw",
    "",
    "  （准确的工具名与参数以 tools/list 返回为准；上面是意图→工具的对应关系）",
    "",
    "## 已绑定资源",
    resourceTags,
    "",
    "## 调用方式（服务级统一端点，URL 直接用资源的 url 拼接）",
    "目标资源由 body 里的 knowledge_id 指定；**不要**把 knowledge_id 拼进 URL 路径。",
    `**每次请求都必须带请求头** \`x-tdai-service-id: ${serviceId}\`（租户标识，缺失会被拒绝）。`,
    "",
    "### Step 1: 拿工具清单（每个资源**首次**使用时调一次即可）",
    "curl -sSk -X POST <url>/tools/list \\",
    "  -H 'content-type: application/json' \\",
    `  -H 'x-tdai-service-id: ${serviceId}' \\`,
    "  -d '{\"knowledge_id\":\"<知识id>\"}'",
    "",
    "返回: {code, message, data:{knowledge_id, type, name, summary, status, tools:[{name, description, params}, ...]}}",
    "记住返回的 tool name / params，**本会话内复用**，不要对同一资源反复调 list（忘了再调）。",
    "",
    "### Step 2: 执行工具",
    "curl -sSk -X POST <url>/tools/call \\",
    "  -H 'content-type: application/json' \\",
    `  -H 'x-tdai-service-id: ${serviceId}' \\`,
    "  -d '{\"knowledge_id\":\"<知识id>\", \"tool_name\":\"<Step1返回的name>\", \"params\":{...}}'",
    "",
    "返回: {code, message, data}；code=0 成功。",
    "",
    "## 硬性约定",
    "- tool_name 必须与 tools/list 返回的 name **完全一致**，不要自行加前缀——code-graph 就是 explore / search / node / files / status，不是 get_node / list_files。",
    "- code-graph **首选 explore**：它一次返回沿途源码，适合先快速建立整体认知；需要精确/最新细节时再读实际源码。",
    "- **找文件不要用 files**：explore / search 的 query 直接支持文件名（如 \"session-manager.ts\"），不要「先用 files 找路径、再 explore」两步走——一步 explore 即可。",
    "- **files 仅用于「一次性总览目录结构」**：同一资源一个会话最多调一次，不要反复换 path 翻目录——那正是 explore/search 要替代的翻找动作。",
    "- **wiki：先 search 再按需 read_page**，不要一上来就 list_pages 全量拉取或逐页读；正文以 read_page 返回为准。",
    "- params 必须是 JSON 对象；无参工具也要传空对象 {}。",
    "- 根据资源的 summary 字段挑相关资源，无关资源不必调 list。",
    "- 不同资源的调用可**并行**发起（如同一 turn 同时对两个资源发起），无需串行等待。",
    "- 同一工具调用连续失败 2 次即放弃，不要反复重试；本地有对应文件时可直接回退到 Read 源码。",
    "- 响应格式统一为 {code, message, data}，code=0 表示成功。",
    "</knowledge_tools>\n",
  ].join("\n");
}

/**
 * Knowledge tools injector.
 *
 * Anchor: lands in the `knowledge` semantic slot.
 * Priority: HOOK_PRIORITY.WIKI (300).
 */
export class KnowledgeToolsInjector implements InjectionHook {
  id = "knowledge-tools-injector";
  point = "system.before_tools" as const;
  anchor: AnchorTarget = { slot: "knowledge", relation: "before" };
  priority: HookPriority = HOOK_PRIORITY.WIKI;
  description = "Inject the <knowledge_tools> block with team knowledge resources.";
  cacheStrategy: CacheStrategy = "session_init";

  constructor(
    private config: KnowledgeToolsInjectorConfig,
    /** Optional override (tests). */
    private clientOverride?: CoreKnowledgeClient,
  ) {}

  async execute(ctx: AgentContext): Promise<ContextBlock[]> {
    const ids = this.resolveSession(ctx);
    if (!ids.teamId) return [];
    return this.fetchBlocks(ids.teamId, ids.agentId, ids.userKey, ids.spaceId, ids.assetCapabilities, "execute");
  }

  async prewarm(input: PrewarmInput): Promise<ContextBlock[]> {
    const teamId = input.sessionInfo.team_id;
    if (!teamId) return [];
    return this.fetchBlocks(
      teamId,
      input.sessionInfo.agent_id ?? null,
      input.callerUserKey ?? null,
      input.sessionInfo.space_id ?? null,
      input.assetCapabilities,
      "prewarm",
    );
  }

  private resolveSession(ctx: AgentContext): {
    teamId: string | null;
    agentId: string | null;
    userKey: string | null;
    spaceId: string | null;
    assetCapabilities?: AssetCapabilityFlags;
  } {
    const custom = ctx.metadata.custom as Record<string, unknown> | undefined;
    const session = custom?.session as Record<string, unknown> | undefined;
    const teamId = typeof session?.team_id === "string" && session.team_id.length > 0 ? session.team_id : null;
    const agentId = typeof session?.agent_id === "string" && session.agent_id.length > 0 ? session.agent_id : null;
    const userKey = typeof custom?.userKey === "string" && custom.userKey.length > 0 ? custom.userKey : null;
    const spaceId = typeof session?.space_id === "string" && session.space_id.length > 0 ? session.space_id : null;
    const assetCapabilities = custom?.assetCapabilities as AssetCapabilityFlags | undefined;
    return { teamId, agentId, userKey, spaceId, assetCapabilities };
  }

  private async fetchBlocks(
    teamId: string,
    agentId: string | null,
    userKey: string | null,
    spaceId: string | null,
    assetCapabilities: AssetCapabilityFlags | undefined,
    phase: "prewarm" | "execute",
  ): Promise<ContextBlock[]> {
    try {
      const client = this.clientOverride ?? getCoreKnowledgeClient(this.config.coreSkill);

      console.log(`${TAG} ${phase} team=${teamId} agent=${agentId ?? "(none)"} userKey=${userKey ? "(set)" : "(none)"} space=${spaceId ?? "(none)"}`);

      // Per-agent（首选）：meta 绑定 → asset_ids → 按 id 联查明细。
      // serviceId 透传 spaceId（与 SkillInjector 一致：`/{agent}/{spaceId}/...`）。
      let resources: KnowledgeItem[];
      let scope: string;
      if (agentId && userKey) {
        const ids = await client.listAgentKnowledgeIds(agentId, userKey, { serviceId: spaceId ?? undefined });
        console.log(`${TAG} ${phase} per-agent path: listAgentKnowledgeIds → ${ids.length} ids [${ids.join(",")}]`);
        resources = ids.length > 0 ? await client.listKnowledgeByIds(teamId, ids, { serviceId: spaceId ?? undefined }) : [];
        console.log(`${TAG} ${phase} per-agent path: listKnowledgeByIds → ${resources.length} resources`);
        scope = `agent:${agentId}`;
      } else {
        // Fallback：无 caller 身份 → team 全量。
        // 传 space_id 作 kernel 租户路由 header（与 SkillInjector 一致）。
        resources = await client.listKnowledge(teamId, { serviceId: spaceId ?? undefined });
        console.log(`${TAG} ${phase} fallback path: listKnowledge → ${resources.length} resources`);
        scope = `team:${teamId}`;
      }

      resources = filterResourcesByCapabilities(resources, assetCapabilities);
      // 注入 prompt 里给 LLM 用的 service-id 也要是 spaceId（LLM 拿它调 KS 的 tools/list|call）。
      const injectionServiceId = spaceId || this.config.coreSkill.serviceId;
      const content = renderKnowledgeToolsBlock(resources, injectionServiceId);
      if (!content) return [];
      return [{
        type: "text",
        content,
        metadata: {
          source: this.id,
          cacheKey: `knowledge-tools-injector:${scope}`,
        },
      }];
    } catch (err) {
      console.warn(`${TAG} ${phase} failed: ${(err as Error).message}`);
      return [];
    }
  }
}
