/**
 * CodeBuddy Session Init Form — `ask_followup_question` tool_call.
 *
 * CodeBuddy 渲染可点击按钮的 form：
 *   - Tool name: `ask_followup_question`
 *   - Options: 平铺字符串列表，无数量限制
 *   - Protocols: OpenAI (`/v1/chat/completions`) + Anthropic (`/v1/messages`)
 *   - ID prefix: `call_session_init_` (OpenAI) / `toolu_session_init_` (Anthropic)
 *
 * 不含任何 Claude Code 逻辑。
 */

import type { TeamOption } from "../types.js";

// ── Constants ──────────────────────────────────────────────────────────────────

export const TOOL_NAME = "ask_followup_question";
export const TOOLCALL_PREFIXES = ["call_session_init_", "toolu_session_init_"] as const;

export const TEAM_FORM_TITLE = "会话初始化 — 选择 Team";
export const AGENT_TASK_FORM_TITLE = "会话初始化 — 选择 Agent 与任务";
export const RETRY_FORM_TITLE = "未能识别选择，请重新选择";
/** 兼容旧测试的总标题（cleaner.ts 检测用）。 */
export const COMBINED_FORM_TITLE = "会话初始化 — 选择 Team / Agent / 任务";

export const SKIP_LABEL = "本次不关联（跳过注入，直接放行）";
export const PATH_SEP = " / ";

export const ASSET_CONFIRM_YES = "是，关联团队资产";
export const ASSET_CONFIRM_NO = "否，本次不关联";
export const ASSET_CONFIRM_FORM_TITLE = "会话初始化 — 是否关联团队资产";

/** Returns true if the given string contains any CodeBuddy form title marker. */
export function containsFormTitle(s: string): boolean {
  return (
    s.includes(COMBINED_FORM_TITLE) ||
    s.includes(TEAM_FORM_TITLE) ||
    s.includes(AGENT_TASK_FORM_TITLE) ||
    s.includes(RETRY_FORM_TITLE) ||
    s.includes(ASSET_CONFIRM_FORM_TITLE)
  );
}

/** Returns true if a tool_call id belongs to a CodeBuddy session-init form. */
export function isSessionInitToolCallId(id: string): boolean {
  return TOOLCALL_PREFIXES.some((p) => id.startsWith(p));
}

// ── Form Data ──────────────────────────────────────────────────────────────────

export type FormStage = "asset_confirm" | "team" | "agent_task";

export interface FormData {
  teams: TeamOption[];
  stage: FormStage;
  selectedTeamId?: string;
  retry?: boolean;
  stream?: boolean;
  modelId?: string;
  protocol?: "openai" | "anthropic";
}

// ── Form Builder ───────────────────────────────────────────────────────────────

function buildFollowupQuestionArgs(data: FormData): { title: string; questions: string } {
  const { teams, stage, selectedTeamId, retry } = data;

  const title = retry
    ? "⚠️ " + RETRY_FORM_TITLE
    : stage === "asset_confirm"
      ? ASSET_CONFIRM_FORM_TITLE
      : stage === "team"
        ? TEAM_FORM_TITLE
        : AGENT_TASK_FORM_TITLE;

  const questions: Array<{
    id: string;
    question: string;
    options: string[];
    multiSelect: boolean;
  }> = [];

  if (stage === "asset_confirm") {
    questions.push({
      id: "asset_confirm",
      question: "本次对话是否要关联团队资产？",
      options: [ASSET_CONFIRM_YES, ASSET_CONFIRM_NO],
      multiSelect: false,
    });
    return { title, questions: JSON.stringify(questions) };
  }

  if (stage === "team") {
    questions.push({
      id: "team",
      question: "请选择本次会话所属的 Team：",
      options: [
        ...teams.map((t) => `${t.team_name} (${t.team_id.slice(-8)})`),
      ],
      multiSelect: false,
    });
    return { title, questions: JSON.stringify(questions) };
  }

  // stage === "agent_task"
  const team = teams.find((t) => t.team_id === selectedTeamId) ?? teams[0];
  if (!team) return { title, questions: JSON.stringify(questions) };

  if (team.agents.length > 0) {
    const agentLabelOptions = [
      ...team.agents.map((a) => `${a.agent_name} (${a.agent_id.slice(-8)})`),
    ];
    questions.push({
      id: "agent",
      question: `请选择「${team.team_name}」下要使用的 Agent：`,
      options: agentLabelOptions,
      multiSelect: false,
    });
  }

  const taskOptions: string[] = [];
  for (const tk of team.tasks) {
    // 虚拟兜底条目（isDefault）不拼 id 后缀，反正只有一个不会重名歧义。
    if (tk.isDefault) {
      taskOptions.push(tk.task_name);
    } else {
      taskOptions.push(`${tk.task_name} (${tk.task_id.slice(-8)})`);
    }
  }
  if (taskOptions.length > 0) {
    questions.push({
      id: "task",
      question: `请选择「${team.team_name}」下关联的任务：`,
      options: taskOptions,
      multiSelect: false,
    });
  }

  return { title, questions: JSON.stringify(questions) };
}

/**
 * Build a fake form response (OpenAI or Anthropic protocol).
 * CodeBuddy 支持双协议：
 *   - protocol="openai": tool_calls chunk stream 或 JSON
 *   - protocol="anthropic": tool_use SSE stream 或 JSON
 */
export function buildFormResponse(data: FormData): Response {
  const model = data.modelId ?? "unknown";
  const created = Math.floor(Date.now() / 1000);
  const args = buildFollowupQuestionArgs(data);

  if (data.protocol === "anthropic") {
    const msgId = "msg_session_init_" + Date.now();
    const toolUseId = "toolu_session_init_" + Date.now();
    if (data.stream) {
      return buildAnthropicStreamingResponse(msgId, model, toolUseId, args);
    }
    return buildAnthropicNonStreamingResponse(msgId, model, toolUseId, args);
  }

  const id = "session-init-" + Date.now();
  const toolCallId = "call_session_init_" + Date.now();
  if (data.stream) {
    return buildOpenAIStreamingResponse(id, created, model, toolCallId, args);
  }
  return buildOpenAINonStreamingResponse(id, created, model, toolCallId, args);
}

// ── OpenAI Non-streaming ───────────────────────────────────────────────────────

function buildOpenAINonStreamingResponse(
  id: string,
  created: number,
  model: string,
  toolCallId: string,
  args: { title: string; questions: string },
): Response {
  return new Response(JSON.stringify({
    id,
    object: "chat.completion",
    created,
    model,
    choices: [{
      index: 0,
      message: {
        role: "assistant",
        content: null,
        tool_calls: [{
          id: toolCallId,
          type: "function",
          function: {
            name: TOOL_NAME,
            arguments: JSON.stringify(args),
          },
        }],
      },
      finish_reason: "tool_calls",
    }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

// ── OpenAI Streaming ───────────────────────────────────────────────────────────

function buildOpenAIStreamingResponse(
  id: string,
  created: number,
  model: string,
  toolCallId: string,
  args: { title: string; questions: string },
): Response {
  const encoder = new TextEncoder();
  const argsStr = JSON.stringify(args);

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
        id, object: "chat.completion.chunk", created, model,
        choices: [{
          index: 0,
          delta: {
            role: "assistant",
            content: null,
            tool_calls: [{
              index: 0,
              id: toolCallId,
              type: "function",
              function: { name: TOOL_NAME, arguments: "" },
            }],
          },
          finish_reason: null,
        }],
      })}\n\n`));

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
        id, object: "chat.completion.chunk", created, model,
        choices: [{
          index: 0,
          delta: {
            tool_calls: [{
              index: 0,
              function: { arguments: argsStr },
            }],
          },
          finish_reason: null,
        }],
      })}\n\n`));

      controller.enqueue(encoder.encode(`data: ${JSON.stringify({
        id, object: "chat.completion.chunk", created, model,
        choices: [{
          index: 0,
          delta: {},
          finish_reason: "tool_calls",
        }],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      })}\n\n`));

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" },
  });
}

// ── Anthropic Non-streaming ────────────────────────────────────────────────────

function buildAnthropicNonStreamingResponse(
  msgId: string,
  model: string,
  toolUseId: string,
  args: { title: string; questions: string },
): Response {
  return new Response(JSON.stringify({
    id: msgId,
    type: "message",
    role: "assistant",
    model,
    content: [{
      type: "tool_use",
      id: toolUseId,
      name: TOOL_NAME,
      input: args,
    }],
    stop_reason: "tool_use",
    stop_sequence: null,
    usage: { input_tokens: 0, output_tokens: 0 },
  }), { status: 200, headers: { "Content-Type": "application/json" } });
}

// ── Anthropic Streaming ────────────────────────────────────────────────────────

function buildAnthropicStreamingResponse(
  msgId: string,
  model: string,
  toolUseId: string,
  args: { title: string; questions: string },
): Response {
  const encoder = new TextEncoder();
  const inputJson = JSON.stringify(args);
  const sse = (event: string, d: unknown) =>
    encoder.encode(`event: ${event}\ndata: ${JSON.stringify(d)}\n\n`);

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(sse("message_start", {
        type: "message_start",
        message: {
          id: msgId, type: "message", role: "assistant", model,
          content: [], stop_reason: null, stop_sequence: null,
          usage: { input_tokens: 0, output_tokens: 0 },
        },
      }));

      controller.enqueue(sse("content_block_start", {
        type: "content_block_start",
        index: 0,
        content_block: { type: "tool_use", id: toolUseId, name: TOOL_NAME, input: {} },
      }));

      controller.enqueue(sse("content_block_delta", {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: inputJson },
      }));

      controller.enqueue(sse("content_block_stop", { type: "content_block_stop", index: 0 }));

      controller.enqueue(sse("message_delta", {
        type: "message_delta",
        delta: { stop_reason: "tool_use", stop_sequence: null },
        usage: { output_tokens: 0 },
      }));

      controller.enqueue(sse("message_stop", { type: "message_stop" }));
      controller.close();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "Connection": "keep-alive" },
  });
}
