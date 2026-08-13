/**
 * TabBar — 多标签页栏（Tea 风格重构版）
 *
 * 保留多标签页交互逻辑，使用 Tea Design Token 统一样式。
 */
import { ITEM_ICON, usePageMeta, type PageId } from '@/constants/menu';
import './style.css';

export function TabBar({
  pages,
  activePage,
  onNavigate,
  onClose,
}: {
  pages: PageId[];
  activePage: PageId;
  onNavigate: (id: PageId) => void;
  onClose: (id: PageId) => void;
}) {
  const PAGE_META = usePageMeta();
  return (
    <div className="_memory-tabbar">
      {pages.map((id) => {
        const meta = PAGE_META[id];
        const isActive = id === activePage;
        return (
          <div
            key={id}
            onClick={() => onNavigate(id)}
            className={`_memory-tabbar-item${isActive ? ' _memory-tabbar-item--active' : ''}`}
          >
            <span className="_memory-tabbar-icon" aria-hidden="true">{ITEM_ICON[id]}</span>
            <span className="_memory-tabbar-label">{meta.label}</span>
            {!meta.affix && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(id);
                }}
                className="_memory-tabbar-close"
              >
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" width="10" height="10">
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
