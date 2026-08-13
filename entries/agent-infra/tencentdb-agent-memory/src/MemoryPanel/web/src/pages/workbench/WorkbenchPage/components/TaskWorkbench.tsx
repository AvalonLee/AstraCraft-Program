/**
 * TaskWorkbench — 用户工作台。
 *
 * 与上一版「社区研发 Loop 工作台」不同，这一版按 PRD §7 / §17.4 把工作台
 * 收敛到两件事：
 *   1. 列出/创建/管理本团队下的 task；
 *   2. 通过 log tab 看 task 历史记录。
 *
 * 布局：进入页面为全宽卡片网格（风格对齐 Agents / Wiki 卡片），不再左右分栏；
 * 点击卡片拉出 Drawer，在抽屉内查看详情与设置（改状态、编辑标题/描述、删除）。
 *
 * 数据走后端链路 A（services/backendStore.ts，内部调用 @/lib/teamApi 的 meta 接口）。
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Drawer, Tag, Text, Input, Segment, Pagination } from 'tea-component';
import { AddIcon, ChevronRightIcon, DeleteIcon, EditIcon, UserIcon, UsergroupIcon } from 'tea-icons-react';
import {
  useTasks,
  useTeams,
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  canEditTask,
  canDeleteTask,
  type Task,
  type Team
} from '@/services';
import { participationLogsApi } from '@/lib/teamApi';
import { tea } from '@/lib/tea-bridge';
import { TeamHeaderCard } from '@/pages/team/components/TeamHeaderCard';
import TaskCreateDialog, { type TaskDraft } from './TaskCreateDialog';
import './task-workbench.css';

export type WorkbenchTab = 'board' | 'logs';

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

// Task 状态在演示阶段简化为二态：进行中 / 已完成。
// 历史的 待处理 / 阻塞 / 已归档 已下线（参见 backendStore.ts 里的 normalizeTaskStatus）。

function useStatusLabels() {
  const { t } = useTranslation();
  return {
    running: t('task.status.running'),
    completed: t('task.status.completed'),
  };
}

interface AgentOption {
  id: string;
  name: string;
}

/**
 * task 层聚合视图：按 task_id 分桶后再各自 dedupe。
 *
 * 内核 append-only 语义：同一 (user, agent, task) 每次 session init 都追加一条，
 * 数据库表里会累积冗余；前端按 Set 做客户端 dedupe，"跑 10 次 session"和
 * "跑 1 次"展示一致。
 */
export interface TaskParticipationView {
  /** dedupe 后的 user_id 列表 */
  users: string[];
  /** dedupe 后的 agent_id 列表 */
  agentIds: string[];
}

const EMPTY_VIEW: TaskParticipationView = { users: [], agentIds: [] };

/**
 * 拉取整个 team 的参与日志，按 task_id 分桶。一次请求覆盖列表页 N 个 task 的
 * 统计数字（避免 fanout N 次），详情页也复用同一份数据从 Map 里取。
 *
 * - 数据源：proxy 侧 session init 完成时 append 到内核 `/v3/meta/participation-log/*`
 * - 请求失败降级为空 Map，各处显示 0 / '—'，不阻断其它区域
 * - 追随 BACKEND_REFRESH_EVENT 自动重新拉取
 */
function useTeamParticipation(teamId: string | null): Map<string, TaskParticipationView> {
  const [byTask, setByTask] = useState<Map<string, TaskParticipationView>>(() => new Map());

  const fetchLogs = useCallback(async () => {
    if (!teamId) {
      setByTask(new Map());
      return;
    }
    try {
      const logs = await participationLogsApi.listByTeam(teamId);
      const buckets = new Map<string, { users: Set<string>; agentIds: Set<string> }>();
      for (const log of logs) {
        if (!log.task_id) continue;
        let bucket = buckets.get(log.task_id);
        if (!bucket) {
          bucket = { users: new Set(), agentIds: new Set() };
          buckets.set(log.task_id, bucket);
        }
        if (log.user_id) bucket.users.add(log.user_id);
        if (log.agent_id) bucket.agentIds.add(log.agent_id);
      }
      const next = new Map<string, TaskParticipationView>();
      for (const [taskId, { users, agentIds }] of buckets) {
        next.set(taskId, { users: [...users], agentIds: [...agentIds] });
      }
      setByTask(next);
    } catch (err) {
      console.warn('[TaskWorkbench] load participation logs failed:', err);
      setByTask(new Map());
    }
  }, [teamId]);

  useEffect(() => {
    let cancelled = false;
    fetchLogs().catch(() => { /* handled inside */ });
    const handler = () => { if (!cancelled) fetchLogs(); };
    window.addEventListener('tdai-memory.backend-refresh', handler);
    return () => {
      cancelled = true;
      window.removeEventListener('tdai-memory.backend-refresh', handler);
    };
  }, [fetchLogs]);

  return byTask;
}

function participationOf(
  byTask: Map<string, TaskParticipationView>,
  taskId: string,
): TaskParticipationView {
  return byTask.get(taskId) ?? EMPTY_VIEW;
}

export default function TaskWorkbench(props: {
  tab?: WorkbenchTab;
  onTabChange?: (tab: WorkbenchTab) => void;
  /** 当前激活的 team id（可空：未选时只显示 empty state） */
  activeTeamId: string | null;
  /** 当前用户名（task 的 creator_user_id） */
  currentUser: string;
  /** 当前 team 下可关联的 Agent 列表（来自 TeamManagementPanel 的同源数据） */
  agents: AgentOption[];
  /** 是否为全局 admin（保留接口兼容；admin 不再有 task 特权） */
  isAdmin?: boolean;
}) {
  const { t } = useTranslation();
  const { activeTeamId, currentUser, agents } = props;
  // 后端分页：useTasks 根据 page + pageSize 调 Panel 聚合接口，内核只返回当前页
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const { tasks, total: tasksTotal, loading: tasksLoading } = useTasks(activeTeamId, currentPage, PAGE_SIZE);
  const { teams, activeTeam } = useTeams();
  const participationByTask = useTeamParticipation(activeTeamId);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 切换 team 时重置到第 1 页
  useEffect(() => { setCurrentPage(1); }, [activeTeamId]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => b.updated_at_ms - a.updated_at_ms);
  }, [tasks]);

  const selected = useMemo(
    () => (selectedId ? tasks.find((t) => t.task_id === selectedId) ?? null : null),
    [selectedId, tasks]
  );

  /**
   * 创建 task：team_id 完全由当前激活 team 决定，不再让 dialog 选 team
   * （切 team 的唯一入口在右上角全局 TeamSwitcher）。
   */
  async function handleCreate(draft: TaskDraft) {
    // 谁点击「创建 Task」，谁就是 creator_user_id。
    const team = teams.find((t) => t.team_id === draft.team_id);
    if (!team) {
      tea.notify.error(`team "${draft.team_id}" ${t('task.emptyTeam.title')}`);
      return;
    }
    try {
      const task = await createTask({
        team_id: draft.team_id,
        creator_user_id: currentUser,
        title: draft.title,
        description: draft.description,
        source_type: draft.source_type,
        source_url: draft.source_url,
        linked_agents: draft.linked_agents
      });
      setSelectedId(task.task_id);
      setShowCreate(false);
    } catch (err) {
      tea.notify.error(errMsg(err));
    }
  }

  return (
    <div className="_memory-workbench-body">
      {!activeTeamId ? (
        <EmptyTeam />
      ) : (
        <>
          {/* 当前 team 概览（与 team 管理页同一组件） */}
          {activeTeam && <TeamHeaderCard team={activeTeam} />}
          <BoardView
          tasks={sortedTasks}
          tasksLoading={tasksLoading}
          tasksTotal={tasksTotal}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={PAGE_SIZE}
          selected={selected}
          onSelect={(id) => setSelectedId(id)}
          onCreate={() => setShowCreate(true)}
          onDelete={async (task) => {
            // 权限：删除 task 仅创建者 / team admin / 全局 admin
            const team = teams.find((t) => t.team_id === task.team_id) ?? null;
            if (!canDeleteTask(task, team, currentUser)) {
              tea.notify.warning(
                t('task.delete.noPermission', { title: task.title, creator: task.creator_user_id })
              );
              return;
            }
            const ok = await tea.confirm({
              message: t('task.delete.confirm', { title: task.title }),
              description: t('task.delete.description', { id: task.task_id }),
              okText: t('task.delete.okText'),
              cancelText: t('task.delete.cancelText'),
            });
            if (ok) {
              try {
                await deleteTask(task.task_id);
                if (selectedId === task.task_id) setSelectedId(null);
              } catch (err) {
                tea.notify.error(errMsg(err));
              }
            }
          }}
          onUpdateStatus={async (task, status) => {
            // 权限：编辑 task（含切换 status）允许 team 内任意 member / admin
            const team = teams.find((t) => t.team_id === task.team_id) ?? null;
            if (!canEditTask(task, team, currentUser)) {
              tea.notify.warning(t('task.noPermissionEdit'));
              return;
            }
            try {
              await updateTaskStatus(task.task_id, status, currentUser);
            } catch (err) {
              tea.notify.error(errMsg(err));
            }
          }}
          onUpdateTask={async (task, patch) => {
            const team = teams.find((t) => t.team_id === task.team_id) ?? null;
            if (!canEditTask(task, team, currentUser)) {
              tea.notify.warning(t('task.noPermissionEdit'));
              return;
            }
            try {
              await updateTask(task.task_id, patch, currentUser);
            } catch (err) {
              tea.notify.error(errMsg(err));
            }
          }}
          agents={agents}
          teams={teams}
          currentUser={currentUser}
          participationByTask={participationByTask}
          />
        </>
      )}

      {showCreate && activeTeam && (
        // team 由右上角全局 TeamSwitcher 决定，dialog 里不再让用户选；
        // 这里 activeTeam 必为非空，因为上面 !activeTeamId 分支已经走 EmptyTeam 了
        <TaskCreateDialog
          team={{ team_id: activeTeam.team_id, name: activeTeam.name }}
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

// ============= Sub views =============

function EmptyTeam() {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Body className="_memory-workbench-empty-card">
        <Text theme="strong" className="_memory-workbench-empty-title">{t('task.emptyTeam.title')}</Text>
        <Text theme="weak" className="_memory-workbench-empty-desc">
          {t('task.emptyTeam.desc')}
        </Text>
      </Card.Body>
    </Card>
  );
}

function BoardView({
  tasks,
  tasksLoading,
  tasksTotal,
  currentPage,
  setCurrentPage,
  pageSize,
  selected,
  onSelect,
  onCreate,
  onDelete,
  onUpdateStatus,
  onUpdateTask,
  agents,
  teams,
  currentUser,
  participationByTask,
}: {
  tasks: Task[];
  tasksLoading: boolean;
  tasksTotal: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  selected: Task | null;
  onSelect: (id: string | null) => void;
  onCreate: () => void;
  onDelete: (task: Task) => void;
  onUpdateStatus: (task: Task, status: Task['status']) => void;
  onUpdateTask: (task: Task, patch: Partial<Pick<Task, 'title' | 'description' | 'source_type' | 'source_url' | 'linked_agents'>>) => void;
  agents: AgentOption[];
  teams: Team[];
  currentUser: string;
  participationByTask: Map<string, TaskParticipationView>;
}) {
  const { t } = useTranslation();
  const statusLabels = useStatusLabels();
  const selectedTeam = selected ? teams.find((x) => x.team_id === selected.team_id) ?? null : null;

  // 后端分页：useTasks 已只返回当前页数据，不需要前端切片
  const totalPages = Math.max(1, Math.ceil(tasksTotal / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedTasks = tasks;
  return (
    <div className="_memory-panel-card">
      {/* 头部：复用 members / agents 的 Section 通用头部（标题 + 计数 Tag + 副标题 + 右侧操作） */}
      <div className="_memory-section-header">
        <div className="_memory-section-header-info">
          <div className="_memory-section-header-title-row">
            <div className="_memory-section-title">{t('task.list.title')}</div>
            <Tag size="sm">{t('task.list.count', { count: tasksTotal })}</Tag>
          </div>
          <div className="_memory-section-subtitle">{t('task.list.subtitle')}</div>
        </div>
        <Button type="primary" onClick={onCreate}>
          <AddIcon size={14} />
          {t('task.create')}
        </Button>
      </div>

      {tasksLoading && tasks.length === 0 ? (
        // 首屏加载骨架屏：6 个占位卡片 + shimmer 动画
        <div className="_memory-workbench-skeleton-grid" aria-label="loading">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="_memory-workbench-skeleton-card">
              <div className="_memory-workbench-skeleton-line _memory-workbench-skeleton-line--title" />
              <div className="_memory-workbench-skeleton-line _memory-workbench-skeleton-line--desc" />
              <div className="_memory-workbench-skeleton-line _memory-workbench-skeleton-line--meta" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="_memory-workbench-list-empty">
          <Text theme="weak">{t('task.empty')}</Text>
        </div>
      ) : (
        <div className="_memory-workbench-task-grid">
          {pagedTasks.map((task) => {
            const view = participationOf(participationByTask, task.task_id);
            const imParticipant = view.users.includes(currentUser);
            const agentNameById = new Map(agents.map((a) => [a.id, a.name]));
            const agentLabels = view.agentIds.map((id) => agentNameById.get(id) ?? id);
            return (
              <button
                type="button"
                key={task.task_id}
                className="_memory-workbench-task-card"
                onClick={() => onSelect(task.task_id)}
              >
                {/* 标题行：状态 pill + 标题 + 箭头 */}
                <div className="_memory-workbench-task-card-head">
                  <span className={`_memory-workbench-status-pill _memory-workbench-status-pill--${task.status}`}>
                    {statusLabels[task.status]}
                  </span>
                  <span className="_memory-workbench-task-card-title" title={task.title}>{task.title}</span>
                  <ChevronRightIcon size={14} className="_memory-workbench-task-card-chevron" />
                </div>

                {/* 描述 */}
                {task.description && (
                  <p className="_memory-workbench-task-card-desc">{task.description}</p>
                )}

                {/* 元信息行：参与者 · Agent · 时间 */}
                <div className="_memory-workbench-task-card-meta">
                  <span
                    className="_memory-workbench-meta-item"
                    title={view.users.length === 0 ? t('task.participants.empty') : t('task.participants.tooltip', { users: view.users.join('\n') })}
                  >
                    <UsergroupIcon size={12} />
                    {t('task.peopleCount', { count: view.users.length })}
                    {imParticipant && <span className="_memory-workbench-meta-you">{t('common.you2')}</span>}
                  </span>
                  <span
                    className="_memory-workbench-meta-item"
                    title={agentLabels.length === 0 ? t('task.agents.empty') : t('task.agents.tooltip', { agents: agentLabels.join('\n') })}
                  >
                    {t('task.agentCount', { count: agentLabels.length })}
                  </span>
                  <span className="_memory-workbench-task-card-time">
                    {new Date(task.updated_at_ms).toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 分页：超过 1 页才展示 */}
      {totalPages > 1 && (
        <div className="_memory-workbench-pagination">
          <Pagination
            pageIndex={safePage}
            pageSize={pageSize}
            recordCount={tasksTotal}
            pageSizeVisible={false}
            onPagingChange={(query) => {
              if (query.pageIndex) setCurrentPage(query.pageIndex);
            }}
          />
        </div>
      )}

      {/* 详情抽屉：设置（状态 / 编辑 / 删除）都在抽屉内完成 */}
      <Drawer
        visible={!!selected}
        size="l"
        onClose={() => onSelect(null)}
        title={selected?.title}
        subtitle={selected && (
          <span className="_memory-workbench-drawer-subtitle">
            <span className="_memory-mono">{selected.task_id}</span>
            {selectedTeam && (
              <>
                <span className="_memory-workbench-meta-sep">·</span>
                {selectedTeam.name}
              </>
            )}
          </span>
        )}
        destroyOnClose
      >
        {selected && (
          <TaskDetail
            task={selected}
            onUpdateStatus={(s) => onUpdateStatus(selected, s)}
            onUpdateTask={(patch) => onUpdateTask(selected, patch)}
            onDelete={() => onDelete(selected)}
            canDelete={canDeleteTask(selected, selectedTeam, currentUser)}
            agents={agents}
            team={selectedTeam}
            currentUser={currentUser}
            participation={participationOf(participationByTask, selected.task_id)}
          />
        )}
      </Drawer>
    </div>
  );
}

function TaskDetail({
  task,
  onUpdateStatus,
  onUpdateTask,
  onDelete,
  canDelete,
  agents,
  team,
  currentUser,
  participation,
}: {
  task: Task;
  onUpdateStatus: (s: Task['status']) => void;
  onUpdateTask: (patch: Partial<Pick<Task, 'title' | 'description' | 'source_type' | 'source_url' | 'linked_agents'>>) => void;
  /** 删除当前 task（权限校验与二次确认由外层统一处理） */
  onDelete: () => void;
  canDelete: boolean;
  agents: AgentOption[];
  /** 当前 task 所属 team — 可能为 null（理论上不会，但 team 被删除场景需兜底） */
  team: Team | null;
  currentUser: string;
  /** 从 useTeamParticipation 分桶后传下来的当前 task 观测数据 */
  participation: TaskParticipationView;
}) {
  const { t } = useTranslation();
  const statusLabels = useStatusLabels();
  // PRD §10：编辑权限。team 内任意 member 可改 task（含切换 status）。
  const canEdit = canEditTask(task, team, currentUser);

  // —— 编辑态：只在用户点「编辑」后才进入；草稿独立维护，取消即丢弃 —— //
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDesc, setDraftDesc] = useState(task.description);

  // 切换 task / 退出编辑时同步草稿（避免编辑 A 后切换到 B 草稿还停在 A）
  useEffect(() => {
    setEditing(false);
    setDraftTitle(task.title);
    setDraftDesc(task.description);
  }, [task.task_id]);

  function startEdit() {
    setDraftTitle(task.title);
    setDraftDesc(task.description);
    setEditing(true);
  }
  function cancelEdit() {
    setEditing(false);
  }
  function saveEdit() {
    const patch: Partial<Pick<Task, 'title' | 'description' | 'source_type' | 'source_url' | 'linked_agents'>> = {};
    const title = draftTitle.trim();
    if (title.length === 0) {
      tea.notify.warning(t('task.titleRequired'));
      return;
    }
    if (title !== task.title) patch.title = title;
    if (draftDesc !== task.description) patch.description = draftDesc;

    if (Object.keys(patch).length === 0) {
      setEditing(false);
      return;
    }
    onUpdateTask(patch);
    setEditing(false);
  }

  // 参与者展示：creator 单列独立；其余进 "参与的 User"。
  // 数据源统一走 participation-log 观测 —— proxy session init 完成时 append 的
  // "实际起过 session 的 user"。creator 用自己的 agent 开工也算一次真实参与，
  // 所以不再过滤 creator（会同时出现在"创建者"和"参与的 User"两处，语义不同）。
  const participantUsers = participation.users;

  // 「实际参与 Agent」：session 观测到的 agent，映射到 team 的 agent name；
  // 未在 team agents 列表里的（比如已被删除）保留 agent_id 兜底展示。
  const sessionAgents = useMemo(() => {
    const nameById = new Map(agents.map((a) => [a.id, a.name]));
    return participation.agentIds.map((id) => ({ id, name: nameById.get(id) ?? id }));
  }, [participation.agentIds, agents]);

  return (
    <div className="_memory-workbench-detail-content">
      {/* === 工具行：编辑 + 状态切换（标题 / task_id / team 已在抽屉头部展示） === */}
      <div className="_memory-workbench-detail-toolbar">
        {editing ? (
          <>
            <Input
              value={draftTitle}
              onChange={setDraftTitle}
              placeholder={t('task.titlePlaceholder')}
              size="full"
              className="_memory-workbench-title-input"
            />
            <Button onClick={cancelEdit}>{t('common.cancel')}</Button>
            <Button type="primary" onClick={saveEdit}>{t('task.save')}</Button>
          </>
        ) : (
          <>
            {canEdit && (
              <Button type="text" onClick={startEdit} tooltip={t('task.edit.tooltip')}>
                <EditIcon size={14} />
                {t('task.edit')}
              </Button>
            )}
            <Segment
              value={task.status}
              onChange={(v) => onUpdateStatus(v as Task['status'])}
              disabled={!canEdit}
              options={(Object.keys(statusLabels) as Task['status'][]).map((s) => ({
                value: s,
                text: statusLabels[s],
              }))}
            />
          </>
        )}
      </div>

      {/* === 参与者 === */}
      <div className="_memory-workbench-people">
        <div className="_memory-workbench-people-row">
          <Text theme="weak" className="_memory-workbench-people-label">{t('task.creator')}</Text>
          <span
            className="_memory-workbench-chip"
            title={t('task.creator.tooltip')}
          >
            <UserIcon size={12} />
            <Text theme="text">{task.creator_user_id}</Text>
            {task.creator_user_id === currentUser && <span className="_memory-workbench-chip-you">{t('common.you.short')}</span>}
          </span>
        </div>
        <div className="_memory-workbench-people-row">
          <Text theme="weak" className="_memory-workbench-people-label">{t('task.participantUsers')}</Text>
          {participantUsers.length === 0 ? (
            <Text theme="weak">—</Text>
          ) : (
            participantUsers.map((u) => (
              <span
                key={u}
                className="_memory-workbench-chip"
                title={t('task.participantUsers.tooltip')}
              >
                <UserIcon size={12} />
                <Text theme="text">{u}</Text>
                {u === currentUser && <span className="_memory-workbench-chip-you">{t('common.you.short')}</span>}
              </span>
            ))
          )}
        </div>
        <div className="_memory-workbench-people-row">
          <Text theme="weak" className="_memory-workbench-people-label">{t('task.sessionAgents')}</Text>
          {sessionAgents.length === 0 ? (
            <Text theme="weak">—</Text>
          ) : (
            sessionAgents.map((a) => (
              <span
                key={a.id}
                className="_memory-workbench-chip"
                title={t('task.sessionAgents.tooltip', { id: a.id })}
              >
                <UsergroupIcon size={12} />
                <Text theme="text">{a.name}</Text>
              </span>
            ))
          )}
        </div>
      </div>

      {/* === 描述 === */}
      <div className="_memory-workbench-block">
        <Text theme="label" className="_memory-workbench-block-label">{t('task.description')}</Text>
        {editing ? (
          <Input.TextArea
            value={draftDesc}
            onChange={setDraftDesc}
            rows={6}
            size="full"
            placeholder={t('task.descriptionPlaceholder')}
          />
        ) : (
          <div className="_memory-workbench-desc-view">{task.description}</div>
        )}
      </div>

      <Text theme="weak" className="_memory-workbench-footer">
        {t('task.footer', { created: new Date(task.created_at_ms).toLocaleString(), updated: new Date(task.updated_at_ms).toLocaleString() })}
      </Text>

      {/* === 危险操作 === */}
      {canDelete && (
        <div className="_memory-workbench-danger">
          <Button type="error" onClick={onDelete}>
            <DeleteIcon size={12} /> {t('task.delete.okText')}
          </Button>
        </div>
      )}
    </div>
  );
}
