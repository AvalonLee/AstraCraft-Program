---
record_type: entry-record
id: beeftv
name_zh: "BeefTV AI 原生视频创作工作台"
name_en: "BeefTV"
summary_zh: "面向 AI 时代的视频创作工作台：在一张自由画布里连接创意、模型与素材，与 BeefTV Agent 一起从分镜、素材推进到成片，用 Skills 扩展方法、用工作流复用过程；桌面版（macOS / Windows）本地优先，工程全程可继续编辑、迭代和积累。"
summary_en: "An AI-native video creation workspace: an infinite canvas connecting ideas, models and assets, with an agent, skills and reusable workflows; a local-first desktop app for macOS and Windows."
category: design-creative
mode: deploy
tags: [canvas, ai-agent, video-production, image-generation]
languages: [typescript]
doc_languages: [zh, en]
license: LicenseRef-BeefTV-Source-Available-1.0
homepage: https://beeftv.app/
repo: https://github.com/glanderness/BeefTV
tier: standard
metrics:
  stars: 1933
  pushed_at: "2026-10-29T03:19:29Z"
  checked_at: "2026-10-29"
  archived: false
related: [canvas, video-production]
aliases: ["BeefTV", "beeftv"]
risk_notes: "自定义「BeefTV Source Available License 1.0」（GitHub 识别为 NOASSERTION，以 LICENSE 原文为准）：个人、学习、研究与组织内部使用（含对客户交付创作成果）免费，对外提供托管 / API 形式的 External Service 需另行取得商务授权；历史 MIT 材料保留 MIT（Part B）。桌面版需从 Releases 下载安装，生成类功能需自备模型 API Key。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# BeefTV AI 原生视频创作工作台

> 在一个自由画布中连接创意、模型与素材，和 Agent 一起做视频。上游：[glanderness/BeefTV](https://github.com/glanderness/BeefTV) · 许可证：BeefTV Source Available License 1.0

## 这是什么

面向 AI 时代的视频创作工作台（★1.9k，中英双语）：核心是一张**自由画布**，把创意、模型与素材作为节点自由连接，从分镜、素材到成片在同一工程里推进，产出可继续编辑、迭代和积累，而不是一次性出片。

三个抓手：**BeefTV Agent** 作为创作助手贯通分镜方案、制作与成片导出，带影音检查；**Skills** 市场用技能扩展创作方法，支持固定版本安装、回退与私人改写；**工作流**把过程沉淀为可复用流程。生成能力覆盖 AI 图片 / 视频 / 音乐（Seedream 图层拆分、Topaz 超分等），桌面版 macOS / Windows 本地优先。

## 怎么部署运行

桌面版从 GitHub Releases 下载安装（macOS / Windows）：

```bash
# 打开最新 Release 页下载安装包；或访问官网 https://beeftv.app/
gh browse glanderness/BeefTV --release
```

安装后在设置里配置所需模型的 API Key 即可开始；工作区本地优先，工程数据保存在本机。

## 怎么用

在画布中新建工程，把素材与生成节点连接起来推进创作：让 Agent 出分镜方案、逐镜头生成与修改，用 Skills 安装特定风格方法，把跑通的过程存成工作流复用；成片导出前跑一遍影音检查。具体操作见官方 QUICKSTART 与功能清单文档。

## 注意事项

- **协议要读懂**：不是标准开源协议——个人 / 学习 / 研究 / 组织内部使用（含向客户交付创作成果）免费，但**对外提供托管、远程桌面或 API 形式的服务**需取得商务授权（LICENSE 原文 Part A：External Service 条款）；分发不得收取商业对价。商用集成前先核对原文或联系上游。
- **迭代快**：v2.x 更新频繁（最近仍每周发版），行为与界面可能随版本变化。
- 生成类功能依赖第三方模型 API，费用与内容合规自行把握；版本 v2.0 起支持技能市场与可复用工作流。
