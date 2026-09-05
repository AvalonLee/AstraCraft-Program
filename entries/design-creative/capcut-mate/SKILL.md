---
record_type: entry-record
id: capcut-mate
name_zh: "CapCut Mate 剪映自动化"
name_en: "CapCut Mate API"
summary_zh: "开源剪映草稿自动化助手（FastAPI）：让大模型具备剪映基础剪辑能力——创建草稿、添加视频/音频/图片/贴纸/字幕/特效/蒙版、关键帧控制、文本样式与动画；支持独立部署、Coze/n8n 工作流集成、剪映云渲染直接生成成片，提供 Coze 插件一键导入。"
summary_en: "Open-source CapCut draft automation API on FastAPI: create drafts, add video, audio, images, stickers, subtitles, and effects; deploy standalone or via Coze/n8n workflows."
category: design-creative
kind: framework
tags: [video-production, short-video, jianying, ai-agent, self-hosted, docker]
languages: [python]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://github.com/Hommy-master/capcut-mate
repo: https://github.com/Hommy-master/capcut-mate
tier: standard
metrics:
  stars: 1701
  pushed_at: "2026-09-01T11:32:43Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [jianying-assistant, capcut-mate-api, 剪映小助手]
risk_notes: "生成的是剪映草稿文件（非成片），最终导出仍需剪映客户端或云渲染；草稿写入剪映的 draft_content 目录路径因版本和平台而异；Docker 部署默认端口 30000；剪映版本升级可能导致草稿格式不兼容。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# CapCut Mate 剪映自动化

> 开源剪映小助手：让大模型具备剪映剪辑能力。上游：[Hommy-master/capcut-mate](https://github.com/Hommy-master/capcut-mate) · 许可证：Apache 2.0 · 1.7k stars

## 这是什么

CapCut Mate API 是一个完全开源免费的剪映草稿自动化助手，基于 FastAPI 构建，支持独立部署。它把剪映的核心功能（创建草稿、添加素材、设置效果、保存草稿）封装为 RESTful API，让大模型或自动化工作流直接调用——普通用户不用学剪映也能快速出片。

**核心能力**：

| 类别 | 接口 |
|------|------|
| 草稿管理 | `create_draft`（设置画布尺寸）、`save_draft`、`get_draft` |
| 视频素材 | `add_videos`（裁剪/缩放/特效）、`add_images`（动画/转场）、`add_sticker` |
| 音频处理 | `add_audios`（音量/淡入淡出）、`get_audio_duration` |
| 文本字幕 | `add_texts`、`add_captions`（字幕识别） |
| 高级功能 | 关键帧控制、文本样式、动画效果、特效、蒙版 |
| 导出 | 剪映云渲染直接生成最终视频 |

**部署方式**：

- **独立部署**：Docker / uv 本地跑 FastAPI 服务
- **Coze 工作流**：上传 `openapi.yaml` 一键导入 Coze 插件
- **n8n 工作流**：REST API 通用接入
- **Agent Skill**：内置 `SKILL.md`，AI Agent 读完即可调用

## 怎么安装

**Docker（推荐）：**

```bash
git clone https://github.com/Hommy-master/capcut-mate.git
cd capcut-mate
docker-compose pull && docker-compose up -d
```

访问 `http://localhost:30000/docs` 查看交互式 API 文档。

**uv 本地部署：**

```bash
git clone https://github.com/Hommy-master/capcut-mate.git
cd capcut-mate
uv sync
# Windows 额外执行
uv pip install -e ".[windows]"
uv run main.py
```

## 怎么用

**对 Agent 说：**

```text
帮我用 CapCut Mate 创建一个剪映草稿：1080x1920 竖版，
加入 3 段视频素材（各自裁剪到 3 秒），加一句字幕"Hello World"，
背景音乐用 bgm.mp3 音量 30%，保存草稿。
```

**Coze / n8n 工作流：** 上传 `openapi.yaml` 到 Coze 平台导入插件，或在 n8n 中用 HTTP Request 节点调用 REST API。

**Coze 插件一键导入：** 打开 Coze 平台 → 添加插件 → 导入 → 上传项目目录下的 `openapi.yaml` → 启用。

## 注意事项

- **许可证 Apache 2.0**：可自由商用。
- **草稿非成片**：生成的剪映草稿文件需要剪映客户端打开做最终导出（或走云渲染）；草稿格式随剪映版本可能变化。
- **Python 3.11+**：需要 Python 3.11 或更高版本。
- **维护活跃**（2026-09 更新），提供中文/英文双语 README 和详细 API 文档，Coze 插件已上架。
