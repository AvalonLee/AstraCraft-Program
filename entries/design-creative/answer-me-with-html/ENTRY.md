---
record_type: entry-record
id: answer-me-with-html
name_zh: "Answer me with HTML 网页讲解技能"
name_en: "Answer me with HTML"
summary_zh: "让 AI Agent 用一页可读的 HTML 回答复杂问题：Agent 只写 Markdown 草稿，技能内置 CLI 把它渲染成带 SVG 图解、对比表格与时间线的单文件页面，离线可用；上游基准显示写页 token 约为手写 HTML 的 1/8，还支持 3b1b 风格讲解视频。适配 Claude Code、Codex、Cursor、OpenCode 等。"
summary_en: "An agent skill that answers hard questions with a one-page HTML you can actually read: the model writes only a Markdown draft, and a bundled CLI renders diagrams, tables and timelines."
category: design-creative
mode: install
tags: [ai-agent, claude-code, cli, skill, explainer]
languages: [javascript]
doc_languages: [en, zh]
license: MIT
homepage: https://answer-me-with-html.com/
repo: https://github.com/QingYunA/answer-me-with-html
docs_url: https://github.com/QingYunA/answer-me-with-html/blob/main/docs/reference.md
tier: standard
metrics:
  stars: 4592
  pushed_at: "2026-10-28T03:11:44Z"
  checked_at: "2026-10-29"
  archived: false
related: [ai-agent, claude-code]
aliases: ["Answer me with HTML", "answer-me-with-html"]
risk_notes: "上游 2026-10-02 创建、迭代很快，安装方式与行为可能随版本变化；生成的页面落盘在 ~/.answer-me-with-html/pages/，内容含提问与相关代码片段，注意隐私；token 与耗时节省为上游小样本自测基准（Claude Sonnet 5.5），随模型与问题而异。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# Answer me with HTML 网页讲解技能

> 让 Agent 用一页可读的 HTML 回答复杂问题，代替满屏文字。上游：[QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) · 许可证：MIT

## 这是什么

一个装进 Agent 技能目录的 skill（MIT，2026-10 新星，★4.6k）：安装后照常提问，Agent 先写一份简短 Markdown 草稿，再交给技能自带的 CLI，约 50ms 渲染成一页单文件 HTML——时序图、状态图、对比表格、目录树、时间线等由 CLI 生成，浏览器直接打开，离线可用。

省的是 token 与时间：让模型直接手写 HTML 时，大部分 token 花在 SVG 坐标、CSS 与标签上；本技能让模型只写内容，上游基准约为手写 HTML 的 1/8 token、2.6 倍速。它会自己判断「值不值得开一页」——一行能答的小问题仍返回一行回答；另有 3Blue1Brown 风格讲解视频功能（口播、动画、字幕一体）。

## 怎么安装

需要 Node.js 20+（CLI 捆绑在技能内，无需 npm install）。一条命令装进支持的 Agent（`-a` 指定目标，支持 70+ Agent）：

```bash
npx -y skills add QingYunA/answer-me-with-html -g -y -a claude-code
```

其他方式：

- **让 Agent 自己装**：把下面这句发给 Claude Code、Codex、Cursor、OpenCode 等任意 Agent，它读完 INSTALL.md 会自动完成安装并自检：
  `Install Answer me with HTML: read https://raw.githubusercontent.com/QingYunA/answer-me-with-html/main/INSTALL.md and follow it.`
- **Claude Code 插件市场**：`/plugin marketplace add QingYunA/answer-me-with-html`，再 `/plugin install answer-me-with-html@answer-me-with-html`。
- **手动**：把仓库里 `skills/answer-me-with-html` 目录复制进 Agent 技能目录（Claude Code 为 `~/.claude/skills/`）。

## 怎么用

装好后按平时的方式提问即可，例如「讲讲 TCP 三次握手」「这个仓库的模块是怎么组织的」「Redis 还是 Memcached？」；也可以明确说「用 HTML 解释」。生成的页面保存在 `~/.answer-me-with-html/pages/`，页面右上角可切换主题与明暗、复制产出该页的 Markdown。官方推荐开启 always-on 模式（在规则文件里加一条规则），让每个结论都附一页讲解。

## 注意事项

- **隐私**：页面与索引落盘在 `~/.answer-me-with-html/pages/`，包含你的提问与相关代码片段；敏感环境注意该目录的备份与同步范围。
- **新项目**：上游 2026-10-02 创建、迭代很快，安装方式与行为可能随版本变化，以上游 README / INSTALL.md 为准。
- **数据是上游自测**：token 约 1/8、约 2.6 倍速等数字来自上游小样本基准（Claude Sonnet 5.5），换模型、换问题会有差异。
- MIT 许可，可商用；官方支持 Claude Code、Codex、Cursor、OpenCode、Pi、DeepSeek Harness。
