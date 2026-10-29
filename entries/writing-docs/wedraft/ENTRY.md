---
record_type: entry-record
id: wedraft
name_zh: "WeDraft 公众号排版技能"
name_en: "WeDraft"
summary_zh: "小哈公社出品的微信公众号文章 Markdown 排版工具：网页版、macOS 桌面版、CLI、MCP 与 Skill 共用同一排版核心。七款阅读模板一键换风格、双向实时预览、复制前问题检查；让 AI 一句话把 Markdown 排成适合微信阅读的富文本，只管排版、不自动发布。"
summary_en: "A WeChat Official Account Markdown formatting tool whose web, macOS, CLI, MCP and Skill forms share one core; agents format articles into rich text with a single sentence."
category: writing-docs
mode: install
tags: [writing, ai-agent, mcp, cli, skill]
languages: [typescript]
doc_languages: [zh]
license: MIT
homepage: https://wedraft.xiaoha.org
repo: https://github.com/pafa/WeDraft
tier: standard
metrics:
  stars: 37
  pushed_at: "2026-09-28T12:59:39Z"
  checked_at: "2026-10-29"
  archived: false
related: [writing, ai-agent]
aliases: ["小哈公众号排版", "WeDraft"]
risk_notes: "公开网页版为测试版，源码当前准备 0.2.0，实际部署以官网 release.json 为准；安装器当前支持 macOS / Linux，其他本地 stdio MCP 客户端见上游接入指南；工具只负责排版，不操作微信、不自动发布，发布前仍需人工检查。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# WeDraft 公众号排版技能

> 把 Markdown 变成适合微信阅读的文章：网页里边改边看，或让 AI 直接完成排版。上游：[pafa/WeDraft](https://github.com/pafa/WeDraft) · 许可证：MIT

## 这是什么

小哈公社出品的微信公众号 Markdown 排版工具（MIT，中文）：标题、段落、引用、列表、代码、表格、图片与来源说明由统一模板处理，完成后复制富文本正文粘贴到公众号后台。网页版、macOS 桌面版、CLI、MCP 与 Skill **共用同一排版核心**，手工编辑与 AI 工作流效果一致。

核心能力：七款阅读模板一键换风格（不改原文）、Markdown 与排版实时联动且预览中微调会写回原稿、iPhone / Android 尺寸检查阅读效果、复制前检查并定位不支持的语法与图片问题（减少内容静默丢失）、导出 `.wedraft.zip` 把原稿 + 模板 + 本地图片打包带走。

## 怎么安装

让能执行本机命令的 Agent 自己接入（推荐），或终端一条命令：

```sh
# 自动准备 CLI、MCP 和 Skill，并自动配置 Codex；缺 Node 会装专用运行时（macOS / Linux）
curl -fsSL 'https://wedraft.xiaoha.org/integrations/install.sh' | sh -s -- 'https://wedraft.xiaoha.org/integrations/'
```

也可以把这句话交给任意 Agent：`读取 https://wedraft.xiaoha.org/connect.md，帮我接入 WeDraft`。不想装任何东西，直接用网页版 [wedraft.xiaoha.org](https://wedraft.xiaoha.org)。

## 怎么用

接入后每篇文章一句话，例如：

```text
用 WeDraft 的青岚模板排版这篇 Markdown，保留原文、链接和图片来源，给我可以复制富文本的预览。
```

AI 会生成 `preview.html` 和文章包；打开预览复制正文即可，需要继续修改时把文章包导入网页。网页版流程则是：粘贴 Markdown → 选模板、对照预览调整 → 复制排版 → 到公众号后台粘贴发布。

## 注意事项

- **版本节奏**：公开网页版是测试版，源码准备 0.2.0，部署形态以官网 `release.json` 为准；迭代期行为可能变化。
- **平台支持**：本机安装器当前支持 macOS / Linux；其他本地 stdio MCP 客户端见上游接入指南。
- **边界清晰**：只管排版，不操作微信、不自动发布；标题需在公众号后台单独填写并检查。
- MIT 许可，可商用；上游为小哈公社（xiaoha.org）维护。
