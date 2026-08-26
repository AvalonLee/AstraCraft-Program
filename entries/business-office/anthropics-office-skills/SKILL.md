---
id: anthropics-office-skills
name_zh: Anthropic Office 文档技能
name_en: Anthropic Office Document Skills
summary_zh: Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。
summary_en: "Anthropic's official document-processing skills: docx generation/editing, pdf read/merge, pptx slides, xlsx spreadsheets. Source-available, not open source — linked, not vendored."
category: business-office
kind: skill-collection
tags: [document-generation, office, docx, pdf, pptx, xlsx, claude-code]
languages: [markdown, python]
doc_languages: [en]
license: LicenseRef-Anthropic-Source-Available
homepage: https://github.com/anthropics/skills
repo: https://github.com/anthropics/skills
tier: standard
metrics:
  stars: null
  pushed_at: null
  checked_at: "2026-08-10"
  archived: false
related: []
aliases: [anthropics-office-skills, office-skills]
risk_notes: 上游 README 明示 docx/pdf/pptx/xlsx 四个技能为 source-available（非开源），限制再分发；本仓库仅提供导航与安装指引。
added_at: "2026-08-10"
updated_at: "2026-08-13"
---

# Anthropic Office 文档技能

> Anthropic 官方维护的**生产级文档处理技能集合**：docx / pdf / pptx / xlsx。
> 上游：[anthropics/skills](https://github.com/anthropics/skills) · 许可证：source-available（非开源）

## 这是什么

来自 `anthropics/skills` 仓库的四个文档技能：

- **docx**：Word 文档的生成与编辑；
- **pdf**：PDF 的读取、合并、拆分；
- **pptx**：PowerPoint 演示稿生成；
- **xlsx**：Excel 表格处理。

均为生产级实现（`document-skills/` 子目录），由 Anthropic 官方维护，常用于
Claude.ai / Claude Code 等官方支持场景。

## 怎么安装

该技能集为 **source-available（非开源）**，禁止再分发——因此只在**本地自用**时获取：

```bash
# 仅克隆文档技能子目录（稀疏检出，体积小）
git clone --depth 1 --filter=blob:none --sparse https://github.com/anthropics/skills /tmp/office-skills
cd /tmp/office-skills
git sparse-checkout set skills/document-skills

# 然后将所需技能目录复制到你的 agent 的 skills 目录（仅本地使用）
cp -r skills/document-skills/* ~/.claude/skills/
```

## 怎么用

装好后在对话中让 agent 使用对应技能即可，例如"用 docx 技能把这个大纲生成一份 Word 文档"、
"用 xlsx 技能把这份 CSV 整理成表格"。

## 注意事项

- **许可限制再分发**：你可以在本地克隆、阅读并按其条款自用；**不可以**把源码提交进公开仓库
  或未经许可转载。具体边界以上游 LICENSE 全文为准；
- 同仓库的其他技能（如 `skill-creator`、`algorithmic-art` 等）多为 Apache-2.0，可另建条目收录；
- 本仓库不包含该项目的任何源码，仅提供导航与安装指引。
