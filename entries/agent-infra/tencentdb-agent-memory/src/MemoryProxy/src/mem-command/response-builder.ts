/**
 * 按 Anthropic / OpenAI 协议构造伪造的 LLM 响应。
 *
 * 返回的 Response 对 IDE 来说就是一条正常的 assistant 回复。
 */

// ── Anthropic non-streaming ─────────────────────────────────────────────────

export function buildAnthropicResponse(text: string, requestId: string, thinking?: boolean): Response {
  const content: Record<string, unknown>[] = [];
  // 当请求开启了 extended thinking 时，必须包含 thinking block，
  // 否则 Claude Code 会认为响应不完整并发起额外请求。
  if (thinking) {
    content.push({ type: "thinking", thinking: "Processing mem: command.", signature: "" });
  }
  content.push({ type: "text", text });

  const body = {
    id: requestId,
    type: "message",
    role: "assistant",
    content,
    model: "memory-proxy",
    stop_reason: "end_turn",
    usage: { input_tokens: 0, output_tokens: 0 },
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", "x-request-id": requestId },
  });
}

// ── Anthropic streaming ─────────────────────────────────────────────────────

export function buildAnthropicStreamResponse(text: string, requestId: string, thinking?: boolean): Response {
  const msgId = requestId;
  const lines: string[] = [
    `event: message_start`,
    `data: ${JSON.stringify({ type: "message_start", message: { id: msgId, type: "message", role: "assistant", content: [], model: "memory-proxy", stop_reason: null, usage: { input_tokens: 0, output_tokens: 0 } } })}`,
    ``,
  ];

  let blockIndex = 0;

  // 当请求开启了 extended thinking 时，先发一个完整的 thinking block，
  // 否则 Claude Code 会认为响应不完整并发起额外请求。
  if (thinking) {
    lines.push(
      `event: content_block_start`,
      `data: ${JSON.stringify({ type: "content_block_start", index: blockIndex, content_block: { type: "thinking", thinking: "" } })}`,
      ``,
      `event: content_block_delta`,
      `data: ${JSON.stringify({ type: "content_block_delta", index: blockIndex, delta: { type: "thinking_delta", thinking: "Processing mem: command." } })}`,
      ``,
      `event: content_block_stop`,
      `data: ${JSON.stringify({ type: "content_block_stop", index: blockIndex })}`,
      ``,
    );
    blockIndex++;
  }

  // text block
  lines.push(
    `event: content_block_start`,
    `data: ${JSON.stringify({ type: "content_block_start", index: blockIndex, content_block: { type: "text", text: "" } })}`,
    ``,
    `event: content_block_delta`,
    `data: ${JSON.stringify({ type: "content_block_delta", index: blockIndex, delta: { type: "text_delta", text } })}`,
    ``,
    `event: content_block_stop`,
    `data: ${JSON.stringify({ type: "content_block_stop", index: blockIndex })}`,
    ``,
  );

  // message end
  lines.push(
    `event: message_delta`,
    `data: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 0 } })}`,
    ``,
    `event: message_stop`,
    `data: ${JSON.stringify({ type: "message_stop" })}`,
    ``,
  );

  const body = lines.join("\n");

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "x-request-id": requestId,
    },
  });
}

// ── OpenAI non-streaming ────────────────────────────────────────────────────

export function buildOpenAIResponse(text: string, requestId: string): Response {
  const body = {
    id: requestId,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    choices: [{
      index: 0,
      message: { role: "assistant", content: text },
      finish_reason: "stop",
    }],
    model: "memory-proxy",
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", "x-request-id": requestId },
  });
}

// ── OpenAI streaming ────────────────────────────────────────────────────────

export function buildOpenAIStreamResponse(text: string, requestId: string): Response {
  const chunk = {
    id: requestId,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
    model: "memory-proxy",
  };
  const doneChunk = {
    id: requestId,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    model: "memory-proxy",
  };
  const body = `data: ${JSON.stringify(chunk)}\n\ndata: ${JSON.stringify(doneChunk)}\n\ndata: [DONE]\n\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "x-request-id": requestId,
    },
  });
}

// ── Unified builder ─────────────────────────────────────────────────────────

export interface BuildResponseOptions {
  protocol: "anthropic" | "openai";
  stream: boolean;
  requestId?: string;
  /** 请求是否开启了 extended thinking（Anthropic 专用） */
  thinking?: boolean;
}

export function buildMemResponse(text: string, opts: BuildResponseOptions): Response {
  const requestId = opts.requestId ?? `mem-cmd-${Date.now()}`;

  if (opts.protocol === "anthropic") {
    return opts.stream
      ? buildAnthropicStreamResponse(text, requestId, opts.thinking)
      : buildAnthropicResponse(text, requestId, opts.thinking);
  }
  return opts.stream
    ? buildOpenAIStreamResponse(text, requestId)
    : buildOpenAIResponse(text, requestId);
}
