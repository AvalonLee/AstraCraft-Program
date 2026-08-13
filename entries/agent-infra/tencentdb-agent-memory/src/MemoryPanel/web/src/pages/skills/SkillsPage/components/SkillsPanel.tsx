/**
 * SkillsPanel — single tab in the App-level top-nav. Shows the team's
 * skill library across two lenses and offers three write actions:
 * import / allocate / fork.
 *
 * Tab semantics（PRD 演示版，2026-06 简化）：
 *   - team   ＝ 当前 team 内所有 agent 的固定资产并集（按 name 去重）；
 *              用户视角是"团队拥有的所有 skill"，数据上去掉了独立的「浮动池」概念。
 *   - fixed  ＝ 单个 agent 的固定资产（按 agent_id 隔离）。
 *
 * 写操作：
 *   - 导入  → 仅在 fixed tab 下可用，落到当前选中的 agent。
 *   - 分配  → team tab 下选中一条 skill 后可用。后端走 team_to_agent 引用，
 *            被分配的 agent 拿到的是「只读」副本（共享 SKILL.md，编辑会动到团队版）。
 *   - Fork → team tab 下选中一条 skill 后可用。前端拼装 `fetchSkillFull → importSkill`，
 *            以 `<原名>-fork-<agentId>` 落新副本，agent 拿到的是独立可写副本。
 *
 * 权限模型（2026-06 新增）：
 *   - admin 用户：全部可见 + 全部可操作
 *   - skill owner：可编辑自己的 skill；可选择是否让其他人可见
 *   - 其他人：只能看到 owner 设为可见的 skill（可见 = 可复制 + 只读使用）
 *
 * Refresh strategy: poll on tab change + after every write action. No
 * setInterval — skill mutations are user-driven, the auto-refresh cost
 * is not worth it.
 */

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { assetsApi, agentsApi, type Asset } from '@/lib/teamApi';
import { listSkills, getSkill, deleteSkillV3, type SkillSummary } from '@/lib/skill-api';
import { getPanelSession } from '@/lib/panelSession';
import { useTeams } from '@/services';
import { useSkillDetailCache } from '@/services/use-skill-detail-cache';
import { useUserDisplayName } from '@/services/user-profile-store';
import { Select, Button, Text, Segment, Card, List } from 'tea-component';
import { LockOnIcon, ShareIcon, AppIcon, UserIcon, DeleteIcon } from 'tea-icons-react';
import { tea } from '@/lib/tea-bridge';
import { AssetPageHeader } from '@/pages/ResourcePage/components/AssetPageHeader';
import { AssetSplitLayout } from '@/pages/ResourcePage/components/AssetSplitLayout';
import {
  AssetListPanel,
  AssetItemHeader,
  AssetItemName,
  AssetItemDesc,
  AssetItemBadges,
  AssetBadge,
  AssetBadgeYou,
  AssetItemMeta,
  AssetItemTime,
} from '@/pages/ResourcePage/components/AssetListPanel';
import SkillDetailPane from './SkillDetailPane';
import ImportSkillDialog from './ImportSkillDialog';

import ForkSkillDialog from './ForkSkillDialog';
import './skills-list.css';

type Tab = 'team' | 'fixed' | 'personal';

const TAB_I18N_KEY: Record<Tab, string> = {
  team: 'skills.scope.team',
  fixed: 'skills.scope.fixed',
  personal: 'skills.scope.personal',
};

/** 统一 Skill 列表的用户归属指示：使用公共 AssetBadge 组件。 */
function SkillOwnerTag({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) {
  const { t } = useTranslation();
  const displayName = useUserDisplayName(userId);
  return (
    <AssetBadge icon={<UserIcon size={10} />} title={t('skills.ownerTag.title', { name: displayName || userId, id: userId })}>
      {displayName || userId}
      {isCurrentUser && <AssetBadgeYou>{t('skills.ownerTag.you')}</AssetBadgeYou>}
    </AssetBadge>
  );
}

export default function SkillsPanel({
  currentUser,
  isAdmin: _isAdmin,
}: {
  currentUser: string;
  isAdmin: boolean;
}) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('team');
  const { activeTeamId, activeTeam } = useTeams();
  const myUserId = getPanelSession()?.user?.user_id ?? '';
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [skills, setSkills] = useState<SkillSummary[]>([]);

  // team 内 agent 数据 —— 一次全量拉取，前端派生两份，避免之前分别为
  // 「name 映射（全量）」和「我 owner 的 agent（fixed 下拉）」发两次 agent/list：
  //   - agentNameMap：team 内**全部** agent 的 id→name（团队资产里会出现别人
  //     agent 的 skill，需要能显示归属 agent 名）。
  //   - teamAgents：前端按 owner_user_id === myUserId 过滤出**我 owner 的 agent**
  //     （fixed tab 下拉 / 导入 / fork 用；agent 私有可见性语义）。
  const [teamAgents, setTeamAgents] = useState<Array<{ id: string; name: string }>>([]);
  const [agentNameMap, setAgentNameMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    if (!activeTeamId) {
      setAgentNameMap({});
      setTeamAgents([]);
      return () => { cancelled = true; };
    }
    agentsApi
      .list(activeTeamId)
      .then((agents) => {
        if (cancelled) return;
        setAgentNameMap(Object.fromEntries(agents.map((a) => [a.agent_id, a.name])));
        setTeamAgents(
          agents
            .filter((a) => !!myUserId && a.owner_user_id === myUserId)
            .map((a) => ({ id: a.agent_id, name: a.name })),
        );
      })
      .catch((err) => {
        if (cancelled) return;
        // agent 加载失败不致命（列表 fallback 显示 agent_id），但仍给出提示。
        tea.notify.error(err?.message || t('skills.notify.loadAgentsFailed'));
        setAgentNameMap({});
        setTeamAgents([]);
      });
    return () => { cancelled = true; };
  }, [activeTeamId, myUserId]);

  const [loading, setLoading] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [showFork, setShowFork] = useState(false);
  // personal tab 选中的 asset：保存整条（用于 Fork 需要 name），而非仅 id。
  // 由 PersonalAssetTab 通过 onSelectAsset 上抛。
  const [selectedPersonalAsset, setSelectedPersonalAsset] = useState<Asset | null>(null);
  // 触发 PersonalAssetTab 内部重新拉数据（fork / 删除完成后）。
  const [personalRefreshKey, setPersonalRefreshKey] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);
  // team tab 下每条 skill 的 visibility（从 meta_assets 拿），列表徽章展示用。
  // key = skill_id（=asset_id）。fixed tab 不填。
  const [visibilityMap, setVisibilityMap] = useState<Record<string, Asset['visibility']>>({});

  // ── 按需 skill 详情缓存 ──
  // team tab 列表数据源是 asset/list-accessible，不含 skill 数据面的
  // version / owner_agent_id；不再对每条 skill 并发 N 次 getSkill()，
  // 改为用户选中后才按需拉取并写入此缓存。
  const { applyCachedDetail, preload: preloadSkillDetail, cacheVersion } = useSkillDetailCache(activeTeamId);

  // 对 skills 列表应用缓存：已拉过的 skill 更新为真实 version / owner_agent_id。
  const skillsWithCache = useMemo(
    () => skills.map((s) => applyCachedDetail(s)),
    [skills, cacheVersion],
  );

  // 选中某条 skill 时按需预拉其数据面详情（幂等，已缓存则跳过）。
  useEffect(() => {
    if (selectedSkillId) void preloadSkillDetail(selectedSkillId);
  }, [selectedSkillId, preloadSkillDetail]);

  // 列表加载后后台预取所有可见项的数据面详情（version / owner_agent_id），
  // 避免用户点击时才突然冒出 Agent 徽章。preload 幂等 + 去重，不会重复请求。
  useEffect(() => {
    if (skills.length === 0) return;
    for (const s of skills) {
      void preloadSkillDetail(s.skill_id);
    }
  }, [skills, preloadSkillDetail]);

  // ============================
  // Data fetching
  // ============================

  // 请求序号防竞态：快速切换 tab/agent 时，先发的请求可能后返回，
  // 旧 tab 的数据会覆盖新 tab 的数据。
  const refreshSeqRef = useRef(0);

  const refresh = useCallback(async () => {
    if (!activeTeamId) {
      setSkills([]);
      setVisibilityMap({});
      return;
    }
    // personal tab（我的资产分配）由独立的 PersonalAssetTab 组件自行加载数据，
    // 父组件的 skills 列表在该 tab 不渲染。这里直接短路，避免误走下面的 fixed
    // 分支白发 listSkills + list-accessible 两个无用请求。
    if (tab === 'personal') {
      setSkills([]);
      setVisibilityMap({});
      return;
    }
    const seq = ++refreshSeqRef.current;
    setLoading(true);
    // 立即清空旧数据 —— 否则切 tab 时会先看到上一个 tab 的列表，
    // 新数据到了才突然替换，视觉上就是"闪一下"。
    setSkills([]);
    setVisibilityMap({});
    try {
      if (tab === 'team') {
        // 团队资产 tab 语义：**只显示共享的（visibility=team） skill**，
        // 私密 skill（包括自己 owner 的）都不出现在这里。自己的私密去
        // "我的资产分配" tab 查看和管理。
        //
        // 数据源（服务端严格过滤，抓包也拿不到不该看的）：
        //   asset/list-accessible + visibility='team'
        //     → 内核 SQL 层直接过滤 private，HTTP 响应体里根本不包含别人的
        //       private，也不包含自己的 private，安全。
        //
        // 为什么不调 skill/list：
        //   数据面 skill/list 没有 visibility 概念，会把别人的 private 一并
        //   返回（虽然内核 permission-checker 后续会拦截读取，但列表响应
        //   仍会带回 name/owner 等元信息，前端过滤 = 数据已泄露）。
        //
        // 按需加载 version / owner_agent_id：
        //   asset 表无这两个字段；旧实现在此处对每条 skill 并发 N 次
        //   getSkill()（N+1），用户还没点开任何一条就把全部详情拉回来。
        //   现在先用 asset 默认值渲染，version/owner_agent_id 等用户选中
        //   后才由 useSkillDetailCache 按需拉取并写入缓存。
        const accessible = await assetsApi.listAccessible(activeTeamId, {
          asset_type: 'skill',
          action: 'read',
          visibility: 'team',
        });
        if (seq !== refreshSeqRef.current) return; // 已被后续请求取代
        const visMap: Record<string, Asset['visibility']> = {};
        for (const a of accessible) visMap[a.asset_id] = a.visibility;
        const toMs = (iso: string): number => new Date(iso).getTime();
        const items: SkillSummary[] = accessible.map((a) => ({
          skill_id: a.asset_id,
          name: a.name,
          description: a.description ?? '',
          version: a.version ?? 1,
          is_head: true,
          status: a.status === 'archived' ? 'archived' : 'active',
          owner_user_id: a.owner_user_id,
          owner_agent_id: '',
          team_id: a.team_id,
          task_id: '',
          created_at_ms: toMs(a.created_at),
          updated_at_ms: toMs(a.updated_at),
        })) as SkillSummary[];
        // 不再额外等待；直接用 asset 默认值渲染，缓存命中后自动更新。
        setSkills(items);
        setVisibilityMap(visMap);
      } else {
        // 固定资产 = 指定 agent 拥有（owner）的 skill；这一 tab 侧重"某 agent 装备了什么"，
        // 由 owner 权限判定即可，不再叠加 visibility 过滤（agent owner 一定能看到自己的 skill）。
        const list: SkillSummary[] = selectedAgent
          ? (
              await listSkills({
                team_id: activeTeamId,
                filters: { owner_agent_id: selectedAgent, status: ['active'] },
                pagination: { limit: 200 },
              })
            ).items
          : [];
        if (seq !== refreshSeqRef.current) return; // 已被后续请求取代
        setSkills(list);
        // fixed tab 同时也拉一下 visibility 做徽章展示（尽力而为，失败静默）
        if (list.length > 0) {
          try {
            const all = await assetsApi.listAccessible(activeTeamId, { asset_type: 'skill', action: 'read' });
            if (seq !== refreshSeqRef.current) return;
            const vm: Record<string, Asset['visibility']> = {};
            for (const a of all) vm[a.asset_id] = a.visibility;
            setVisibilityMap(vm);
          } catch { setVisibilityMap({}); }
        } else {
          setVisibilityMap({});
        }
      }
    } catch (err) {
      if (seq !== refreshSeqRef.current) return;
      tea.notify.error(err);
      setSkills([]);
      setVisibilityMap({});
    } finally {
      if (seq === refreshSeqRef.current) setLoading(false);
    }
  }, [tab, selectedAgent, activeTeamId]);

  // 同步 selectedAgent 到 teamAgents：
  //   - 切换 team 后，老 selectedAgent 可能已不在新 team 内，需要重置；
  //   - 首次渲染时也要给 selectedAgent 一个默认值。
  useEffect(() => {
    if (teamAgents.length === 0) {
      if (selectedAgent) setSelectedAgent('');
      return;
    }
    if (!selectedAgent || !teamAgents.some((a) => a.id === selectedAgent)) {
      setSelectedAgent(teamAgents[0].id);
    }
  }, [teamAgents, selectedAgent]);

  // 触发 refresh：依赖原始参数 + refresh，并用 key 去重防止短时间内重复触发。
  // 之前直接 `useEffect(() => refresh(), [refresh])` 会因 refresh 引用变化
  // （selectedAgent 等依赖异步同步）触发多次，导致 asset/list-accessible 等接口被反复请求。
  const fetchKeyRef = useRef<string>('');
  useEffect(() => {
    // personal tab 不触发父组件 refresh（数据由 PersonalAssetTab 独立加载）。
    // 仍推进 fetchKeyRef，确保之后切回 team/fixed 时 key 变化能正常触发刷新。
    if (tab === 'personal') {
      fetchKeyRef.current = `${activeTeamId}|personal`;
      return;
    }
    // key 中只有 fixed tab 才纳入 selectedAgent —— team tab 的数据源
    // asset/list-accessible 与选中 agent 无关。若把 selectedAgent 纳入 team 的 key，
    // teamAgents 异步加载完后 selectedAgent 会从 '' 变成首个 agent，导致 key 变化、
    // 再触发一次**完全重复**的 list-accessible（进页面即多打一次接口）。
    const key = tab === 'fixed'
      ? `${activeTeamId}|${tab}|${selectedAgent}`
      : `${activeTeamId}|${tab}`;
    if (fetchKeyRef.current === key) return;
    fetchKeyRef.current = key;
    void refresh();
  }, [activeTeamId, tab, selectedAgent, refresh]);

  // Reset selection when the underlying list changes.
  useEffect(() => {
    if (selectedSkillId && !skillsWithCache.find((s) => s.skill_id === selectedSkillId)) {
      setSelectedSkillId(null);
    }
  }, [skillsWithCache, selectedSkillId]);

  const selectedSkill = useMemo(
    () => (selectedSkillId ? skillsWithCache.find((s) => s.skill_id === selectedSkillId) ?? null : null),
    [selectedSkillId, skillsWithCache]
  );




  // ============================
  // Delete handler
  // ============================

  const handleDelete = useCallback(async (skill: SkillSummary) => {
    if (!activeTeamId) return;
    setDeleteLoading(true);
    try {
      // 数据面软删除需要 owner_agent_id + expected_version 乐观锁。
      // 团队 tab 数据源来自 asset/list-accessible，那份数据没有 owner_agent_id
      // 和 version（asset 表无这两字段），列表里 skill.owner_agent_id 会是 ''。
      // 这里按需再拉一次 skill/get 补齐。
      let ownerAgentId = skill.owner_agent_id;
      let version = skill.version;
      if (!ownerAgentId) {
        const full = await getSkill({
          skill_id: skill.skill_id,
          team_id: activeTeamId,
          include_content: false,
          include_manifest: false,
        });
        ownerAgentId = full.owner_agent_id;
        version = full.version;
      }
      await deleteSkillV3({
        user_id: myUserId,
        team_id: activeTeamId,
        agent_id: ownerAgentId,
        skill_id: skill.skill_id,
        expected_version: version,
      });
      if (selectedSkillId === skill.skill_id) {
        setSelectedSkillId(null);
      }
      tea.notify.success(t('skills.notify.deleted', { name: skill.name }));
      void refresh();
    } catch (err) {
      tea.notify.error(err);
    } finally {
      setDeleteLoading(false);
    }
  }, [selectedSkillId, refresh, activeTeamId, myUserId]);

  // ============================
  // Render
  // ============================

  return (
    <div className="_memory-skills-body">
      {/* 固定资产的 Agent 选择器与 Code 页 "Agent 资产" 选项栏保持相同呈现。 */}
      <AssetPageHeader
        title={t('skills.title')}
        subtitle={activeTeam
          ? (tab === 'personal'
              ? t('skills.subtitle.teamPersonal', { name: activeTeam.name, count: skills.length })
              : t('skills.subtitle.team', { name: activeTeam.name, count: skills.length }))
          : (tab === 'personal'
              ? t('skills.subtitle.globalPersonal', { count: skills.length })
              : t('skills.subtitle.global', { count: skills.length }))}
        scope={(
          <Segment
            value={tab}
            onChange={(v) => setTab(v as Tab)}
            options={(['team', 'fixed', 'personal'] as Tab[]).map((t2) => ({ value: t2, text: t(TAB_I18N_KEY[t2]) }))}
          />
        )}
        agent={tab === 'fixed' ? (
          <Select
            appearance="button"
            matchButtonWidth
            value={selectedAgent}
            onChange={(value) => { setSelectedAgent(value); setSelectedSkillId(null); }}
            disabled={teamAgents.length === 0}
            placeholder={t('skills.noAgent')}
            options={teamAgents.map((agent) => ({ value: agent.id, text: `${agent.name}（${agent.id}）` }))}
          />
        ) : undefined}
        actions={(
          <>
            {(() => {
              const forkableInTeam = tab === 'team' && !!selectedSkillId;
              const forkableInPersonal = tab === 'personal' && !!selectedPersonalAsset;
              const canFork = forkableInTeam || forkableInPersonal;
              const tooltip = tab === 'fixed'
                ? t('skills.fork.tooltip.fixed')
                : tab === 'team'
                  ? (!selectedSkillId ? t('skills.fork.tooltip.team.empty') : undefined)
                  : (!selectedPersonalAsset ? t('skills.fork.tooltip.personal.empty') : undefined);
              return tab === 'fixed' ? null : (
                <Button onClick={() => setShowFork(true)} disabled={!canFork} tooltip={tooltip}>{t('skills.fork')}</Button>
              );
            })()}
            <Button
              type="primary"
              onClick={() => setShowImport(true)}
              disabled={teamAgents.length === 0}
              tooltip={teamAgents.length === 0 ? t('skills.import.tooltip.noAgent') : undefined}
            >
              {t('skills.import')}
            </Button>
          </>
        )}
      />

      {/* === 个人资产 Tab ===
          与「团队 / 固定」tab 使用同一套 12 栅格布局（左列表 5 / 右详情 7），
          保证切换 tab 时内容宽度对齐、不跳动。 */}
      {tab === 'personal' && (
      <div className="grid grid-cols-12 gap-3">
        <section className="col-span-12 lg:col-span-5">
          <PersonalAssetTab
            kind="skill"
            currentUser={currentUser}
            teamId={activeTeamId ?? ''}
            agentNameMap={agentNameMap}
            selectedAssetId={selectedPersonalAsset?.asset_id ?? null}
            onSelectAsset={setSelectedPersonalAsset}
            refreshKey={personalRefreshKey}
            preloadSkillDetail={preloadSkillDetail}
            applyCachedDetail={applyCachedDetail}
            cacheVersion={cacheVersion}
          />
        </section>
        <section className="col-span-12 lg:col-span-7">
          <SkillDetailPane
            skillName={selectedPersonalAsset?.name ?? null}
            skillId={selectedPersonalAsset?.asset_id}
          />
        </section>
      </div>
      )}

      {/* === 团队资产 / 固定资产 Tab === */}
      {tab !== 'personal' && (
      <AssetSplitLayout
        sidebar={
          <AssetListPanel
            title={
              <>
                {t(TAB_I18N_KEY[tab])}
                {tab === 'fixed' && selectedAgent && (
                  <span className="_alp-title-suffix"> · {agentNameMap[selectedAgent] ?? selectedAgent}</span>
                )}
              </>
            }
            count={t('skills.count', { count: skillsWithCache.length })}
            loading={loading}
            items={skillsWithCache}
            selectedId={selectedSkillId}
            getItemId={(s) => s.skill_id}
            onSelect={(s) => setSelectedSkillId(s.skill_id)}
            emptyText={
              tab === 'fixed' && !selectedAgent
                ? t('skills.empty.fixed.noAgent')
                : tab === 'fixed'
                  ? t('skills.empty.fixed.hasAgent', { agent: selectedAgent })
                  : t('skills.empty.team')
            }
            renderItem={(s) => {
              const ownerIsMe = !!myUserId && s.owner_user_id === myUserId;
              const canManage = ownerIsMe;
              const vis = visibilityMap[s.skill_id];
              const agentLabel = s.owner_agent_id
                ? agentNameMap[s.owner_agent_id] ?? s.owner_agent_id
                : '';
              return (
                <>
                  <AssetItemHeader>
                    <AssetItemName title={s.name}>{s.name}</AssetItemName>
                    {canManage && (
                      <Button
                        type="text"
                        tooltip={ownerIsMe ? t('skills.delete.own') : t('skills.delete.admin')}
                        className="_memory-skill-item-delete"
                        onClick={async (e: any) => {
                          e?.stopPropagation();
                          const ok = await tea.confirm({
                            message: t('skills.delete.confirm', { name: s.name }),
                            description: t('skills.delete.confirm.desc'),
                            okText: t('skills.delete.okText'),
                            cancelText: t('skills.delete.cancelText'),
                          });
                          if (ok) {
                            void handleDelete(s);
                          }
                        }}
                        disabled={deleteLoading}
                      >
                        <DeleteIcon size={14} />
                      </Button>
                    )}
                  </AssetItemHeader>

                  {s.description && (
                    <AssetItemDesc>{s.description}</AssetItemDesc>
                  )}

                  {(vis || s.owner_agent_id || s.owner_user_id) && (
                    <AssetItemBadges>
                      {vis === 'private' && (
                        <AssetBadge icon={<LockOnIcon size={10} />}>{t('skills.tag.private')}</AssetBadge>
                      )}
                      {vis === 'team' && tab !== 'team' && (
                        <AssetBadge icon={<ShareIcon size={10} />}>{t('skills.tag.shared')}</AssetBadge>
                      )}
                      {vis && vis !== 'private' && vis !== 'team' && (
                        <AssetBadge>{vis}</AssetBadge>
                      )}
                      {s.owner_agent_id && (
                        <AssetBadge icon={<AppIcon size={10} />} title={t('skills.agentTag.title', { name: agentNameMap[s.owner_agent_id] ?? t('skills.agentTag.unknown'), id: s.owner_agent_id })}>
                          {agentLabel}
                        </AssetBadge>
                      )}
                      {s.owner_user_id && (
                        <SkillOwnerTag userId={s.owner_user_id} isCurrentUser={ownerIsMe} />
                      )}
                    </AssetItemBadges>
                  )}

                  <AssetItemMeta>
                    <span>v{s.version}</span>
                    <AssetItemTime>{new Date(s.updated_at_ms).toLocaleString()}</AssetItemTime>
                  </AssetItemMeta>
                </>
              );
            }}
          />
        }
        detail={
          <SkillDetailPane skillName={selectedSkill?.name ?? null} skillId={selectedSkill?.skill_id} />
        }
      />
      )}

      {/* Modals (only for team/fixed tabs) */}
      {showImport && (
        // 导入弹窗在 team / fixed 两个 tab 都能打开。
        // target 始终是 fixed —— 所有 skill 都归属于某个具体 agent。
        // agentId 仅在 fixed tab 下作为默认归属带入；team tab 下传 undefined，
        // 由弹窗内的「归属 Agent（必选）」下拉自行兜底选第一个。
        <ImportSkillDialog
          target="fixed"
          teamId={activeTeamId ?? ''}
          userId={myUserId}
          agents={teamAgents}
          agentId={tab === 'fixed' ? selectedAgent : undefined}
          onClose={() => setShowImport(false)}
          onImported={() => {
            // skill 建成功后，内核数据面 onSkillCreated 钩子会自动登记 asset
            // + 绑定为 owner agent 的 fixed-asset（visibility 默认 private）。
            // 前端不再需要额外调 localStorage 存"我的资产"—— 数据源已经是真后端。
            setShowImport(false);
            void refresh();
          }}
        />
      )}
      {showFork && (() => {
        // Fork 弹窗的 skillId/skillName 来源：
        //   - team tab：selectedSkill（列表来自 asset/list-accessible）
        //   - personal tab：selectedPersonalAsset（asset_id === skill_id）
        const source =
          tab === 'personal' && selectedPersonalAsset
            ? { skillId: selectedPersonalAsset.asset_id, skillName: selectedPersonalAsset.name }
            : selectedSkill
              ? { skillId: selectedSkill.skill_id, skillName: selectedSkill.name }
              : null;
        if (!source) return null;
        return (
          <ForkSkillDialog
            teamId={activeTeamId ?? ''}
            userId={myUserId}
            skillId={source.skillId}
            skillName={source.skillName}
            agents={teamAgents}
            onClose={() => setShowFork(false)}
            onForked={() => {
              setShowFork(false);
              // fork 出的新副本以 `<原名>-fork-<agentId>` 落库，会作为新条目出现
              if (tab === 'personal') {
                // personal tab 数据在子组件里，触发 refreshKey 让其重拉
                setPersonalRefreshKey((k) => k + 1);
              } else {
                void refresh();
              }
            }}
          />
        );
      })()}
    </div>
  );
}

// =================== PersonalAssetTab ===================
// "我的资产分配" tab — 展示**当前登录用户 owner 的全部真实资产**（不再走 localStorage 演示层）。
//
// 数据源：meta/asset/list?team_id=&asset_type=&owner_user_id=me
//   - "我的" = owner_user_id === currentUser，不做可见性过滤（我自己 owner 的哪怕设成 private 也能看到）
//   - "全部" = 不区分 visibility，共享/私密都列出来（用切换按钮区分状态）
//
// 写操作：
//   - 共享/私密切换  → asset/update { visibility: 'team' | 'private' }
//   - 删除          → skill/delete（数据面软归档）+ 钩子 meta asset/delete（物理删）
//
// 关键差异（对比之前的 localStorage 版本）：
//   - visibility 用后端真值：'team' = 共享；'private' = 私密（其它 restricted/agent/task 也归到"其他"标签）
//   - 删除会落库（skill 软归档 + meta 物理删），不再是 localStorage 层清
//   - "分配到 Agent" 按钮语义变化（见 SkillsPanel 顶部主按钮）：想让别人用，切"共享"或走精细授权

function PersonalAssetTab({
  kind,
  currentUser,
  teamId,
  agentNameMap,
  selectedAssetId,
  onSelectAsset,
  refreshKey,
  preloadSkillDetail,
  applyCachedDetail,
}: {
  kind: 'skill' | 'memory';
  currentUser: string;
  teamId: string;
  /** team 内全部 agent 的 id→name 映射（父组件已拉取），用于展示资产归属 agent 名。 */
  agentNameMap: Record<string, string>;
  /** 当前选中的资产 id（由父组件管理，用于顶部"分配到 Agent / Fork"按钮） */
  selectedAssetId?: string | null;
  /** 选中某条资产的回调；传 null 表示取消选中。父组件保存整条 Asset 以便读取 name/asset_id 等字段。 */
  onSelectAsset?: (asset: Asset | null) => void;
  /** 父组件在 fork / 外部操作完成后 +1，触发本组件重新拉取。 */
  refreshKey?: number;
  /** 按需预拉一条 skill 的数据面详情（幂等，已缓存则跳过）。 */
  preloadSkillDetail?: (skillId: string) => Promise<void>;
  /** 用缓存覆盖 skill 对象的 version / owner_agent_id。 */
  applyCachedDetail?: <T extends { skill_id: string; version: number; owner_agent_id: string }>(skill: T) => T;
  /** 缓存版本号：每次有新 skill 被缓存后 +1，触发本组件重渲染以读取最新值。 */
  cacheVersion?: number;
}) {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // asset 表没有 owner_agent_id（那是 skill 数据面字段），不再在此处并发 N 次
  // getSkill() 来补拉。渲染时直接走父组件传入的 applyCachedDetail，对已缓存（已选中过）
  // 的 asset 自动填充真实 owner_agent_id；未拉过的默认空，列表中只不显示归属 agent 标签。

  // 选中某个 asset 时，若为 skill 类型，预拉其数据面详情以便列表更新归属 agent 标签。
  useEffect(() => {
    if (kind === 'skill' && selectedAssetId && preloadSkillDetail) {
      void preloadSkillDetail(selectedAssetId);
    }
  }, [kind, selectedAssetId, preloadSkillDetail]);
  // 本 tab 只列 currentUser 自己 owner 的资产，user 标识固定是"我"。
  // 展示名直接从 panelSession（auth/verify 已返回）取，不再额外调 meta/user/get。
  const currentUserName =
    getPanelSession()?.user?.display_name
    || getPanelSession()?.user?.username
    || currentUser;

  // memory 类型暂时仍走 localStorage 演示（后端没有独立的 memory 资产管控入口）
  // skill 类型走真后端 meta/asset/list
  const assetType = kind === 'skill' ? 'skill' : 'chat_memory';

  const refresh = useCallback(async () => {
    if (!teamId || !currentUser) {
      setAssets([]);
      return;
    }
    setLoading(true);
    try {
      const items = await assetsApi.list(teamId, {
        asset_type: assetType,
        owner_user_id: currentUser,
      });
      // 后端 asset/list 已按 status 过滤 archived 需要显式传，这里前端再兜底过滤一次
      const visible = items.filter((a) => a.status !== 'archived');
      setAssets(visible);
      // owner_agent_id 不再在此处并发 N 次 getSkill() 补拉；渲染时走父组件
      // 传入的 applyCachedDetail 获取已缓存（已选中过）的值。
    } catch (err) {
      tea.notify.error(err);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, [teamId, currentUser, assetType]);

  useEffect(() => { void refresh(); }, [refresh, refreshKey]);

  async function handleSetScope(asset: Asset, scope: 'team' | 'private') {
    if (asset.visibility === scope) return;
    setBusyId(asset.asset_id);
    try {
      await assetsApi.update(asset.asset_id, { visibility: scope });
      // 局部更新，避免整个列表 flicker
      setAssets((prev) => prev.map((a) => (a.asset_id === asset.asset_id ? { ...a, visibility: scope } : a)));
    } catch (err) {
      tea.notify.error(err);
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(asset: Asset) {
    // 二次确认：明确告知"彻底删除"语义与影响范围，避免误操作。
    // Skill 数据面为软归档；meta asset 经钩子物理删除。前端按"彻底删除"描述。
    // Skill 按 owner_agent_id 独立 —— 删除只影响其所属 Agent，其他 Agent 的独立副本不受影响。
    const ok = await tea.confirm({
      message: t('skills.personal.delete.confirm', { name: asset.name }),
      description: t('skills.personal.delete.confirm.desc'),
      okText: t('skills.personal.delete.okText'),
      cancelText: t('skills.personal.delete.cancelText'),
    });
    if (!ok) return;
    setBusyId(asset.asset_id);
    try {
      if (kind === 'skill') {
        // 修复：之前直接调 meta/asset/delete 只归档了 asset 表，skill 表
        // 还留着 → 用户会看到 "团队/固定" tab 里 skill 消失了但 asset 卡片
        // 也消失了；反之如果只走 meta 层，那 skill 本身还在，会污染
        // 「团队资产 / 固定资产」列表。
        //
        // 正确路径：走数据面 skill/delete。内核在 skill 归档钩子
        // (server.ts:onSkillArchived) 里会级联 svc.deleteAssets([skill_id])，
        // 一次调用把 skill + asset 双端都归档，行为与「团队资产」tab 的
        // 删除按钮完全一致。
        //
        // 唯一代价：Asset 上没有 owner_agent_id / version（那两个字段在
        // skill 表），需要额外拉一次 skill/get 补齐，参考 SkillsPanel.handleDelete。
        const full = await getSkill({
          skill_id: asset.asset_id, // 约定 asset_id === skill_id
          team_id: teamId,
          include_content: false,
          include_manifest: false,
        });
        await deleteSkillV3({
          user_id: currentUser,
          team_id: teamId,
          agent_id: full.owner_agent_id,
          skill_id: asset.asset_id,
          expected_version: full.version,
        });
      } else {
        // memory / chat_memory 类型没有对应的数据面 delete 接口，继续走
        // meta/asset/delete 进行软归档。当前 SkillsPage 场景固定 kind='skill'，
        // 该分支实际不会走到，保留兜底以便未来复用本组件。
        await assetsApi.delete(asset.asset_id);
      }
      setAssets((prev) => prev.filter((a) => a.asset_id !== asset.asset_id));
      if (selectedAssetId === asset.asset_id) onSelectAsset?.(null);
      tea.notify.success(t('skills.personal.notify.deleted', { name: asset.name }));
    } catch (err) {
      tea.notify.error(err);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <Card>
      <Card.Body>
        {/* 顶部 */}
        <div className="_memory-personal-header">
          <Text theme="strong" parent="div">{t('skills.personal.title')}</Text>
          <Text theme="weak" parent="div" className="_memory-personal-header-desc">
            {t('skills.personal.desc')}
          </Text>
        </div>

        {loading ? (
          <div className="_memory-personal-empty">
            <Text theme="weak">{t('common.loading')}</Text>
          </div>
        ) : assets.length === 0 ? (
          <div className="_memory-personal-empty">
            <Text theme="weak" parent="div">
              {t('skills.personal.empty', { kind: kind === 'skill' ? t('skills.personal.kind.skill') : t('skills.personal.kind.memory') })}
            </Text>
          </div>
        ) : (
          <List split="divide" className="_memory-personal-items">
            {assets.map((asset) => {
              const isSelected = selectedAssetId === asset.asset_id;
              const isTeam = asset.visibility === 'team';
              const isPrivate = asset.visibility === 'private';
              const isBusy = busyId === asset.asset_id;
              // 归属 agent：本 tab 选中资产后按需预拉并缓存 owner_agent_id，
              // 命中缓存则展示归属 agent 徽章（与「团队/固定」tab 的徽章一致）。
              const cachedAgentId =
                kind === 'skill' && applyCachedDetail
                  ? applyCachedDetail({ skill_id: asset.asset_id, version: 0, owner_agent_id: '' }).owner_agent_id
                  : '';
              return (
                <List.Item
                  key={asset.asset_id}
                  selected={isSelected}
                  onClick={() => onSelectAsset?.(isSelected ? null : asset)}
                  className="_memory-personal-asset"
                >
                  {/* 名称 + 描述 + id + 归属徽章 */}
                  <div className="_memory-personal-asset-main">
                    <div className="_memory-personal-asset-name" title={asset.name}>{asset.name}</div>
                    {asset.description && (
                      <div className="_memory-personal-asset-desc" title={asset.description}>{asset.description}</div>
                    )}
                    <div className="_memory-personal-asset-id" title={asset.asset_id}>{asset.asset_id}</div>
                    <div className="_memory-personal-asset-badges">
                      {cachedAgentId && (
                        <span className="_skill-badge" title={t('skills.agentTag.title', { name: agentNameMap[cachedAgentId] ?? t('skills.agentTag.unknown'), id: cachedAgentId })}>
                          <AppIcon size={10} /> {agentNameMap[cachedAgentId] ?? cachedAgentId}
                        </span>
                      )}
                      {asset.owner_user_id && (
                        <span className="_skill-badge" title={t('skills.ownerTag.title', { name: currentUserName || asset.owner_user_id, id: asset.owner_user_id })}>
                          <UserIcon size={10} /> {currentUserName || asset.owner_user_id}
                          {asset.owner_user_id === currentUser && <span className="_skill-badge-you">{t('skills.ownerTag.you')}</span>}
                        </span>
                      )}
                      {!isTeam && !isPrivate && (
                        <span className="_skill-badge">{asset.visibility}</span>
                      )}
                    </div>
                  </div>

                  {/* 操作行：共享/私密切换 + 删除 */}
                  <div className="_memory-personal-asset-controls" onClick={(e) => e.stopPropagation()}>
                    <Segment
                      value={isTeam ? 'team' : 'private'}
                      onChange={(v) => void handleSetScope(asset, v as 'team' | 'private')}
                      disabled={isBusy}
                      options={[
                        { value: 'team', text: t('skills.personal.scope.shared') },
                        { value: 'private', text: t('skills.personal.scope.private') },
                      ]}
                    />
                    <Button type="text"
                      disabled={isBusy}
                      tooltip={t('skills.personal.delete.tooltip')}
                      className="_memory-personal-asset-delete"
                      onClick={(e: any) => {
                        e?.stopPropagation();
                        void handleDelete(asset);
                      }}
                    >
                      <DeleteIcon size={14} />
                    </Button>
                  </div>
                </List.Item>
              );
            })}
          </List>
        )}
      </Card.Body>
    </Card>
  );
}

export { PersonalAssetTab };
