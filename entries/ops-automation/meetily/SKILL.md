---
record_type: entry-record
id: meetily
name_zh: "Meetily 隐私优先 AI 会议助手"
name_en: "Meetily"
summary_zh: "隐私优先的 AI 会议助手：完全本地运行——Parakeet / Whisper 实时转写（4 倍速）、说话人分离、Ollama 本地摘要，零云端依赖；支持自定义 OpenAI 兼容端点、多会议平台、导入已有音频并重转写；macOS / Windows 桌面应用，数据 100% 不离开本机。"
summary_en: "Privacy-first AI meeting assistant running entirely locally: Parakeet/Whisper real-time transcription, speaker diarization, Ollama summarization, zero cloud dependency."
category: ops-automation
kind: framework
tags: [self-hosted, ai-agent, meeting, privacy, docker]
languages: [rust, typescript]
doc_languages: [en]
license: MIT
homepage: https://meetily.ai
repo: https://github.com/Zackriya-Solutions/meetily
tier: core
metrics:
  stars: 30366
  pushed_at: "2026-09-05T09:03:14Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [meetily, meeting-minutes, Meetily AI]
risk_notes: "100% 本地处理，但本地 LLM（Ollama）摘要质量取决于设备算力；转写模型首次需下载（Parakeet / Whisper），断网可用但首次配置需网络；PRO 版（付费）提供增强精度、高级导出和团队功能，社区版为 MIT。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Meetily 隐私优先 AI 会议助手

> Privacy-First AI Meeting Assistant。上游：[Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily) · 许可证：MIT · 30.4k stars · [官网](https://meetily.ai)

## 这是什么

Meetily 是一个隐私优先的 AI 会议助手，完全运行在本地：捕获会议音频 → Parakeet / Whisper 实时转写 → Ollama（或其他 LLM）生成摘要——**全程零云端依赖**。适合对数据主权和合规有要求的团队（企业、律师、医疗、国防咨询等）。

**为什么选 Meetily**：

| 对比项 | 云端会议 AI | Meetily |
|--------|------------|---------|
| 数据存储 | 不明第三方服务器 | 100% 本地磁盘 |
| 合规风险 | GDPR 罚款 / 泄露 | 无数据离开设备 |
| 离线使用 | 不支持 | 转写 + 摘要全离线 |
| AI 费用 | 按调用计费 | Ollama 本地免费 |

**核心特性**：

- **实时转写**：Parakeet 或 Whisper 模型本地推理，比传统方案快 4 倍；实时逐句显示
- **说话人分离**：区分谁在说话
- **AI 摘要**：Ollama（本地、推荐）/ Claude / Groq / OpenRouter / 自定义 OpenAI 端点
- **导入与增强**：导入已有音频文件生成转写，或用不同模型/语言重转写（Beta）
- **专业音频混合**：麦克风 + 系统音频混合录制
- **自定义 OpenAI 端点**：支持企业内部 AI 基础设施
- **多会议平台**：Zoom / Teams / Meet / 线下会议通用
- **macOS / Windows** 桌面应用（Linux 需源码构建）

## 怎么安装

**macOS：**

从 [Releases](https://github.com/Zackriya-Solutions/meetily/releases/latest) 下载 `.dmg` → 拖入 Applications → 打开。

**Windows：**

从 [Releases](https://github.com/Zackriya-Solutions/meetily/releases/latest) 下载 `x64-setup.exe` → 运行安装器。

**Linux（源码构建）：**

```bash
git clone https://github.com/Zackriya-Solutions/meetily.git
cd meetily/frontend
pnpm install
./build-gpu.sh
```

## 怎么用

1. 打开 Meetily → 点 Start Meeting
2. 选择转写模型（Parakeet 推荐速度更快 / Whisper 更准）
3. 选择摘要 provider：Ollama（本地）/ Claude / Groq / OpenAI / 自定义端点
4. 会议结束后自动生成结构化摘要（决策、行动项、讨论要点）
5. 编辑、导出、搜索历史会议

导入已有音频：从设置页拖入音频文件 → 选模型转写 → 生成摘要。

## 注意事项

- **许可证 MIT**：社区版完全开源免费；PRO 版（付费订阅）提供增强精度、高级导出、团队功能。
- **本地 LLM 摘要**：Ollama 推荐但需要较好硬件（8GB+ RAM 模型运行）；也可接云端 API 获得更强摘要但失去"零云端"优势。
- **首次模型下载**：Parakeet / Whisper 模型需网络下载，之后离线可用。
- **说话人分离**：社区版已内置，PRO 版计划增强。
- **维护极其活跃**（2026-09-05 当天仍有提交，30.4k stars），提供 Trendshift 徽章、Discord / Reddit 社区和详细文档。
