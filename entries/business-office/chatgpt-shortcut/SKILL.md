---
record_type: entry-record
id: chatgpt-shortcut
name_zh: ChatGPT Shortcut 提示词快捷指令库
name_en: ChatGPT Shortcut (AiShort)
summary_zh: 面向普通用户的可检索提示词库——按职业与场景分类的现成提示词卡片，拿来就用，支持搜索、筛选、收藏自己的常用库，覆盖文案、办公、营销、编程等场景，配浏览器扩展与 Docker 自托管方案。注意：非 SKILL.md 形态，作为提示词参考库使用而非可安装技能。
summary_en: "A searchable prompt library for ChatGPT, Claude, Gemini and Cursor: ready-to-use prompt cards by role and scenario, with browser extension and Docker self-hosting."
category: business-office
kind: framework
tags: [prompt-engineering, writing, social-media, self-hosted, docker, multilingual]
languages: [typescript, markdown]
doc_languages: [zh, en]
license: MIT
homepage: https://www.aishort.top
repo: https://github.com/rockbenben/ChatGPT-Shortcut
tier: standard
metrics:
  stars: 8730
  pushed_at: "2026-08-29"
  checked_at: "2026-08-30"
  archived: false
related: []
aliases: [chatgpt-shortcut, aishort, ai-short]
risk_notes: 非 SKILL.md 项目：主体是提示词库网站与浏览器扩展，不能作为 Agent 技能安装；提示词面向通用对话模型且由社区贡献，质量参差，实际使用前需自行校准。
added_at: "2026-08-30"
updated_at: "2026-08-30"
---

# ChatGPT Shortcut 提示词快捷指令库

> 别再从头写提示词——按职业/场景分类的现成提示词卡片库，搜索即用。
> 上游：[rockbenben/ChatGPT-Shortcut](https://github.com/rockbenben/ChatGPT-Shortcut) · 许可证：MIT

## 这是什么

ChatGPT Shortcut（AiShort，[aishort.top](https://www.aishort.top)）是一个
**可检索的提示词库网站**：将经过整理的提示词做成一张张「卡片」，按文案、办公、
营销、编程、教育等职业/场景分类，支持关键词搜索、标签筛选、点赞排序，登录后
可把好用的提示词收进自己的收藏库。面向 ChatGPT / Claude / Gemini / Cursor 等
通用对话模型，提供包括中文在内的十余种语言界面。

仓库本体是 TypeScript + Docusaurus 的站点源码，另有 Chrome/Edge 浏览器扩展。
提示词数据以 JSON 卡片形式存放在上游 `src/data/cards/` 目录，可被程序直接读取。
**注意：它不是 SKILL.md 形态的项目**，不能作为 Agent 技能安装；收录价值在于
当作「提示词参考库」——人或 Agent 需要现成提示词模板时来此检索。

## 怎么安装

三种获取方式，按需选择：

```bash
# 方式一：无需安装，直接使用在线站
#   https://www.aishort.top

# 方式二：Docker 自托管（数据完全本地）
git clone --depth 1 https://github.com/rockbenben/ChatGPT-Shortcut.git
cd ChatGPT-Shortcut
docker compose up -d
# 浏览器访问 http://localhost:3000
```

方式三：浏览器扩展——在上游 README 或发布页获取 Chrome/Edge 扩展安装包，
随时在侧边栏唤起提示词库。

## 怎么用

- 打开网站或扩展，按分类浏览或搜索关键词（如「周报」「小红书」「SQL」），
  复制卡片中的提示词直接粘到任意对话模型中使用；
- 登录后可点赞、收藏，沉淀自己的常用提示词库；
- Agent 场景：需要提示词模板时，可让 Agent 检索上游 `src/data/cards/zh.json`
  等语言卡片文件，按场景挑选后改写使用。

## 注意事项

- **非技能形态**：仓库中没有 SKILL.md，不能放进 Agent 技能目录，也不要把本
  条目文件误当技能安装；
- **内容质量参差**：提示词由社区整理贡献，面向通用对话模型，直接使用前建议
  结合自己的实际场景校准；提示词文本的转载授权以上游仓库说明为准（仓库整体
  为 MIT，但部分文案可能有额外署名要求）；
- 本仓库不包含该项目任何源码，仅提供导航与获取指引。
