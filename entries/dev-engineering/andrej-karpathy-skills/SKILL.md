---
record_type: entry-record
id: andrej-karpathy-skills
name_zh: "Karpathy 编码指南"
name_en: "Karpathy-Inspired Claude Code Guidelines"
summary_zh: "把 Andrej Karpathy 关于 LLM 编码通病的观察提炼成一份行为指南，用「先思考、简洁优先、外科手术式改动、目标驱动执行」四条原则改善 Agent 编码行为，支持注入 CLAUDE.md、Claude Code 插件与 Cursor 规则。"
summary_en: "A single-file Claude Code guideline distilled from Andrej Karpathy's observations on LLM coding pitfalls: Think Before Coding, Simplicity First, Surgical Changes, and Goal-Driven Execution."
category: dev-engineering
kind: skill
tags: [software-engineering, code-review, agent-methodology, claude-code, skill, de-slop]
languages: [markdown]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/multica-ai/andrej-karpathy-skills
repo: https://github.com/multica-ai/andrej-karpathy-skills
tier: standard
aliases: [karpathy-guidelines, Karpathy 编码规范]
risk_notes: 仅注入 Agent 的行为规则，不改动任何代码仓库；默认面向 Claude Code 与 Cursor（含 .cursor/rules），其他 Agent 需手动适配；规则偏向「谨慎优于速度」，简单任务可能略显繁琐；CLAUDE.md 会与项目既有规范叠加，建议合并而非直接覆盖。
added_at: "2026-08-28"
updated_at: "2026-08-28"
---

# Karpathy 编码指南

> 一份 Claude Code 行为指南，衍生自 Andrej Karpathy 关于 LLM 编码通病的观察。上游：[multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) · 许可证：MIT

## 这是什么

这个项目把 Karpathy 观察到的 LLM 编码通病归纳为可注入 Agent 的四条原则，帮助模型「先思考再动手、把代码写得尽量简单、只做最小改动、以可验证的目标推进」：

- **先思考（Think Before Coding）**：显式陈述假设、遇到歧义不擅自解读、恰当时提出更简方案、困惑就停下来澄清。
- **简洁优先（Simplicity First）**：只做被要求的功能，不写投机代码与无谓抽象，200 行能写成 50 行就重写。
- **外科手术式改动（Surgical Changes）**：只动必须动的代码，不改动相邻未破坏的代码与注释，不为「顺手优化」而重构。
- **目标驱动执行（Goal-Driven Execution）**：把「加校验」「修 bug」「重构 X」转化为可验证的测试目标，围绕成功判据循环直至通过，减少反复澄清。

它不修改你项目内的任何逻辑代码，只以一份规则（CLAUDE.md）+ 技能包（Skill）+ 插件/Cursor 规则的形式注入 Agent 的行为约束。

## 怎么安装

方式一：作为 Claude Code 插件（全项目生效）——在 Claude Code 内依次执行：

```
/plugin marketplace add multica-ai/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

方式二：注入到 `CLAUDE.md`（按项目）

新项目：

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/multica-ai/andrej-karpathy-skills/main/CLAUDE.md
```

追加到已有项目：

```bash
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/multica-ai/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

方式三：Cursor —— 仓库自带项目规则 `.cursor/rules/karpathy-guidelines.mdc`，可直接在 Cursor 中启用，见仓库 `CURSOR.md` 的跨项目配置说明。

具体插件/市场 id 请以仓库当前 README 为准，不同 Agent 的插件市场机制可能不同。

## 怎么用

安装后即可生效，无需额外操作。用于评估是否生效的观察信号：

- diff 中只出现被要求的改动，罕见无关修改；
- 代码第一次就写得简单，很少因过度设计被重写；
- 澄清性问题出现在实现之前，而不是出错之后；
- PR 干净、最小，没有顺手重构或「顺手改进」。

它也支持与项目特定规则合并：在 `CLAUDE.md` 中追加「## Project-Specific Guidelines」小节，补充如「API 端点必须有测试」「遵循现有错误处理模式」等约定。

## 注意事项

- **只改行为、不改代码**：本技能不触达仓库源码，安装后需确认你的 Agent 正确加载了对应规则文件。
- **Agent 适配**：规则文本以 Claude Code / Cursor 为主，其他 Agent 需将规则内容放入其对应的项目上下文文件。
- **与项目规范共存**：`CLAUDE.md` 会与项目既有说明叠加，推荐合并追加而非覆盖，避免冲突。
- **权衡定位**：这套规则偏向「谨慎优于速度」，对简单任务（如一个明显的单行修复）建议按需取舍，不必事事套足四个环节。
- **MIT 许可证**：可自由用于个人或项目内，商用项目请自行确认上游许可条款。