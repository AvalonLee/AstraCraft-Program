---
record_type: entry-record
id: manju-laoli-skill
name_zh: "漫剧老李 AIGC 全流程 Skill"
name_en: "Manju Laoli Skill — Short-Drama Director Suite"
summary_zh: "面向抖音 & 红果爆款短剧/漫剧的工业化编剧与视听导演系统：五阶门控剧本、七维台词诊断、资产三视图锁、文武双模分镜、15 秒打戏 PREVIS、Seedance 三层解耦提示词与 P0~P2 质检门禁，一条龙贯穿小说分析到独立质检。"
summary_en: "Industrial screenwriting & directing system for viral short dramas: gated script engine, dialogue diagnosis, asset locking, dual-mode storyboards, action PREVIS, Seedance prompts and QC gates."
category: design-creative
kind: skill
tags: [short-drama, screenwriting, storyboard, seedance, openclaw, ai-agent, character-design]
languages: [markdown]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/AvalonLee/manju-laoli-skill
repo: https://github.com/AvalonLee/manju-laoli-skill
tier: watch
metrics:
  stars: 0
  pushed_at: "2026-08-28"
  checked_at: "2026-08-30"
  archived: false
related: [shuohao-skills, huashu-skills]
aliases: [漫剧老李, Short-Drama Director Suite, short-drama-director]
risk_notes: MIT 可商用；项目自述为测试版，由开源内容二次修改整合而成，尚无社区实测背书（star 数极低）；渲染依赖 Seedance 2.0/即梦/可灵等外部视频模型，消耗额度；内置平台合规转译词典但不构成内容合规保证，发布前仍需人工过审；安装目标以 OpenClaw 为主，其他 Agent 需手动复制目录。
added_at: "2026-08-30"
updated_at: "2026-08-30"
---

# 漫剧老李 AIGC 全流程 Skill

> 面向抖音 & 红果爆款短剧/漫剧的工业化编剧与视听导演超级系统。上游：[AvalonLee/manju-laoli-skill](https://github.com/AvalonLee/manju-laoli-skill) · 许可证：MIT（见 `short-drama-director/LICENSE`）

## 这是什么

一条龙贯穿「小说分析 → 门控编剧 → 台词诊断 → 资产与空间锁定 → 文武双模分镜动力学 → 视频模型精准提示词渲染 → 独立质检审查」的短剧/漫剧生产管线，供 AI 助手 / LLM 直接调用。主包 `short-drama-director` 为一个路由式 SKILL.md + 18 份专业规则手册（references/）+ 静态校验脚本（`check_package.py`）。核心模块：

- **剧本**：五阶门控引擎（Premise → Structure → Beat → Entity → Page），拒绝无大纲直奔台词。
- **台词**：七维全量诊断，杜绝播音腔与反向灌输设定，强制语速自检（3.5~5 字/秒）。
- **资产**：16 项资产锁定（A/B/C 分级）+ 三栏无头三视图参考图 + 3D 空间快照与 180° 轴线锁。
- **分镜**：文武双模——文戏微表情生理递进，武戏 15 秒 PREVIS 动力学（R1/R2/R3 三档）；11 环动力链、防守三态、终结技三幕、大招运镜 11 模式与全门派武学库。
- **渲染**：Seedance 2.0 / 即梦 / 可灵三层解耦提示词，单组 ≤15s 独立投喂。
- **质检与合规**：P0/P1/P2 三级独立门禁 + 声音三层相对电平；平台安全合规转译词典（安全默认 / 强动作非血腥 / 成人级草案）。

## 怎么安装

```bash
mkdir -p ~/.claude/skills
git clone --depth 1 https://github.com/AvalonLee/manju-laoli-skill.git /tmp/manju-laoli
cp -r /tmp/manju-laoli/short-drama-director ~/.claude/skills/
```

OpenClaw 环境可直接：

```bash
openclaw skills install ./short-drama-director --as short-drama-director
```

其他支持 Agent Skills 格式的 Agent 把 `short-drama-director/` 目录复制进各自 skills 目录即可。完整规则与指令见包内 `SKILL.md`。

## 怎么用

1. 装完重启 Agent 会话，直接说需求，例如「用 short-drama-director 把这本小说前十章改编成 30 集短剧大纲」或「按文武双模给第 3 集出分镜与 Seedance 提示词」。
2. 管线按五阶门控推进：先小说分析与大纲，再逐阶过门进入台词与分镜，每阶由门控规则拦住不合格产出。
3. 修改或二次整合包内容后，运行 `python scripts/check_package.py` 做静态校验，确认引用与结构完整。
4. 旧版 V5.0.2 与空间导演 V3 在独立仓库 [manju-laoli-skill-legacy](https://github.com/lixiaoxiao9888-create/manju-laoli-skill-legacy) 归档。

## 注意事项

- **测试版**：V6.0 为测试版，由开源内容二次修改整合而成，暂无社区实测背书（评级：观察期）；关键生产用途建议先小样验证。
- **外部模型依赖**：出片依赖 Seedance 2.0 / 即梦 / 可灵等外部视频模型，按组投喂消耗额度；提示词管线不含本地渲染。
- **合规责任**：内置的合规转译词典（安全默认 / 强动作非血腥 / 成人级草案）只做转译提示，不构成内容合规保证，平台发布前仍需人工过审。
- **同类对比**：`writing-docs/shuohao-skills` 走「小说 → 短剧制作素材」的线性管线并带质量门脚本；本条目胜在武戏 PREVIS、资产锁定与视频模型提示词的深度，两者可按需组合。
