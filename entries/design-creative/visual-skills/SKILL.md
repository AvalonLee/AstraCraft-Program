---
record_type: entry-record
id: visual-skills
name_zh: "Visual Skills AI 影像导演技能集"
name_en: "Visual Skills — AI Film Director Skills"
summary_zh: "面向 Agent 的电影级 AI 影像导演技能集：`video` 子技能先定场景欲望、障碍、镜头几何与剪辑节奏，再生成 Seedance / Kling / Veo 提示词；`image` 子技能负责 Nano Banana 与 GPT Image 的分镜与关键帧。"
summary_en: "Agent skills that direct AI video and image generation: cinematic dramaturgy, exact Seedance/Kling/Veo syntax, and Nano Banana / GPT Image prompt routing for keyframes and edits."
category: design-creative
kind: skill-collection
tags: [prompt-engineering, video-production, image-generation, cinematic, storyboard, agent-skills]
languages: [markdown]
doc_languages: [en, ru]
license: CC-BY-4.0
homepage: https://github.com/smixs/visual-skills
repo: https://github.com/smixs/visual-skills
tier: standard
metrics:
  stars: 292
  pushed_at: "2026-08-08T00:40:19Z"
  checked_at: "2026-09-05"
  archived: false
related: [seedance-20, awesome-gpt-image-2]
aliases: [visual-skills-smixs, ai-film-director]
risk_notes: "CC BY 4.0 可商用，但需保留作者署名；技能只生成提示词，不生成成片，实际生成依赖 Seedance / Kling / Veo / Nano Banana / GPT Image 等模型渠道；部分模型语法和参考文档为英文，使用前需按供应商最新文档核对。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Visual Skills AI 影像导演技能集

> 把 Agent 变成一支能写镜头、能定节奏、能按模型语法出提示词的影像小组。上游：[smixs/visual-skills](https://github.com/smixs/visual-skills) · 许可证：CC BY 4.0

## 这是什么

Visual Skills 是一组两个子技能的技能集：

- **`video`**：按导演、编剧和剪辑师的顺序工作，先把欲望、障碍、镜头几何、视线与节奏写清楚，再落到 Seedance / Kling / Veo 等模型的精确语法上，输出单镜头提示词、连续多镜头脚本、分镜表或提示词审计。
- **`image`**：按美术指导的方式处理静态画面，覆盖编辑与产品摄影、海报、UI、信息图、硬约束编辑、角色连续性和分镜关键帧，自动在 Nano Banana 与 GPT Image 之间按任务选择合适语法。

它的核心不是模型词表，而是可执行的戏剧结构：场景公式、三细节定律、Walter Murch 的 Rule of Six、镜头三职责、调度与蒙太奇节奏，最后再用六点戏剧结构和三细节审计做出口校验。也就是说，它先保证一个镜头值得被生成，再决定该怎么写提示词。

## 怎么安装

推荐使用 skills CLI 安装两个子技能：

```bash
npx skills add smixs/visual-skills
```

也可以只装其中一个：

```bash
npx skills add smixs/visual-skills@video
npx skills add smixs/visual-skills@image
```

Codex 用户可以显式指定 agent：

```bash
npx skills add smixs/visual-skills -g -a codex
```

## 怎么用

安装后直接描述镜头意图、时长与目标模型，例如：

```text
用 video 写一条 5 秒的 Seedance 多镜头提示词：深夜厨房里，一个人打开空冰箱，只有冰箱灯落在脸上。
```

或让两个子技能接力：

```text
用 image 先做一组 15 秒产品片的关键帧，再用 Kling 把每个关键帧变成视频提示词。
```

需要检查已有提示词时，可以把文本交给 `video` 做审计；需要分镜或导演阐述时，也可以让它输出带时长、镜头功能、剪辑逻辑与声音锚点的表格。

## 注意事项

- **许可与署名**：CC BY 4.0 允许商用，但复制、派生或由 Agent 重组的技能内容都必须保留作者署名；上游 `NOTICE` 也要求署名。
- **只写提示词**：技能本身不渲染视频或图像，实际生成依赖 Seedance / Kling / Veo / Nano Banana / GPT Image 等模型渠道，费用与配额自担。
- **模型演进快**：上游针对 2026 年中的 Seedance 2.5、Kling 3.0、Veo 3.1、Nano Banana 2 和 GPT Image 2 提供专用参考；模型更新后仍应以供应商最新文档为准。
- **语言**：README 与技能内容以英文为主，另有俄文说明；中文用户可直接使用，但提示词语法和参考字段通常需按模型要求保留原文。
