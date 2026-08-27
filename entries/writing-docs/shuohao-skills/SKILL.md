---
record_type: entry-record
id: shuohao-skills
name_zh: shuohao-skills AI 短剧制作技能合集
name_en: shuohao-skills — AI Short-Drama Production Skill Suite
summary_zh: "面向 Claude Code 与 Codex 的 AI 短剧制作 skill 合集：从一本小说到直接喂生成管线的制作素材——拆角色、排大纲、出场景与道具设定、写剧本、切分镜。5 个技能线性协作，每段自带质量门脚本检查。"
summary_en: "An AI short-drama production skill suite for Claude Code & Codex: novel-to-pipeline covering character bibles, art bibles, screenplays, and storyboards. 5 skills with built-in quality-gate scripts."
category: writing-docs
kind: skill-collection
tags: [short-drama, screenwriting, storyboard, claude-code, codex, novel-writing, character-design, ai-agent]
languages: [javascript]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://github.com/eternityspring/shuohao-skills
repo: https://github.com/eternityspring/shuohao-skills
tier: standard
metrics:
  stars: 2100
  pushed_at: "2026-08-26"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [短剧制作, 烁皓短剧, novel-outline, novel-characters, novel-art, novel-script, novel-storyboard]
risk_notes: Apache-2.0 可商用；需 Node ≥ 18（脚本只用标准库，无 npm 依赖）；出图依赖 Codex CLI 内置 $imagegen；模型额度用当前会话的额度，无需额外 API key。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# shuohao-skills AI 短剧制作技能合集

> 面向 Claude Code 与 Codex 的 AI 短剧制作 skill 集合。上游：[eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills) · 许可证：Apache-2.0

## 这是什么

一套从小说到短剧制作素材的线性管线 skill 集合：把一本小说拆成改编大纲（人物表、爽点表、分集梗概、资产清单）、角色设定集（人物画像、形象/音色提示词、设定图）、美术设定集（场景与叙事道具的一致性锚点）、剧本（场次+节拍流、逐集时长按语速确定折算）、分镜（段→分镜→分镜图，MiniMax H3 提示词对齐）。五个 skill 的输出可合成一张单页 HTML 报告，左侧导航切换。

五个 skill：`novel-outline`（14 道质量门）、`novel-characters`、`novel-art`（11 道质量门）、`novel-script`（10 道质量门）、`novel-storyboard`（17 道质量门）。每个 skill 自包含、可单独拷走，报告支持中英双语界面。

## 怎么安装

```bash
# 克隆仓库
git clone https://github.com/eternityspring/shuohao-skills.git
cd shuohao-skills

# 自动检测并安装到 Claude Code / Codex，或指定
./scripts/install.sh              # 自动检测
./scripts/install.sh --codex      # 仅装到 Codex
./scripts/install.sh novel-characters  # 只装某一个

# 手动软链
ln -s "$PWD/skills/novel-characters" ~/.codex/skills/novel-characters
```

## 怎么用

在 Claude Code 或 Codex 中，Agent 读取对应 skill 的 `SKILL.md` 后即可按线性管线执行：丢一本小说进去，依次产出大纲 → 角色设定集 → 美术设定集 → 剧本 → 分镜。每段完成后可运行 `node scripts/selftest.mjs` 自测（不调用模型、不花额度）。

## 注意事项

- **许可证 Apache-2.0**：可商用。
- **运行环境**：需 Node ≥ 18，脚本只用标准库，无 npm 依赖。
- **出图依赖**：角色设定图与分镜图依赖 Codex CLI 内置 `$imagegen`，没有则跳过出图，其余产出照常。
- **模型额度**：使用当前会话的额度，无需额外 API key。
- 维护活跃（2026-08 更新），作者独立运营，有付费交流群（微信 `hao_dev`）。
