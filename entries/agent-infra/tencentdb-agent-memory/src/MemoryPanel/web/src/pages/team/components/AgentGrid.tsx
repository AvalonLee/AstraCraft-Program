/**
 * AgentGrid —— team 内 Agent 管理。
 *
 * 视觉与 Memory 项目的 Agents 页面保持一致：Tea Card / ActionPanel、
 * 搜索与 Owner 筛选、卡片/列表视图切换；权限与数据仍完全沿用当前真实后端链路。
 */

import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Justify, SearchBox, Segment, Select, Table } from 'tea-component';
import {
  AddIcon,
  ChevronRightIcon,
  DeleteIcon,
  ViewListIcon,
  ViewModuleIcon,
} from 'tea-icons-react';
import { canManageAsset, type Team, type Agent as StoreAgent } from '@/services';
import { emptyMountedCounts, type AgentMountedCounts } from './types';
import { Mounted } from './shared';

const { scrollable } = Table.addons;

type ViewMode = 'card' | 'list';

export default function AgentGrid({
  activeTeam,
  agents,
  agentsLoading,
  mountedCounts,
  currentUser,
  isAdmin: _isAdmin,
  canSeeAllAgents,
  onCreateAgent,
  onEditAgent,
  onDeleteAgent,
}: {
  activeTeam: Team;
  agents: StoreAgent[];
  agentsLoading: boolean;
  mountedCounts: Record<string, AgentMountedCounts>;
  currentUser: string;
  /** 保留接口兼容；admin 不再有特殊权限。 */
  isAdmin: boolean;
  /** 是否有权限看到 team 内全部 agent（admin / team admin）。普通用户只能看到自己的，无需 Owner 筛选。 */
  canSeeAllAgents: boolean;
  onCreateAgent: () => void;
  onEditAgent: (agent: StoreAgent) => void;
  onDeleteAgent: (agent: StoreAgent) => void;
}) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('agentGrid.viewMode') : null;
    return saved === 'list' ? 'list' : 'card';
  });
  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    try { localStorage.setItem('agentGrid.viewMode', mode); } catch {}
  }, []);

  const ownerOptions = useMemo(() => {
    const memberIds = activeTeam.members.map((member) => member.user_id);
    const agentOwnerIds = agents.map((agent) => agent.owner_user_id).filter(Boolean);
    return Array.from(new Set([...memberIds, ...agentOwnerIds]));
  }, [activeTeam.members, agents]);

  const filteredAgents = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return agents.filter((agent) => {
      if (ownerFilter && agent.owner_user_id !== ownerFilter) return false;
      if (!normalizedKeyword) return true;
      return (
        agent.name.toLowerCase().includes(normalizedKeyword)
        || agent.description.toLowerCase().includes(normalizedKeyword)
        || agent.agent_id.toLowerCase().includes(normalizedKeyword)
      );
    });
  }, [agents, keyword, ownerFilter]);

  function canEdit(agent: StoreAgent): boolean {
    // admin 与 member 一致：只能操作自己 owner 的 agent（不再有全局 admin 特权）。
    return canManageAsset(
      { owner_user_id: agent.owner_user_id, team_id: agent.team_id },
      activeTeam,
      currentUser,
      false,
    );
  }

  function renderName(agent: StoreAgent, compact = false) {
    const editable = canEdit(agent);
    return (
      <button
        type="button"
        className={`_memory-agents-name-trigger${editable ? ' _memory-agents-name-trigger--editable' : ''}`}
        onClick={() => editable && onEditAgent(agent)}
        disabled={!editable}
        title={editable
          ? t('agentGrid.card.edit.tooltip.can')
          : t('agentGrid.card.edit.tooltip.cannot', { owner: agent.owner_user_id || t('agentGrid.card.ownerUnset') })}
      >
        <span className="_memory-agents-name" title={agent.name}>{agent.name}</span>
        {editable && <ChevronRightIcon size={compact ? 12 : 14} className="_memory-agents-chevron" />}
      </button>
    );
  }

  function renderOwner(agent: StoreAgent) {
    const ownerIsMe = agent.owner_user_id === currentUser;
    return (
      <span className={`_memory-agents-owner-tag${ownerIsMe ? ' _memory-agents-owner-tag--me' : ''}`}>
        {agent.owner_user_id || t('agentGrid.card.ownerUnset')}{ownerIsMe && t('agentGrid.owner.you')}
      </span>
    );
  }

  function renderAssets(agent: StoreAgent) {
    const counts = mountedCounts[agent.agent_id] ?? emptyMountedCounts();
    return (
      <div className="_memory-agents-stats">
        <Mounted label="skills" count={counts.skills} />
        <Mounted label="code_graph" count={counts.code_graph} />
        <Mounted label="llm_wiki" count={counts.llm_wiki} />
        <Mounted label="chat_memory" count={counts.chat_memory} />
      </div>
    );
  }

  return (
    <div className="_memory-agents-panel">
      <div className="_memory-agents-section-head">
        <div>
          <h2 className="_memory-agents-section-title">{t('agentGrid.title')}</h2>
          <div className="_memory-agents-section-subtitle">
            {t('agentGrid.subtitle', {
              name: activeTeam.name,
              id: activeTeam.team_id,
              loading: agentsLoading ? t('agentGrid.loading') : t('agentGrid.subtitle.count', { count: agents.length }),
            })}
          </div>
        </div>
      </div>

      <Table.ActionPanel>
        <Justify
          left={
            <Button
              type="primary"
              onClick={onCreateAgent}
              title={t('agentGrid.create.tooltip')}
            >
              <AddIcon size={12} /> {t('agentGrid.create')}
            </Button>
          }
          right={
            <div className="_memory-agents-toolbar">
              <SearchBox
                value={keyword}
                onChange={setKeyword}
                placeholder={t('agentGrid.search')}
              />
              {canSeeAllAgents && (
                <Select
                  value={ownerFilter}
                  onChange={setOwnerFilter}
                  appearance="button"
                  options={[
                    { value: '', text: t('agentGrid.allOwners') },
                    ...ownerOptions.map((ownerId) => ({ value: ownerId, text: ownerId })),
                  ]}
                  matchButtonWidth
                />
              )}
              <Segment
                value={viewMode}
                onChange={(value) => handleSetViewMode(value as ViewMode)}
                options={[
                  { value: 'card', text: <ViewModuleIcon /> },
                  { value: 'list', text: <ViewListIcon /> },
                ]}
              />
            </div>
          }
        />
      </Table.ActionPanel>

      {agentsLoading && agents.length === 0 ? (
        viewMode === 'card' ? (
          // 卡片视图骨架屏：4 个占位卡 + shimmer 动画，风格与 AssetListPanel 一致
          <div className="_memory-agents-skeleton-grid" aria-label="loading">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="_memory-agents-skeleton-card">
                <div className="_memory-agents-skeleton-line _memory-agents-skeleton-line--name" />
                <div className="_memory-agents-skeleton-line _memory-agents-skeleton-line--id" />
                <div className="_memory-agents-skeleton-line _memory-agents-skeleton-line--desc" />
                <div className="_memory-agents-skeleton-line _memory-agents-skeleton-line--meta" />
              </div>
            ))}
          </div>
        ) : (
          <div className="_memory-agents-empty">{t('agentGrid.loading')}</div>
        )
      ) : filteredAgents.length === 0 ? (
        <div className="_memory-agents-empty">
          {agents.length === 0
            ? t('agentGrid.empty.member')
            : canSeeAllAgents
              ? t('agentGrid.empty.filtered.all')
              : t('agentGrid.empty.filtered.partial')}
        </div>
      ) : viewMode === 'card' ? (
        <div className="_memory-agents-card-grid">
          {filteredAgents.map((agent) => {
            const editable = canEdit(agent);
            return (
              <div key={agent.agent_id} className={`_memory-agents-card${editable ? ' _memory-agents-card--editable' : ''}`}>
                <div className="_memory-agents-card-head">{renderName(agent)}</div>
                <div className="_memory-agents-card-id">{t('agentGrid.card.id', { id: agent.agent_id })}</div>
                <div className="_memory-agents-card-desc">{agent.description || t('common.noDescription')}</div>
                <div className="_memory-agents-owner-row">
                  <span>{t('agentGrid.card.owner')}</span>
                  {renderOwner(agent)}
                  {!editable && <span className="_memory-agents-readonly">{t('agentGrid.card.readonly')}</span>}
                </div>
                {renderAssets(agent)}
                <div className="_memory-agents-card-actions">
                  <Button
                    type="text"
                    disabled={!editable}
                    onClick={() => onDeleteAgent(agent)}
                    title={editable ? t('agentGrid.card.delete.tooltip.can') : t('agentGrid.card.delete.tooltip.cannot')}
                  >
                    <DeleteIcon size={12} /> {t('agentGrid.card.delete')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Table
          records={filteredAgents}
          recordKey="agent_id"
          addons={[scrollable({ minWidth: 960, maxHeight: 560 })]}
          columns={[
            {
              key: 'name',
              header: t('agentGrid.table.name'),
              width: 240,
              render: (agent: StoreAgent) => renderName(agent, true),
            },
            {
              key: 'owner',
              header: 'Owner',
              width: 160,
              render: (agent: StoreAgent) => renderOwner(agent),
            },
            {
              key: 'assets',
              header: t('agentGrid.table.assets'),
              render: (agent: StoreAgent) => {
                const counts = mountedCounts[agent.agent_id] ?? emptyMountedCounts();
                return (
                  <span className="_memory-agents-list-assets">
                    skills×{counts.skills} · code_graph×{counts.code_graph} · llm_wiki×{counts.llm_wiki} · chat_memory×{counts.chat_memory}
                  </span>
                );
              },
            },
            {
              key: 'description',
              header: t('agentGrid.table.desc'),
              render: (agent: StoreAgent) => <span className="_memory-agents-list-description">{agent.description || t('common.noDescription')}</span>,
            },
            {
              key: 'actions',
              header: t('agentGrid.table.actions'),
              width: 90,
              fixed: 'right',
              render: (agent: StoreAgent) => {
                const editable = canEdit(agent);
                return (
                  <Button type="link" disabled={!editable} onClick={() => onDeleteAgent(agent)}>
                    {t('agentGrid.table.delete')}
                  </Button>
                );
              },
            },
          ]}
        />
      )}
    </div>
  );
}
