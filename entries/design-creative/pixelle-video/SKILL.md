---
record_type: entry-record
id: pixelle-video
name_zh: "Pixelle-Video AI 全自动短视频引擎"
name_en: "Pixelle-Video — AI Fully Automated Short Video Engine"
summary_zh: "输入一个主题即可自动完成文案撰写、AI 配图/视频生成、语音解说合成、背景音乐添加与一键合成出片；Streamlit WebUI + Docker 部署，图像/视频/TTS 可按需替换为 ComfyUI、RunningHub 工作流或 DashScope、OpenAI、Seedream、Seedance、Kling 等直连 API。"
summary_en: "Turn one topic into script, AI images or video, narration, BGM and a finished short video. Streamlit WebUI plus Docker; ComfyUI / RunningHub workflows or direct image, video and TTS APIs."
category: design-creative
kind: framework
tags: [video-production, short-video, tts, comfyui, docker, self-hosted, multilingual, social-media]
languages: [python]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://ath-maas.github.io/Pixelle-Video/zh
repo: https://github.com/ATH-MaaS/Pixelle-Video
docs_url: https://ath-maas.github.io/Pixelle-Video/zh
tier: standard
metrics:
  stars: 28396
  pushed_at: "2026-06-14T12:40:58Z"
  checked_at: "2026-09-24"
  archived: false
related: [money-printer-turbo, comfyui-minimax-h3-studio, voxcpm]
aliases: [pixelle]
risk_notes: "仓库已从 AIDC-AI 组织迁移到 ATH-MaaS（旧仓库地址自动跳转，但 README 内链接仍大量写 AIDC-AI，其文档域名 aidc-ai.github.io 已 404，可用地址为 ath-maas.github.io）。最近一次推送 2026-06-14，距今约 3 个月。出片链路依赖外部模型与额度：LLM API Key 为必填，图像/视频需三选一（本地 ComfyUI、RunningHub 按量、或直连 DashScope/OpenAI/ARK/Kling 等 API），TTS 默认 Edge-TTS 免费、可换 Index-TTS；另需自备 ffmpeg。Apache-2.0 可商用，注意仓库含 NOTICE 文件。"
added_at: "2026-09-19"
updated_at: "2026-09-19"
---

# Pixelle-Video AI 全自动短视频引擎

> 一句话主题 → 成片。上游：[ATH-MaaS/Pixelle-Video](https://github.com/ATH-MaaS/Pixelle-Video) · 许可证：Apache-2.0

## 这是什么

Pixelle-Video（28.2k star）是「全自动短视频」路线的代表项目：只给一个主题，它自动完成文案撰写 → AI 配图/视频 → 语音解说 → 背景音乐 → 合成出片，主打零剪辑经验可用。

模块化流水线（文案生成 → 配图规划 → 逐帧处理 → 视频合成）的每个环节都能替换实现：

- **LLM**：通义千问、GPT、DeepSeek、Ollama 等，WebUI 内选预设自动填 base_url 与 model；
- **图像/视频**：本地 ComfyUI 工作流、RunningHub（含 48G 显存机器）、或直连 DashScope / OpenAI / Seedream / Seedance / Kling 等 API，支持 WAN 2.1 等视频模型；
- **语音**：Edge-TTS（免费）、Index-TTS 及多语言音色；
- **扩展模块**：数字人口播、图生视频、动作迁移（上传参考视频 + 图片）。

竖屏 / 横屏多尺寸、多种视觉风格模板，支持批量创建任务与历史记录。

## 怎么安装

Windows 有免环境的一键整合包（含全部依赖，无需 Python / uv / ffmpeg）：

```text
https://github.com/ATH-MaaS/Pixelle-Video/releases/latest
下载 Windows 一键整合包 → 解压 → 双击 start.bat → 自动打开 http://localhost:8501
```

macOS / Linux 从源码（需先备好 `uv` 与 `ffmpeg`）：

```bash
git clone https://github.com/ATH-MaaS/Pixelle-Video.git
cd Pixelle-Video
uv run streamlit run web/app.py     # 自动装依赖并打开 http://localhost:8501
```

Docker：仓库自带 `Dockerfile` 与 `docker-compose.yml`，另有 `docker-start.sh`、`start_web.sh`。

## 怎么用

- 首次使用先在 WebUI 的「⚙️ 系统配置」里填 LLM API Key，并按需配 ComfyUI 地址 / RunningHub Key / 直连模型供应商，然后「保存配置」。
- 主流程三栏布局：输入主题 → 选模板与尺寸 → 生成；也可用固定脚本按段落/行/句子切分。
- 自定义素材：上传自己的照片与视频，让 AI 分析后生成脚本。
- 除 WebUI 外还提供 API 接口，支持模板自定义参数，可接入自动化批量出片。

## 注意事项

- **上游组织迁移**：仓库现属 `ATH-MaaS`，README 内仍大量写 `AIDC-AI`；旧文档域名 `aidc-ai.github.io` 已 404，clone 与查文档都用新地址。
- **更新节奏**：最近推送 2026-06-14，功能列表停在 2026-06-01，选型时留意是否仍活跃。
- **成本**：真正决定出片质量与费用的是所配的图像/视频模型额度；Edge-TTS 免费但稳定性一般，README 记录过锁定 edge-tts 版本修 TTS 不稳定的处理。
- **许可证 Apache-2.0**：可商用，仓库含 `NOTICE` 文件需一并保留。
- 官方文档：[ath-maas.github.io/Pixelle-Video/zh](https://ath-maas.github.io/Pixelle-Video/zh)，另有 B 站视频教程与 Windows 整合包发行页。
