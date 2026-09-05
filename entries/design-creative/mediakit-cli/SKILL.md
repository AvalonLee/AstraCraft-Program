---
record_type: entry-record
id: mediakit-cli
name_zh: "AI MediaKit CLI"
name_en: "AI MediaKit CLI"
summary_zh: "火山引擎 MediaKit 官方 CLI：兼容 FFmpeg 命令面，本地跑裁剪/拼接/字幕等剪辑操作，一键切云端调用画质增强、字幕擦除、ASR、OCR、剧情线分析等 AI 能力，覆盖视频/图像/音频 80+ 原子能力和 5 个 Agent Skill。"
summary_en: "Volcengine MediaKit official CLI with an FFmpeg-compatible command surface: local FFmpeg editing plus cloud AI capabilities like video enhancement, subtitle erasure, ASR, OCR, and storyline analysis."
category: design-creative
kind: cli-tool
tags: [cli, video-production, image-generation, ai-agent, ffmpeg, short-video, cinematic, multimodal]
languages: [go, typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/volcengine/mediakit-cli
repo: https://github.com/volcengine/mediakit-cli
tier: standard
metrics:
  stars: 197
  pushed_at: "2026-09-02T03:57:08Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [mediakit, AI MediaKit CLI, byted-mediakit]
risk_notes: "云端 AI 能力需火山引擎 API Key，按调用计费，使用前需阅读火山引擎智能处理服务条款与计费规则；本地模式依赖本机 FFmpeg 5.1.x（ffmpeg + ffprobe），Agent 安装会下载并执行 npm 包与 Skill 文件，执行前应复核上游 README 与许可证全文。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# AI MediaKit CLI

> 火山引擎 MediaKit 官方 CLI：兼容 FFmpeg 的命令面，同一条命令在本地跑 FFmpeg 剪辑、加 `--cloud` 切到云端 AI 能力。上游：[volcengine/mediakit-cli](https://github.com/volcengine/mediakit-cli) · 许可证：MIT

## 这是什么

AI MediaKit CLI 是火山引擎 MediaKit 的官方命令行工具，设计目标是用同一条命令面覆盖「本地 FFmpeg 剪辑」和「云端 AI 处理」两种模式：

- **本地模式（`--local`）**：基于本机 `ffmpeg` / `ffprobe`，零成本完成裁剪、拼接、加字幕、混音、提取音频、翻转、淡入淡出、绿幕抠图、元信息探测等 23 项剪辑操作，与 FFmpeg 命令直觉对齐。
- **云端模式（`--cloud`）**：调用火山引擎弹性算力，覆盖 FFmpeg 做不到的 AI 能力——画质增强、字幕擦除、ASR、OCR、高光智剪（短剧/小游戏/影视拆条）、剧情故事线分析、场景切分、人像抠图等 55+ 智能视频能力，另有 21 项图像 AI 与 4 项音频能力。
- **`--local` / `--cloud` 逐命令切换**：共用同一份参数与 `--schema`，Agent / 脚本零改造切换；默认 `cloud-first`。
- **官方 Agent Skills**：仓库内置 5 个 skill（shared / editing / audio / image / video），覆盖全部能力域，通过 `npx skills add` 安装到 AI Agent。

上游 README 标注未来预计提供 100+ 音视频原子能力（视频翻译、解说生成、漫剧转绘等陆续上线）。

## 怎么安装

前置条件：Node.js >= 18；本地模式另需本机 FFmpeg 5.1.x（`ffmpeg` + `ffprobe`）；源码构建需 Go 1.22+。

**一键安装（推荐）：**

```bash
npx @volcengine/mediakit-cli install -y
```

**从源码构建：**

```bash
git clone https://github.com/volcengine/mediakit-cli.git
cd mediakit-cli
make build
```

**安装 Agent Skills（源码构建时必需）：**

```bash
cd mediakit-cli
npx -y skills add ./skills -g -y
```

## 怎么用

### 初始化与验证

```bash
# 交互式初始化
mediakit-cli init

# Agent 非交互式初始化（API Key 从火山引擎控制台获取）
mediakit-cli init --mode cloud-first --api-key <your-api-key> --yes

# 环境自检：云端连通性、本地依赖、安装建议
mediakit-cli doctor
mediakit-cli version
```

### 本地剪辑（无需 API Key）

```bash
# 视频裁剪：本机 FFmpeg，同步完成
mediakit-cli --local editing trim-video --video-url ./in.mp4 --start-time 3 --end-time 8
```

### 云端 AI 能力

```bash
# 云端画质增强（异步返回 task_id）
mediakit-cli --cloud video enhance-video --video-url <url> --resolution 1080p

# 轮询任务至终态
mediakit-cli shared query-task --task-id <task_id> --poll-complete
```

### Agent 能力自省

每个能力命令支持 `--schema`，输出输入/输出 JSON Schema、Mode 与 Async 元信息，供 Agent 动态发现工具能力：

```bash
mediakit-cli video enhance-video --schema
mediakit-cli --local editing trim-video --schema
```

## 注意事项

- **许可证 MIT**：CLI 本体可免费商用；但云端 AI 能力走火山引擎 API，按调用量计费，使用前请阅读[视频云服务专有条款](https://www.volcengine.com/docs/6448/79646?lang=zh)与[智能处理服务计费规则](https://www.volcengine.com/docs/6448/104992?lang=zh)。
- **本地依赖**：本地模式需本机安装 FFmpeg 5.1.x（含 `ffprobe`），输出默认落盘 `~/.mediakit/temp`（`--output-path` 或 `MEDIAKIT_OUTPUT_PATH` 可覆盖）。
- **鉴权**：仅需一个 API Key，无需 OAuth / STS / IAM；支持 `init --credential-store config` 持久化或 `MEDIAKIT_API_KEY` 环境变量临时注入。
- **Agent 安装**：`npx @volcengine/mediakit-cli install -y` 会下载并执行 npm 包与 Skill 文件，Agent 在无人值守场景应先复核上游 README 与许可证全文。
- **维护活跃**（2026-09 更新），提供中英文 README，官方出品。
