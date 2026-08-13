import type {
  AtomicDeleteData,
  AtomicDetail,
  AtomicQueryData,
  AtomicSearchData,
  AtomicUpdateData,
  ConversationAddData,
  ConversationDeleteData,
  ConversationItem,
  ConversationQueryData,
  ConversationSearchData,
  CoreFile,
  CoreWriteData,
  CountData,
  ScenarioEntry,
  ScenarioFile,
  ScenarioListData,
  ScenarioWriteData,
} from "../types.js";
import type { MemoryClientConfig, Transport } from "../client.js";

export interface V3MemoryClientConfig extends MemoryClientConfig {
  /** Team ID. Required by v3 strict isolation. */
  teamId: string;
  /** Agent ID. Required by v3 strict isolation. */
  agentId: string;
  /** User ID. Required by v3 strict isolation. */
  userId: string;
  /** Optional default session ID. L0/L1 calls may override it per request. */
  sessionId?: string;
  /** Optional task ID carried in isolation fields. */
  taskId?: string;
}

export type V3MemoryClientInput = V3MemoryClientConfig | Transport;

export interface V3IsolationContext {
  team_id: string;
  agent_id: string;
  user_id: string;
  session_id?: string;
  task_id?: string;
}

export interface V3IsolationOverrides {
  teamId?: string;
  agentId?: string;
  userId?: string;
  sessionId?: string | null;
  taskId?: string | null;
}

export interface V3ConversationAddRequest {
  session_id?: string;
  messages: ConversationItem[];
}
export type V3ConversationAddData = ConversationAddData;

export interface V3ConversationQueryRequest {
  session_id?: string;
  limit?: number;
  offset?: number;
  time_start?: string;
  time_end?: string;
}
export type V3ConversationQueryData = ConversationQueryData;

export interface V3ConversationSearchRequest {
  query: string;
  limit?: number;
  session_id?: string;
  time_start?: string;
  time_end?: string;
}
export type V3ConversationSearchData = ConversationSearchData;

export interface V3ConversationDeleteRequest {
  message_ids?: string[];
  session_id?: string;
}
export type V3ConversationDeleteData = ConversationDeleteData;
export interface V3ConversationCountRequest {
  session_id?: string;
  time_start?: string;
  time_end?: string;
}

export interface V3AtomicUpdateRequest {
  id: string;
  content: string;
  background?: string;
  session_id?: string;
}
export type V3AtomicUpdateData = AtomicUpdateData;

export interface V3AtomicQueryRequest {
  type?: string;
  limit?: number;
  offset?: number;
  time_start?: string;
  time_end?: string;
  session_id?: string;
}
export type V3AtomicDetail = AtomicDetail;
export type V3AtomicQueryData = AtomicQueryData;

export interface V3AtomicSearchRequest {
  query: string;
  limit?: number;
  type?: string;
  time_start?: string;
  time_end?: string;
  session_id?: string;
}
export type V3AtomicSearchData = AtomicSearchData;

export interface V3AtomicDeleteRequest {
  ids: string[];
  session_id?: string;
}
export type V3AtomicDeleteData = AtomicDeleteData;

export interface V3AtomicCountRequest {
  type?: string;
  time_start?: string;
  time_end?: string;
  session_id?: string;
}

export interface V3ScenarioListRequest {
  path_prefix?: string;
}
export type V3ScenarioEntry = ScenarioEntry;
export type V3ScenarioListData = ScenarioListData;

export interface V3ScenarioReadRequest {
  path: string;
}
export type V3ScenarioFile = ScenarioFile;

export interface V3ScenarioWriteRequest {
  path: string;
  content: string;
  summary?: string;
}
export type V3ScenarioWriteData = ScenarioWriteData;

export interface V3ScenarioRmRequest {
  path: string;
}

export interface V3ScenarioCountRequest {
  path_prefix?: string;
}

export type V3CoreReadRequest = Record<string, never>;
export type V3CoreFile = CoreFile;

export interface V3CoreWriteRequest {
  content: string;
}
export type V3CoreWriteData = CoreWriteData;
export type V3CountData = CountData;
