---
record_type: entry-record
id: freetoken
name_zh: "FreeToken 边缘 MoE 推理引擎"
name_en: "FreeToken"
summary_zh: "面向消费级硬件的边缘 MoE 推理引擎：协同 GPU、CPU 与主机内存，在游戏 PC 上跑 290B+ 开源大模型；支持 DeepSeek-V4 / Qwen3 / GLM-5 / gpt-oss / Gemma-4 等与 GGUF，暴露 OpenAI / Anthropic 兼容 API，一条命令接 Claude Code / Codex 等编码 Agent。"
summary_en: "Edge-native MoE serving engine for consumer hardware: runs 290B+ open models on a gaming PC via GPU/CPU/host-memory co-execution, serves OpenAI and Anthropic APIs, and launches coding agents."
category: agent-infra
mode: deploy
tags: [self-hosted, ai-agent, cli, inference, moe]
languages: [python, cuda, cpp]
doc_languages: [en]
license: Apache-2.0
homepage: https://www.flashml.ai/
repo: https://github.com/FlashML-org/FreeToken
tier: standard
metrics:
  stars: 17225
  pushed_at: "2026-11-16T00:08:01Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [freetoken, FreeToken]
risk_notes: "硬件门槛硬：CLI 仅 Linux x86_64，需 NVIDIA RTX 30/40/50 与驱动 r580+（CUDA 13），首次运行 JIT 编译 CUDA 内核还要 nvcc；Windows 只有桌面应用，macOS 不支持，AMD ROCm 仍 WIP；模型权重动辄数十到数百 GB，需要相应显存 / 内存 / 磁盘，所谓 290B+ 跑在游戏 PC 上依赖 offload 与 PCIe 带宽，速度与「交互级」为主张、未独立复现；引擎 Apache-2.0 但各模型权重另有许可与使用政策；服务默认绑 127.0.0.1:1919 且未见内置鉴权，勿直接暴露公网；ft launch 会改写编码 Agent 的供应商配置并可能安装其 CLI，先加 --dry-run 预览；项目 2026-07 创建、迭代快，nightly 轮子滚动发布需锁 URL。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# FreeToken 边缘 MoE 推理引擎

> 在消费级硬件上跑前沿 MoE 模型。上游：[FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) · 许可证：Apache-2.0 · 官网：[flashml.ai](https://www.flashml.ai/) · 论文：[arXiv:2608.16157](https://arxiv.org/abs/2608.16157)

## 这是什么

FreeToken 是一个面向个人与消费级硬件的**边缘原生 MoE 推理引擎**：把 GPU、CPU、主机内存与互连当作一个弹性的统一推理平台，用带宽自适应的 CPU–GPU 协同执行，在游戏 PC 上运行 290B+ 参数的开源 MoE 模型。它由 FlashML 团队开源，论文作者包括 Song Han、Matei Zaharia、Ion Stoica 等，设计上参考了 SGLang、vLLM、llama.cpp 等项目。

核心能力：

- **边缘运行时**：带宽自适应的 CPU–GPU 协同（$q^\star$ 策略）、全层双缓冲 prefill 流式、全局 LRU 专家缓存、图执行与 FTW 快速权重格式
- **语义感知缓存**：用语义锚点保存循环状态与 KV cache，Agent 的工具调用、思考块等上下文编辑不必重算整段
- **弹性显存**：运行中在专家缓存与 KV 之间动态分配 VRAM，无需重启或重新加载权重
- **模型覆盖**：DeepSeek-V4.1-Flash、Qwen3.6 / Qwen3.8、GLM-5.3-Flash / 5.2、gpt-oss-120b、Gemma-4、MiniMax-M2/M3、Qwen3-VL 等；支持 MXFP4 / NVFP4 / FP8 / BF16 与本地 GGUF，视觉模型可带图像输入
- **Agent 友好**：同时提供 OpenAI（`/v1/chat/completions`、`/v1/responses`、`/v1/models`）与 Anthropic（`/v1/messages`、`/v1/messages/count_tokens`）兼容 API，`ft launch` 一条命令把 Claude Code / Codex / DSH / Hermes / OpenClaw / OpenCode 接到本地服务

MoE 执行策略可切换：`auto` / `fused`（专家常驻 GPU）/ `offload`（专家放主机内存，GPU 只留 LRU 缓存）/ `cpu`（未命中在 CPU 计算）/ `hybrid`（PCIe 拉取与 CPU 计算重叠）。

## 怎么部署运行

桌面应用支持 Windows / Linux；CLI 与源码要求 **Linux x86_64 + NVIDIA GPU（驱动 r580+，CUDA 13）**、Python ≥ 3.10，首次运行会 JIT 编译 CUDA 内核（需要 `nvcc`）。AMD ROCm 仍在 WIP。

```bash
# 方式一：桌面应用（内置引擎与 GUI，Windows / Linux）
# 下载：https://www.flashml.ai/

# 方式二：PyPI 安装（Linux + NVIDIA）
uv venv && source .venv/bin/activate
uv pip install "freetoken[accel]"
ft --version

# 方式三：源码安装
git clone https://github.com/FlashML-org/FreeToken.git && cd FreeToken
uv venv && source .venv/bin/activate
uv pip install -e ".[accel]"

# 启动服务（默认监听 127.0.0.1:1919；模型可给本地目录、HF repo id 或 .gguf）
ft serve --model ~/models/Qwen3.6-35B-A3B
curl http://127.0.0.1:1919/v1/models
```

## 怎么用

```bash
# 终端聊天（独占进程，或 --server 接管已有服务）
ft shell --model ~/models/Qwen3.6-35B-A3B
ft shell

# 接到编码 Agent（会写供应商配置，缺 CLI 时安装；先预览用 --dry-run）
ft launch claude          # 也支持 codex / dsh / hermes / openclaw / opencode

# 看本机带宽、选 MoE 策略
ft bench bw --model ~/models/Qwen3.6-35B-A3B
ft serve --model ~/models/Qwen3.6-35B-A3B --moe-strategy hybrid
```

任何 OpenAI 或 Anthropic SDK 把 base URL 指到 `http://127.0.0.1:1919` 即可调用。选模型前先看[支持列表](https://github.com/FlashML-org/FreeToken/blob/main/docs/models.md)，量化格式与显存 / 内存规划见[安装文档](https://github.com/FlashML-org/FreeToken/blob/main/docs/install.md)与 [CLI 参考](https://github.com/FlashML-org/FreeToken/blob/main/docs/cli.md)。

## 注意事项

- **硬件门槛**：CLI 仅 Linux x86_64，需要 RTX 30 / 40 / 50 系列与驱动 r580+（CUDA 13）；Windows 只能用桌面应用，macOS 不支持，AMD 仍 WIP；首次运行 JIT 编译内核需要 `nvcc`，冷启动慢属正常。
- **容量与速度**：模型权重动辄数十至数百 GB，需要匹配的显存 / 内存 / 磁盘；290B+ 模型跑在游戏 PC 上依赖 CPU / 内存 offload 与 PCIe 带宽，实际 token 速度因机器差异很大，上游的「交互级」说法未独立复现，建议先跑 `ft bench bw`。
- **模型许可另算**：引擎是 Apache-2.0，但 DeepSeek、Qwen、GLM、Gemma、gpt-oss 等权重各有自己的许可与使用政策，商用前逐个确认。
- **服务暴露**：默认只绑 `127.0.0.1:1919`，未见内置鉴权，不要直接暴露公网；远程访问请用 SSH 隧道或带鉴权的反向代理。
- **会改写 Agent 配置**：`ft launch` 会写 Claude Code / Codex 等的供应商配置，并在缺失时安装其 CLI，先用 `--dry-run` 看改动。
- **迭代快**：项目 2026-07 创建，CLI 与 API 可能变化；nightly 轮子带 `+g<sha>` 滚动更新，脚本里应锁具体 URL 而不是 `nightly` 标签。
