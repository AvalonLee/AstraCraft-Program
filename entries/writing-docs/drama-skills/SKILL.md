---
id: drama-skills
name_zh: "Drama Skills AI 短剧创作技能合集"
name_en: "Drama Skills"
summary_zh: "面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。"
summary_en: "An AI short-drama skill suite for Claude Code & Codex: scripts, assets, storyboards, image/video prompts, and independent review across 10 skills."
category: writing-docs
kind: skill-collection
tags: [short-drama, screenwriting, storyboard, claude-code, codex, prompt-engineering]
languages: [python]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/zenstory-ai/drama-skills
repo: https://github.com/zenstory-ai/drama-skills
tier: standard
featured: true
metrics:
  stars: 1201
  pushed_at: "2026-08-26T06:48:55Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [短剧创作, 漫剧]
risk_notes: MIT 可商用；需 Python 3.9+ 与 Agent 运行环境（Claude Code/Codex）；生产依赖外部 adapter（Seedance/GPT Image 2/MiniMax Music），供应商凭据不进入项目，需用户明确确认后才投产。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Drama Skills AI 短剧创作技能合集

> 面向 Claude Code 与 Codex 的 AI 短剧创作技能合集。上游：[zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) · 许可证：MIT

## 这是什么

它是一套面向 **Claude Code 与 Codex** 的 **AI 短剧/漫剧创作 skill 合集**，来自真实漫剧工作室产线（累计上千个 AI 短剧 / 漫剧项目蒸馏而成）。十个技能把一个点子或一部长篇材料，一路做成分集剧本、资产设定、图片提示词、分镜关键帧和视频提示词，用清晰的所有权与连续性衔接。

十个技能：`short-drama`（入口路由 / 初始化 / Dashboard / Look Development）、`short-drama-novel-analyze`（原著快评）、`short-drama-develop`（故事开发 / 分集地图）、`short-drama-write`（分集剧本）、`short-drama-assets`（人物 / 场景 / 道具资产）、`short-drama-image-prompts`（图片提示词）、`short-drama-storyboard`（分镜 / 冻结关键帧）、`short-drama-video-prompts`（视频提示词）、`short-drama-produce`（确认后生产）、`short-drama-review`（独立审查）。新项目每集默认只维护五份 Markdown：剧本 / 视觉设定 / 分镜 / 图片提示词 / 视频提示词。

## 怎么安装

```bash
# 需要 Python 3.9+；告诉 Claude Code / Codex：安装这些技能 https://github.com/zenstory-ai/drama-skills
git clone https://github.com/zenstory-ai/drama-skills.git
cd drama-skills

# Claude Code
mkdir -p "$HOME/.claude/skills"
for skill in skills/*; do ln -s "$PWD/$skill" "$HOME/.claude/skills/$(basename "$skill")"; done

# Codex
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
for skill in skills/*; do ln -s "$PWD/$skill" "${CODEX_HOME:-$HOME/.codex}/skills/$(basename "$skill")"; done
```

## 怎么用

在 Claude Code 用 `/short-drama`、Codex 用 `$short-drama` 调用（也可纯自然语言）。示例流程：初始化项目 → 写第 1 集 → 拆资产 → 写图片 / 视频提示词与分镜 → 明确确认后由 `short-drama-produce` 通过外部 adapter 投产 → 需要时审查。每个技能是独立安装单元，可只链接所需能力。

## 注意事项

- **许可证 MIT**：可商用；供应商凭据不进入项目，生产前需用户明确确认。
- **运行环境**：需 Python 3.9+ 与支持 Agent Skill 规范的运行环境（Claude Code / Codex）。
- **生产依赖外部 adapter**：图片 / 视频 / TTS / 音乐生产可选 Seedance、GPT Image 2、MiniMax Music 等 adapter，需自行配置且确认后才执行；本地创作台 macOS / Linux / WSL / Windows 原生可运行。
- 维护活跃（2026-08 更新），暂无已知重大缺陷。
