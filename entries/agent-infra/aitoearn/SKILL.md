---
record_type: entry-record
id: aitoearn
name_zh: "AiToEarn AI 内容营销智能体"
name_en: "AiToEarn — AI Content Marketing Agent"
summary_zh: "面向一人公司与创作者的 AI 内容营销平台：用 Agent 批量生成视频/图文，排期分发到抖音、小红书、TikTok、YouTube、X 等平台，并支持自动化互动、评论转化信号识别与 CPS/CPE/CPM 内容变现。"
summary_en: "AI content marketing platform for creators and one-person companies: batch media generation, cross-platform publishing, automated engagement, and monetization."
category: agent-infra
kind: framework
tags: [aitoearn, content-marketing, ai-agent, mcp, social-media, monetization, self-hosted, docker]
languages: [typescript, javascript]
doc_languages: [zh, en, ja]
license: MIT
homepage: https://aitoearn.ai/
repo: https://github.com/yikart/AiToEarn
tier: standard
metrics:
  stars: 25715
  pushed_at: "2026-08-15T15:20:35Z"
  checked_at: "2026-09-05"
  archived: false
related: [money-printer-turbo, staffdeck]
aliases: [AiToEarn, aitoearn-ai]
risk_notes: "MIT 许可，但平台会操作真实社媒账号并调用第三方模型/平台接口；使用前需确认各平台服务条款与账号策略，配置最小权限 API Key，并注意模型调用与内容分发费用。中国版与国际版 Key 和 API 环境必须匹配，否则会返回 401。自动化互动和批量发布应控制频率，避免触发平台风控。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# AiToEarn AI 内容营销智能体

> 用 AI Agent 打通内容创作、跨平台分发、互动运营与内容变现的闭环。上游：[yikart/AiToEarn](https://github.com/yikart/AiToEarn) · 许可证：MIT

## 这是什么

AiToEarn 是面向一人公司、创作者与品牌团队的 AI 内容营销平台。它围绕创作、发布、互动和变现四个环节提供 Agent 能力：

- **Create**：调用视频与图像模型批量生成视频或图文草稿，支持参考图、翻译、剪辑、目标平台限制与文案提示词。
- **Publish**：通过统一日历把内容排期发布到抖音、小红书、快手、B 站、视频号、公众号、TikTok、YouTube、X、Facebook、Instagram、Threads、Pinterest、LinkedIn 等平台。
- **Engage**：结合浏览器插件与 AI 自动处理点赞、收藏、关注和评论回复，并识别“求链接”“怎么购买”等转化信号。
- **Monetize**：提供内容交易与商家推广任务，支持按成交、互动或播放量结算。

平台提供网站、OpenClaw 插件、MCP 接入、Docker 自部署与源码开发等多种入口；主体工程包含 Web、后端和 Electron 桌面客户端。

## 怎么安装

自部署时在服务器执行：

```bash
git clone https://github.com/yikart/AiToEarn.git
cd AiToEarn
docker compose up -d
```

启动后访问 `http://localhost:8080`。若要在 Claude、Cursor 或其他 MCP Agent 中调用，先在官网注册并创建 API Key，再把 Agent 的 MCP 地址设为 `https://aitoearn.ai/api/unified/mcp`，请求头 `x-api-key` 填入 Key。中国版应使用 `aitoearn.cn` 与对应 Key。

## 怎么用

1. 登录平台并在设置中创建 API Key。
2. 连接目标社媒账号或配置官方 Relay 授权；自部署后在配置管理中分别设置 Server Relay 与 AI Relay。
3. 向 Agent 下发创作或发布任务，确认平台限制、排期时间和生成素材。
4. 用互动模块管理评论与品牌监测；需要商业化时在内容市场接取或发布推广任务。

## 注意事项

- **账号与合规**：自动发布、批量互动和平台授权都涉及真实账号，务必遵守目标平台服务条款，控制频率并准备人工复核。
- **凭据安全**：API Key、模型 Key、OAuth Relay 与社媒账号授权应分环境保存；中国版与国际版 Key 混用会返回 401。
- **成本依赖**：AI 生成、视频处理和平台调用可能产生模型或服务费用，实际效果取决于所配置模型与素材质量。
- **部署依赖**：Docker 部署不需要手动安装数据库；源码开发需要 Node.js 20+、pnpm/Nx 与可选 MongoDB/Redis 环境。
