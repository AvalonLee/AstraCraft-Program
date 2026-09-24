---
record_type: entry-record
id: opencut
name_zh: "OpenCut 开源视频剪辑器（CapCut 替代）"
name_en: "OpenCut — The Open Source CapCut Alternative"
summary_zh: "面向 web、桌面与移动端的免费开源视频剪辑器，定位 CapCut 替代品；主仓库正以 Rust 核心 + 插件优先架构重写，规划中的能力包括 Editor API、第三方插件一等公民、内置 MCP 服务、headless 批量渲染与编辑器内脚本标签页。"
summary_en: "Open source video editor for web, desktop and mobile, pitched as a CapCut alternative. Main repo is being rewritten on a Rust core: plugin-first, Editor API, MCP server, headless rendering."
category: design-creative
kind: framework
tags: [video-production, short-video, motion-design, self-hosted, social-media]
languages: [typescript, rust]
doc_languages: [en]
license: MIT
homepage: https://opencut.app
repo: https://github.com/OpenCut-app/OpenCut
tier: standard
metrics:
  stars: 89793
  pushed_at: "2026-08-10T16:38:36Z"
  checked_at: "2026-09-19"
  archived: false
related: [capcut-mate, hyperframes]
aliases: [opencut-app]
risk_notes: "主仓库处于重写期：README 明确「架构设计阶段尚未准备好接收外部贡献」，重写版尚未成品。今天可用的产品是 opencut.app 上运行的 classic 版，其源码仓 opencut-app/opencut-classic 已于 2026-05-17 归档（251 star）。本地跑主仓库需要先安装 proto 与 moon 工具链，不是开箱即用的成品。MIT 可商用。"
added_at: "2026-09-19"
updated_at: "2026-09-19"
---

# OpenCut 开源视频剪辑器（CapCut 替代）

> 免费开源的 web / 桌面 / 移动端视频剪辑器。上游：[OpenCut-app/OpenCut](https://github.com/OpenCut-app/OpenCut) · 许可证：MIT

## 这是什么

OpenCut（89.8k star）是目前 star 最高的「CapCut 开源替代」项目：浏览器里完成时间线剪辑、轨道、字幕与导出，无需上传素材到云端。

需要知道的是它**正在被彻底重写**。按 README 的 Status 一节，重写版的方向是：

- Editor API；
- 插件一等公民（plugin-first 架构）；
- Web / 桌面 / 移动共用一套代码（**Rust 核心**）；
- 面向 AI Agent 的 **MCP 服务**；
- headless 模式（自动化、批量渲染）；
- 编辑器内置脚本标签页。

`opencut.app` 目前仍运行 classic 版，重写版在 `new.opencut.app`，classic 源码在 [opencut-app/opencut-classic](https://github.com/opencut-app/opencut-classic)（README 称其为「今天该用的那一个」，但该仓已于 2026-05-17 归档）。

## 怎么安装

日常剪辑直接用在线版，无需安装：

```text
https://opencut.app
```

跑主仓库（重写版，源码开发）：先装 [proto](https://moonrepo.dev/proto)，再从仓库根目录拉取 pinned 工具链并启动：

```bash
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)   # Linux / macOS / WSL
git clone https://github.com/OpenCut-app/OpenCut.git
cd OpenCut
proto use
moon run web:dev       # localhost:5173
moon run api:dev       # localhost:8787
moon run desktop:dev   # 见 apps/desktop/README.md
```

## 怎么用

- 在线版直接新建项目开始剪；桌面端从 `apps/desktop` 起。
- 需要「今天可用」的完整编辑器时，认准 classic 分支/仓库，别把重写版的 README 当发行说明。
- 重写版承诺的 MCP 服务与 headless 渲染**尚未发布**，Agent 集成请等官方给出可用入口，或先用同类已成品技能（如 `hyperframes`、`video-shotcraft`）出片。
- Windows PowerShell 下若 proto shim 无法运行，需先 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`。

## 注意事项

- **许可证 MIT**：可商用。
- **成熟度**：主仓库为重写中的代码，README 明确暂不接受外部贡献；产品化程度低于 star 数字给人的预期。
- **classic 已归档**：可用版本的上游不再演进，长期看要跟随重写版迁移。
- **工具链门槛**：本地开发依赖 proto + moon（moonrepo），与常见的 npm/pnpm 流程不同。
- 维护活跃（2026-08 仍有推送），官方站 [opencut.app](https://opencut.app)，社区入口为 Discord 与 GitHub Issues。
