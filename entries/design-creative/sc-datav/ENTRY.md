---
record_type: entry-record
id: sc-datav
name_zh: "sc-datav 3D 地图可视化大屏"
name_en: "sc-datav"
summary_zh: "基于 Three.js + React 19 + ECharts 的 3D 数据可视化大屏模板：精确呈现四川省地理轮廓，带动画飞线、侧边扫光、柱状 / 折线图联动与 Leva 实时调参；Vite 构建、autofit 自适应，可直接作为省市级 3D 大屏项目起点。"
summary_en: "A 3D data-visualization dashboard template built with Three.js, React 19 and ECharts: accurate provincial map outlines, animated fly-lines, side sweep lighting and linked charts."
category: design-creative
mode: deploy
tags: [threejs, data-visualization, dashboard, canvas]
languages: [typescript, javascript]
doc_languages: [zh]
license: Apache-2.0
homepage: https://knight-l.github.io/sc-datav/
repo: https://github.com/knight-L/sc-datav
tier: standard
metrics:
  stars: 2563
  pushed_at: "2026-03-13T09:06:47Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [sc-datav, SCDataV]
risk_notes: "内置地理数据只有四川省（sc.json / sc_outline.json 与轮廓贴图），换省市要替换 GeoJSON、轮廓与贴图，不是改标题即可，轮廓贴图可用配套 sat-hunter 工具生成；上游最后推送 2026-03（约 8 个月无更新，未归档），依赖用 React 19.1 / Three 0.181 / Vite Rolldown 版，自行升级需回归；大屏图表与数值为演示数据，接真实数据要改数据源与刷新逻辑；3D 地图 + 多 ECharts 实例对低端设备有压力；省份地理数据可能有来源与商用授权要求。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# sc-datav 3D 地图可视化大屏

> Three.js 驱动的省市级 3D 数据大屏模板。上游：[knight-L/sc-datav](https://github.com/knight-L/sc-datav) · 许可证：Apache-2.0 · 在线预览：[knight-l.github.io/sc-datav](https://knight-l.github.io/sc-datav/#/demo0)

## 这是什么

sc-datav 是一个开箱可跑的 3D 数据可视化大屏项目：以 Three.js 渲染省级地理轮廓，叠加动画飞线、侧边扫光、柱状 / 折线图联动与实时调参面板，适合当作省市数据大屏、指挥中心看板的起点。当前内置的是**四川省**轮廓与演示数据，提供 demo0–demo3 四套页面可在线预览。

技术栈：React 19 + TypeScript + Vite（Rolldown 版）；3D 用 Three.js + @react-three/fiber + drei；图表用 ECharts；地理数据处理用 D3-geo；动画用 GSAP；样式用 Styled-components；调参用 Leva；自适应用 autofit.js。目录结构清晰：

| 位置 | 作用 |
|---|---|
| `src/pages/SCDataV/index.tsx` | 大屏页面入口 |
| `src/pages/SCDataV/scMap.tsx` | 3D 地图渲染 |
| `src/pages/SCDataV/flyLine.tsx` | 轮廓飞线动画 |
| `src/pages/SCDataV/chart1..3.tsx` | 联动图表 |
| `src/assets/sc.json` / `sc_outline.json` | 四川省地理与轮廓数据 |

配套项目 [sat-hunter](https://github.com/knight-L/sat-hunter) 可下载 / 生成地图轮廓贴图，换省市时用它出图。

## 怎么部署运行

前置：Node.js >= 18、pnpm >= 8。

```bash
git clone https://github.com/knight-L/sc-datav.git
cd sc-datav
pnpm install

# 开发（Vite 开发服务器）
pnpm dev

# 构建与本地预览
pnpm build
pnpm preview
```

构建产物在 `dist/`，可直接部署到任意静态托管（GitHub Pages、Nginx 等）。项目用 hash 路由，子路径部署一般不需要改 history fallback。

## 怎么用

1. 打开预览地址的 `#/demo0` 至 `#/demo3`，挑一套布局作模板。
2. 替换 `src/assets/sc.json` 与 `sc_outline.json` 为目标省市的 GeoJSON / 轮廓数据，并用 sat-hunter 生成对应轮廓贴图；地图尺寸与相机参数在 `scMap.tsx` 中调整。
3. 图表数据在 `chart1..3.tsx` 中替换为真实接口；飞线起止点与样式在 `flyLine.tsx`；整体布局与文案在 `content.tsx`。
4. 开着 Leva 调试面板实时调材质、颜色、动画参数，满意后把值写回组件默认参数。
5. 需要多屏自适应时保留 autofit.js，按设计稿比例配置，不要把固定像素散落在组件里。

## 注意事项

- **只内置四川省**：换省市不是改标题，而是替换地理数据、轮廓与贴图三件套；没有对应数据时飞线与地图轮廓会对不上。
- **维护状态**：上游最后推送 2026-03-13（约 8 个月无更新，仓库未归档），项目已具备完整可运行示例，但新 issue 与依赖升级响应可能变慢；React 19.1 / Three 0.181 / Vite Rolldown 均较新，升级前先回归。
- **演示数据**：图表数值、地名与飞线均为示例，接真实数据要改数据源、刷新节奏与空态 / 异常态处理。
- **性能**：3D 地图 + 多个 ECharts 实例对低端核显有压力，autofit 只解决缩放，不解决渲染开销；数据量大时需降采样 / 分片。
- **许可证与数据合规**：代码 Apache-2.0；省份地理数据与地图审图号、数据来源可能有独立要求，商用或公开发布前确认授权与合规。
- **路由与部署**：默认 hash 路由；若改成 history 路由或部署到子路径，需要同步调整 Vite `base` 与服务器 fallback。
