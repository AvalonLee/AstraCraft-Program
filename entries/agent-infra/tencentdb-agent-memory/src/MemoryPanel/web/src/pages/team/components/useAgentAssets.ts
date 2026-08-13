/**
 * TeamManagementPanel 拆分出的数据 hooks：
 *   - loadAgentOverview / syncChatMemoryBindings：单次调用的资产总览接口
 *   - useTeamAssets：拉取团队级 skill/code_graph/wiki/chat_memory 列表
 *   - useAgentMountedCounts：批量拉取各 agent 已挂载资产数量，并在
 *     BACKEND_REFRESH_EVENT 后自动重新拉取
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { chatMemoryApi } from '@/lib/teamApi';
import { getPanelSession } from '@/lib/panelSession';
import type { Agent as StoreAgent } from '@/services';
import {
  MAX_IMPORTED_CHAT_MEMORIES,
  importedChatMemoryIds,
  type MountableAsset,
  type AgentMountedCounts,
  type AgentOverviewPayload,
  type AgentOverviewEnvelope,
} from './types';

export async function loadAgentOverview(teamId: string, agentIds: string[] = []): Promise<AgentOverviewPayload> {
  const session = getPanelSession();
  if (!session) throw new Error('no active panel session');
  const res = await fetch('/api/v1/agent-overview/bootstrap', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Tdai-Service-Id': session.instanceId,
      'X-Tdai-User-Key': session.userKey,
    },
    body: JSON.stringify({ team_id: teamId, agent_ids: agentIds }),
  });
  const env = (await res.json()) as AgentOverviewEnvelope;
  if (!res.ok || env.code !== 0) throw new Error(env.message || 'AGENT_OVERVIEW_FAILED');
  return env.data;
}

export async function syncChatMemoryBindings(teamId: string, agentId: string, nextIds: string[]): Promise<void> {
  const imported = importedChatMemoryIds(teamId, agentId, nextIds);
  if (imported.length > MAX_IMPORTED_CHAT_MEMORIES) {
    throw new Error('IMPORT_LIMIT_EXCEEDED');
  }
  await chatMemoryApi.setAgentFixed(teamId, agentId, imported);
}

/** 团队资产 Hook：从真实 API 拉取 Skill / CodeGraph / Wiki / ChatMemory */
export function useTeamAssets(teamId: string) {
  const [skills, setSkills] = useState<MountableAsset[]>([]);
  const [codeGraphs, setCodeGraphs] = useState<MountableAsset[]>([]);
  const [wikis, setWikis] = useState<MountableAsset[]>([]);
  const [chatMemories, setChatMemories] = useState<MountableAsset[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!teamId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const overview = await loadAgentOverview(teamId);
      setSkills(overview.assets.skills);
      setCodeGraphs(overview.assets.codeGraphs);
      setWikis(overview.assets.wikis);
      setChatMemories(overview.assets.chatMemories);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, skills, codeGraphs, wikis, chatMemories };
}

export function useAgentMountedCounts(teamId: string | null, agents: StoreAgent[]): Record<string, AgentMountedCounts> {
  const [counts, setCounts] = useState<Record<string, AgentMountedCounts>>({});
  const agentsKey = useMemo(() => agents.map((a) => a.agent_id).join('|'), [agents]);

  // list 计数直接用后端 agent-overview/bootstrap 的 counts —— 它读的是真实源
  // （skill 表 owner_agent_id + agent-fixed-asset 表），与详情弹窗、运行时一致。
  // 不再用 metadata_json.ui 做 fallback：.ui 是已废弃的影子存储，会导致展示≠真实。
  const fetchCounts = useCallback(() => {
    if (!teamId || agents.length === 0) return;
    let cancelled = false;
    loadAgentOverview(teamId, agents.map((agent) => agent.agent_id)).then((overview) => {
      if (!cancelled) setCounts(overview.counts);
    }).catch(() => {});
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, agentsKey]);

  useEffect(() => {
    let cancelled = false;
    if (!teamId || agents.length === 0) { setCounts({}); return () => { cancelled = true; }; }
    loadAgentOverview(teamId, agents.map((agent) => agent.agent_id)).then((overview) => {
      if (!cancelled) setCounts(overview.counts);
    }).catch(() => {
      if (!cancelled) setCounts({});
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, agentsKey]);

  // 保存后 invalidateBackendCache() 会广播 BACKEND_REFRESH_EVENT，需要重新拉 counts
  useEffect(() => {
    if (!teamId || agents.length === 0) return;
    const handler = () => { fetchCounts(); };
    window.addEventListener('tdai-memory.backend-refresh', handler);
    return () => window.removeEventListener('tdai-memory.backend-refresh', handler);
  }, [fetchCounts, teamId, agents.length]);

  return counts;
}
