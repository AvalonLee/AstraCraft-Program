---
record_type: entry-record
id: kaneo
name_zh: Kaneo 开源极简项目管理平台
name_en: Kaneo
summary_zh: "极简开放式项目管理平台：看板、Issue、项目与标签一体管理，支持自托管，每个实例内置 HTTP MCP 端点并发布官方 @kaneo/mcp，Claude、Cursor 等 MCP 客户端可直接在对话中创建与推进任务。"
summary_en: "Minimal open-source self-hosted project management with built-in MCP: Claude, Cursor and other clients manage issues, projects and labels via the official @kaneo/mcp."
category: agent-infra
kind: framework
tags: [mcp, self-hosted, docker, ai-agent, project-management, kanban]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://kaneo.app/
repo: https://github.com/usekaneo/kaneo
tier: standard
metrics:
  stars: 8997
  pushed_at: "2026-09-08T06:50:05Z"
  checked_at: "2026-09-08"
  archived: false
related: [codex-taskboard]
risk_notes: MIT 许可可商用；自托管数据自持，依赖 PostgreSQL 16；部署前需配置 POSTGRES_PASSWORD、AUTH_SECRET 与 KANEO_CLIENT_URL，KANEO_API_URL 默认由 KANEO_CLIENT_URL 推导；MCP stdio 通过 npx 拉取 @kaneo/mcp，客户端需 Node.js 与 npm 网络。
added_at: "2026-09-08"
updated_at: "2026-09-08"
---

# Kaneo 开源极简项目管理平台

> 极简、自托管、自带官方 MCP 的项目管理平台。上游：[usekaneo/kaneo](https://github.com/usekaneo/kaneo) · 许可证：MIT

## 这是什么

Kaneo 是一个"少即是多"的开源项目管理平台：看板、Issue、项目与标签一体管理，界面干净，官方明确反对"功能堆叠"。它支持 Docker Compose、Coolify、Helm Chart 等自托管方式，数据留在自己手里，TypeScript（React Web + Hono API）单仓库维护。

对 Agent 生态的独特价值在于官方 MCP server：每个实例内置 HTTP MCP 端点（`/api/mcp`），同时发布 npm 包 `@kaneo/mcp`（stdio）。Claude、Cursor 等 MCP 客户端可以在对话中直接创建任务、更新项目、维护标签，仓库还自带 `.agents` / `.cursor` / `.claude` 等 Agent 工作流配置。

## 怎么安装

```bash
# 1) 自托管 Kaneo（仓库自带 compose.yml / .env.sample）
git clone https://github.com/usekaneo/kaneo.git
cd kaneo
cp .env.sample .env   # 设置 POSTGRES_PASSWORD、AUTH_SECRET、KANEO_CLIENT_URL=http://localhost:5173
docker compose up -d
# 打开 http://localhost:5173

# 2) 给 AI 工具接入官方 MCP（stdio 方式）
# 在 Claude Code / Cursor / Codex 等 MCP 客户端添加：
#   command: npx
#   args: ["-y", "@kaneo/mcp"]
# 自托管实例的 HTTP MCP endpoint：<你的实例地址>/api/mcp
```

## 怎么用

接入 MCP 后，直接在 AI 工具中说"把任务 X 移到进行中，给项目 Y 加三个新任务"，Kaneo 会通过 MCP 工具调用更新看板；纯人工使用则在网页端拖拽卡片、管理 Issue 与标签。详细的部署、环境变量与 MCP 配置见 [官方文档](https://kaneo.app/docs/core)。

## 注意事项

- **许可证 MIT**：宽松可商用。
- **自托管依赖**：核心部署需要 PostgreSQL 16，并配置 `POSTGRES_PASSWORD`、`AUTH_SECRET`、`KANEO_CLIENT_URL`；`KANEO_API_URL` 默认由 `KANEO_CLIENT_URL` 推导。
- **MCP 两种接入**：stdio 用 `npx -y @kaneo/mcp`（需 Node.js 与 npm 网络），自托管实例直接提供 HTTP MCP 端点 `/api/mcp`。
- 维护活跃（2026-09 持续更新），截至 2026-09-08 核验约 8,997 stars。
