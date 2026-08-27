---
record_type: entry-record
id: money-printer-turbo
name_zh: "MoneyPrinterTurbo 一站式 AI 短视频生成工具"
name_en: "MoneyPrinterTurbo — One-Stop AI Short Video Generator"
summary_zh: "一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。"
summary_en: "One-stop AI short-video generator: turn a topic or keyword into script, footage, subtitles, music, and HD video through Agent, WebUI, API, CLI, or batch tasks."
category: design-creative
kind: framework
tags: [video-production, ai-agent, short-video, tts, docker, self-hosted, multilingual, social-media]
languages: [python]
doc_languages: [zh, en, ja]
license: MIT
homepage: https://github.com/harry0703/MoneyPrinterTurbo
repo: https://github.com/harry0703/MoneyPrinterTurbo
tier: standard
metrics:
  stars: 116792
  pushed_at: "2026-08-26T09:37:30Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [moneyprinter]
risk_notes: "MIT 可商用；生成效果依赖外部服务：脚本需要 LLM API Key（Kimi/OpenAI/Claude/Gemini/DeepSeek 等），素材与出片依赖 Pexels/Pixabay/Coverr 或 WaveSpeed 账号与额度，默认 Edge TTS 免费；自动发布功能依赖 Upload-Post 配置；Whisper 字幕首次需下载约 3GB 模型，GPU 非必需；Windows 路径应避免中文、空格与特殊字符，ffmpeg 自动下载失败时可手动指定 ffmpeg_path。"
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# MoneyPrinterTurbo 一站式 AI 短视频生成工具

> 一站式 AI 短视频生成工具。上游：[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) · 许可证：MIT

## 这是什么

MoneyPrinterTurbo 是目前 AI 短视频生成领域最具代表性的开源项目之一（11.6 万+ star）：给定一个主题或关键词，它会调用大模型生成视频脚本，从 Pexels / Pixabay / Coverr 挑选高清素材（也可用本地素材或 WaveSpeed 按脚本生成画面），再合成 TTS 配音、字幕、背景音乐和转场，输出竖屏 9:16 或横屏 16:9 成品视频。仓库同时提供 AI Agent Skill、WebUI、API、CLI 四种使用方式，支持批量生成、多语言脚本、预设导入导出，并可一键发布到 TikTok、Instagram 与 YouTube Shorts。

## 怎么安装

推荐用 `uv` 本地部署（Python 3.11+），或直接跑 Docker 预构建镜像：

```bash
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
uv python install 3.11
uv sync --frozen
cp config.example.toml config.toml
```

Docker 方式：

```bash
cd MoneyPrinterTurbo
cp config.example.toml config.toml
docker compose -f docker-compose.release.yml up
```

## 怎么用

- WebUI：Windows 执行 `webui.bat`，macOS/Linux 执行 `sh webui.sh`，默认访问 `http://127.0.0.1:8501`；在「基础设置」里配置 LLM Provider 与 API Key。
- 命令行：`uv run python cli.py --video-subject "人工智能如何改变日常生活"`，也可用 `--batch-file` 批量生成。
- API：`uv run python main.py` 启动，API 文档在 `http://127.0.0.1:8080/docs`。
- Agent：可直接读取仓库内置的 [docs/skill/SKILL.md](https://github.com/harry0703/MoneyPrinterTurbo/blob/main/docs/skill/SKILL.md)，让 Agent 自动完成安装、配置与生成流程。

## 注意事项

- **许可证 MIT**：可商用；生成内容与素材版权由使用者自行负责。
- **外部依赖**：大模型脚本需要对应 Provider 的 API Key；云端 TTS、Pexels/Pixabay/Coverr 素材、WaveSpeed 文生视频均按平台规则使用与计费，默认 Edge TTS 免费。
- **资源占用**：Whisper 字幕模式首次使用需下载约 3 GB 模型（可换约 1.6 GB 的 `large-v3-turbo`）；GPU 非必需，faster-whisper 和批量生成时建议配置显卡。
- **平台细节**：Windows 一键启动包和目录路径应避免中文、空格与特殊字符；`ffmpeg` 自动下载失败时报 `No ffmpeg exe could be found`，可在 `config.toml` 手动指定 `ffmpeg_path`。
- **发布功能**：跨平台发布需注册 Upload-Post 并在 `config.toml` 填写 API Key 与目标平台。
- 维护十分活跃（2026-08 仍持续更新），官方提供多语言 README、一键启动包与 Docker 镜像。
