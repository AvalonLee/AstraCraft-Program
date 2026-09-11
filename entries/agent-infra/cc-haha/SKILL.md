---
record_type: entry-record
id: cc-haha
name_zh: Claude Code Haha 桌面工作台
name_en: Claude Code Haha
summary_zh: "本地优先的跨平台桌面端 Claude Code / Agent 工作台：多会话与 Worktree、Diff 审阅、模型与 MCP 管理、SubAgent 与 Workflow 编排、Computer Use、技能市场、H5 与 IM 接入。"
summary_en: "Local-first cross-platform desktop workspace for Claude Code and agents: sessions, worktrees, diff review, MCP, subagents, workflows and remote access."
category: agent-infra
kind: framework
tags: [ai-agent, multi-agent, desktop-app, claude-code, mcp, skills-management]
languages: [typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://cchaha.ai
repo: https://github.com/NanmiCoder/cc-haha
tier: standard
metrics:
  stars: 14331
  pushed_at: "2026-09-11T10:49:34Z"
  checked_at: "2026-09-11"
  archived: false
related: [cc-switch, codexplusplus]
aliases: [cc-haha, Claude Code Haha]
risk_notes: "MIT 许可可商用；桌面端发布包可能存在签名/公证差异，安装时需按系统提示确认来源；模型 API Key、会话与本地配置存于本机；Computer Use、权限模式与工作流可执行真实系统操作，应在受控环境逐步授权；调试 CLI 需要 Bun 运行时。"
added_at: "2026-09-11"
updated_at: "2026-09-11"
---

# Claude Code Haha 桌面工作台

> 桌面端 Claude Code / Agent 工作台，把多会话、Diff、MCP、子代理与远程接入集中管理。上游：[NanmiCoder/cc-haha](https://github.com/NanmiCoder/cc-haha) · 许可证：MIT

## 这是什么

Claude Code Haha 是一个本地优先的跨平台桌面应用，定位是 Claude Code 与多 Agent 的工作台。它把多会话、项目切换、分支/Worktree 启动、文件级 Diff 审阅、内置浏览器预览、权限审批、模型选择、MCP 管理、SubAgent 与动态 Workflow 编排、技能市场、模型请求追踪和用量统计放进同一个界面。

除了桌面端，它还提供 CLI/服务端调试入口、H5 远程访问、Telegram / 飞书 / 微信 / 钉钉 / WhatsApp / Slack 等 IM 接入，以及 Computer Use 和桌面宠物等扩展体验。技术栈为 TypeScript、Electron、React、Vite 和 Bun。

## 怎么安装

```bash
# 从 GitHub Releases 下载桌面端安装包
# macOS / Windows / Linux：https://github.com/NanmiCoder/cc-haha/releases
```

安装后首次启动，在设置里配置模型提供商、API Key 和默认模型。

如果需要调试底层 CLI 或自行开发：

```bash
bun install
cp .env.example .env
./bin/claude-haha
```

## 怎么用

1. 在桌面端创建或导入项目，选择会话使用当前工作树还是隔离 Git Worktree。
2. 在设置中连接 Claude / ChatGPT / Grok 官方账号，或配置 DeepSeek、Kimi、GLM、LM Studio、Ollama 等第三方 API 与本地端点。
3. 通过 MCP 页面添加 STDIO、Streamable HTTP 或 SSE 服务，并按项目/全局作用域管理。
4. 启动任务后在右侧工作区查看 Diff、终端、活动面板与工具调用；需要多 Agent 协作时创建 SubAgent 或 Workflow。
5. 需要移动端接力时启用 H5 远程访问；需要跨设备提醒与审批时接入对应 IM。

## 注意事项

- **许可证 MIT**：宽松可商用。
- **安装提示**：正式 macOS 包应经过签名和公证；Windows 未签名包可能触发 SmartScreen，安装前请确认下载来源。
- **能力边界**：Computer Use、权限模式、MCP 与 Workflow 可执行真实本机操作；建议先使用较严格的审批模式，逐步授权。
- **文档**：完整文档见 [cchaha.ai](https://cchaha.ai)，安装、模型、CLI、架构与贡献指南均有分区。
- **维护状态**：维护活跃，截至 2026-09-11 核验约 14,331 stars，上游同日有推送。
