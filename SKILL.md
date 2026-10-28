---
record_type: installable-skill
name: astracraft-recommender
description: 根据项目画像从天工计划目录中筛选并解释最匹配的 AI 开源项目与技能，支持推荐与清单两种模式。
id: AstraCraft Recommender
name_zh: 天工精选
name_en: AstraCraft Recommender
summary_zh: "天工计划配套推荐技能：AI Agent 安装后，依据用户项目的描述与实际运行情况，在本计划的 AI 开源项目库中筛选并给出最匹配的技能/项目与上手路径（中文优先）。"
summary_en: "A companion recommender for the AstraCraft Program: an AI agent screens this AI open-source catalog against a project description and running context, then returns the best-matching projects and skills with mode-specific get-started steps."
category: meta-skillcraft
mode: install
tags: [agent-methodology, ai-agent, ai-open-source, skill, cn-localization]
languages: [markdown]
doc_languages: [zh, en]
license: CC-BY-4.0
homepage: https://github.com/AvalonLee/AstraCraft-Program
repo: https://github.com/AvalonLee/AstraCraft-Program
related: [agent-skills-spec, superpowers]
aliases: [AstraCraft Recommender, 天工精选]
risk_notes: 推荐基于 LLM 对条目元数据的语义推理，非确定性召回；库数据按需拉取 skills.json 到独立缓存目录（非 skills 目录），不 clone 仓库；不自动安装任何项目；只推荐 verified 条目；推荐新项目仅限 GitHub 公开开源，经 Issue 模板提交、由维护者人工核验。
added_at: "2026-08-27"
updated_at: "2026-10-28"
---

# 天工精选（AstraCraft Recommender）

> 天工计划（AstraCraft Program）的配套推荐技能：按你的项目实况，从本计划的 AI 开源项目库里挑出最该用的技能或项目。
> 上游：[AvalonLee/AstraCraft-Program](https://github.com/AvalonLee/AstraCraft-Program) · 许可证：CC-BY-4.0
>
> 本文件即「天工精选」技能本体，位于仓库根目录，方便 Agent 直接抓取安装。

## 这是什么

天工精选是**一份技能、两种用法**：

- **推荐**：用户描述项目实况，返回最匹配的 3 个项目/技能，并说明怎么用。
- **清单**：用户问“有哪些 X”，按分类、消费方式、标签、协议等条件列出条目。

库里的条目按消费方式分四类，推荐结果必须说明属于哪一类：

| `mode` | 含义 | 用户要付出的代价 |
|---|---|---|
| `install` | 装进 Agent 的技能目录 | 复制文件 / 跑安装命令 |
| `connect` | 作为 MCP / CLI / API / SDK 被调用 | 接入并维护连接 |
| `deploy` | 自己跑起来（桌面端、服务、工作台） | 装环境、起服务 |
| `read` | 阅读规范、提示词库、资源集 | 打开读 |

一个项目只有一个主模式，判定顺序 **install > deploy > connect > read**。

## 怎么安装

本技能就是仓库根目录这一份 `SKILL.md`。**安装 = 只把这一份文件放进你的 skills 目录**，不需要克隆整个仓库。

> `entries/` 下的 95 份文件叫 `ENTRY.md`，是条目数据，不是技能；多数 Agent 不会把它们识别成技能。

```bash
# 以 WorkBuddy 为例；其他 agent 换成 ~/.claude/skills、~/.codex/skills、<项目>/.cursor/skills
mkdir -p ~/.workbuddy/skills/astracraft-recommender
curl -fsSL https://raw.githubusercontent.com/AvalonLee/AstraCraft-Program/main/SKILL.md \
  -o ~/.workbuddy/skills/astracraft-recommender/SKILL.md
```

## 怎么用

### 模式 A：推荐

**0. 取数据（每轮先做）**

读本地缓存 `skills.json`（见「数据更新」）。缓存不存在或超过 7 天，先问用户是否联网拉取，**不擅自联网**。

**1. 写项目画像**

```json
{
  "categories": ["design-creative"],
  "tags": ["video-production", "short-video"],
  "desired_modes": ["install", "connect"],
  "commercial": false,
  "offline": false,
  "doc_languages": ["zh"]
}
```

`desired_modes` 可不填；不填就四类混合推荐。填了只是加分，不硬性过滤。

**2. 确定性初筛**

优先跑仓库脚本（有仓库时）：

```bash
python scripts/recommender.py --catalog skills.json --profile profile.json --limit 3
```

脚本只返回 `verification_status: verified` 的条目，并给出逐项理由。没有脚本时按下表手工初筛：

| 信号 | 加分 | 说明 |
| --- | --- | --- |
| 分类命中 | +3 | 项目领域落在某条目的 `category` |
| 标签命中 | 每个 +2 | 项目关键词命中条目 `tags` |
| 消费方式匹配 | +1 | 命中 `desired_modes` |
| 层级加权 | core +2 / standard +1 / watch 0 | 来自 `tier` |
| 许可证契合 | 开放协议 +1；商用受限且项目需商用 −2 | `license` 为 UNKNOWN 或被标注受限时降权 |
| 文档语言匹配 | +1 | 中文团队优先 `doc_languages` 含 `zh` |
| 离线冲突 | −3 | 项目要求离线而条目依赖云服务 |

**3. 语义终审**

对初筛前列逐条判断“是否真能解决用户的具体问题”，剔除字面命中；结合 `mode` 说明代价，结合 `risk_notes` / `checked_at` 判断可用性。

**4. 产出（每轮 3 个）**

```text
### 推荐 1/3：<中文名>（<English Name>）
- 分类：<分类> · 消费方式：<装进 Agent / 接入 Agent / 部署运行 / 阅读参考> · 评级：<主推/常规/观察> · 许可证：<license>
- 定位：<summary_zh 一句话>
- 匹配理由：命中分类「…」；标签「…」；消费方式匹配
- 上手（<怎么安装 / 怎么接入 / 怎么部署运行 / 怎么阅读>）：
  <quickstart 或条目同名小节内容>
```

不替用户执行安装。用户要“再来 3 个”就取下一批。

### 模式 B：清单

用户问“有哪些……”“列一下……”时，直接检索 `skills.json`，不要打分：

- 支持条件：`category_dir`、`mode`、`tags`、`tier`、`license` / `license_bucket`、`doc_languages`、关键词。
- 默认只列 `verification_status: verified`；用户要全量时再放开，并标出未核验项。
- 输出表：`名称 | 分类 | 消费方式 | 评级 | 协议 | 一句话 | 上手入口`（入口用 `detail_url` 或 `source_url`）。

### 数据更新

- **数据源**：`https://avalonlee.github.io/AstraCraft-Program/data/skills.json`（单文件，含全部元数据与 `quickstart`）。
- **缓存**：`~/.cache/astracraft-catalog/skills.json`（Windows：`%LOCALAPPDATA%/astracraft-catalog/skills.json`）。**这不是 skills 目录**，不会被注册成技能。
- **首次 / 过期**：用户同意后 `curl -fsSL <上面的 URL> -o <缓存路径>`；不需要 clone 仓库。
- **过期判断**：`generated_at` 距今超过 7 天，或 `dataset_version` 与用户提到的版本不符时提示。
- **离线**：仍可用旧缓存推荐，但要在结果里说明数据日期。

`skills.json` 关键字段：

| 字段 | 用途 |
|---|---|
| `schema_version` / `dataset_version` / `generated_at` | 契约版本与新鲜度 |
| `category_dir` / `category_name` | 分类筛选 |
| `mode` / `mode_label` | 消费方式与代价 |
| `tags` / `languages` / `doc_languages` | 检索与可用性 |
| `license` / `license_bucket` | 能否商用 |
| `tier` / `tier_label` | 推荐权重 |
| `verification_status` / `health_score` / `checked_at` | 核验状态；推荐只用 `verified` |
| `quickstart` | 上手命令；为空时取 `source_url` 正文 |
| `detail_url` / `source_url` / `repo` | 详情页、条目原文、上游仓库 |

## 推荐新项目（仅限 GitHub 开源）

- **提交方式**：在本仓库开 Issue，使用「建议收录新条目」模板（`.github/ISSUE_TEMPLATE/new-entry.yml`），填写 GitHub 公开仓库、中英文名称、一句话定位、建议分类与消费方式、许可证、收录理由。
- **既有条目调整**：用「建议调整既有条目」模板（`.github/ISSUE_TEMPLATE/change-request.yml`）。
- **处理流程**：维护者核验开源属性与质量后合入 `entries/`，刷新 `INDEX.md` / `site/` 与 `data-version.json`。
- **为何走 Issue**：保证每条收录都经人工核验，避免未经审查的内容进入索引。

## 注意事项

- **只推荐、不自动安装**：产出清单与命令，是否执行由用户决定。
- **只推 verified**：`needs-review` / `blocked` / `unverified` 条目只进清单并标注，不进推荐。
- **非确定性召回**：LLM 语义推理会随表述变化；补充项目细节后可重跑。
- **数据只有元数据**：每个条目只有一份 `ENTRY.md`，不收录上游源码；安装命令指向上游仓库。
- **许可证**：`license` 仅作参考，最终以上游 LICENSE 全文为准。
- CC-BY-4.0 许可，可自由阅读、引用并注明出处。
