---
id: arcreel
name_zh: "ArcReel AI 视频生产工作台"
name_en: "ArcReel — Self-Hosted AI Video Production Workbench"
summary_zh: "开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。"
summary_en: "Open-source self-hosted AI video workbench: turn novels, scripts, or products into short videos with consistent characters, cost tracking, and agent orchestration."
category: design-creative
kind: framework
tags: [video-production, cinematic, ai-agent, storyboard, self-hosted, docker, prompt-engineering, jianying]
languages: [python, typescript]
doc_languages: [zh, en]
license: AGPL-3.0
homepage: https://github.com/ArcReel/ArcReel
repo: https://github.com/ArcReel/ArcReel
docs_url: https://docs.arc-reel.com/
tier: watch
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# ArcReel AI 视频生产工作台

> 开源、自托管的 AI 视频生产工作台。上游：[ArcReel/ArcReel](https://github.com/ArcReel/ArcReel) · 许可证：AGPL-3.0 · 文档：[docs.arc-reel.com](https://docs.arc-reel.com/)

## 这是什么

ArcReel 是面向 AI 漫剧与小说改编、旁白/解说短视频、广告与带货短片的开源自托管工作台。它把内容分析、资产管理、分镜、媒体生成、费用追踪和导出组织成一条可审核、可中断恢复的生产流水线。

核心能力：小说或成品剧本逐步转化为角色/场景/道具资产 → 分集结构化剧本 → 分镜图/多宫格分镜 → 视频片段/旁白音轨 → 成片合成。每个阶段可由 Agent 智能体编排，也可在工作台中人工审核、调整或重新生成。支持统一配置文本、图像、视频和 TTS 能力，生成前后查看费用与实际用量，并可直接导出为剪映草稿继续编辑。

## 怎么安装

```bash
# 前提：Docker + Docker Compose
git clone https://github.com/ArcReel/ArcReel.git
cd ArcReel/deploy

cp .env.example .env
docker compose up -d
```

访问 `http://localhost:1241`，默认用户名 `admin`。`AUTH_PASSWORD` 留空时首次启动自动生成密码并回写到 `deploy/.env`。

登录后在「设置」页面配置 ArcReel Agent 以及文本、图像、视频等生成能力，再创建项目开始制作。

## 怎么用

1. 部署后登录工作台，配置 AI 供应商（Agent/文本/图像/视频/TTS）
2. 创建项目，导入小说、成品剧本或商品素材
3. 按流水线逐步推进：内容分析 → 资产管理 → 分镜 → 视频生成 → 合成导出
4. 可导出为 MP4 视频或剪映草稿（面向中国大陆版剪映）

## 注意事项

- **许可证 AGPL-3.0**：用于网络服务需开源衍生代码；无法接受 AGPL 的组织可联系 support@arc-reel.com 获取商业授权。
- **运行环境**：需 Docker 与 Docker Compose；默认将 1241 端口发布到宿主机所有网络接口，请勿直接暴露到公网。
- **剪映导出**：面向中国大陆版剪映，CapCut 兼容性尚未验证。
- **维护活跃**：2026 年持续更新，有完整文档站和飞书社区。
- 内置 Agent 编排能力，支持多模型供应商统一配置与费用追踪。
