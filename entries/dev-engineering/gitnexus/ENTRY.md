---
record_type: entry-record
id: gitnexus
name_zh: "GitNexus 代码知识图谱"
name_en: "GitNexus — Zero-Server Code Intelligence Engine"
summary_zh: "把代码库索引成符号、调用、依赖与执行流的知识图谱，让编码 Agent 回答「谁调用这个函数」「这个改动影响什么」时有真实代码依据；npx 一条命令建索引，通过 MCP 工具、CLI 或网页图浏览器使用，支持 Claude Code、Cursor、Codex、Qoder 等编辑器。"
summary_en: "Indexes a codebase into a knowledge graph of symbols, calls, dependencies and flows; query it from your coding agent via MCP tools, CLI, or a web graph explorer."
category: dev-engineering
mode: connect
tags: [code-graph, mcp, cli, claude-code, codex, ai-agent]
languages: [typescript]
doc_languages: [en]
license: PolyForm-Noncommercial-1.0.0
homepage: https://gitnexus.vercel.app
repo: https://github.com/abhigyanpatwari/GitNexus
docs_url: https://github.com/abhigyanpatwari/GitNexus/tree/main/docs
tier: standard
metrics:
  stars: 48099
  pushed_at: "2026-10-29T01:20:03Z"
  checked_at: "2026-10-29"
  archived: false
related: [mcp, ai-agent]
aliases: [GitNexus, gitnexus]
risk_notes: "PolyForm Noncommercial 1.0.0 仅限非商业用途，商用需另行取得授权。analyze 默认会改写仓库内的 AGENTS.md / CLAUDE.md 并注册 Claude Code hooks，接入他人仓库前先确认这些集成文件的影响（--index-only 可只建索引）。图谱查询结果依赖语言支持与索引新鲜度，存在覆盖与歧义限制，重要重构决策仍需人工核对。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# GitNexus 代码知识图谱

> 把代码库建成符号与调用关系的知识图谱，让 Agent 的代码问答有据可查。上游：[abhigyanpatwari/GitNexus](https://github.com/abhigyanpatwari/GitNexus) · 许可证：PolyForm Noncommercial 1.0.0

## 这是什么

GitNexus 对代码库做静态分析，索引成一张知识图谱：函数与类等符号、调用关系、依赖和执行流。建好索引后，编码 Agent 回答「这个函数被谁调用」「这个改动会影响哪些路径」时可以查图谱，而不是靠全文搜索猜。

它提供三条使用路径：

- **MCP 工具**：把 `query` / `context` / `impact` / `trace` / `detect_changes` / `rename` 等工具注册进 Claude Code、Cursor、Codex、Qoder 等编辑器，Agent 直接调用。
- **CLI**：命令行查询图谱，适合脚本与 CI。
- **网页图浏览器**：可视化浏览符号与调用关系。

## 怎么接入

要求 Node.js 22.18+（22.x）或 24.11+。在仓库根目录建索引并完成编辑器接入：

```bash
# 建索引 + 安装 Agent 技能 + 注册 hooks + 写 AGENTS.md / CLAUDE.md
npx gitnexus analyze

# 只建索引，不改仓库集成文件
npx gitnexus analyze --index-only

# 检测并配置 MCP（可多选：claude-code,cursor,codex,qoder 等）
npx gitnexus setup
```

频繁使用可全局安装：`npm install -g gitnexus`。

## 怎么用

索引建好后，在支持的编辑器里直接让 Agent 调用 MCP 工具提问：

- `query`：找代码与相关执行流；
- `context`：看某个符号的调用方与依赖；
- `impact`：评估一处改动可能影响什么；
- `trace`：在两个符号之间找调用路径；
- `detect_changes`：审查一个 Git diff 的影响面；
- `rename`：预览并应用语义化重命名。

也可以直接在 CLI 里问同类问题。回答会标注歧义、索引新鲜度与覆盖范围，拿不准的点先看这些标注。

## 注意事项

- **非商业许可**：PolyForm Noncommercial 1.0.0，公司项目或商业产品使用需另行取得授权（同类场景可对比 Apache-2.0 条目）。
- **仓库集成文件**：默认 `analyze` 会写 `AGENTS.md` / `CLAUDE.md` 并注册 Claude Code hooks，在他人仓库或严谨工程里接入前先确认影响，必要时用 `--index-only`。
- **结果有边界**：解析依赖语言支持与索引新鲜度，重构后记得重新 `analyze`；图谱结论是参考，重大决策仍需人工核对源码。
