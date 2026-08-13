import { useTranslation } from 'react-i18next';
import { ShareIcon, LockOnIcon, UserIcon } from 'tea-icons-react';
import { Card, List, Text, Segment } from 'tea-component';
import { useUserDisplayName } from '@/services/user-profile-store';
import { type MemoryBlock } from './types';

/** 用户归属指示：纯文本 + 图标，不用亮色 Tag。 */
function MemoryOwnerBadge({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) {
  const { t } = useTranslation();
  const displayName = useUserDisplayName(userId);
  return (
    <span className="_cm-badge" title={t('memoryPersonal.ownerTag.title', { name: displayName || userId, id: userId })}>
      <UserIcon size={10} /> {displayName || userId}
      {isCurrentUser && <span className="_cm-badge-you">{t('memoryPersonal.ownerTag.you')}</span>}
    </span>
  );
}

export function PersonalAssetsTable({
  blocks, loading, onToggleScope, selectedId, onSelect, currentUserId,
}: {
  blocks: MemoryBlock[]; loading: boolean; onToggleScope: (block: MemoryBlock, newScope: 'team' | 'private') => void;
  selectedId: string | null; onSelect: (id: string | null) => void; currentUserId: string;
}) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Body>
        <div className="_cm-personal-header">
          <Text theme="strong" parent="div">{t('memoryPersonal.title')}</Text>
          <Text theme="weak" parent="div" className="_cm-personal-header-desc">{t('memoryPersonal.desc')}</Text>
        </div>
        {loading ? (
          <div className="_cm-personal-empty"><Text theme="weak">{t('memoryPersonal.loading')}</Text></div>
        ) : blocks.length === 0 ? (
          <div className="_cm-personal-empty"><Text theme="weak" parent="div">{t('memoryPersonal.empty')}</Text></div>
        ) : (
          <List split="divide" className="_cm-personal-items">
            {blocks.map((block) => {
              const isSelected = selectedId === block.id;
              const isTeam = block.scope === 'team';
              const ownerIsMe = !!block.uploaded_by_user_id && block.uploaded_by_user_id === currentUserId;
              return (
                <List.Item key={block.id} selected={isSelected} onClick={() => onSelect(isSelected ? null : block.id)} className="_cm-personal-asset">
                  <div className="_cm-personal-asset-main">
                    <div className="_cm-personal-asset-name" title={block.title}>{block.title}</div>
                    <div className="_cm-personal-asset-meta">{t('memoryPersonal.updatedAt', { time: new Date(block.updated_at_ms).toLocaleString() })}</div>
                    <div className="_cm-personal-asset-id" title={block.id}>{block.id}</div>
                    {block.uploaded_by_user_id && (
                      <div className="_cm-personal-asset-badges">
                        <MemoryOwnerBadge userId={block.uploaded_by_user_id} isCurrentUser={ownerIsMe} />
                        {isTeam ? (
                          <span className="_cm-badge"><ShareIcon size={10} /> {t('memoryPersonal.shared')}</span>
                        ) : (
                          <span className="_cm-badge"><LockOnIcon size={10} /> {t('memoryPersonal.private')}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="_cm-personal-asset-controls" onClick={(e) => e.stopPropagation()}>
                    <Segment
                      value={isTeam ? 'team' : 'private'}
                      onChange={(v) => onToggleScope(block, v as 'team' | 'private')}
                      options={[
                        { value: 'team', text: t('memoryPersonal.shared') },
                        { value: 'private', text: t('memoryPersonal.private') },
                      ]}
                    />
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
