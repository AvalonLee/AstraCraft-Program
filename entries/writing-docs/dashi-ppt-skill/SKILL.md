---
id: dashi-ppt-skill
name_zh: Dashi PPT Skill 大师 PPT
name_en: Dashi PPT Skill
summary_zh: "面向职场的可编辑 PPT 生成 Skill：把文档丢给 AI Agent，一键生成自带浏览器编辑控制台的演示文稿，支持 12 套视觉主题、1020 个版式，并可导出 HTML / PDF / 真实可编辑的 PPTX。"
summary_en: "Editable PPT generation skill for the workplace: feed docs to your AI agent and get a presentation with an in-browser editing console; export to HTML / PDF / editable PPTX."
category: writing-docs
kind: skill
tags: [pptx, document-generation, ai-agent, claude-code, codex]
languages: [markdown, javascript]
doc_languages: [zh, en]
license: AGPL-3.0
homepage: https://github.com/chuspeeism/dashi-ppt-skill
repo: https://github.com/chuspeeism/dashi-ppt-skill
tier: standard
metrics:
  stars: null
  pushed_at: "2026-08-26"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [dashi-ppt, 大师ppt, 大师PPT, dashippt]
risk_notes: 许可证 AGPL-3.0（强 Copyleft）：本仓库仅索引不转载源码，但如果你修改 dashi-ppt-skill 并再分发、或以网络服务形式（含 SaaS）提供，须按 AGPL-3.0 开源你的修改。导出 PPTX / PDF 需本机装有 Chrome / Chromium / Edge。支持 Claude Code、Codex、豆包、Marvis、Workbuddy、Dumate、Qclaw 等多平台。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Dashi PPT Skill 大师 PPT

> 面向职场的可编辑 PPT 生成 Skill。上游：[chuspeeism/dashi-ppt-skill](https://github.com/chuspeeism/dashi-ppt-skill) · 许可证：AGPL-3.0

## 这是什么

一个真正面向职场人的 **PPT 生成 Skill**：把文档丢给你的 AI Agent，每一页都自带浏览器内编辑控制台的演示文稿——不满意的地方直接在浏览器里改，改完还能一键导出成真实的、可编辑的 PPTX。

内置 **12 套视觉主题、1020 个版式页面、8576 个可调控件**，覆盖封面、目录、指标、趋势、对比、流程、风险、结尾等 20 种页面角色，并集成雷达图 / 瀑布图 / 桑基图 / 甘特图等图表，以及 SWOT、波特五力、PEST、商业模式画布、双钻模型等分析模型版式。支持 Claude Code、Codex、豆包、Marvis、Workbuddy、Dumate、Qclaw 等多平台。

## 怎么安装

一条命令即可安装 / 更新（重跑即原地更新，已装依赖自动保留）：

```bash
# 国际网络
npx dashi-ppt-skill@latest

# 国内网络
npx --registry=https://registry.npmmirror.com dashi-ppt-skill@latest
```

也可以让 AI Agent 帮你安装：

```text
帮我安装 skill：npx dashi-ppt-skill@latest
```

环境要求：Node.js 20+ 与 npm；导出 PPTX / PDF 需要本机装有 Chrome / Chromium / Edge。

## 怎么用

把文档交给接入了 Dashi PPT 的 AI Agent，告诉它主题与页面结构，Agent 会生成带浏览器编辑控制台的演示文稿；在浏览器里用滑杆、开关、下拉直接调布局 / 配色 / 模块数量 / 页面重点，文字可就地修改、媒体可替换，最后一键导出 HTML 离线包 / PDF / 可编辑 PPTX。

## 注意事项

- **许可证 AGPL-3.0（强 Copyleft）**：本仓库仅做索引导航、不转载源码；但请注意，若你修改 dashi-ppt-skill 并再分发、或以网络服务形式（含 SaaS）提供，须按 AGPL-3.0 开源你的修改。纯本地使用、不修改不分发则无此义务。
- **导出依赖**：导出 PPTX / PDF 需本机安装 Chrome / Chromium / Edge。
- **不适合**：需要逐像素手工定制视觉的场景。
- 维护活跃（2026-08），多平台 Agent 已实测支持。
