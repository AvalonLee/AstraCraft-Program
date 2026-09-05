---
record_type: entry-record
id: abogen
name_zh: "Abogen 有声书生成器"
name_en: "Abogen"
summary_zh: "把 ePub / PDF / 文本 / Markdown / 字幕文件转为高质量音频并生成同步字幕：基于 Kokoro-82M 本地 TTS，支持语音混合器、章节控制、队列批量处理、多输出格式（WAV / FLAC / MP3 / OPUS / M4B 带章节），跨 Windows / macOS / Linux。"
summary_en: "Convert ePub, PDF, text, markdown, and subtitle files into high-quality audio with synchronized captions using Kokoro-82M TTS: voice mixer, chapter control, batch queue, and multiple output formats."
category: design-creative
kind: cli-tool
tags: [tts, audiobook, short-video, multilingual]
languages: [python]
doc_languages: [en]
license: MIT
homepage: https://github.com/denizsafak/abogen
repo: https://github.com/denizsafak/abogen
tier: standard
metrics:
  stars: 5898
  pushed_at: "2026-08-29T09:45:51Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [abogen-tts]
risk_notes: "依赖 espeak-ng（phonemization）和 PyTorch；NVIDIA GPU 加速需安装 CUDA 化 PyTorch（按显卡驱动选 cu126/cu128/cu130），无 GPU 时 CPU 推理较慢；AMD GPU 在 Windows 上不支持 ROCm，需 Linux；本地推理无 API 费用。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Abogen 有声书生成器

> 把书变成有声书，把文本变成配音。上游：[denizsafak/abogen](https://github.com/denizsafak/abogen) · 许可证：MIT · 5.9k stars

## 这是什么

Abogen 是一个本地 TTS 转换工具：拖入 ePub、PDF、纯文本、Markdown 或字幕文件，几秒内生成高质量音频并附同步字幕。基于 [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) 本地推理（无需 API Key），适用于有声书、短视频配音、旁白等场景。

**核心能力**：

- **输入**：ePub / PDF / .TXT / .MD / .SRT / .ASS / .VTT，或内置文本编辑器
- **输出**：WAV / FLAC / MP3 / OPUS / M4B（带章节），字幕 SRT / ASS（多布局）
- **语音**：预设多语言声音、voice mixer 混合自定义音色、试听预览、0.1x–2.0x 语速
- **字幕**：按行 / 句 / 句+逗号 / 句+高亮 / N 个词一帧
- **章节控制**：选指定章节、分章保存、合并版本、项目文件夹 + 元数据
- **批量队列**：多文件排队，逐文件独立设置

## 怎么安装

前置条件：espeak-ng（phonemization）；NVIDIA GPU 推荐安装 CUDA 化 PyTorch。

**uv 安装（推荐）：**

```bash
# NVIDIA GPU（CUDA 12.8）
uv tool install --python 3.12 abogen[cuda] --extra-index-url https://download.pytorch.org/whl/cu128 --index-strategy unsafe-best-match

# NVIDIA GPU（旧驱动 CUDA 12.6 / 新驱动 CUDA 13.0）
uv tool install --python 3.12 abogen[cuda126] --extra-index-url https://download.pytorch.org/whl/cu126 --index-strategy unsafe-best-match

# CPU / 无 NVIDIA GPU
uv tool install --python 3.12 abogen
```

macOS：`brew install espeak-ng` + `uv tool install`（Silicon Mac 需安装 Kokoro dev 版含 MPS 支持）。

Windows：安装 espeak-ng MSI 后可运行 `WINDOWS_INSTALL.bat`（自动装 Python + CUDA，无需手动配环境）。

## 怎么用

启动 GUI，拖入文件，配置语音、语速、字幕样式和输出格式，点 Start：

```text
1) 拖入 ePub / PDF / 文本 / Markdown / 字幕文件
2) 设置语速、声音、字幕生成方式、输出格式、保存路径
3) 点 Start
```

实测参考：RTX 2060 Mobile 上 3000 字符约 11 秒生成 3 分 28 秒音频。

## 注意事项

- **许可证 MIT**：可自由商用。
- **espeak-ng 依赖**：phonemization 必需，各平台需单独安装。
- **GPU 差异**：NVIDIA CUDA 化 PyTorch 提速显著；AMD GPU Windows 上不支持 ROCm（用 Linux 或 CPU）；Intel Mac 用 MPS。
- **本地推理**：无 API 费用，无网络依赖（模型首次从 Hugging Face 下载）。
- **维护活跃**（2026-08 更新，5.9k stars，PyPI 持续下载），提供跨平台 release。
