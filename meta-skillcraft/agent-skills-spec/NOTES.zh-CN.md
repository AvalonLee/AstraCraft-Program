<!--
实测笔记 —— link-only 存根条目。

本条目不收录源码（刻意 link-only 指向实时规范），因此这里记录的是
「对规范本身的研读结论」与「为何选择 link-only」，而非代码实测。
admission.tier 为 standard，CI 不强制本文件非空，但写清楚有助于读者判断。
-->

# 笔记：Agent Skills 规范

**记录日期**：2026-08-10
**记录环境**：Windows 11 / Git Bash / 浏览器研读 agentskills.io 与 anthropics/skills
**对应版本**：实时规范（https://agentskills.io/specification）

## 读了什么

- 规范站点 agentskills.io 的 Overview 与 Specification 章节
- 官方仓库 `anthropics/skills` 的 `spec/` 目录与 README（Apache-2.0 代码 / CC-BY-4.0 文档）

## 关键结论

- **格式极简可落地**：一个 `SKILL.md` + 可选 scripts/references/assets 即可成技能，
  前端 frontmatter 的 `name`/`description` 是智能体"何时想起用它"的关键，值得精雕。
- **渐进式披露是核心机制**：启动只加载 name+description，匹配才读全文，上下文友好。
- **跨客户端已成趋势**：Claude Code、Cursor、Gemini CLI、Codex 等均已支持，
  写一次可在多端复用。

## 为什么本仓库选择 link-only（而非 vendoring）

规范是**活的标准**，会随生态演进。冻结一份副本极易让读者用到过时字段约束，
反而有害。CC-BY-4.0 虽允许再分发，但我们刻意只链接官方实时版本，
并在 CI 中接受「A 级可 vendoring 但 mode=link-only」的预期告警。

## 与本仓库的关系

- 本仓库 `scripts/schema/meta.schema.json` 的 `kind` 枚举与字段理念对齐此规范；
- `docs/skill-spec-cheatsheet.md` 把规范字段整理成速查表，可作为编写自有 skill 的入口。

## 上游补充说明

无（未改动、未留存任何上游文件）。
