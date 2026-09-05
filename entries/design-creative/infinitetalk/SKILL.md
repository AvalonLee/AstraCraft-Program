---
record_type: entry-record
id: infinitetalk
name_zh: "InfiniteTalk 无限长口播视频生成"
name_en: "InfiniteTalk"
summary_zh: "MeiGen-AI 的音频驱动无限长口播视频生成框架：给定输入视频和音频，合成唇形同步的新视频，同时对齐头部运动、肢体姿态与面部表情；支持 image-to-video 和 video-to-video 两种模式，提供 Gradio demo 与 ComfyUI 分支。"
summary_en: "Audio-driven unlimited-length talking video generation from MeiGen-AI: lip-sync video dubbing with head, body, and expression alignment, supporting image-to-video and video-to-video modes."
category: design-creative
kind: framework
tags: [video-production, video-dubbing, short-video, cinematic]
languages: [python]
doc_languages: [en]
license: Apache-2.0
homepage: https://meigen-ai.github.io/InfiniteTalk/
repo: https://github.com/MeiGen-AI/InfiniteTalk
docs_url: https://arxiv.org/abs/2508.14033
tier: standard
metrics:
  stars: 7785
  pushed_at: "2026-05-22T02:35:51Z"
  checked_at: "2026-09-05"
  archived: false
related: [seedance]
aliases: [InfiniteTalk, MeiGen InfiniteTalk]
risk_notes: "推理需要 NVIDIA GPU（显存依赖模型规格，低显存模式可用但速度更慢）；社区已集成 Wan2GP（低显存优化）与 ComfyUI（kijai WanVideoWrapper）；项目已发布后续版本 LongCat-Video-Avatar（2026-05），InfiniteTalk 本体更新频率放缓，长期维护以 LongCat 系列为主；生成人物视频需注意肖像权与深度伪造合规。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# InfiniteTalk 无限长口播视频生成

> Audio-driven Video Generation for Sparse-Frame Video Dubbing。上游：[MeiGen-AI/InfiniteTalk](https://github.com/MeiGen-AI/InfiniteTalk) · 许可证：Apache 2.0 · 7.8k stars · [项目页](https://meigen-ai.github.io/InfiniteTalk/) · [技术报告](https://arxiv.org/abs/2508.14033)

## 这是什么

InfiniteTalk 是 MeiGen-AI 团队（美团 + 南方科技大学等合作者）开源的音频驱动视频生成框架。与传统口型同步只动嘴唇不同，InfiniteTalk 的稀疏帧视频配音（sparse-frame video dubbing）在精确唇形同步的同时，让头部运动、肢体姿态和面部表情都对齐音频节奏——生成的视频可以无限长，且人物身份一致。

**两种模式**：

| 模式 | 输入 | 输出 |
|------|------|------|
| **Video-to-Video** | 原视频 + 音频 | 唇形同步 + 头/身/表情对齐的新视频（配音模式） |
| **Image-to-Video** | 单张图片 + 音频 | 从图片生成口播视频（数字人模式） |

**核心特性**：

- **无限长生成**：不限于固定时长，按音频长度持续生成
- **唇形精准**：比 MultiTalk 有更好的唇形同步精度
- **稳定**：比 MultiTalk 减少手部/身体畸变
- **低显存**：支持极低 VRAM 运行 + TeaCache + int8 量化加速

**生态集成**：社区已将 InfiniteTalk 集成到 [Wan2GP](https://github.com/deepbeepmeep/Wan2GP/)（低显存优化版）和 [ComfyUI WanVideoWrapper](https://github.com/kijai/ComfyUI-WanVideoWrapper)，ComfyUI 官方分支也在仓库中。

**后续版本**：团队于 2025-12 发布 [LongCat-Video-Avatar](https://github.com/MeiGen-AI/LongCat-Video-Avatar)（单流/多流音频 + 视频续写）、2026-05 发布 [LongCat-Video-Avatar-1.5](https://meigen-ai.github.io/LongCat-Video-Avatar-1.5-Page/)（Whisper-Large 替代 Wav2Vec2、8 步蒸馏加速、风格化泛化），长期演进以 LongCat 系列为主。

## 怎么安装

前置条件：NVIDIA GPU（推理显存视模型规格而定）、Python 3.10+、PyTorch。

```bash
git clone https://github.com/MeiGen-AI/InfiniteTalk.git
cd InfiniteTalk
pip install -r requirements.txt
# 下载模型权重（Hugging Face）
huggingface-cli download MeiGen-AI/InfiniteTalk --local-dir ./weights
```

ComfyUI 用户：切换到仓库的 [comfyui 分支](https://github.com/MeiGen-AI/InfiniteTalk/tree/comfyui)按 ComfyUI 节点安装。

## 怎么用

```bash
# Gradio demo
python app.py

# 推理脚本（video-to-video）
python generate.py \
  --video_path input.mp4 \
  --audio_path voice.wav \
  --output_path output.mp4

# Image-to-video
python generate.py \
  --image_path portrait.jpg \
  --audio_path voice.wav \
  --output_path output.mp4
```

具体参数与多 GPU 推理见上游 README 和 Wiki。

## 注意事项

- **许可证 Apache 2.0**：可商用，但生成人物视频需自行承担肖像权与深度伪造合规责任。
- **显存需求**：长视频生成显存消耗大，社区提供 Wan2GP 低显存方案；TeaCache 和 int8 量化可进一步加速。
- **项目演进**：InfiniteTalk 本体（2025-08 发布）更新频率已放缓，最新能力（多流音频、风格化、8 步加速）在 LongCat-Video-Avatar-1.5；如需前沿效果建议关注 LongCat 系列。
- **模型下载**：权重在 [Hugging Face](https://huggingface.co/MeiGen-AI/InfiniteTalk)，国内可走镜像。
