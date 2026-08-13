/**
 * KvBindingRepo —— BindingRepo backed by ProxyStorage.
 *
 * 见 docs/design/2026-07-12-cos-shark-sts-credential-plan.md §3.2 §3.6。
 *
 * Key 路径：
 *   nottl/<spaceId>/<userId>/<agentSource>/<sessionId>/binding.json
 *
 * spaceId 是 P4 (kernel-sts) 新增的隔离段。老 caller 传空字符串时用 `_default` 兜底。
 *
 * `touchLastSeen` 从 Redis HSET 单字段变成本层 R-M-W；用 per-key mutex
 * 消除单节点内竞争。跨节点场景下 last_seen 可能覆盖丢失（业务可接受）。
 */
import type { BindingRepo, SessionBinding } from "./binding-repo.js";
import type { ProxyStorage } from "../storage/proxy-storage.js";
import { withPerKeyLock } from "../storage/per-key-mutex.js";
import { sessionDirOf } from "../storage/key-utils.js";

function keyOf(
  spaceId: string,
  userId: string,
  agentSource: string,
  sessionId: string,
): string {
  const sp = spaceId || "_default";
  return `${sessionDirOf("nottl", sp, userId, agentSource, sessionId)}binding.json`;
}

/**
 * per-key mutex 的 lock key 覆盖 (spaceId, userId, agentSource, sessionId) 四段，
 * 防止跨用户 / 跨 agent 碰巧同 sessionId 时误串行。
 */
function lockKey(
  spaceId: string,
  userId: string,
  agentSource: string,
  sessionId: string,
): string {
  const sp = spaceId || "_default";
  return `binding:${sp}:${userId}:${agentSource}:${sessionId}`;
}

interface StoredBinding extends SessionBinding {
  created_at: number;
  last_seen: number;
}

export class KvBindingRepo implements BindingRepo {
  constructor(private readonly storage: ProxyStorage) {}

  async getBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<SessionBinding | null> {
    try {
      const raw = await this.storage.getJSON<StoredBinding>(
        keyOf(spaceId, userId, agentSource, sessionId),
      );
      if (!raw) return null;
      return {
        outcome: raw.outcome ?? "initialized",
        userId: raw.userId,
        teamId: raw.teamId,
        agentId: raw.agentId,
        taskId: raw.taskId,
      };
    } catch {
      return null;
    }
  }

  async putBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
    binding: SessionBinding,
  ): Promise<void> {
    const key = keyOf(spaceId, userId, agentSource, sessionId);
    await withPerKeyLock(lockKey(spaceId, userId, agentSource, sessionId), async () => {
      const now = Date.now();
      const record: StoredBinding = {
        outcome: binding.outcome,
        userId: binding.userId,
        teamId: binding.teamId,
        agentId: binding.agentId,
        taskId: binding.taskId,
        created_at: now,
        last_seen: now,
      };
      // Preserve `created_at` on overwrite (与 Redis HSET 语义等价：不会重置 created_at)
      const existing = await this.storage.getJSON<StoredBinding>(key).catch(() => null);
      if (existing?.created_at) record.created_at = existing.created_at;
      await this.storage.putJSON(key, record).catch((err: any) => {
        // 见 KvSessionRepo.upsert 的日志说明：失败必打日志，成功不打
        console.warn(
          `[kv-binding] putBinding FAIL key=${key}: ` +
            `${err?.statusCode ?? ""} ${err?.code ?? ""} ${err?.message ?? String(err)}`,
        );
      });
    });
  }

  async deleteBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void> {
    const key = keyOf(spaceId, userId, agentSource, sessionId);
    await withPerKeyLock(lockKey(spaceId, userId, agentSource, sessionId), async () => {
      await this.storage.del(key).catch(() => { /* silent */ });
    });
  }

  async touchLastSeen(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void> {
    const key = keyOf(spaceId, userId, agentSource, sessionId);
    await withPerKeyLock(lockKey(spaceId, userId, agentSource, sessionId), async () => {
      const cur = await this.storage.getJSON<StoredBinding>(key).catch(() => null);
      if (!cur) return;
      cur.last_seen = Date.now();
      await this.storage.putJSON(key, cur).catch(() => { /* silent */ });
    });
  }
}
