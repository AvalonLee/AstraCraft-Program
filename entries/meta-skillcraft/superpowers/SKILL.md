---
id: superpowers
name_zh: Superpowers 开发方法论
name_en: Superpowers
summary_zh: 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。
summary_en: A complete software development methodology for coding agents, built on 14 composable skills (TDD, parallel subagents, systematic debugging, code review, etc.).
category: meta-skillcraft
kind: skill-collection
tags: [agent-methodology, tdd, subagent, code-review, claude-code, git-worktree, software-engineering]
languages: [markdown]
doc_languages: [en]
license: MIT
homepage: https://github.com/obra/superpowers
repo: https://github.com/obra/superpowers
tier: core
metrics:
  stars: 270037
  pushed_at: "2026-08-08T01:45:49Z"
  checked_at: "2026-08-10"
  archived: false
related: [agent-skills-spec]
aliases: [obra-superpowers]
risk_notes: null
added_at: "2026-08-10"
updated_at: "2026-08-13"
---

# Superpowers 开发方法论

> 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成。
> 上游：[obra/superpowers](https://github.com/obra/superpowers) · 许可证：MIT

## 这是什么

一套让编码智能体（Claude Code / Codex / Cursor 等）**先想清楚再动手**的开发方法论：
在动手前先厘清需求、产出计划，再由智能体自驱执行。核心 skill 包括 TDD、并行子代理
（subagent-driven development）、系统化调试、代码评审、brainstorming、git worktree 等，
共 14 个可独立或组合使用的 skill。

## 怎么安装

```bash
# 1) 克隆上游
git clone --depth 1 https://github.com/obra/superpowers.git /tmp/superpowers

# 2) 把技能复制到你的 agent 的 skills 目录（以下以 Claude Code 为例）
mkdir -p ~/.claude/skills
cp -r /tmp/superpowers/skills/* ~/.claude/skills/

# 若你的 agent 支持插件（plugin），也可按上游文档安装 .claude-plugin / .codex-plugin
```

## 怎么用

重启 agent 会话后，技能会被自动发现。例如：

- 面对复杂任务时，提示 agent 使用 `brainstorming` 先厘清需求、产出计划；
- 写代码时让其遵循 `test-driven-development`；
- 出问题时调用 `systematic-debugging` 走结构化排查流程。

## 注意事项

- 上游仓库包含 `.claude-plugin` / `.codex-plugin` / `.cursor-plugin` / `.kimi-plugin`
  等多客户端清单，跨平台适配好；
- 技能是英文撰写，中文用户可先读各 skill 的 SKILL.md 再决定是否启用；
- MIT 许可，可自由使用与再分发；具体条款以上游 LICENSE 为准。
