---
record_type: entry-record
id: voxcpm
name_zh: "VoxCPM2 无 Tokenizer TTS"
name_en: "VoxCPM2"
summary_zh: "OpenBMB 出品的 2B 参数 tokenizer-free TTS：扩散自回归架构直接生成连续语音表征，支持 30 语言（含 9 种中文方言）、自然语言 voice design、可控声音克隆与终极克隆（参考音频+转写续写）、48kHz 工作室级输出，RTF 低至 0.3（4090）或 0.13（vLLM-Omni 加速），Apache 2.0 商用可用。"
summary_en: "OpenBMB 2B tokenizer-free TTS via diffusion autoregression: 30 languages, voice design, controllable and ultimate cloning, 48kHz output, streaming inference."
category: design-creative
kind: framework
tags: [tts, multilingual, voice]
languages: [python]
doc_languages: [en, zh]
license: Apache-2.0
homepage: https://github.com/OpenBMB/VoxCPM
repo: https://github.com/OpenBMB/VoxCPM
docs_url: https://voxcpm.readthedocs.io/en/latest/
tier: core
metrics:
  stars: 36718
  pushed_at: "2026-09-02T12:12:35Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [VoxCPM, voxcpm2, OpenBMB TTS]
risk_notes: "推理需 NVIDIA GPU（CUDA >= 12.0）与 PyTorch >= 2.5，模型权重约 2B 参数需较高显存；CPU 推理速度极慢不适合生产；克隆他人声音需获得授权，合成内容需遵守当地法规；GitHub Trending #1（2025-12）与 HuggingFace Trending #1（2025-09）双重验证。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# VoxCPM2 无 Tokenizer TTS

> Tokenizer-Free TTS for Multilingual Speech Generation, Creative Voice Design, and True-to-Life Cloning。上游：[OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) · 许可证：Apache 2.0 · 36.7k stars · [文档](https://voxcpm.readthedocs.io/en/latest/) · [Demo](https://huggingface.co/spaces/OpenBMB/VoxCPM-Demo)

## 这是什么

VoxCPM 是 OpenBMB（面壁智能 / 清华）开源的 tokenizer-free Text-to-Speech 系统：不经过离散 tokenization，用扩散自回归架构直接生成连续语音表征，实现高度自然和富有表现力的合成。**VoxCPM2** 是最新大版本：2B 参数（MiniCPM-4 骨干）、200 万小时多语言数据训练、30 语言、48kHz 输出。

**四种生成模式**：

| 模式 | 输入 | 说明 |
|------|------|------|
| **Text-to-Speech** | 文本 | 直接合成，自动推断韵律和情感 |
| **Voice Design** | 文本 + 自然语言描述 | `(A young woman, gentle voice)Hello` —— 无需参考音频 |
| **Controllable Cloning** | 参考音频 + 可选风格指令 | 克隆音色，同时可用指令调整速度 / 情感 / 风格 |
| **Ultimate Cloning** | 参考音频 + 其转写 | 基于音频续写的终极克隆：音色、节奏、情感、风格全部保留 |

**核心特性**：

- **30 语言**：阿拉伯语、缅甸语、中文、丹麦语、荷兰语、英语、芬兰语、法语、德语、希腊语、希伯来语、印地语、印尼语、意大利语、日语、高棉语、韩语、老挝语、马来语、挪威语、波兰语、葡萄牙语、俄语、西班牙语、斯瓦希里语、瑞典语、他加禄语、泰语、土耳其语、越南语——输入不需语言标签
- **9 种中文方言**：四川话、粤语、吴语、东北话、河南话、陕西话、山东话、天津话、闽南话
- **48kHz 工作室级**：AudioVAE V2 非对称编解码（16kHz 参考音频进、48kHz 出），内置超分辨率无需外部 upsampler
- **实时流式**：RTF ~0.3（RTX 4090）；Nano-vLLM / vLLM-Omni 加速至 ~0.13（PagedAttention + OpenAI-compatible API）
- **Context-Aware**：从文本内容自动推断合适的韵律和表现力
- **SFT / LoRA 微调**：VoxCPM1.5 及以上支持

## 怎么安装

前置条件：Python >= 3.10（<3.13）、PyTorch >= 2.5.0、CUDA >= 12.0。

```bash
pip install voxcpm
```

模型权重从 [Hugging Face](https://huggingface.co/openbmb/VoxCPM2)（或 [ModelScope](https://modelscope.cn/models/OpenBMB/VoxCPM2)）自动下载。

## 怎么用

### Python API

```python
from voxcpm import VoxCPM
import soundfile as sf

model = VoxCPM.from_pretrained("openbmb/VoxCPM2", load_denoiser=False)

# Text-to-Speech
wav = model.generate(text="VoxCPM2 带来工作室级多语言语音合成。", cfg_value=2.0, inference_timesteps=10)
sf.write("demo.wav", wav, model.tts_model.sample_rate)

# Voice Design（自然语言描述，无需参考音频）
wav = model.generate(text="(A young woman, gentle and sweet voice)Hello, welcome to VoxCPM2!")

# Controllable Cloning
wav = model.generate(text="This is a cloned voice.", reference_wav_path="voice.wav")

# Ultimate Cloning（参考音频 + 转写 = 最大相似度）
wav = model.generate(
    text="This is an ultimate cloning demo.",
    prompt_wav_path="voice.wav",
    prompt_text="The transcript of the reference audio.",
    reference_wav_path="voice.wav",
)

# Streaming
for chunk in model.generate_streaming(text="Streaming is easy with VoxCPM!"):
    ...
```

### CLI

```bash
# Voice design
voxcpm design --text "VoxCPM2 带来工作室级多语言语音合成。" --output out.wav

# Controllable clone with style
voxcpm design --text "..." --control "Young female voice, warm and gentle" --seed 42 --output out.wav

# Clone from reference
voxcpm clone --text "..." --reference-audio voice.wav --output out.wav
```

### 生产部署

- **vLLM-Omni**（官方）：PagedAttention + OpenAI-compatible API，RTF ~0.13
- **Nano-vLLM**：社区加速方案
- **llama.cpp-omni**：端侧推理

## 注意事项

- **许可证 Apache 2.0**：权重和代码均可免费商用。
- **GPU 需求**：2B 模型需要较高显存；CPU 推理极慢不适合实际使用；vLLM 部署推荐 A100/H100。
- **声音克隆合规**：克隆他人声音必须获得授权；合成内容需遵守当地关于深度合成和语音伪造的法规。
- **模型演进**：VoxCPM-0.5B（2025-09，HuggingFace Trending #1）→ VoxCPM1.5（2025-12，GitHub Trending #1，SFT/LoRA）→ VoxCPM2（2026-04，2B、30 语言、Voice Design、48kHz）。
- **维护极其活跃**（2026-09 更新，36.7k stars），提供中英文 README、ReadTheDocs、HuggingFace Playground 和音频样本页。
