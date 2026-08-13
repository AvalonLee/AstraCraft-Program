/**
 * BindingRepo — 长期 session binding 持久化。
 *
 * 在 KV 里存一份"小纸条"，只记 outcome + id 组，永不自动清理（`nottl/` 前缀）。
 * 用于沉睡对话唤醒：热缓存(30min)过期后，从 binding 恢复 agent/task 选择。
 *
 * ── Signature note ────────────────────────────────────────────────────────
 * 见 docs/design/2026-07-12-cos-shark-sts-credential-plan.md §3.6：所有方法
 * 第一个参数是 `spaceId`（kernel-sts 模式下 STS 权限按 space 隔离，key 路径
 * 也随之带 spaceId 段）；空 spaceId 上下文的老 caller 传 `""` / `undefined`
 * 时会被 sessionDirOf 内部当作 `_default` 兜底段处理。
 *
 * 原方案 (2026-07-10) 仅有 (userId, agentSource, sessionId) 三段，spaceId
 * 层是 P4 kernel-sts 支持新增。
 */

import type { Redis } from "ioredis";

const REDIS_KEY_PREFIX = "inj:binding:";
const DEFAULT_BINDING_TTL_DAYS = 30;

export interface SessionBinding {
  outcome: "initialized" | "bypassed";
  userId?: string;
  teamId?: string;
  agentId?: string;
  taskId?: string;
}

export interface BindingRepo {
  getBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<SessionBinding | null>;
  putBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
    binding: SessionBinding,
  ): Promise<void>;
  deleteBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void>;
  touchLastSeen(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void>;
}

function ttlSeconds(days: number): number {
  return days * 86400;
}

function redisKey(
  spaceId: string,
  userId: string,
  agentSource: string,
  sessionId: string,
): string {
  const sp = spaceId || "_default";
  return `${REDIS_KEY_PREFIX}${sp}:${userId}:${agentSource}:${sessionId}`;
}

export class RedisBindingRepo implements BindingRepo {
  constructor(
    private redis: Redis,
    private bindingTtlDays: number = DEFAULT_BINDING_TTL_DAYS,
  ) {}

  async getBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<SessionBinding | null> {
    try {
      const all = await this.redis.hgetall(redisKey(spaceId, userId, agentSource, sessionId));
      if (!all || Object.keys(all).length === 0) return null;
      return {
        outcome: (all.outcome as "initialized" | "bypassed") || "initialized",
        userId: all.user_id || undefined,
        teamId: all.team_id || undefined,
        agentId: all.agent_id || undefined,
        taskId: all.task_id || undefined,
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
    const now = Date.now().toString();
    try {
      const fields: Record<string, string> = {
        outcome: binding.outcome,
        created_at: now,
        last_seen: now,
      };
      if (binding.userId) fields.user_id = binding.userId;
      if (binding.teamId) fields.team_id = binding.teamId;
      if (binding.agentId) fields.agent_id = binding.agentId;
      if (binding.taskId) fields.task_id = binding.taskId;

      const key = redisKey(spaceId, userId, agentSource, sessionId);
      await this.redis.hset(key, fields);
      await this.redis.expire(key, ttlSeconds(this.bindingTtlDays));
    } catch {
      /* ignore */
    }
  }

  async deleteBinding(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void> {
    try {
      await this.redis.del(redisKey(spaceId, userId, agentSource, sessionId));
    } catch {
      /* ignore */
    }
  }

  async touchLastSeen(
    spaceId: string,
    userId: string,
    agentSource: string,
    sessionId: string,
  ): Promise<void> {
    try {
      const key = redisKey(spaceId, userId, agentSource, sessionId);
      await this.redis.hset(key, "last_seen", Date.now().toString());
      await this.redis.expire(key, ttlSeconds(this.bindingTtlDays));
    } catch {
      /* ignore */
    }
  }
}

/** Null repo for when Redis is disabled. */
export class NullBindingRepo implements BindingRepo {
  async getBinding(
    _spaceId: string,
    _userId: string,
    _agentSource: string,
    _sessionId: string,
  ): Promise<SessionBinding | null> { return null; }
  async putBinding(
    _spaceId: string,
    _userId: string,
    _agentSource: string,
    _sessionId: string,
    _binding: SessionBinding,
  ): Promise<void> {}
  async deleteBinding(
    _spaceId: string,
    _userId: string,
    _agentSource: string,
    _sessionId: string,
  ): Promise<void> {}
  async touchLastSeen(
    _spaceId: string,
    _userId: string,
    _agentSource: string,
    _sessionId: string,
  ): Promise<void> {}
}
