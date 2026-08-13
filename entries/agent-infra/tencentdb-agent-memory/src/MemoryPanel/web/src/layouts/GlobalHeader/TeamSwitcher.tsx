/**
 * TeamSwitcher — 全局顶栏内嵌的 Team 切换器
 *
 * 从侧边栏迁移到顶栏后的行内 pill 样式版本：使用 Tea `Dropdown` 承载弹出面板
 * （自带定位、遮罩点击关闭、滚动关闭等能力），面板内部用 `List`/`Input`/`Button` 组装。
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, List, Input, Button } from 'tea-component';
import { ChevronDownIcon, CheckIcon, AddIcon } from 'tea-icons-react';
import { useTeams, writeActiveTeamId, invalidateBackendCache, invalidateTeamCache } from '@/services';
import { useBackendStore } from '@/stores/backend';
import { type TeamRole } from '@/services/useCurrentRole';
import { teamsApi } from '@/lib/teamApi';
import { teamColor } from '@/utils/color';
import { tea } from '@/lib/tea-bridge';
import './team-switcher.css';

export function TeamSwitcher({ userRole }: { userRole: TeamRole | null }) {
  const { t } = useTranslation();
  const { teams, activeTeamId } = useTeams();
  const refreshTeams = useBackendStore((s) => s.refreshTeams);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');
  const [creating, setCreating] = useState(false);

  const myTeams = teams;
  const active = myTeams.find((t) => t.team_id === activeTeamId) ?? null;

  function resetCreateForm() {
    setShowCreateTeam(false);
    setNewTeamName('');
    setNewTeamDesc('');
  }

  function pick(team_id: string, close: () => void) {
    writeActiveTeamId(team_id);
    invalidateTeamCache(team_id);
    close();
  }

  async function handleCreate() {
    const name = newTeamName.trim();
    if (!name) return;
    setCreating(true);
    try {
      const created = await teamsApi.create({ name, description: newTeamDesc.trim() });
      invalidateBackendCache();
      writeActiveTeamId(created.team_id);
      resetCreateForm();
    } catch (err) {
      tea.notify.error(err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }

  return (
    <Dropdown
      appearance="pure"
      clickClose={false}
      matchButtonWidth={false}
      className="_memory-team-switcher-dropdown"
      boxClassName="_memory-team-switcher-box"
      onOpen={() => { void refreshTeams(); }}
      onClose={resetCreateForm}
      button={
        <button
          type="button"
          className="_memory-team-switcher-trigger"
          title={active?.name ?? t('teamSwitcher.selectTeam')}
        >
          <span className={`_memory-team-switcher-avatar ${active ? teamColor(active.team_id) : 'bg-primary'}`}>
            {(active?.name ?? '?').slice(0, 1).toUpperCase()}
          </span>
          <span className="_memory-team-switcher-meta">
            <span className="_memory-team-switcher-name">{active?.name ?? t('teamSwitcher.selectTeam')}</span>
            <span className="_memory-team-switcher-id">{active?.team_id ?? t('teamSwitcher.noTeam')}</span>
          </span>
          <ChevronDownIcon size={12} className="_memory-team-switcher-chevron" />
        </button>
      }
    >
      {(close) => (
        <div className="_memory-team-switcher-panel">
          <div className="_memory-team-switcher-panel-header">
            <div className="_memory-team-switcher-panel-title">{t('teamSwitcher.title')}</div>
            <div className="_memory-team-switcher-panel-desc">
              {t('teamSwitcher.desc')}
            </div>
          </div>

          <div className="_memory-team-switcher-panel-label">{t('teamSwitcher.teamCount', { count: myTeams.length })}</div>

          <div className="_memory-team-switcher-list-wrap">
            {myTeams.length === 0 ? (
              <div className="_memory-team-switcher-empty">
                {userRole === 'admin'
                  ? t('teamSwitcher.empty.admin')
                  : t('teamSwitcher.empty.member')}
              </div>
            ) : (
              <List type="plain" split="divide" className="_memory-team-switcher-list">
                {myTeams.map((tm) => {
                  const isActive = tm.team_id === activeTeamId;
                  return (
                    <List.Item
                      key={tm.team_id}
                      selected={isActive}
                      className="_memory-team-switcher-item"
                      onClick={() => pick(tm.team_id, close)}
                    >
                      <span className={`_memory-team-switcher-item-avatar ${teamColor(tm.team_id)}`}>
                        {tm.name.slice(0, 1).toUpperCase()}
                      </span>
                      <span className="_memory-team-switcher-item-meta">
                        <span className="_memory-team-switcher-item-name">{tm.name}</span>
                        <span className="_memory-team-switcher-item-count">{t('teamSwitcher.memberCount', { count: tm.members.length })}</span>
                      </span>
                      {isActive && <CheckIcon size={16} className="_memory-team-switcher-item-check" />}
                    </List.Item>
                  );
                })}
              </List>
            )}
          </div>

          <div className="_memory-team-switcher-footer">
            {userRole !== 'admin' ? null : showCreateTeam ? (
              <div className="_memory-team-switcher-create-form">
                <Input
                  autoFocus
                  size="full"
                  value={newTeamName}
                  onChange={setNewTeamName}
                  placeholder={t('teamSwitcher.teamNamePlaceholder')}
                />
                <Input
                  size="full"
                  value={newTeamDesc}
                  onChange={setNewTeamDesc}
                  placeholder={t('teamSwitcher.teamDescPlaceholder')}
                />
                <div className="_memory-team-switcher-create-actions">
                  <Button onClick={resetCreateForm}>{t('teamSwitcher.cancel')}</Button>
                  <Button type="primary"
                    loading={creating}
                    disabled={!newTeamName.trim() || creating}
                    onClick={handleCreate}
                  >
                    {t('teamSwitcher.create')}
                  </Button>
                </div>
              </div>
            ) : (
              <Button type="text"
                className="_memory-team-switcher-create-trigger"
                onClick={() => setShowCreateTeam(true)}
              >
                <AddIcon size={14} />
                {t('teamSwitcher.newTeam')}
              </Button>
            )}
          </div>
        </div>
      )}
    </Dropdown>
  );
}
