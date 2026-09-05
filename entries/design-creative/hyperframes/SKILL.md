---
record_type: entry-record
id: hyperframes
name_zh: "HyperFrames HTML 视频渲染"
name_en: "HyperFrames"
summary_zh: "HeyGen 开源的 HTML → MP4 视频渲染框架：把 HTML、CSS、媒体和可 seek 动画变成确定性 MP4 视频——Agent 写 HTML、框架负责渲染；20 个内置 skill 按需加载（路由 /hyperframes 按请求分发创建工作流），支持产品发布视频、无脸解说、PR-to-video、deck 和组合移植等场景。"
summary_en: "Open-source HTML-to-MP4 video rendering framework from HeyGen: turn HTML, CSS, and seekable animations into deterministic videos. 20 skills agents load on demand."
category: design-creative
kind: framework
tags: [video-production, product-video, ai-agent, claude-code, codex, html]
languages: [typescript, html]
doc_languages: [en]
license: Apache-2.0
homepage: https://hyperframes.heygen.com
repo: https://github.com/heygen-com/hyperframes
docs_url: https://hyperframes.heygen.com/introduction
tier: core
metrics:
  stars: 44054
  pushed_at: "2026-09-05T08:39:34Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [hyperframes, HeyGen HyperFrames]
risk_notes: "HTML → 确定性渲染（非实时）需要 Node >= 22；20 个 skill 的完整安装体积较大（agents 建议 npx hyperframes skills update 装 core set）；skills.sh registry 可能滞后 main 数小时，新 skill 用 npx hyperframes skills update 获取最新版。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# HyperFrames HTML 视频渲染

> Write HTML. Render video. Built for agents.上游：[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) · 许可证：Apache 2.0 · 44.1k stars · [文档](https://hyperframes.heygen.com/introduction) · [Playground](https://www.hyperframes.dev/)

## 这是什么

HyperFrames 是 HeyGen 开源的 HTML → 确定性 MP4 视频渲染框架：你（或你的 AI Agent）写 HTML + CSS + 可 seek 动画，HyperFrames 渲染成 MP4。与 Remotion 不同，HyperFrames 从头设计为 agent-first——20 个内置 skill 让 Claude Code / Cursor / Gemini CLI / Codex 等 coding agent 直接"make me a video"。

**核心设计**：

- **HTML 即视频源**：Agent 最擅长写 HTML/CSS，HyperFrames 把它变成确定性视频（每帧可 seek，不是黑盒浏览器截屏）
- **20 个 skill 按需加载**：`/hyperframes` 路由 skill 先读——根据请求分发到创建工作流；core set 走 `npx hyperframes skills update`（从 main 最新拉取，不滞后）
- **创建工作流**（按需求选）：
  - `/product-launch-video`：网站产品发布视频（30-90 秒甜蜜点，最长 ~3 分钟）
  - `/faceless-explainer`：无脸解说视频（纯文本 → 排版 / 图表 / 动效）
  - `/pr-to-video`：GitHub PR → 变更日志 / 功能展示视频
  - 更多见 [Skills 目录](https://hyperframes.heygen.com/catalog/)
- **生产循环**：规划视频 → 写合法 HTML → 接可 seek 动画 → 加媒体 → lint → preview → render

**与 Remotion 的区别**：Remotion 是 React 组件写视频（开发者工具），HyperFrames 是纯 HTML + agent skill（agent 工具）——任何会写 HTML 的 agent 都能出片。

## 怎么安装

**Agent 一键安装（推荐）：**

```bash
npx skills add heygen-com/hyperframes
```

Picker 打开后选 **Core Skills** 组（路由 + 按需工作流），不要全选。

**Agent / 非交互式：**

```bash
npx hyperframes skills update
```

前置条件：Node.js >= 22。

## 怎么用

安装 skill 后对 Agent 说：

```text
Using /hyperframes, create a 10-second product intro
with a fade-in title, a background video, and subtle background music.
```

Agent 会按生产循环执行：读 `/hyperframes` 路由 → 确认 brief → 选工作流 → 写 HTML → 接动画 → 加媒体 → lint → preview → render MP4。

**典型场景**：

- 网站产品发布视频（从 URL / brief / 脚本）
- 无脸解说（任意主题文本）
- PR 变更展示（GitHub PR URL）
- HTML deck → 视频

## 注意事项

- **许可证 Apache 2.0**：可自由商用。
- **Node >= 22**：渲染引擎需要 Node 22 或更高。
- **skill 安装策略**：`skills add --all` 装 20 个全量 skill；agents / 非交互场景用 `npx hyperframes skills update` 装 core set（从 main 最新拉取，不滞后 registry）。
- **维护极其活跃**（2026-09-05 当天仍有提交，44.1k stars），提供 npm 月下载、Playground、Showcase 和 Discord 社区，HeyGen 出品。
