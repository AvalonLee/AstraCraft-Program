/**
 * TeamManagementPanel 拆分出的公共展示型小组件：
 *   - Mounted：Agent 卡片上的「已挂载资产」计数 chip
 *   - LightField：轻量表单字段（label + hint + children）
 *   - CollapseGroup：可折叠分组（skills / code_graph / llm_wiki / chat_memory 复选列表容器）
 *   - AssetCheckList：分组渲染的资产复选框列表
 *
 * 均为纯展示组件，不含业务逻辑 / 数据请求。
 */

import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'tea-component';
import { ChevronRightIcon } from 'tea-icons-react';
import type { MountableAsset } from './types';

export function Mounted({ label, count }: { label: string; count: number }) {
  return (
    <div className="_memory-mounted-chip">
      <span className="_memory-mounted-chip-label">{label}</span>
      <span className="_memory-mounted-chip-count">{count}</span>
    </div>
  );
}

export function LightField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="_memory-light-field">
      <div className="_memory-light-field-label">{label}</div>
      {hint && <div className="_memory-light-field-hint">{hint}</div>}
      {children}
    </label>
  );
}

export function CollapseGroup({
  icon,
  title,
  selectedCount,
  totalCount,
  open,
  onToggle,
  hideTotal = false,
  children,
}: {
  icon: ReactNode;
  title: string;
  selectedCount: number;
  totalCount: number;
  open: boolean;
  onToggle: () => void;
  /** 只展示已绑定数量、不展示团队池总数（用于只读详情场景）。 */
  hideTotal?: boolean;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="_memory-collapse-group">
      <button type="button" onClick={onToggle} className="_memory-collapse-group-header">
        <ChevronRightIcon
          size={12}
          className={`_memory-collapse-group-chevron${open ? ' _memory-collapse-group-chevron--open' : ''}`}
        />
        <span className="_memory-collapse-group-icon">{icon}</span>
        <span className="_memory-collapse-group-title">{title}</span>
        <span className="_memory-collapse-group-count">
          {hideTotal ? t('shared.bound', { count: selectedCount }) : t('shared.selected', { selected: selectedCount, total: totalCount })}
        </span>
      </button>
      {open && <div className="_memory-collapse-group-body">{children}</div>}
    </div>
  );
}

export function AssetCheckList({
  assets,
  checkedKeys,
  onToggle,
  readOnly = false,
  disabledKeys = new Set<string>(),
}: {
  assets: MountableAsset[];
  checkedKeys: string[];
  onToggle: (key: string) => void;
  readOnly?: boolean;
  disabledKeys?: Set<string>;
}) {
  const { t } = useTranslation();
  const groups = new Map<string, MountableAsset[]>();
  for (const a of assets) {
    if (!groups.has(a.group)) groups.set(a.group, []);
    groups.get(a.group)!.push(a);
  }
  return (
    <div className="_memory-asset-check-groups">
      {Array.from(groups.entries()).map(([group, items]) => (
        <div key={group}>
          <div className="_memory-asset-check-group-label">{group}</div>
          <ul className="_memory-asset-check-list">
            {items.map((a) => {
              const checked = checkedKeys.includes(a.key);
              const notReady = a.status && a.status !== 'ready';
              const disabled = readOnly || disabledKeys.has(a.key) || !!notReady;
              return (
                <li key={a.key} className="_memory-asset-check-item">
                  <Checkbox value={checked} disabled={disabled} onChange={() => { if (!disabled) onToggle(a.key); }}>
                    <span className="_memory-asset-check-item-row">
                      <span className="_memory-asset-check-item-title">{a.title}</span>
                      <span className="_memory-asset-check-item-slug">
                        {a.slug}{disabledKeys.has(a.key) ? t('shared.selfMemory') : notReady ? ` · ${a.status}` : ''}
                      </span>
                    </span>
                  </Checkbox>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
