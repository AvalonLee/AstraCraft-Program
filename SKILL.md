---
id: AstraCraft Recommender
name_zh: 天工精选
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
aliases: [AstraCraft Recommender, 天工精选]
risk_notes: 推荐基于 LLM 对条目元数据的语义推理，非确定性召回；需克隆全量仓库以读取最新条目，不自动安装任何技能；推荐新项目仅限 GitHub 公开开源，经 Issue 模板提交、由维护者人工核验。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# 天工精选（AstraCraft Recommender）

> 天工计划（AstraCraft Program）的配套推荐技能：让 AI Agent 按你的项目实况，从本计划的 skill 库里挑出最该装的技能。
> 上游：[AvalonLee/AstraCraft-Program](https://github.com/AvalonLee/AstraCraft-Program) · 许可证：CC-BY-4.0
>
> 本文件即「天工精选」技能本体，位于仓库根目录，方便 Agent 直接抓取安装。

## 这是什么

天工精选是天工计划（AstraCraft Program）的**配套推荐技能**，本身是一份 `SKILL.md`，
不是一个独立产品。它的职责是：AI Agent 安装它之后，根据你给出的**项目描述与实际运行情况**，
在本计划的 skill 库（`entries/` 下按分类组织的各条目）中做语义匹配，返回**最匹配的若干技能及其安装指引**。

它解决的核心问题是：天工计划已收录几十个技能，用户往往不知道"我这个场景该装哪一个"。
天工精选把"按需挑选"这件事交给 Agent 完成——你描述项目，它给清单。

## 怎么安装

天工精选依赖本计划的**全量条目元数据**做匹配，因此先克隆仓库（取最新数据），再把本技能（仓库根目录 `SKILL.md`）复制到 Agent 的 skills 目录：

```bash
# 1) 克隆天工计划全量仓库（用于读取最新 skill 库）
git clone --depth 1 https://github.com/AvalonLee/AstraCraft-Program /tmp/astracraft

# 2) 把仓库根目录的 SKILL.md（即「天工精选」技能）复制到你的 agent 的 skills 目录
#    以 Claude Code 为例：
mkdir -p ~/.claude/skills/astracraft-recommender
cp /tmp/astracraft/SKILL.md ~/.claude/skills/astracraft-recommender/SKILL.md

# 其他 agent 请替换为对应 skills 目录，例如：
#   Codex:      ~/.codex/skills/astracraft-recommender/
#   Cursor:     <项目>/.cursor/skills/astracraft-recommender/
#   WorkBuddy:  ~/.workbuddy/skills/astracraft-recommender/
```

> 数据源始终是 `entries/<category>/<id>/SKILL.md` 的 frontmatter（id / 分类 / 标签 / 层级 / 许可证 / 简介）。
> 不与上游源码耦合——本计划只收录「入口说明」，不转载源码，所以匹配时只读元数据即可。

## 怎么用

把"项目画像"交给 Agent（装了本技能后它会自动按下面流程推理），例如：

> 我在一个 Windows 内网单机环境做产品看板系统，技术栈 Vue3 + FastAPI + SQLite，
> 需要定时把看板导出成 PDF 报表、做运维账号双角色鉴权，团队用中文协作。

Agent 应按以下**数据检查 → 打分初筛 → 语义终审 → 标准化产出**的流程工作：

**0. 数据新鲜度检查（每轮调用先做）**

读取仓库根目录 `data-version.json` 的 `updated_at`；若距今天数 > 7，先询问用户：

> 「本地数据已 N 天未更新（当前版本 `260827`），是否联网拉取最新数据？」
> 仅当用户确认后才执行 `git pull`（见「数据更新机制」），**不擅自联网**。

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

**3. 标准化产出（每轮 3 个）**

按匹配度从高到低取**前 3 个**，用统一格式依次输出（不替用户执行安装）：

```text
### 推荐 1/3：<中文名>（<English Name>）
- 分类：<category 中文名> · 层级：<tier 中文> · 许可证：<license>
- 定位：<summary_zh 一句话>
- 匹配理由：命中分类「<…>」；标签「<…>」；层级加权 +<…>
- 安装：
  <复读该条目 SKILL.md「怎么安装」代码块>

### 推荐 2/3：<中文名>（<English Name>）
…

### 推荐 3/3：<中文名>（<English Name>）
…
```

若用户要求"再给 3 个"，则按匹配度取下一批 3 个，格式同上。

## 数据更新机制

本技能的推荐质量依赖 `entries/` 的当前内容。仓库根目录 `data-version.json` 记录数据集版本与更新日期：

```json
{ "version": "260827", "updated_at": "2026-08-27", "source": "https://github.com/AvalonLee/AstraCraft-Program" }
```

- **过期自动提示**：每次调用本技能时，先读 `data-version.json` 的 `updated_at`；若距今天数 > 7，主动询问用户「本地数据已 N 天未更新，是否联网拉取最新数据？」，由用户决定（绝不擅自联网）。
- **联网更新**：用户同意后，`git pull`（或重新 `git clone`）上游仓库获取最新 `entries/` 与 `data-version.json`；版本号随维护者刷新而递进（格式 `YYMMDD`，如 `260827`）。
- **用户主动更新**：用户也可随时说"更新数据"，流程同上。
- 不联网时仍可基于本地 `entries/` 继续推荐，仅时效性下降。

## 推荐新项目（仅限 GitHub 开源）

欢迎为本计划贡献新技能条目，但出于安全与可审计考虑，**仅接受 GitHub 公开开源项目**，不接受闭源 / 私有 / 未公开仓库的推荐。

- **提交方式**：在本仓库提交 Issue，使用「建议收录新条目」模板（`.github/ISSUE_TEMPLATE/new-entry.yml`），填写：GitHub 公开仓库地址、中英文名称、一句话定位、建议分类、许可证、收录理由。模板已强制「GitHub 公开开源」自检。
- **既有条目调整**：更名、改分类、修许可证、补安装指令等调整，请提交「建议调整既有条目」模板（`.github/ISSUE_TEMPLATE/change-request.yml`），与新增一并归口 Issue 处理。
- **处理流程**：维护者定期处理 Issues，核验开源属性与内容质量后合入 `entries/`、刷新 `INDEX.md` / `site/` 与 `data-version.json` 版本号；调整类 Issue 也由维护者统一落库。
- **为何走 Issue 而非自动写入**：保证每条收录 / 调整都经人工核验开源属性与质量，避免未经审查的内容进入索引。

## 注意事项

- **只推荐、不自动安装**：本技能产出清单与安装命令，是否执行由用户决定（避免未经确认改动用户环境）。
- **数据时效**：匹配质量依赖 `entries/` 的当前内容；本地数据超过 7 天会提示更新，详见「数据更新机制」。
- **非确定性召回**：匹配是 LLM 语义推理，不是精确检索，结果可能随表述微调；若用户补充项目细节，可重新跑一轮。
- **数据源仅元数据**：本计划每个条目只有一份 `SKILL.md`（入口说明），不收录上游源码；安装命令指向条目声明的上游仓库。
- **许可证可读**：`license` 字段仅作"能否商用"的快速提示，最终以各条目上游 LICENSE 为准；标注 `UNKNOWN` 的需用户自行核实。
- CC-BY-4.0 许可，可自由阅读、引用并注明出处。
