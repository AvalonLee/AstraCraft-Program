---
record_type: entry-record
id: palmier-pro
name_zh: "Palmier Pro AI 视频剪辑"
name_en: "Palmier Pro"
summary_zh: "为 AI 打造的 macOS 原生视频剪辑器（Swift 从零构建，北极星对标 Premiere Pro）：内置 SOTA 生成模型（Seedance / Kling / Nano Banana Pro）在时间线上直接生成视频和图片；通过 MCP 让 Claude / Codex / Cursor 直接在时间线上创建和编辑，或用内置 Agent 协作。"
summary_en: "macOS-native video editor built in Swift for AI: generate video and images with SOTA models on the timeline; let Claude, Codex, and Cursor edit via MCP."
category: design-creative
kind: framework
tags: [video-production, ai-agent, mcp, claude-code, codex]
languages: [swift]
doc_languages: [en, zh, ja, ko, fr, es, de, pt, ru, hi, ar, it, vi, tr]
license: GPL-3.0
homepage: https://github.com/palmier-io/palmier-pro
repo: https://github.com/palmier-io/palmier-pro
tier: standard
metrics:
  stars: 14291
  pushed_at: "2026-08-28T23:30:01Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [Palmier Pro, palmier]
risk_notes: "仅 macOS 26 (Tahoe) + Apple Silicon (M 系列)；v0.7.6 及之前源码为 GPLv3，后续二进制版本为专有许可（源码未发布）；仓库不再接受代码贡献；14 语 README。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Palmier Pro AI 视频剪辑

> The video editor built for AI.上游：[palmier-io/palmier-pro](https://github.com/palmier-io/palmier-pro) · 历史 GPL v3（≤v0.7.6）/ 当前二进制专有 · 14.3k stars · YC S24

## 这是什么

Palmier Pro 是一个从零用 Swift 构建的 macOS 原生视频编辑器，北极星是对标 Premiere Pro——但把 AI 作为一等公民融入剪辑工作流：在时间线上直接调用 SOTA 生成模型出视频和图片，或者把 Claude / Codex / Cursor 通过 MCP 接进来，让 agent 直接在时间线上创建和编辑。

**核心特性**：

- **Swift 原生性能**：不是 Electron 壳——从零构建的 macOS 原生应用，Apple Silicon 优化
- **内置生成式 AI**：Seedance / Kling / Nano Banana Pro 等 SOTA 模型直接在时间线上生成视频和图片
- **MCP 集成**：应用打开时暴露 MCP server（`http://127.0.0.1:19789/mcp`），Claude Code / Codex / Cursor / Claude Desktop 一行命令接入——agent 在对话中说"把这段视频调暗"就能直接操作时间线
- **内置 Agent**：应用内的 agent 模式，和外部 agent 可协作编辑同一项目

## 怎么安装

从 [Releases](https://github.com/palmier-io/palmier-pro/releases/latest) 下载 `PalmierPro.dmg`，要求 **macOS 26 (Tahoe) + Apple Silicon (M 系列)**。

## 怎么用

### MCP 接入 Claude Code

```bash
claude mcp add --transport http palmier-pro http://127.0.0.1:19789/mcp
```

### MCP 接入 Codex

```bash
codex mcp add palmier-pro --url http://127.0.0.1:19789/mcp
```

### MCP 接入 Cursor

应用内 Help → MCP Instructions → Install in Cursor，或手动添加到 `~/.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "palmier-pro": {
      "type": "http",
      "url": "http://127.0.0.1:19789/mcp"
    }
  }
}
```

### MCP 接入 Claude Desktop

应用内置 mcpb bundle：Help → MCP Instructions → Install in Claude Desktop 一键安装。

接入后在 agent 对话中直接描述剪辑操作（`"在 0:05 加一个转场"`、`"生成一段 5 秒的 B-roll 插到第二轨道"`），agent 通过 MCP 工具操作时间线。

## 注意事项

- **许可证**：v0.7.6 及之前源码为 **GPLv3**（`last-gpl-source` 分支可查）；v0.7.6 之后二进制版本为**专有许可**（源码未发布），使用前需阅读 BINARY_LICENSE.md。
- **平台限制**：仅 macOS 26 (Tahoe) + Apple Silicon。
- **不接受代码贡献**：仓库保留历史源码和二进制发布，不再接受 PR。
- **生成模型费用**：内置 Seedance / Kling / Nano Banana Pro 生成调用按 API 计费。
