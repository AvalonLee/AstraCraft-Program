---
record_type: entry-record
id: remotion-skills
name_zh: "Remotion 官方 Agent Skills"
name_en: "Remotion Agent Skills — Official Skills for Remotion Projects"
summary_zh: "Remotion 官方维护的 Agent Skills 合集：约 12 个技能覆盖用 React 写视频的最佳实践——建项目/合成、标记与动画、Studio 预览、渲染导出、地图动画、字幕、SaaS 架构、Studio 交互、文档检索、升级与 Mediabunny 多媒体处理。"
summary_en: "Official Agent Skills maintained by Remotion: ~12 skills for writing videos in React — project creation, markup, Studio, rendering, maps, captions, SaaS, docs search and upgrades."
category: design-creative
kind: skill-collection
tags: [remotion, video-production, motion-design, product-video, skill-pack, agent-skills]
languages: [typescript]
doc_languages: [en]
license: UNKNOWN
homepage: https://www.remotion.dev/docs/ai/skills
repo: https://github.com/remotion-dev/skills
tier: core
metrics:
  stars: 4430
  pushed_at: "2026-08-26"
  checked_at: "2026-08-29"
  archived: false
aliases: [Remotion Skills, Remotion Agent Skills]
risk_notes: skills 仓库未附 LICENSE 文件且 package.json 未声明协议（UNKNOWN），商用前需确认；依赖 Remotion 生态——Remotion 框架本体采用 Remotion License（个人与小团队免费，达规模的公司需购买公司许可），商用渲染前需自查；渲染消耗本地或云端算力；技能内容为英文。
added_at: "2026-08-29"
updated_at: "2026-08-29"
---

# Remotion 官方 Agent Skills

> Remotion 官方维护的 Agent Skills 合集，定义在 Remotion 项目中工作的最佳实践。上游：[remotion-dev/skills](https://github.com/remotion-dev/skills) · 许可证：未标注（UNKNOWN）

## 这是什么

Remotion（用 React 写视频的事实标准框架）官方出品的 Agent Skills 合集，供 Claude Code、Codex、Kimi Code、Cursor 等支持 Agent Skills 格式的 Agent 使用。技能按职责拆分，按需加载：

- **总纲**：`/remotion-best-practices` 涵盖其余所有技能，不确定用哪个时的默认选择。
- **建与写**：`/remotion-create`（新建项目/合成）、`/remotion-markup`（合成、动画、布局、排版、媒体元素、音频、字体、时序的标记最佳实践）、`/remotion-interactivity`（让元素在 Studio 中可选中/可编辑）。
- **看与出片**：`/remotion-studio`（启动 Studio 预览）、`/remotion-render`（渲染视频或静帧）。
- **专项**：`/remotion-maps`（静态地图、动态路线与标记、地理科普动画，Mapbox/MapLibre/MapTiler/GeoJSON，CesiumJS 3D 飞越）、`/remotion-captions`（字幕）、`/remotion-multimedia`（基于 Mediabunny 的浏览器端音视频元数据处理）。
- **工程化**：`/remotion-saas`（Remotion 驱动的应用与产品集成架构）、`/remotion-docs`（检索 Remotion 文档并抓取任意页面为 Markdown）、`/remotion-upgrade`（升级 Remotion、相关包与已装技能）。

新建 Remotion 项目（`bun create video`）时也会主动询问是否安装这套技能。

## 怎么安装

```bash
npx skills add remotion-dev/skills
```

或在新项目中创建时按提示安装：`bun create video`。技能文档见上游 [Remotion Agent Skills 文档](https://www.remotion.dev/docs/ai/skills)。

## 怎么用

安装后重启 Agent 会话，用斜杠命令按需调用：

```
/remotion-create Make a promo video for a record store
/remotion-markup Create an animated title card using Inter.
/remotion-maps Animate a route from Los Angeles to New York and make the camera follow it.
/remotion-docs How to set up Remotion Lambda?
```

不确定用哪个时直接喊 `/remotion-best-practices`；做完整项目时典型链路是 create → markup → studio（预览）→ render（出片），做产品化再补 saas 与 interactivity。

## 注意事项

- **协议不明**：skills 仓库未附 LICENSE 文件，frontmatter 标注 `UNKNOWN`；另注意 Remotion **框架本体**采用 Remotion License（个人与小团队免费，达到规模的公司渲染需购买公司许可），把产出商用前请自查上游条款。
- **生态依赖**：技能只提供知识与实践规则，实际渲染依赖 Remotion 框架与 Node/bun 工具链；渲染（尤其 Lambda 云渲染）消耗算力与费用。
- **语言**：技能内容与文档为英文。
- **更新**：上游随 Remotion 版本快速迭代，可用 `/remotion-upgrade` 或重跑安装命令保持最新。
