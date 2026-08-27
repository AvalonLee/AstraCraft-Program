---
id: skill-recommender
name_zh: 天工甄选
name_en: AstraCraft Recommender
summary_zh: "天工计划配套推荐技能：AI Agent 安装后，依据用户项目的描述与实际运行情况，在本计划的 skill 库中筛选并给出最匹配的技能与安装指引（中文优先）。"
summary_en: "A companion recommender for the AstraCraft Program: an AI agent screens this skill library against a project description and running context, then returns the best-matching skills and install steps."
category: meta-skillcraft
kind: skill
tags: [agent-methodology, ai-agent, skill, cn-localization]
languages: [markdown]
doc_languages: [zh, en]
license: CC-BY-4.0
homepage: https://github.com/AvalonLee/AstraCraft-Program
repo: https://github.com/AvalonLee/AstraCraft-Program
tier: standard
related: [agent-skills-spec, superpowers]
aliases: [AstraCraft Recommender, 天工甄选]
risk_notes: 推荐基于 LLM 对条目元数据的语义推理，非确定性召回；需克隆全量仓库以读取最新条目，不自动安装任何技能。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# 天工甄选（AstraCraft Recommender）

> 天工计划（AstraCraft Program）的配套推荐技能：让 AI Agent 按你的项目实况，从本计划的 skill 库里挑出最该装的技能。
> 上游：[AvalonLee/AstraCraft-Program](https://github.com/AvalonLee/AstraCraft-Program) · 许可证：CC-BY-4.0

## 这是什么

天工甄选是天工计划（AstraCraft Program）的**配套推荐技能**，本身是一份 `SKILL.md`，
不是一个独立产品。它的职责是：AI Agent 安装它之后，根据你给出的**项目描述与实际运行情况**，
在本计划的 skill 库（`entries/` 下按分类组织的各条目）中做语义匹配，返回**最匹配的若干技能及其安装指引**。

它解决的核心问题是：天工计划已收录几十个技能，用户往往不知道"我这个场景该装哪一个"。
天工甄选把"按需挑选"这件事交给 Agent 完成——你描述项目，它给清单。

## 怎么安装

天工甄选依赖本计划的**全量条目元数据**做匹配，因此先克隆仓库（取最新数据），再把本技能复制到 Agent 的 skills 目录：

```bash
# 1) 克隆天工计划全量仓库（用于读取最新 skill 库）
git clone --depth 1 https://github.com/AvalonLee/AstraCraft-Program /tmp/astracraft

# 2) 把「天工甄选」技能复制到你的 agent 的 skills 目录
#    以 Claude Code 为例：
mkdir -p ~/.claude/skills
cp -r /tmp/astracraft/entries/meta-skillcraft/skill-recommender ~/.claude/skills/

# 其他 agent 请替换为对应 skills 目录，例如：
#   Codex:      ~/.codex/skills/
#   Cursor:     <项目>/.cursor/skills/
#   WorkBuddy:  ~/.workbuddy/skills/
```

> 数据源始终是 `entries/<category>/<id>/SKILL.md` 的 frontmatter（id / 分类 / 标签 / 层级 / 许可证 / 简介）。
> 不与上游源码耦合——本计划只收录「入口说明」，不转载源码，所以匹配时只读元数据即可。

## 怎么用

把"项目画像"交给 Agent（装了本技能后它会自动按下面流程推理），例如：

> 我在一个 Windows 内网单机环境做产品看板系统，技术栈 Vue3 + FastAPI + SQLite，
> 需要定时把看板导出成 PDF 报表、做运维账号双角色鉴权，团队用中文协作。

Agent 应按以下**打分初筛 + 语义终审**的流程产出推荐：

**1. 结构化打分（冷启动，保证不漏 relevant 条目）**

| 信号 | 加分 | 说明 |
| --- | --- | --- |
| 分类命中 | +3 | 项目领域落在某条目的 `category` |
| 标签命中 | 每个 +2 | 项目关键词命中条目 `tags`（含 `primary` 受控标签） |
| 类型匹配 | +1 | `kind`（skill / mcp-server / cli-tool / framework / spec）契合需求形态 |
| 层级加权 | core +2 / standard +1 / watch 0 | 来自 `tier`，优先推已实测或公认优质的 |
| 许可证契合 | 命中 +1 / 商用受限且项目需商用则 −2 | `license` 为 `UNKNOWN` 或被标注不可商用时整体降权 |

**2. LLM 语义终审（去噪，保证相关而非堆砌）**

对打分进入前列的候选用语言模型判断"是否真能解决用户的具体问题"，剔除仅字面命中的条目；
同时结合 `risk_notes` / `doc_languages` / `languages` 等字段判断可用性（如中文团队优先 `cn-localization`、需要离线则看是否 `self-hosted`）。

**3. 产出推荐**

按匹配度从高到低列出 3–5 个技能，每个给出：
- 条目中文名 + 英文名 + 一句话定位（取自 `summary_zh`）；
- 为什么匹配（命中了哪些分类/标签/层级）；
- **安装指引**：直接复读该条目 `SKILL.md` 的「怎么安装」代码块，**不要替用户执行安装**。

## 注意事项

- **只推荐、不自动安装**：本技能产出清单与安装命令，是否执行由用户决定（避免未经确认改动用户环境）。
- **需最新数据**：匹配质量依赖 `entries/` 的当前内容；上游新增条目后请重新 `git clone` 拉取，本技能不联网实时查询。
- **非确定性召回**：匹配是 LLM 语义推理，不是精确检索，结果可能随表述微调；若用户补充项目细节，可重新跑一轮。
- **数据源仅元数据**：本计划每个条目只有一份 `SKILL.md`（入口说明），不收录上游源码；安装命令指向条目声明的上游仓库。
- **许可证可读**：`license` 字段仅作"能否商用"的快速提示，最终以各条目上游 LICENSE 为准；标注 `UNKNOWN` 的需用户自行核实。
- CC-BY-4.0 许可，可自由阅读、引用并注明出处。
