/**
 * AssetSplitLayout — 资产管理页通用分栏布局。
 *
 * 统一 Skills / Memory 等资产页的 280px 左侧列表 + 右侧自适应详情的
 * 分栏结构，避免各页面重复定义 grid 模板。
 */

import type { ReactNode } from 'react';
import './asset-split-layout.css';

interface AssetSplitLayoutProps {
  sidebar: ReactNode;
  detail: ReactNode;
}

export function AssetSplitLayout({ sidebar, detail }: AssetSplitLayoutProps) {
  return (
    <div className="_asset-split">
      <section className="_asset-split-sidebar">{sidebar}</section>
      <section className="_asset-split-detail">{detail}</section>
    </div>
  );
}
