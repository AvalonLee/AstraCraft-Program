---
record_type: entry-record
id: video-talkcraft
name_zh: "口播视频动效工作室"
name_en: "video-talkcraft — Voiceover-Driven Explainer Video Skill"
summary_zh: "把 Claude Code / Codex 变成口播视频动效工作室的 agent skill：字级配音同步、78 张动效配方卡、七层反 PPT 镜头系统、三重验收，用 Remotion 渲出动态字卡、证据截图、运镜与音效全部锁在人声上的解说成片。"
summary_en: "Agent skill turning Claude Code / Codex into a motion studio for voiceover-driven explainer videos: word-level voiceover sync, 78 motion recipes, anti-slideshow camera, Remotion rendering."
category: design-creative
kind: skill
tags: [video-production, motion-design, remotion, claude-code, codex, skill]
languages: [typescript, python]
doc_languages: [zh, en]
license: PolyForm-Noncommercial-1.0.0
homepage: https://github.com/Vincentwei1021/video-talkcraft
repo: https://github.com/Vincentwei1021/video-talkcraft
tier: standard
metrics:
  stars: 113
  pushed_at: "2026-08-30"
  checked_at: "2026-08-30"
  archived: false
related: [video-shotcraft, remotion-skills]
aliases: [口播视频动效工作室, talkcraft]
risk_notes: PolyForm Noncommercial 1.0.0 仅限非商业用途（产出的视频归创作者所有，但工具链本身不可商用）；字级时间戳管线首次使用需下载 767MB 的 FireRedASR2-CTC 模型（可改 whisper 后端免手动下载）；依赖 Node 18+、Python 3.10+、ffmpeg 与 Remotion 渲染工具链，环境由 agent 按需配置。
added_at: "2026-08-30"
updated_at: "2026-08-30"
---

# 口播视频动效工作室

> 把 Claude Code / Codex 变成口播视频动效工作室的 agent skill。上游：[Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) · 许可证：PolyForm Noncommercial 1.0.0

## 这是什么

[video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) 系列的口播视频篇：给它一份口播稿和一条成品配音，它在本机对齐字级时间戳、把每个语义拍写进 SHOTBOOK 分镜，然后用 Remotion 渲出解说成片——动态字卡、证据截图、运镜、字幕、影视级音效，全部锚在人声的确切字上。核心能力：

- **字级配音同步**：`scripts/timestamps_cpu.py` 把口播稿对齐到音频（默认 FireRedASR2-CTC int8，备选 faster-whisper），110 秒中英混合口播实测字级偏差中位 20-40ms、最差 200ms。
- **78 张动效配方卡**：每张含意图、参数、已知坑、自包含 Remotion tsx 源码和可跑 HTML 预览（[在线画廊](https://vincentwei1021.github.io/video-talkcraft/)一页全览），覆盖动态字卡、数据镜头、证据巡游、六式运动承接转场、长镜头世界画布、人物合成等。
- **七层反 PPT 系统**：连续相机曲线、视差平面、idle/让位生命周期、呼吸环境层，静止帧在结构上不可能出现，漏网的也会被自动检测抓住。
- **审片级排版纪律**：语义拍分镜、同屏元素预算、留白锚、枢轴句切镜规则，人脸安全区用真实检测脚本（`scripts/face_bbox.py`）量出来，不靠目测。
- **三重验收**：自动静止检测、纯音效轨逐 cue 能量验证、带动效锚点帧的独立评审（专抓单帧看不见的时域缺陷）。

## 怎么安装

最直接的方式——把仓库链接丢给 Agent：

```text
帮我安装这个 skill：https://github.com/Vincentwei1021/video-talkcraft
```

或用 skills CLI / 手动安装：

```bash
npx skills add Vincentwei1021/video-talkcraft
```

```bash
git clone https://github.com/Vincentwei1021/video-talkcraft.git
cd video-talkcraft
ln -s "$(pwd)" ~/.claude/skills/video-talkcraft   # Claude Code
# 或
ln -s "$(pwd)" ~/.codex/skills/video-talkcraft    # Codex
```

环境依赖（Agent 会按需自行配置）：Node 18+（Remotion 渲染）、Python 3.10+（时间戳管线，`pip install zhconv pypinyin sherpa-onnx soundfile numpy`，首次使用下载一次 767MB ASR 模型，或加 `--backend whisper`）、ffmpeg。

## 怎么用

安装后在 Claude Code / Codex 里直接下需求：

```text
用 video-talkcraft 把这份口播稿 + voiceover.wav 做成视频。
做一条 100 秒的 <话题> 解说，稿子和音频在这里。
```

典型流程：准备口播稿与成品配音 → Agent 对齐字级时间戳 → 按 SHOTBOOK 分镜选用配方卡动效 → Remotion 渲染 → 三重验收出片。想先看动效效果，浏览在线画廊或本地 `gallery/index.html` 挑配方。

## 注意事项

- **非商用许可**：PolyForm Noncommercial 1.0.0 仅允许非商业用途；产出的视频归创作者所有，但把工具链本身用于商业交付违反许可条款。
- **模型下载**：字级时间戳管线首次使用需下载 767MB 的 FireRedASR2-CTC 模型（国内网络可能较慢），不想要大文件可改 `--backend whisper`。
- **工具链较重**：Node + Python + ffmpeg + Remotion 全链路本地渲染，首次跑通需要环境配置；渲染消耗本机算力。
- **同系列**：静态分镜/运镜设计见同作者 `video-shotcraft`（本库 design-creative 分类已收录）；Remotion 本体知识可配合本库收录的 `remotion-skills`。
