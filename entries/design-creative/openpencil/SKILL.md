---
record_type: entry-record
id: openpencil
name_zh: "OpenPencil AI 原生矢量设计工具"
name_en: "OpenPencil"
summary_zh: "首个开源 AI 原生矢量设计工具：Prompt → Canvas、并发 Agent Teams 并行作画、Design-as-Code（.op 文件 JSON 可 diff）、MCP Server 一键接入 Claude Code / Codex、多模型智能适配、10+ 平台代码导出（React / Vue / SwiftUI / Flutter 等）。"
summary_en: "First open-source AI-native vector design tool: prompt-to-canvas streaming, concurrent Agent Teams, Design-as-Code, MCP server, and code export to React, Vue, SwiftUI, Flutter."
category: design-creative
kind: framework
tags: [design-system, ui-generation, ai-agent, mcp, codex, claude-code, self-hosted]
languages: [rust, typescript]
doc_languages: [en, zh, ja, ko, fr, es, de, pt, ru, hi, tr, th, vi, id]
license: MIT
homepage: https://github.com/ZSeven-W/openpencil
repo: https://github.com/ZSeven-W/openpencil
tier: core
metrics:
  stars: 5831
  pushed_at: "2026-09-05T09:06:15Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [open-pencil, OpenPencil]
risk_notes: "Windows 安装器可能触发杀毒软件启发式误报（官方提供验证文档）；Rust 核心 + 3 个 submodule（jian / casement / agent-rs）从源码构建需 clone --recurse-submodules；Web 版凭据默认存浏览器 localStorage，服务端持久化需显式开启且仅限可信部署；多模型智能按模型能力自适应（Claude 完整 prompt / GPT-4o 关闭 thinking / 小模型简化），费用自担。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# OpenPencil AI 原生矢量设计工具

> The world's first open-source AI-native vector design tool。上游：[ZSeven-W/openpencil](https://github.com/ZSeven-W/openpencil) · 许可证：MIT · 5.8k stars

## 这是什么

OpenPencil 是第一个开源的 AI 原生矢量设计工具：不是给传统设计工具加一个 AI 插件，而是从内核开始把 AI 作为一等公民。Rust 核心 + GPU-Skia 渲染（无浏览器引擎）+ 前端（React），单二进制跨 macOS / Windows / Linux 桌面 + Web。

**核心特性**：

- **Prompt → Canvas**：自然语言描述 UI，实时流式呈现在无限画布上；选中元素后继续 chat 修改。
- **并发 Agent Teams**：orchestrator 把复杂页面分解为空间子任务（hero / features / footer），多个 AI agent 并行工作、各自流式输出、每个成员有独立的画布指示器——不是排队而是同时画。
- **Multi-Model Intelligence**：自动适配每个模型的能力——Claude 给完整 prompt + thinking、GPT-4o / Gemini 关闭 thinking、小模型（MiniMax / Qwen / Llama）简化 prompt 保输出可靠性。
- **Design-as-Code**：`.op` 文件是 JSON——人类可读、Git 友好、可 diff；设计变量自动生成 CSS custom properties。
- **MCP Server**：一键安装到 Claude Code / Codex / OpenCode / Kiro / Copilot CLI——从终端读、创建、修改 `.op` 设计文件。
- **CLI（`op`）**：`op design` / `op insert` 批量设计 DSL、节点操作、文件管道输入。
- **Style Guides**：内置风格指南库（glassmorphism、brutalist、retro 等），tag 模糊匹配应用到 AI 生成的设计。
- **多平台代码导出**：React + Tailwind / HTML + CSS / Vue / Svelte / Flutter / SwiftUI / Jetpack Compose / React Native——从一个 `.op` 文件导出全部。
- **Embeddable SDK**：`op-web-sdk`（vanilla / React / Vue adapter）在你的 app 里嵌入 `.op` 查看器。
- **Design System Kit**：管理可复用 UIKits（风格切换 + 组件组合），导入/导出 `.pen` 文件。
- **实时协作**：认证 P2P 会话 + 公共 relay，多人同时设计。
- **14 语 README**：英文 / 简中 / 繁中 / 日 / 韩 / 法 / 西 / 德 / 葡 / 俄 / 印地 / 土耳其 / 泰 / 越南 / 印尼。

## 怎么安装

**macOS（Homebrew）：**

```bash
brew tap zseven-w/openpencil
brew install --cask openpencil
```

**Windows（Scoop）：**

```powershell
scoop bucket add openpencil https://github.com/zseven-w/scoop-openpencil
scoop install openpencil
```

**Linux / 直接下载**：[GitHub Releases](https://github.com/ZSeven-W/openpencil/releases)（`.AppImage` / `.deb` / `.exe`）。

**CLI（`op`）：**

```bash
brew install zseven-w/openpencil/op
# 或
curl -fsSL https://raw.githubusercontent.com/ZSeven-W/openpencil/main/scripts/install-op.sh | bash
```

**MCP 安装到 Agent：**

在 OpenPencil 桌面端或 Web 端一键安装（支持 Claude Code / Codex / OpenCode / Kiro / Copilot CLI）。

## 怎么用

**桌面端 / Web 端**：打开 OpenPencil，在 composer 里描述你想要的 UI（`"设计一个深色 SaaS 仪表盘，左侧导航 + 主区域图表 + 右侧面板"`），Agent Teams 并行生成各区域。选中元素继续 chat 修改。右上角导出 React + Tailwind。

**终端（`op` CLI）：**

```bash
# 从文件批量创建
op design --input layout.op.dsl

# 插入节点
op insert /root "Button" --props '{"text":"Submit","variant":"primary"}'

# 管道输入
cat my-design.op.dsl | op design --stdin
```

**MCP（Claude Code 内）：**

安装后在对话中说 `打开 /path/to/my-design.op，把按钮改成圆角`——agent 通过 MCP 工具直接修改设计文件。

## 注意事项

- **许可证 MIT**：可自由商用。
- **Rust 核心 + 3 submodule**：从源码构建需 `git clone --recurse-submodules`（vendor/jian、vendor/casement、vendor/agent-rs）。
- **Windows 杀毒误报**：新发布低普及度触发启发式误报，官方提供[验证文档](https://github.com/ZSeven-W/openpencil/blob/main/docs/security/antivirus-false-positives.md)。
- **Web 版凭据**：默认存浏览器 localStorage（同源隔离）；服务端持久化需 `OPENPENCIL_PERSIST_WEB_CREDENTIALS_SERVER=true`，仅限可信 HTTPS 部署。
- **维护极其活跃**（2026-09-05 当天仍有提交，5.8k stars），提供 14 语 README、Discord 社区和 Trendshift 徽章。
