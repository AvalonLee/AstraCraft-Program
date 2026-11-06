---
record_type: entry-record
id: boardui
name_zh: "BoardUI 智能体界面设计系统"
name_en: "BoardUI"
summary_zh: "面向 Agent 产品的 React 设计系统：聊天、思考态、Agent 日志、输入框与仪表盘表格卡片同属一套视觉语言，69 个免费组件以源码拷进项目，自带可用的 AI 聊天首页与 MCP / Agent 技能接入。"
summary_en: "A React design system for agentic interfaces: chat, thinking, agent-log and dashboard blocks in one visual language, 69 free components as source, homepage is a runnable AI chat."
category: design-creative
mode: install
tags: [design-system, react, tailwindcss, ai-agent, mcp, agent-skills]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://www.boardui.com
repo: https://github.com/BoardUI/boardui
tier: standard
metrics:
  stars: 1028
  pushed_at: "2026-10-02T21:59:10Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["BoardUI"]
related: [shadcn-ui, animate-ui]
risk_notes: "仓库由 BoardUI 源自动生成、明确不接受 PR，组件更新只能靠 CLI 重装；本仓库为免费层 69 项，付费组件不在此；自带聊天首页对任何拿到 URL 的人开放，模型 Key 虽只在服务端读取，仍须给 Key 设花费上限；MCP 与 Agent 技能会向项目写入组件源码文件，安装前确认工作区状态。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# BoardUI 智能体界面设计系统

> AI 产品要的那半套和仪表盘要的另半套，同一套视觉语言、以源码进项目。上游：[BoardUI/boardui](https://github.com/BoardUI/boardui) · 许可证：MIT

## 这是什么

一套**面向 Agent 产品**的 React 设计系统（★1.0k）：聊天界面、思考态指示、Agent 日志、输入框与侧边栏，配上表格、卡片、表单、图表这些仪表盘必备件，共 69 个免费组件全部以源码形式进项目（不是 npm 依赖，装完随便改）。底层用 React Aria Components 保证可访问性，Tailwind CSS v4 承载 400+ 语义化令牌，明暗同套类名，支持 RTL。仓库首页就是一个可直接跑的 AI 聊天应用（自带 `/api/chat` 流式服务端，Key 只在服务端读取），部署即能用；同时提供 MCP 服务端、Agent 技能、`AGENTS.md` 规则与 `llms.txt`，让编码 Agent 按这套系统的令牌和字阶来搭建界面。

## 怎么安装

装进已有 Next.js 项目（在项目根目录，组件源码落到项目里）：

```bash
npx boardui@latest list                # 看全部组件
npx boardui@latest add data-table      # 装单个组件及其依赖
npx boardui@latest add --all           # 装下本仓库全部免费组件
```

交给 Agent 自动挑选并接线：`claude mcp add boardui -- npx -y boardui@latest mcp`（其他 MCP 客户端在配置里填同一条命令），然后直接说「把免费组件全装上」「给仪表盘加数据表和统计卡」。想先要一个能跑的聊天应用：仓库根目录 `npm install && npm run dev`，或点 README 里的 Vercel 一键部署按钮、只填一个模型 API Key。

## 怎么用

本地跑首页只需一个变量 `AI_API_KEY`（提供商从 Key 前缀自动识别：Anthropic / OpenAI / Gemini / OpenRouter / Groq / xAI / Vercel AI Gateway 等；Mistral、DeepSeek 另加 `AI_PROVIDER`，接 Ollama / vLLM 等兼容服务设 `AI_BASE_URL` 与 `CHAT_MODEL`）。装进自己的项目时，组件按 `AGENTS.md` 与令牌体系组合使用，历史对话存浏览器本地、不含数据库。

## 注意事项

- **不接受 PR**：仓库由 BoardUI 上游源自动生成，问题与新增组件走上游 boardui.com，本仓库内改动会在重装时被覆盖。
- **Key 成本风险**：首页聊天对拿到 URL 的人开放，务必在服务商侧给 Key 设花费上限（OpenRouter 可限额度、OpenAI 可按项目限用量）。
- **写文件动作**：CLI 与 MCP 都是往项目里复制源码，安装前确认工作区干净；免费层为本仓库 69 项，付费组件不含在内。
- **协议清晰**：MIT，可商用；底层依赖 React Aria（MIT）与 Tailwind CSS（MIT）。
