---
id: agent-skills-spec
name_zh: Agent Skills 规范
name_en: Agent Skills Specification
summary_zh: Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。
summary_en: Open standard for agent skills (by Anthropic, community-driven) defining the SKILL.md structure and on-demand loading. Kept pointing to the live official spec.
category: meta-skillcraft
kind: spec
tags: [agent-skills, skill-md, spec, standard, interoperability]
languages: [markdown]
doc_languages: [en]
license: CC-BY-4.0
homepage: https://agentskills.io/specification
repo: https://github.com/anthropics/skills
tier: standard
metrics:
  stars: null
  pushed_at: null
  checked_at: "2026-08-10"
  archived: false
related: [superpowers]
aliases: [Agent Skills Specification, agentskills]
risk_notes: 规范是活的标准，本仓库刻意不冻结副本，始终指向官方最新版。
added_at: "2026-08-10"
updated_at: "2026-08-13"
---

# Agent Skills 规范

> 一份让 AI 智能体"即插即用"新能力的开放格式标准。
> 官方规范：[agentskills.io/specification](https://agentskills.io/specification) · 许可证：CC-BY-4.0

## 这是什么

由 Anthropic 发起、社区共建的**开放技能格式标准**：一个文件夹里放一份 `SKILL.md`
（含 name/description 元数据 + 指令），智能体运行时按需加载它获得某项专门能力。
回答的核心问题是：怎么把"给智能体的专业知识与工作流"打包成可版本化、可跨产品复用的资产。

## 怎么安装

无需安装——这是规范，直接阅读权威最新版即可：

```bash
# 在线阅读（推荐，始终最新）：
#   https://agentskills.io/specification

# 如需本地离线快照（个人阅读用，勿回传本仓库）：
git clone --depth 1 --filter=blob:none --sparse https://github.com/anthropics/skills /tmp/agent-skills-spec
cd /tmp/agent-skills-spec
git sparse-checkout set spec
```

## 怎么用

- **写 skill**：按规范的 `SKILL.md` frontmatter（name/description/license/…）与目录结构
  （scripts/references/assets）组织你的技能包；
- **对照自查**：本仓库 `docs/skill-spec-cheatsheet.md` 提供字段速查与常见偏差对照表。

## 注意事项

- 规范文本 CC-BY-4.0，可自由阅读、引用并注明出处；
- 本仓库刻意**不冻结规范副本**（它是活的标准），始终链接官方最新版；
- description 必须同时写清「做什么」与「何时用」，否则 Agent 不知道何时加载。
