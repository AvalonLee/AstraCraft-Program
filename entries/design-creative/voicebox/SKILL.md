---
record_type: entry-record
id: voicebox
name_zh: "Voicebox 本地 AI 语音工作室"
name_en: "Voicebox"
summary_zh: "开源本地 AI 语音工作室（ElevenLabs + WisprFlow 替代）：零样本声音克隆、7 个 TTS 引擎 23 语言、全局热键听写、Stories 多轨编辑；内置 MCP server 让任何 Agent 一行调用开口说话；Tauri (Rust) 原生、100% 本地。"
summary_en: "Open-source local AI voice studio: zero-shot voice cloning, 7 TTS engines in 23 languages, global dictation, Stories editor, and an MCP server that gives any agent a voice."
category: design-creative
kind: framework
tags: [tts, voice, multilingual, ai-agent, mcp, self-hosted]
languages: [rust, typescript]
doc_languages: [en]
license: MIT
homepage: https://voicebox.sh
repo: https://github.com/jamiepine/voicebox
docs_url: https://docs.voicebox.sh
tier: core
metrics:
  stars: 52350
  pushed_at: "2026-08-09T00:03:42Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [voicebox, Voicebox Studio]
risk_notes: "模型和语音数据 100% 本地处理，但 TTS 引擎首次需从 Hugging Face 下载（数 GB 级）；声音克隆他人声音需获得授权；macOS (MLX/Metal) / Windows (CUDA) / Linux / AMD ROCm / Intel Arc / Docker 均支持但 GPU 加速效果因平台而异；Stories 编辑器和部分高级功能仍在活跃开发中。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Voicebox 本地 AI 语音工作室

> The open-source AI voice studio. Clone, dictate, create.上游：[jamiepine/voicebox](https://github.com/jamiepine/voicebox) · 许可证：MIT · 52.4k stars · [voicebox.sh](https://voicebox.sh) · [文档](https://docs.voicebox.sh)

## 这是什么

Voicebox 是一个本地优先的 AI 语音工作室——ElevenLabs（输出侧）和 WisprFlow（输入侧）的免费开源替代，合并在一个应用里：从几秒音频零样本克隆声音、7 个 TTS 引擎跨 23 种语言生成语音、全局热键听写到任意文本框，以及让任何 MCP-aware AI agent（Claude Code、Cursor、Cline）用你克隆的声音开口说话。云端产品各占语音 I/O 一半，Voicebox 全做并桥接（内置本地 LLM 精炼 + 每音色 persona），全程 100% 本地。

**7 个 TTS 引擎**：Qwen3-TTS、Qwen CustomVoice、LuxTTS、Chatterbox Multilingual、Chatterbox Turbo、HumeAI TADA、Kokoro。

**核心特性**：

- **声音克隆**：零样本克隆（几秒参考音频）+ 50+ 精选预设音色（Kokoro / Qwen CustomVoice）
- **23 种语言**：英语到阿拉伯语、日语、印地语、斯瓦希里语等
- **情感标签**：`[laugh]` / `[sigh]` / `[gasp]` 等副语言标签（Chatterbox Turbo）；自然语言情感控制（Qwen CustomVoice）
- **后处理效果**：pitch shift、混响、delay、chorus、compression、filters
- **无限长度**：自动分块 + crossfade，支持脚本、文章、章节
- **Stories 编辑器**：多轨时间线，适合对话、播客、叙事
- **语音输入**：全局热键听写（push-to-talk / toggle 模式）、macOS accessibility 验证的自动粘贴、每个文本框的 in-app mic、Whisper STT
- **Agent 语音输出**：一行 `voicebox.speak` MCP 工具调用，任何 MCP agent 即可用你的声音说话
- **语音 persona**：给任何音色 profile 附自由文本 persona，Compose / Rewrite / Respond 三种模式（agent 也可通过 MCP 调用）
- **API-first**：REST API + 内置 MCP server
- **原生性能**：Tauri (Rust) 而非 Electron

## 怎么安装

| 平台 | 下载 |
|------|------|
| macOS (Apple Silicon) | [DMG](https://voicebox.sh/download/mac-arm) |
| macOS (Intel) | [DMG](https://voicebox.sh/download/mac-intel) |
| Windows | [MSI](https://voicebox.sh/download/windows) |
| Docker | `docker compose up` |

Linux 暂无预构建二进制，见 [voicebox.sh/linux-install](https://voicebox.sh/linux-install) 源码构建指南。

## 怎么用

### 声音克隆 + TTS

打开 Voicebox → 上传参考音频（几秒即可）→ 命名保存 → 输入文本 → Generate。支持自动分块（无限长度）+ 后处理效果链。

### 全局听写

设置全局热键（默认 push-to-talk），在任意应用中按热键 → 说话 → Whisper STT 转写 → 自动粘贴到当前文本框。

### Agent 语音输出（MCP）

Voicebox 内置 MCP server，Claude Code / Cursor / Cline 等 agent 一行接入后，agent 在对话中说"把这段读给我听"即可用你克隆的声音朗读——agent 的语音输出从此可控。

### REST API

```bash
# TTS
curl -X POST http://localhost:8250/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world","voice_id":"your-cloned-voice"}' \
  --output speech.wav
```

## 注意事项

- **许可证 MIT**：可自由商用。
- **100% 本地隐私**：模型、语音数据、录音不离开本机；TTS 引擎首次从 Hugging Face 下载数 GB 模型。
- **GPU 加速**：macOS MLX/Metal、Windows CUDA、Linux AMD ROCm / Intel Arc 均支持，但推理速度因硬件而异。
- **克隆合规**：克隆他人声音必须获得授权。
- **维护活跃**（2026-08 更新，52.4k stars，Trendshift 徽章），提供 DeepWiki、详细文档和 Troubleshooting Guide。
