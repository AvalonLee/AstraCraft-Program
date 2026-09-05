---
record_type: entry-record
id: guizang-ppt-skill
name_zh: "Guizang PPT Skill 网页 PPT"
name_en: "Guizang PPT Skill"
summary_zh: "歸藏出品的 AI Agent 网页 PPT 技能：生成单文件 HTML 横向翻页 PPT，内置双视觉系统（Style A 电子杂志 × 电子墨水 / Style B 瑞士国际主义）、32 种锁定版式、PPT 配图（GPT-Image 2.0）、多平台封面（公众号 21:9 / 小红书 3:4）、演讲者模式与低性能静态模式。"
summary_en: "AI Agent skill for single-file HTML slide decks: dual visual systems, 32 locked layouts, image generation, multi-platform covers, and presenter mode."
category: design-creative
kind: skill
tags: [pptx, ai-agent, claude-code, codex, short-video, social-media, cn-localization]
languages: [markdown, html, css]
doc_languages: [zh, en]
license: AGPL-3.0
homepage: https://github.com/op7418/guizang-ppt-skill
repo: https://github.com/op7418/guizang-ppt-skill
tier: core
metrics:
  stars: 25657
  pushed_at: "2026-08-07T03:58:08Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [guizang-ppt, 歸藏 PPT, web-ppt-skill]
risk_notes: "AGPL-3.0 为强 Copyleft：对外提供网络服务需以 AGPL 开源衍生；单文件 HTML 适合演讲和展示，不适合多人协作编辑或大量表格数据；配图流程依赖 GPT-Image 2.0 / GPT-M 2.0（Codex 环境），其他 Agent 可用 Playwright 后验替代。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Guizang PPT Skill 网页 PPT

> 适配 Claude Code / Codex 的网页 PPT 技能。上游：[op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) · 许可证：AGPL-3.0 · 25.7k stars · 歸藏（[@op7418](https://x.com/op7418)）出品

## 这是什么

Guizang PPT Skill 是歸藏在"一人公司"等线下分享中沉淀出来的 Agent PPT 技能：不是生成 .pptx，而是生成**单文件 HTML 横向翻页 PPT**——HTML / CSS 是文本，Agent 能直接读、改、验证；不需要构建、不需要服务器，浏览器直接打开。

**双视觉系统**：

| 系统 | 适合 | 布局数 |
|------|------|--------|
| **Style A：电子杂志 × 电子墨水** | 叙事、观点、分享、个人风格表达 | 10 种（封面、章节、数据大字报、图文、图片网格、Pipeline、对比等） |
| **Style B：瑞士国际主义** | 事实、产品、分析、方法论 | 22 种锁定版式（Cover、Statement、KPI Tower、Loop Diagram、Duo Compare、Image Hero、Closing Manifesto 等） |

**核心特性**：

- **横向左右翻页**：键盘 ← → / 滚轮 / 触屏滑动 / 底部圆点 / ESC 索引
- **主题色预设**：Style A 5 套电子墨水主题、Style B 4 套瑞士高饱和锚点色
- **PPT 配图**：Codex 环境下可用 GPT-Image 2.0 / GPT-M 2.0 生成纪实照片、信息图、流程图、系统关系图、UI 情景图，按模板比例插入
- **多平台封面**：从同一套内容生成公众号 21:9、公众号分享卡 1:1、小红书 3:4、视频号横版
- **演讲者模式**：双窗口观众屏 + 演讲者屏、当前/下一页 16:9 预览、演讲备注、计时排练、自动翻页、激光笔、圈选、现场故障恢复（右下角 P 进入）
- **低性能静态模式**：按 B 关闭 WebGL / canvas 动画
- **质量控制**：瑞士风可脚本校验版式、图片槽位、标题对齐、危险 SVG；Playwright 后验测量超出、底部空白、nav 安全线

## 怎么安装

**一行命令（推荐）：**

```bash
npx skills add https://github.com/op7418/guizang-ppt-skill --skill guizang-ppt-skill
```

**或把这段话发给 AI Agent：**

```text
帮我安装 guizang-ppt-skill。请把 https://github.com/op7418/guizang-ppt-skill 克隆到 ~/.claude/skills/guizang-ppt-skill，安装完成后检查 SKILL.md、assets/、references/ 是否存在。
```

## 怎么用

安装后直接对 Agent 说：

```text
帮我基于这篇文章做一份瑞士风 PPT，控制在 7 页左右，需要 2-3 张配图。
```

更多请求示例：

```text
帮我把这份 Markdown 做成杂志风演讲 PPT。
基于这份 PPT 的核心观点，生成一张公众号 21:9 头图。
给这份 PPT 补齐演讲备注和每页计划时长，然后用演讲者模式帮我排练。
```

**使用场景**：长文章变演讲 PPT（抽观点 → 6-10 页节奏）；方法论 / 产品分析（Style B 瑞士风 + 锁定版式）；个人分享（Style A 杂志风）；PPT 配图（GPT-Image 生成）；多平台封面（同一内容多比例）；现场演讲 / 排练。

## 注意事项

- **许可证 AGPL-3.0**：强 Copyleft——对外提供网络服务需以 AGPL 开源衍生。
- **单文件 HTML**：适合演讲 / 展示 / 发送，不适合需要多人协作编辑或大段表格的场景。
- **平台支持**：Claude Code（原生）、Codex（含配图流程）、Cursor / 其他本地 Agent（需文件读写 + shell）；普通 chatbot 无文件系统不推荐。
- **赞助**：360 安全龙虾、Kimi work、Cola Skill 金牌赞助 + 真格 Token Grant。
