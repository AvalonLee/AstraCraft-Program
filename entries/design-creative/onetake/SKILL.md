---
record_type: entry-record
id: onetake
name_zh: "Onetake 一镜到底连贯动效视频技能"
name_en: "Onetake — One-Take Motion Film Skill"
summary_zh: "让 coding agent 拍「一镜到底」的产品发布影片：全程一个连续镜头，每一拍都从上一拍自然长出来，由连贯性 oracle 逐帧验收，解决 AI 生成视频切幻灯片式的跳变问题。"
summary_en: "An agent skill directing continuous one-take motion films: one camera, every beat grows out of the last, continuity verified by an oracle — for launch films and demos."
category: design-creative
kind: skill
tags: [cinematic, motion-design, product-video, storyboard, claude-code, ai-agent]
languages: [python]
doc_languages: [en, zh]
license: PolyForm-Noncommercial-1.0.0
homepage: https://github.com/feitangyuan/onetake
repo: https://github.com/feitangyuan/onetake
tier: standard
metrics:
  stars: 3376
  pushed_at: "2026-10-21"
  checked_at: "2026-10-28"
  archived: false
related: [video-talkcraft, video-shotcraft]
aliases: [one-take, one-take-video]
risk_notes: PolyForm Noncommercial 1.0.0 仅限非商业用途（区别于同类 video-shotcraft 的 Apache-2.0，商用交付前须先看协议）；依赖较重：Python 3（playwright、numpy、scipy、Pillow、matplotlib）+ ffmpeg + Node.js，环境由 agent 按需配置；4K60 渲染耗时明显；上游 2026-09-26 创建，尚属新项目。
added_at: "2026-10-28"
updated_at: "2026-10-28"
---

# Onetake 一镜到底连贯动效视频技能

> 让 coding agent 拍「一镜到底」的产品影片的 agent skill。上游：[feitangyuan/onetake](https://github.com/feitangyuan/onetake) · 许可证：PolyForm Noncommercial 1.0.0

## 这是什么

一份 Claude Agent Skill：给 coding agent（Claude Code / Codex 等）装上后，它能产出**不切镜头**的连贯动效影片——从第一个画面到最后一个画面只有一个连续镜头，每个节拍都从上一拍自然生长出来，中间没有"跳幻灯片"式的硬切。核心是一套基于节拍（beat）的编排工作流，外加一个**连贯性 oracle**：渲染结果要过逐帧连续性验收才算数，不合格就打回重来。

典型产出是 4K60、带真实 UI 画面、运动模糊和音效的产品发布影片与功能演示。上游 ★3.4k，2026-10 仍在活跃更新。

## 怎么安装

```bash
# Claude Code
git clone --depth 1 https://github.com/feitangyuan/onetake.git ~/.claude/skills/onetake

# 通用 agent skills 目录
git clone --depth 1 https://github.com/feitangyuan/onetake.git ~/.agents/skills/onetake
```

依赖 Python 3（playwright、numpy、scipy、Pillow、matplotlib）、ffmpeg 与 Node.js，环境由 agent 按需配置。

## 怎么用

装好后直接下需求，例如：**"Make a 15 s launch video for my app"**。agent 会走完上游 SKILL.md 定义的八步流程：解构参考 → 概念 → 分镜 → 素材/UI → 合成 → 渲染 → 音效 → 校验，最后由连贯性 oracle 验收成片。仓库自带 `gallery/` 案例库可先看效果再下单。

## 注意事项

- **非商用许可**：PolyForm Noncommercial 1.0.0 仅允许非商业用途，把工具链用于商业交付违反条款；商用场景请改用协议宽松的同类条目（见 related）。
- **依赖较重**：Python 科学计算栈 + playwright + ffmpeg + Node，首次环境搭建耗时；4K60 渲染对机器有要求。
- **新项目**：上游 2026-09-26 创建，处于快速演进期，工作流细节可能随版本变化。
