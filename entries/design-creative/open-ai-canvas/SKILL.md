---
record_type: entry-record
id: open-ai-canvas
name_zh: "影策 Open AI Canvas 影视创作工作台"
name_en: "YingCe / Open AI Canvas"
summary_zh: "开源 AI 影视与短剧创作工作台：自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务与本地 Agent 放在同一条创作链路，支持自部署与 Codex MCP 插件协作。"
summary_en: "Open-source AI film and short-drama workbench: canvas, storyboard, assets, image/video/audio generation, async tasks and local agents, with self-hosting and Codex MCP."
category: design-creative
kind: framework
tags: [short-drama, storyboard, video-production, image-generation, ai-agent, multi-agent, mcp]
languages: [typescript, go]
doc_languages: [zh]
license: MIT
homepage: https://github.com/ddcat-ai/open-ai-canvas
repo: https://github.com/ddcat-ai/open-ai-canvas
tier: standard
aliases: [影策, Open AI Canvas]
risk_notes: 默认适合个人、本地或可信环境部署，未经安全配置不应作为公网多人服务；涉及模型渠道、API Key 与多供应商配额，AI 生成产生费用；项目仍在快速迭代，数据结构和外部接口可能调整。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# 影策 Open AI Canvas 影视创作工作台

> 开源的 AI 影视与短剧创作工作台。上游：[ddcat-ai/open-ai-canvas](https://github.com/ddcat-ai/open-ai-canvas) · 许可证：MIT

## 这是什么

影策把自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务和本地 Agent 放在同一条创作链路里，让创作者从文字 brief 走到可复用的镜头资产。前端为 React（Bun 构建），后端为 Go（Gin），本地 Agent（canvas-agent）通过 MCP/Codex 插件与画布交互。

核心能力：自由画布（项目、节点、连线、框选、缩放）；影视工作流（剧本、角色、场景、风格板、结构化分镜、3D 导演台）；多媒体生成（文本/图片/视频/音频，参考图、首尾帧、运镜、视频续写）；后端异步任务队列；画布助手、本地 Canvas Agent、MCP 工具、Codex App 插件；系统渠道、逻辑模型、用量与管理后台。

## 怎么安装

本地开发环境：Bun（前端）、Go 1.25（后端）、Node.js 18+（Canvas Agent）。

宿主机启动：

```bash
git clone https://github.com/ddcat-ai/open-ai-canvas.git
cd open-ai-canvas

mkdir -p .local/project-workbench-debug .local/cache/go-build .local/cache/go-mod

# 终端一：后端
cd backend
CANVAS_BACKEND_DATA_DIR=../.local/project-workbench-debug go run ./cmd/server

# 终端二：前端（另开终端）
cd ../web
bun install
bun run dev
```

Windows PowerShell 可在仓库根目录执行 `.\scripts\start-local.ps1` 一键启动。也可用 Docker（`docker compose -f docker-compose.dev.yml up --build`）或服务器一键安装脚本。

## 怎么用

1. 打开 `http://localhost:3000`，注册第一个管理员账号
2. 在设置中配置模型渠道（模型 Base URL、API Key 与模型名保存在浏览器本地）
3. 创建项目，从文字 brief 开始：画布 → 结构化分镜 → 角色/风格资产 → 图片/视频/音频生成
4. 通过画布助手或本地 Canvas Agent（Codex MCP 插件）辅助创作与任务管理

## 注意事项

- **部署边界**：默认适合个人、本地或可信环境；售后端默认拒绝本机/私网模型地址，请配置精确白名单，不要把服务直接暴露公网。
- **凭据与费用**：API Key 保存在浏览器本地；系统模型与多渠道配额涉及用量费用，计费以各渠道为准。
- **快速迭代**：项目仍在快速开发，数据结构和外部接口可能直接调整，版本以仓库根目录 `VERSION` 为准。
- **依赖外部模型**：文本、图片、视频生成依赖所配置的模型渠道，渠道下线或限流会影响可用性。