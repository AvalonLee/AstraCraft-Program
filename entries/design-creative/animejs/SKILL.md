---
record_type: entry-record
id: animejs
name_zh: "Anime.js 动画引擎"
name_en: "Anime.js — JavaScript Animation Engine"
summary_zh: "轻量多用途 JavaScript 动画引擎：用统一 API 驱动 CSS、SVG、DOM 属性与 JavaScript 对象；V4 提供模块化时间轴、弹簧缓动、滚动、拖拽、文本拆分、WAAPI 与 Three.js 适配，适合界面、图表和创意页面动效。"
summary_en: "A lightweight JavaScript animation engine for CSS, SVG, DOM attributes, JavaScript objects and optional Three.js scenes, with modular timelines, springs, scrolling, dragging and WAAPI support."
category: design-creative
kind: framework
tags: [animejs, animation, web-animation, motion-design, frontend, framework]
languages: [javascript, typescript]
doc_languages: [en]
license: MIT
homepage: https://animejs.com
repo: https://github.com/juliangarnier/anime
docs_url: https://animejs.com/documentation
tier: core
metrics:
  stars: 72674
  pushed_at: "2026-08-21T21:29:50Z"
  checked_at: "2026-09-05"
  archived: false
related: [gsap, remotion-skills]
aliases: [Anime.js, animejs]
risk_notes: "MIT 许可，主体免费可商用；V4 采用 ES 模块和函数式 API，与 V3 的默认导入写法差异较大，升级项目需先读迁移指南。Three.js 适配为可选 peer dependency，复杂 DOM/SVG/WebGL 动画仍需关注性能与浏览器兼容。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Anime.js 动画引擎

> 轻量、多用途的 JavaScript 动画引擎，适合网页界面与创意动效。上游：[juliangarnier/anime](https://github.com/juliangarnier/anime) · 许可证：MIT

## 这是什么

Anime.js 是 Julian Garnier 维护的 JavaScript 动画库。它用统一的补间 API 驱动 CSS 属性、SVG、DOM 属性、普通 JavaScript 对象，并可通过可选适配器处理 Three.js / WebGL 场景。

V4 把能力拆成独立模块：`animate` 处理补间，`createTimeline` 管理序列，`stagger` 控制批量延迟；同时提供弹簧与贝塞尔缓动、滚动触发、可拖拽对象、文本拆分、WAAPI 适配和作用域管理。它适合交互界面、数据可视化、SVG 图标、Canvas/WebGL 辅助动画和创意页面。

## 怎么安装

在项目根目录执行：

```bash
npm install animejs
```

然后在入口文件或组件中导入：

```js
import { animate, stagger } from "animejs";
```

## 怎么用

最小补间示例如下：

```js
animate(".card", {
  y: 0,
  opacity: 1,
  duration: 650,
  ease: "outQuart",
});
```

批量元素用 `stagger` 做节奏化延迟；复杂序列用 `createTimeline()` 编排多个补间。V3 项目迁移到 V4 时，不要沿用旧的默认导入写法，先对照官方迁移指南。

## 注意事项

- **V3 / V4 API 不同**：V4 使用 ES 模块和函数式导入；从 V3 升级前请阅读官方迁移指南。
- **运行时依赖**：Anime.js 是浏览器/运行时动画库，需要结合目标项目的前端工具链使用。
- **可选 Three.js**：Three.js 适配器是可选 peer dependency；只有确实要驱动 Three.js 场景时才安装。
- **性能预算**：大量 SVG、DOM 或 WebGL 对象同时补间时，需要检查帧率和绘制成本。
