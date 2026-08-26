---
id: video-shotcraft
name_zh: "Video Shotcraft 产品视频动态设计技能"
name_en: "Video Shotcraft — Cinematic Product Video Skill"
summary_zh: "面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。"
summary_en: "An AI agent skill for crafting cinematic product videos: 152 shot recipe cards, 209 motion previews, and a production-ready Remotion template. Turns Claude Code or Codex into a motion-design studio."
category: design-creative
kind: skill
tags: [cinematic, motion-design, video-production, remotion, claude-code, codex, prompt-engineering]
languages: [typescript]
doc_languages: [zh, en, ja]
license: Apache-2.0
homepage: https://github.com/Vincentwei1021/video-shotcraft
repo: https://github.com/Vincentwei1021/video-shotcraft
tier: standard
metrics:
  stars: 6400
  pushed_at: "2026-08-26"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [shotcraft, remotion-video, product-video]
risk_notes: Apache-2.0 可商用；需 Node ≥ 22 与 Remotion（个人/小团队免费，公司需付费许可证）；渲染依赖 Chrome/Chromium headless shell；音频素材来自 Mixkit 等免费商用源；镜头配方卡源自对 ClickUp/Perplexity/Slack/Notion 等官方产品影片的动效语言学习与从零实现，不含原片素材。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Video Shotcraft 产品视频动态设计技能

> 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill。上游：[Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) · 许可证：Apache-2.0

## 这是什么

一份把 Claude Code 或 Codex 变成动态设计工作室的 Agent Skill：指向你的产品，它就能走完故事板、动画、音效设计的完整流程，产出电影级产品宣传片、发布视频或功能演示。核心是基于 Remotion 的 React 视频框架，配备 152 张镜头配方卡（含目的、节奏、参数、实现要点）、209 种动态预览，以及一套经过验证的 36.2 秒完整模板（Ink Press）。

内建 2.5D 页面运镜、标题卡、转场、节拍同步剪辑和电影级 SFX 音效库（149 个 SFX，16 个场景/材质分类 + 5 首 BGM）。完成后可导出为可编辑的剪映项目文件。

## 怎么安装

```bash
# 方式一：直接让 Agent 安装
# 在 Claude Code / Codex 中说：
# "Install this skill for me: https://github.com/Vincentwei1021/video-shotcraft"

# 方式二：skills CLI
npx skills add Vincentwei1021/video-shotcraft

# 方式三：手动软链
git clone https://github.com/Vincentwei1021/video-shotcraft.git
ln -s "$(pwd)/video-shotcraft" ~/.codex/skills/video-shotcraft  # Codex
ln -s "$(pwd)/video-shotcraft" ~/.claude/skills/video-shotcraft  # Claude Code
```

## 怎么用

在 Agent 中说「Use video-shotcraft to create a promo for my product」即可启动。可指定镜头配方卡（如 `deck-deal-flyin`、`spotlight-hero-card`），也可在在线 Gallery 中先浏览挑选。不指定则默认使用 Ink Press 模板（36.2 秒、1920×1080、30fps、10 个镜头）。

## 注意事项

- **许可证 Apache-2.0**：可商用；镜头配方卡源自对知名产品官方影片的动效语言学习与从零实现，不含原片素材。
- **Remotion 许可证**：个人与小团队免费，公司需购买付费许可证。
- **运行环境**：需 Node ≥ 22 与 Chrome/Chromium headless shell。
- **音频素材**：来自 Mixkit 等免费商用源，详见 `assets/audio/ATTRIBUTION.md`。
- **剪映导出**：macOS 剪映专业版 11.2 验证通过，Windows 未测试。
- 维护活跃（2026-08 更新），在线 Gallery 自动部署到 GitHub Pages。
