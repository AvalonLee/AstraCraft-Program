---
record_type: installable-skill
name: astracraft-recommender
description: 根据项目画像从天工计划目录中筛选并解释最匹配的 AI 开源项目与技能：优先联网核对上游最新状态，网络不可用时回退本地数据并明确提示，支持推荐与清单两种模式。
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
risk_notes: 推荐基于 LLM 对条目元数据的语义推理，非确定性召回；默认先联网核对最终候选的上游状态（只读 GitHub 公开元数据，不 clone、不写入、不安装），网络失败时回退本地数据并明确提示；库数据按需拉取 skills.json 到独立缓存目录（非 skills 目录）；不自动安装任何项目；只推荐 verified 且非观察期条目；推荐新项目仅限 GitHub 公开开源，经 Issue 模板提交、由维护者人工核验。
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

> `entries/` 下的 96 份文件叫 `ENTRY.md`，是条目数据，不是技能；多数 Agent 不会把它们识别成技能。

```bash
# 以 WorkBuddy 为例；其他 agent 换成 ~/.claude/skills、~/.codex/skills、<项目>/.cursor/skills
mkdir -p ~/.workbuddy/skills/astracraft-recommender
curl -fsSL https://raw.githubusercontent.com/AvalonLee/AstraCraft-Program/main/SKILL.md \
  -o ~/.workbuddy/skills/astracraft-recommender/SKILL.md
```

## 怎么用

### 模式 A：推荐

**0. 准备数据（每轮先做，在线优先）**

- **先联网**：拉最新 `skills.json`（见「数据更新」）。
- **本地初筛**：按第 2 步筛出候选，只保留前 5 条进入后续处理；候选只能来自 `verified` 且**非观察期**（`tier` ≠ `watch`）的条目。
- **在线核验候选**：写推荐前，对这 5 条逐条查一次 GitHub 最新状态，用最新事实修正判断。
- **联网失败**：不中断流程，改用本地数据完成推荐，并按「联网失败」的格式明确提示。

在线核验**只查最终候选，不扫全库**——没有 token 时 GitHub API 每小时只有 60 次额度。

```bash
# 每条候选一次请求；<owner>/<repo> 取自 skills.json 的 repo 字段
curl -fsS -m 10 "https://api.github.com/repos/<owner>/<repo>" \
  | jq '{archived, pushed_at, stars: .stargazers_count, license: .license.spdx_id}'
```

| 核验结果 | 处理 |
|---|---|
| 请求失败 / 403 限流 / 超时 / 非 JSON | 转「联网失败」流程 |
| `archived: true` | 不推荐；用户明确要历史项目时才列为观察 |
| `pushed_at` 距今超过 12 个月 | 降权，并在理由里注明「上游近期无更新」 |
| `license` 与条目记录不一致 | 以在线结果为准，展示时注明「在线核验为 X，条目记录为 Y」 |
| star 数有变化 | 展示最新值；跨过 1000 / 50 的量级门槛时按弱权重重算 |

**联网失败**（超时、连接被重置、403 限流、返回非 JSON）：

- 最多重试 1 次，仍失败就用本地数据继续。
- 结果最上方必须写一行：
  `⚠ 联网核验失败（<原因>），本次基于本地数据（dataset <dataset_version>，核验于 <checked_at>），上游指标可能已过时；网络恢复后可重跑。`
- 不得静默降级，也不得把本地数据说成最新数据。

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

`desired_modes` 可不填；不填就四类混合推荐。填了只是加分，不硬性过滤。`offline: true` 表示用户要求本轮不联网。

**2. 确定性初筛**

优先跑仓库脚本（有仓库时）：

```bash
python scripts/recommender.py --catalog skills.json --profile profile.json --limit 3
```

脚本只返回 `verification_status: verified` 且非观察期（`tier` ≠ `watch`）的条目，并给出逐项理由。没有脚本时按下表手工初筛：

| 信号 | 加分 | 说明 |
| --- | --- | --- |
| 分类命中 | +3 | 项目领域落在某条目的 `category` |
| 标签命中 | 每个 +2 | 项目关键词命中条目 `tags` |
| 消费方式匹配 | +1 | 命中 `desired_modes` |
| 层级加权 | core +2 / standard +1；watch 直接排除 | 来自 `tier`，观察期条目不进推荐 |
| star 热度 | ≥1000 +1 / <50 −1 | 弱权重，只看量级，不按最新数字排序 |
| 许可证契合 | 开放协议 +1；商用受限且项目需商用 −2 | `license` 为 UNKNOWN 或被标注受限时降权 |
| 文档语言匹配 | +1 | 中文团队优先 `doc_languages` 含 `zh` |
| 离线冲突 | −3 | 项目要求离线而条目依赖云服务 |
| 在线核验 | 归档直接排除；12 个月无更新 −1 | 以第 0 步的 GitHub 最新结果为准 |

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

结果末尾注明数据来源：在线核验成功写 `数据来源：在线核验 <时间>`；回退时写「联网失败」要求的那一行提示。

### 模式 B：清单

用户问“有哪些……”“列一下……”时，直接检索 `skills.json`，不要打分：

- 支持条件：`category_dir`、`mode`、`tags`、`tier`、`license` / `license_bucket`、`doc_languages`、关键词。
- 默认只列 `verification_status: verified` 的条目；观察期（`tier: watch`）条目在清单里照常列出并标注，但不会出现在推荐里。
- 输出表：`名称 | 分类 | 消费方式 | 评级 | 协议 | 一句话 | 上手入口`（入口用 `detail_url` 或 `source_url`）。

### 数据更新（在线优先）

- **数据源**：`https://avalonlee.github.io/AstraCraft-Program/data/skills.json`（单文件，含全部元数据与 `quickstart`）。
- **优先联网**：每轮先 `curl -fsSL -m 20 <数据源> -o <缓存路径>` 拉最新版；超时或失败按「联网失败」处理，再退回缓存。缓存只是回退副本，不是主数据源。
- **缓存**：`~/.cache/astracraft-catalog/skills.json`（Windows：`%LOCALAPPDATA%/astracraft-catalog/skills.json`）。**这不是 skills 目录**，不会被注册成技能。
- **回退顺序**：拉取失败 → 用已有缓存 → 没有缓存再用仓库内 `site/data/skills.json`；两种情况都要按「联网失败」的要求说明原因与数据日期。
- **在仓库内工作时**：本地 `site/data/skills.json` 就是最新生成物，直接用；在线核验照常做。
- **过期判断**：`generated_at` 距今超过 7 天，或 `dataset_version` 与用户提到的版本不符时提示。
- **主动离线**：用户声明离线，或推荐画像里 `offline: true` 时跳过联网与在线核验，直接用缓存并标明日期。

`skills.json` 关键字段：

| 字段 | 用途 |
|---|---|
| `schema_version` / `dataset_version` / `generated_at` | 契约版本与新鲜度 |
| `category_dir` / `category_name` | 分类筛选 |
| `mode` / `mode_label` | 消费方式与代价 |
| `tags` / `languages` / `doc_languages` | 检索与可用性 |
| `license` / `license_bucket` | 能否商用 |
| `tier` / `tier_label` | 推荐权重 |
| `verification_status` / `health_score` / `stars` / `checked_at` | 核验状态与热度；推荐只用 `verified` 且非 `watch` |
| `quickstart` | 上手命令；为空时取 `source_url` 正文 |
| `detail_url` / `source_url` / `repo` | 详情页、条目原文、上游仓库 |

## 推荐新项目（仅限 GitHub 开源）

- **提交方式**：在本仓库开 Issue，使用「建议收录新条目」模板（`.github/ISSUE_TEMPLATE/new-entry.yml`），填写 GitHub 公开仓库、中英文名称、一句话定位、建议分类与消费方式、许可证、收录理由。
- **既有条目调整**：用「建议调整既有条目」模板（`.github/ISSUE_TEMPLATE/change-request.yml`）。
- **处理流程**：维护者核验开源属性与质量后合入 `entries/`，刷新 `INDEX.md` / `site/` 与 `data-version.json`。
- **为何走 Issue**：保证每条收录都经人工核验，避免未经审查的内容进入索引。

## 注意事项

- **联网只读**：在线核验只读 GitHub 公开元数据，不 clone、不写入、不安装；无 token 时注意每小时 60 次限额，只查最终候选。
- **只推荐、不自动安装**：产出清单与命令，是否执行由用户决定。
- **只推 verified 且非观察期**：`needs-review` / `blocked` / `unverified` 只进清单并标注；`tier: watch` 的观察期条目只进清单，不进推荐。
- **非确定性召回**：LLM 语义推理会随表述变化；补充项目细节后可重跑。
- **数据只有元数据**：每个条目只有一份 `ENTRY.md`，不收录上游源码；安装命令指向上游仓库。
- **许可证**：`license` 仅作参考，最终以上游 LICENSE 全文为准。
- CC-BY-4.0 许可，可自由阅读、引用并注明出处。
