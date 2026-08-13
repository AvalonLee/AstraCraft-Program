/**
 * CodeBuddy Session Init — Extractor.
 *
 * 解析用户从 `ask_followup_question` form 的回复。
 *
 * ── 为什么看上去像在解析 XML，但跨 team 多轮 form 也能用 ──
 *
 * 当前只解析 `<question_answer>` XML（CodeBuddy 旧格式）。
 * 实测中 CodeBuddy 实际回写格式是 `role: "tool"` 消息中的 `multi_question_result` JSON
 * （详见 cleaner.ts 头部注释中的抓包格式），但 extractor 的 substring 兜底匹配
 * 能在无关 user 消息文本中"碰巧"匹配到 team/agent/task 名，使得 session init 侥幸成功。
 * 这是 fragile 依赖，不是精确解析。如需可靠提取，需增加 JSON 解析路径。
 *
 * 不含任何 Claude Code 逻辑（不解析 JSON tool_result）。
 */

import type { SessionInitData, TeamOption } from "../types.js";
import { SKIP_LABEL, PATH_SEP, ASSET_CONFIRM_YES, ASSET_CONFIRM_NO } from "./form.js";

// ── Markers ────────────────────────────────────────────────────────────────────

const SKIP_RE = /跳过|不关联|skip/i;
export const BYPASS_MARKER = "__bypass__" as const;

/**
 * 从用户答复中提取 asset_confirm 选择。
 * 返回 true=是（关联资产），false=否（bypass），null=未识别。
 */
export function extractAssetConfirm(content: string): boolean | null {
  // XML parsing
  const xml = parseQuestionAnswerXml(content);
  const answer = xml?.teamAnswer ?? xml?.agentAnswer ?? xml?.taskAnswer ?? content;

  if (answer.includes(ASSET_CONFIRM_YES) || /是.*关联|关联.*是|确认.*关联/i.test(answer)) {
    return true;
  }
  if (answer.includes(ASSET_CONFIRM_NO) || /否.*不关联|不关联.*否|本次不关联/i.test(answer)) {
    return false;
  }
  return null;
}

// ── XML 解析 ───────────────────────────────────────────────────────────────────

/**
 * Parse CodeBuddy's `<question_answer>` XML from user message.
 */
function parseQuestionAnswerXml(
  content: string,
): {
  teamAnswer?: string;
  agentAnswer?: string;
  taskAnswer?: string;
} | null {
  if (!content.includes("<question_answer") && !content.includes("<question_item")) {
    return null;
  }

  const result: { teamAnswer?: string; agentAnswer?: string; taskAnswer?: string } = {};
  const itemRe =
    /<question_item\s+id="([^"]+)"\s*>[\s\S]*?<answers>\s*([\s\S]*?)\s*<\/answers>/g;

  // 先扫描所有 question_item 判断总数（轮1: 1个, 轮2: 2个）
  const allIds: string[] = [];
  const idRe = /<question_item\s+id="([^"]+)"\s*>/g;
  let idM: RegExpExecArray | null;
  while ((idM = idRe.exec(content)) !== null) {
    allIds.push(idM[1].trim().toLowerCase());
  }
  const isSingleQuestion = allIds.length === 1;

  let m: RegExpExecArray | null;
  let index = 0;
  while ((m = itemRe.exec(content)) !== null) {
    const id = m[1].trim().toLowerCase();
    const answer = m[2].trim();
    if (!answer) { index++; continue; }

    if (id === "team") {
      result.teamAnswer = result.teamAnswer ?? answer;
    } else if (id === "agent") {
      result.agentAnswer = result.agentAnswer ?? answer;
    } else if (id === "task") {
      result.taskAnswer = result.taskAnswer ?? answer;
    } else if (id === "q1") {
      if (isSingleQuestion) {
        result.teamAnswer = result.teamAnswer ?? answer;
      } else {
        result.agentAnswer = result.agentAnswer ?? answer;
      }
    } else if (id === "q2" && !isSingleQuestion) {
      result.taskAnswer = result.taskAnswer ?? answer;
    } else if (index === 0 && !result.teamAnswer && !result.agentAnswer) {
      result.teamAnswer = answer;
    }
    index++;
  }

  return result.teamAnswer || result.agentAnswer || result.taskAnswer ? result : null;
}

// ── Team 匹配 ──────────────────────────────────────────────────────────────────

/**
 * 轮1 提取：从用户答复中识别选定的 team_id。
 * CodeBuddy: 用户选择在 `role: "user"` 消息中，走 `<question_answer>` XML 解析。
 */
export function extractTeamFromOptionText(
  content: string,
  cachedTeams: TeamOption[],
): string | null {
  if (cachedTeams.length === 0) return null;

  let teamText: string | null = null;

  // XML parsing: CodeBuddy <question_answer> in user message.
  const xml = parseQuestionAnswerXml(content);
  if (xml) {
    teamText = xml.teamAnswer ?? null;
  }

  // 检测"本次不关联"→ bypass
  if (teamText && (teamText.includes(SKIP_LABEL) || SKIP_RE.test(teamText.trim()))) {
    return BYPASS_MARKER;
  }

  // 匹配策略（team 选项 label 格式: "team名 (id尾8位)"）
  const hay = teamText ?? content;
  const trimmed = hay.trim();

  const exactFull = cachedTeams.find(
    (t) => `${t.team_name} (${t.team_id.slice(-8)})` === trimmed,
  );
  if (exactFull) return exactFull.team_id;

  const exactName = cachedTeams.find((t) => t.team_name === trimmed);
  if (exactName) return exactName.team_id;

  const suffixMatch = trimmed.match(/\((\w{8})\)$/);
  if (suffixMatch) {
    const exactSuffix = cachedTeams.find((t) => t.team_id.slice(-8) === suffixMatch[1]);
    if (exactSuffix) return exactSuffix.team_id;
  }

  const sorted = [...cachedTeams].sort((a, b) => b.team_name.length - a.team_name.length);
  for (const t of sorted) {
    if (hay.includes(t.team_name)) return t.team_id;
  }
  for (const t of cachedTeams) {
    if (hay.includes(t.team_id.slice(-8))) return t.team_id;
  }
  return null;
}

// ── Agent / Task 匹配 ─────────────────────────────────────────────────────────

function matchAgentInTeam(text: string, team: TeamOption): string | null {
  const trimmed = text.trim();

  const exactFull = team.agents.find(
    (a) => `${a.agent_name} (${a.agent_id.slice(-8)})` === trimmed,
  );
  if (exactFull) return exactFull.agent_id;

  const exactName = team.agents.find((a) => a.agent_name === trimmed);
  if (exactName) return exactName.agent_id;

  const suffixMatch = trimmed.match(/\((\w{8})\)$/);
  if (suffixMatch) {
    const exactSuffix = team.agents.find((a) => a.agent_id.slice(-8) === suffixMatch[1]);
    if (exactSuffix) return exactSuffix.agent_id;
  }

  const sorted = [...team.agents].sort((a, b) => b.agent_name.length - a.agent_name.length);
  for (const a of sorted) {
    if (text.includes(a.agent_name)) return a.agent_id;
  }
  for (const a of team.agents) {
    if (text.includes(a.agent_id.slice(-8))) return a.agent_id;
  }
  return null;
}

function matchTaskInTeam(text: string, team: TeamOption): string | undefined {
  if (!text) return undefined;
  const trimmed = text.trim();

  const exactFull = team.tasks.find((t) => `${t.task_name} (${t.task_id.slice(-8)})` === trimmed);
  if (exactFull) return exactFull.task_id;

  const exactName = team.tasks.find((t) => t.task_name === trimmed);
  if (exactName) return exactName.task_id;

  const suffixMatch = trimmed.match(/\((\w{8})\)$/);
  if (suffixMatch) {
    const exactSuffix = team.tasks.find((t) => t.task_id.slice(-8) === suffixMatch[1]);
    if (exactSuffix) return exactSuffix.task_id;
  }

  const sorted = [...team.tasks].sort((a, b) => b.task_name.length - a.task_name.length);
  for (const t of sorted) {
    if (trimmed.includes(t.task_name)) return t.task_id;
  }
  for (const t of team.tasks) {
    if (trimmed.includes(t.task_id.slice(-8))) return t.task_id;
  }
  return undefined;
}

/**
 * 轮2 提取：从用户答复中识别 agent + task，**强制限定在已选定的 team 内**。
 * CodeBuddy: 走 `<question_answer>` XML 解析。
 */
export function extractFromOptionText(
  content: string,
  cachedTeams: TeamOption[],
  selectedTeamId?: string,
): SessionInitData | null {
  const team = selectedTeamId
    ? cachedTeams.find((t) => t.team_id === selectedTeamId)
    : cachedTeams.length === 1
      ? cachedTeams[0]
      : null;
  if (!team) return null;

  let agentText: string | null = null;
  let taskText: string | null = null;

  // XML parsing: CodeBuddy <question_answer> in user message.
  const xml = parseQuestionAnswerXml(content);
  if (xml) {
    agentText = xml.agentAnswer ?? null;
    taskText = xml.taskAnswer ?? null;
  }

  // 检测 Agent 选了"本次不关联"→ bypass
  if (agentText && (agentText.includes(SKIP_LABEL) || SKIP_RE.test(agentText.trim()))) {
    return { agent_id: BYPASS_MARKER };
  }

  // Resolve agent
  let agentId: string | null = null;
  if (agentText) agentId = matchAgentInTeam(agentText, team);
  if (!agentId) agentId = matchAgentInTeam(content, team);
  if (!agentId) return null;

  // Resolve task。defaultTaskId 兜底通过 fetchTeamsAndAgents 头部注入实现：
  // 用户选中"本次不关联任务"label 会 matchTaskInTeam 命中虚拟条目返回
  // defaultTaskId，无需在此单独处理。SKIP_RE 兜底放到 match 失败之后，避免
  // 虚拟条目的"不关联"文案误伤。
  let taskId: string | undefined;
  const taskHay = taskText ?? content;
  taskId = matchTaskInTeam(taskHay, team);
  if (!taskId && SKIP_RE.test(taskHay)) {
    taskId = undefined; // 显式手打"跳过"→ 保持 undefined（走 completeRegistration bypass）
  }

  return { agent_id: agentId, task_id: taskId };
}

// ── Structured / LLM fallback ──────────────────────────────────────────────────

export function extractStructured(content: string): SessionInitData | null {
  const agentMatch = content.match(/agent\s*[:：=]\s*(\S+)/i);
  if (!agentMatch) return null;
  const agent_id = agentMatch[1].trim();
  if (!agent_id) return null;

  let task_id: string | undefined;
  const taskMatch = content.match(/task\s*[:：=]\s*(\S+)/i);
  if (taskMatch && taskMatch[1] !== "0" && taskMatch[1].toLowerCase() !== "skip") {
    task_id = taskMatch[1].trim();
  }
  return { agent_id, task_id };
}

// ── Resolvers ──────────────────────────────────────────────────────────────────

export function resolveAgent(
  rawAgentId: string,
  cachedTeams: TeamOption[],
  selectedTeamId?: string,
): string {
  const team = selectedTeamId
    ? cachedTeams.find((t) => t.team_id === selectedTeamId)
    : cachedTeams.length === 1
      ? cachedTeams[0]
      : null;
  if (team && /^\d+$/.test(rawAgentId)) {
    const num = parseInt(rawAgentId, 10);
    if (num > 0 && num <= team.agents.length) {
      return team.agents[num - 1].agent_id;
    }
  }
  return rawAgentId;
}

export function resolveTask(
  rawTaskId: string | undefined,
  cachedTeams: TeamOption[],
  agentHintId?: string,
  selectedTeamId?: string,
): string | undefined {
  if (!rawTaskId) return undefined;
  const team = selectedTeamId
    ? cachedTeams.find((t) => t.team_id === selectedTeamId)
    : cachedTeams.length === 1
      ? cachedTeams[0]
      : null;
  if (team && /^\d+$/.test(rawTaskId)) {
    const num = parseInt(rawTaskId, 10);
    if (num > 0 && num <= team.tasks.length) {
      return team.tasks[num - 1].task_id;
    }
  }
  return rawTaskId;
}
