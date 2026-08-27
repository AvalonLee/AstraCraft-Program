---
record_type: entry-record
id: oh-story-claudecode
name_zh: "OH-Story 网文/小说写作 Skill 包"
name_en: "OH-Story Claude Code Skill Pack"
summary_zh: "面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。"
summary_en: "A Claude Code skill pack for web and novel writing: scan, analyze, write, de-slop, and cover generation across long/short fiction, with 13 bundled skills."
category: writing-docs
kind: skill-collection
tags: [novel-writing, web-fiction, claude-code, skill-pack, de-slop, cover-generation]
languages: [javascript]
doc_languages: [zh]
license: MIT
homepage: https://github.com/zenstory-ai/oh-story-claudecode
repo: https://github.com/zenstory-ai/oh-story-claudecode
tier: standard
metrics:
  stars: 6086
  pushed_at: "2026-08-26T05:28:29Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [网文写作, 去AI味]
risk_notes: GitHub 识别为 MIT，但仓库 README 未显式附 LICENSE 文件，商用前确认；需 Claude Code 环境与 Node/npx；依赖外部大模型 API，封面图生成依赖图像模型。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# OH-Story 网文/小说写作 Skill 包

> 面向 Claude Code 的网文/小说写作 skill 包。上游：[zenstory-ai/oh-story-claudecode](https://github.com/zenstory-ai/oh-story-claudecode) · 许可证：MIT（GitHub 识别）

## 这是什么

它是一套面向 **Claude Code** 的**网文/小说写作 skill 包**，方法论为「套路 = 确定性情绪满足」，覆盖长篇与短篇网络小说的**扫榜、拆文、写作、去 AI 味、封面图**全流程，内置 13 个 skill：`story-setup`、`story`、`story-long-write`、`story-long-analyze`、`story-long-scan`、`story-short-write`、`story-short-analyze`、`story-short-scan`、`story-deslop`、`story-import`、`story-review`、`story-cover`、`browser-cdp`。适配多 Agent 环境，支持长篇（`{书名}/` 下设设定 / 大纲 / 正文 / 对标 / 追踪 / 参考资料）与短篇（`短篇/{标题}/`）的结构化工程。

## 怎么安装

```bash
# 方式一：对话安装（在 Claude Code 中）
# 告诉 Claude Code：安装这个 skill https://github.com/zenstory-ai/oh-story-claudecode

# 方式二：命令行（npx skills，-g 全局装到 ~/.claude/skills/；去掉 -g 装当前目录）
npx skills add zenstory-ai/oh-story-claudecode -y -g
```

## 怎么用

安装后在 Claude Code 中以自然语言调用，例如「用 story-long-write 写第 3 章」「用 story-deslop 给这段去 AI 味」「用 story-cover 生成封面图」。各 skill 职责分明：扫榜 / 拆文负责 inputs，写作 / 去味负责 production，review / cover 负责质检与视觉。

## 注意事项

- **许可证**：GitHub 识别为 MIT，但仓库 README 未显式附 LICENSE 文件，商用或再分发前请确认授权范围。
- **运行环境**：需 Claude Code 与 Node.js（npx）；依赖外部大模型 API，封面图生成依赖图像模型。
- **工程约定**：默认在 `{书名}/` 或 `短篇/{标题}/` 下维护 Markdown 工程文件，注意 `.story/作者记忆/`、`.active-book` 等隐藏目录的备份。
- 维护活跃（2026-08 更新），暂无已知重大缺陷。
