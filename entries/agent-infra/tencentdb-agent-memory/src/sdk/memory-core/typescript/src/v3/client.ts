import { ParamError } from "../errors.js";
import { V3HttpTransport } from "./http.js";
import type { Transport } from "../client.js";
import type {
  V3AtomicCountRequest,
  V3AtomicDeleteData,
  V3AtomicDeleteRequest,
  V3AtomicQueryData,
  V3AtomicQueryRequest,
  V3AtomicSearchData,
  V3AtomicSearchRequest,
  V3AtomicUpdateData,
  V3AtomicUpdateRequest,
  V3ConversationAddData,
  V3ConversationAddRequest,
  V3ConversationCountRequest,
  V3ConversationDeleteData,
  V3ConversationDeleteRequest,
  V3ConversationQueryData,
  V3ConversationQueryRequest,
  V3ConversationSearchData,
  V3ConversationSearchRequest,
  V3CoreFile,
  V3CoreReadRequest,
  V3CoreWriteData,
  V3CoreWriteRequest,
  V3CountData,
  V3IsolationContext,
  V3IsolationOverrides,
  V3MemoryClientConfig,
  V3ScenarioFile,
  V3ScenarioListData,
  V3ScenarioListRequest,
  V3ScenarioReadRequest,
  V3ScenarioRmRequest,
  V3ScenarioCountRequest,
  V3ScenarioWriteData,
  V3ScenarioWriteRequest,
} from "./types.js";

const V3 = "/v3";

function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

function requireNonEmpty(name: string, value: string | undefined): string {
  if (!value) throw new ParamError(`v3 MemoryClient requires non-empty ${name}`);
  return value;
}

class IsolationContext {
  constructor(
    readonly teamId: string,
    readonly agentId: string,
    readonly userId: string,
    readonly sessionId?: string,
    readonly taskId?: string,
  ) {
    requireNonEmpty("teamId", teamId);
    requireNonEmpty("agentId", agentId);
    requireNonEmpty("userId", userId);
  }

  baseBody(): V3IsolationContext {
    return stripUndefined({
      team_id: this.teamId,
      agent_id: this.agentId,
      user_id: this.userId,
      task_id: this.taskId,
    }) as unknown as V3IsolationContext;
  }

  resolveSession(override?: string): string | undefined {
    return override ?? this.sessionId;
  }

  /**
   * 写入路径专用：`addConversation` 必须拿到一个非空 session_id。
   * 缺则抛错——避免服务端把无 session 的写入静默合并到默认 bucket，
   * 与其他调用方的数据混在一起。
   */
  resolveSessionForWrite(override?: string): string {
    const sid = override ?? this.sessionId;
    if (!sid) {
      throw new ParamError(
        "v3 MemoryClient.addConversation requires session_id: " +
        "pass it in the constructor or per call. " +
        "Reads (query/search/count) may omit it to aggregate across sessions.",
      );
    }
    return sid;
  }

  with(overrides: V3IsolationOverrides): IsolationContext {
    return new IsolationContext(
      overrides.teamId ?? this.teamId,
      overrides.agentId ?? this.agentId,
      overrides.userId ?? this.userId,
      overrides.sessionId === null ? undefined : overrides.sessionId ?? this.sessionId,
      overrides.taskId === null ? undefined : overrides.taskId ?? this.taskId,
    );
  }
}

/**
 * v3 strict-isolation data-plane client.
 *
 * Constructor requires teamId / agentId / userId. sessionId rules:
 * - `addConversation` (write path) **requires** sessionId — pass in
 *   constructor or per call; missing → throws. This prevents session-less
 *   writes from being silently merged into a default bucket server-side.
 * - Read paths (query / search / count / delete) allow sessionId to be
 *   omitted; the server aggregates across sessions for the same
 *   team+agent+user.
 * - L2/L3 are team+agent profile data and do not consume sessionId.
 */
export class MemoryClient {
  private readonly http: Transport;
  private readonly iso: IsolationContext;

  constructor(config: V3MemoryClientConfig);
  constructor(transport: Transport, isolation: V3IsolationContext);
  constructor(configOrTransport: V3MemoryClientConfig | Transport, isolation?: V3IsolationContext) {
    if ("post" in configOrTransport) {
      if (!isolation) throw new ParamError("v3 MemoryClient transport constructor requires isolation context");
      this.http = configOrTransport;
      this.iso = new IsolationContext(
        isolation.team_id,
        isolation.agent_id,
        isolation.user_id,
        isolation.session_id,
        isolation.task_id,
      );
      return;
    }

    const cfg = configOrTransport;
    this.http = new V3HttpTransport({
      endpoint: cfg.endpoint,
      apiKey: cfg.apiKey,
      serviceId: cfg.serviceId,
      timeout: cfg.timeout,
      rejectUnauthorized: cfg.rejectUnauthorized,
    });
    this.iso = new IsolationContext(cfg.teamId, cfg.agentId, cfg.userId, cfg.sessionId, cfg.taskId);
  }

  withIsolation(overrides: V3IsolationOverrides): MemoryClient {
    const next = this.iso.with(overrides);
    return new MemoryClient(this.http, {
      team_id: next.teamId,
      agent_id: next.agentId,
      user_id: next.userId,
      session_id: next.sessionId,
      task_id: next.taskId,
    });
  }

  // -- L0 Conversation ---------------------------------------------------

  addConversation(params: V3ConversationAddRequest): Promise<V3ConversationAddData> {
    return this.http.post(`${V3}/conversation/add`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSessionForWrite(params.session_id),
      messages: params.messages,
    }));
  }

  queryConversation(params: V3ConversationQueryRequest = {}): Promise<V3ConversationQueryData> {
    return this.http.post(`${V3}/conversation/query`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      limit: params.limit,
      offset: params.offset,
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  searchConversation(params: V3ConversationSearchRequest): Promise<V3ConversationSearchData> {
    return this.http.post(`${V3}/conversation/search`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      query: params.query,
      limit: params.limit,
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  deleteConversation(params: V3ConversationDeleteRequest = {}): Promise<V3ConversationDeleteData> {
    if (params.message_ids !== undefined &&
        (!params.message_ids.length || params.message_ids.some((id) => !id))) {
      throw new ParamError("message_ids must be a non-empty list of non-empty strings");
    }
    const sessionId = this.iso.resolveSession(params.session_id);
    if (params.message_ids === undefined && !sessionId) {
      throw new ParamError("deleteConversation requires message_ids or session_id");
    }
    return this.http.post(`${V3}/conversation/delete`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: sessionId,
      message_ids: params.message_ids,
    }));
  }

  countConversation(params: V3ConversationCountRequest = {}): Promise<V3CountData> {
    return this.http.post(`${V3}/conversation/count`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  // -- L1 Atomic ---------------------------------------------------------

  updateAtomic(params: V3AtomicUpdateRequest): Promise<V3AtomicUpdateData> {
    return this.http.post(`${V3}/atomic/update`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      id: params.id,
      content: params.content,
      background: params.background,
    }));
  }

  queryAtomic(params: V3AtomicQueryRequest = {}): Promise<V3AtomicQueryData> {
    return this.http.post(`${V3}/atomic/query`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      type: params.type,
      limit: params.limit,
      offset: params.offset,
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  searchAtomic(params: V3AtomicSearchRequest): Promise<V3AtomicSearchData> {
    return this.http.post(`${V3}/atomic/search`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      query: params.query,
      limit: params.limit,
      type: params.type,
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  deleteAtomic(params: V3AtomicDeleteRequest): Promise<V3AtomicDeleteData> {
    return this.http.post(`${V3}/atomic/delete`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      ids: params.ids,
    }));
  }

  countAtomic(params: V3AtomicCountRequest = {}): Promise<V3CountData> {
    return this.http.post(`${V3}/atomic/count`, stripUndefined({
      ...this.iso.baseBody(),
      session_id: this.iso.resolveSession(params.session_id),
      type: params.type,
      time_start: params.time_start,
      time_end: params.time_end,
    }));
  }

  // -- L2 Scenario -------------------------------------------------------

  listScenarios(params: V3ScenarioListRequest = {}): Promise<V3ScenarioListData> {
    return this.http.post(`${V3}/scenario/ls`, stripUndefined({ ...this.iso.baseBody(), path_prefix: params.path_prefix }));
  }

  readScenario(params: V3ScenarioReadRequest): Promise<V3ScenarioFile> {
    return this.http.post(`${V3}/scenario/read`, stripUndefined({ ...this.iso.baseBody(), path: params.path }));
  }

  writeScenario(params: V3ScenarioWriteRequest): Promise<V3ScenarioWriteData> {
    return this.http.post(`${V3}/scenario/write`, stripUndefined({
      ...this.iso.baseBody(),
      path: params.path,
      content: params.content,
      summary: params.summary,
    }));
  }

  rmScenario(params: V3ScenarioRmRequest): Promise<void> {
    return this.http.post(`${V3}/scenario/rm`, stripUndefined({ ...this.iso.baseBody(), path: params.path }));
  }

  countScenario(params: V3ScenarioCountRequest = {}): Promise<V3CountData> {
    return this.http.post(`${V3}/scenario/count`, stripUndefined({ ...this.iso.baseBody(), path_prefix: params.path_prefix }));
  }

  // -- L3 Core ------------------------------------------------------------

  readCore(_params: V3CoreReadRequest = {}): Promise<V3CoreFile> {
    return this.http.post(`${V3}/core/read`, this.iso.baseBody() as unknown as Record<string, unknown>);
  }

  writeCore(params: V3CoreWriteRequest): Promise<V3CoreWriteData> {
    return this.http.post(`${V3}/core/write`, stripUndefined({ ...this.iso.baseBody(), content: params.content }));
  }

  countCore(): Promise<V3CountData> {
    return this.http.post(`${V3}/core/count`, this.iso.baseBody() as unknown as Record<string, unknown>);
  }
}
