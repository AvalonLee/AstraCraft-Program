---
record_type: entry-record
id: awesome-design-md-cn
name_zh: 中文 DESIGN.md 设计资源集
name_en: Awesome DESIGN.md CN
summary_zh: 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。
summary_en: A Chinese-localized collection of 70+ DESIGN.md files (Google Stitch's plain-text design format); copy one into your project so AI agents build a consistent UI.
category: design-creative
kind: skill-collection
tags: [design-system, design-md, ui-generation, google-stitch, awesome-list, cn-localization]
languages: [markdown, html]
doc_languages: [zh]
license: UNKNOWN
homepage: https://fchangjun.github.io/awesome-design-md-cn/
repo: https://github.com/fchangjun/awesome-design-md-cn
tier: standard
featured: true
metrics:
  stars: 140
  pushed_at: "2026-07-07T07:47:56Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [awesome-design-md-cn, design-md-cn]
risk_notes: 上游 cn 仓库未包含 LICENSE 文件（GitHub license 字段为 null）。它基于 MIT 许可的 VoltAgent/awesome-design-md 做中文本地化整理，但本仓库未显式声明许可证；商用或再分发前请确认授权范围。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# 中文 DESIGN.md 设计资源集

> 面向中文用户的 DESIGN.md 资源集合，整理 70+ 个真实网站的设计系统文档。
> 上游：[fchangjun/awesome-design-md-cn](https://github.com/fchangjun/awesome-design-md-cn) · 许可证：未声明（UNKNOWN）

## 这是什么

一份给 AI 设计 Agent / 编码 Agent 使用的**设计系统文档集合**，源自 Google Stitch 提出的 `DESIGN.md` 概念：用纯文本 Markdown 记录一个产品 / 网站的视觉语言（配色、字体、组件、间距、层级等），让 AI 生成风格一致的界面。

本仓库在 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)（MIT）基础上做了**中文本地化与浏览增强**：目前收录 74+ 个参考案例（Claude、Apple、Stripe、Notion、Figma、Tesla 等），每个案例含一份 `DESIGN.md` + 明暗双版本预览页（`preview.html` / `preview-dark.html`），并配有中文首页、搜索与分类筛选。

它本质是「资源索引 + 资产库」，不是可加载的 skill 包——你复制其中一份 `DESIGN.md` 到自己的项目根目录，即可作为 AI 生成 UI 的视觉基准。

## 怎么安装

无需安装 skill 引擎。把目标站点的 `DESIGN.md` 复制到你项目根目录即可：

```bash
# 1) 克隆仓库（含全部 70+ 站点 DESIGN.md 与预览页，约 1.2 MB）
git clone --depth 1 https://github.com/fchangjun/awesome-design-md-cn.git /tmp/awesome-design-md-cn

# 2) 复制某个站点的设计系统到你项目根目录（以 Apple 为例）
cp /tmp/awesome-design-md-cn/design-md/apple/DESIGN.md ./DESIGN.md
```

## 怎么用

复制完成后，在对话中告诉你的 AI 编码 Agent「按项目根目录的 DESIGN.md 生成界面」，它就会以该风格产出 UI。也可直接打开 [在线预览站](https://fchangjun.github.io/awesome-design-md-cn/) 浏览每个案例的配色、排版、按钮、卡片等视觉细节，挑选最贴近目标的风格再复制。

## 注意事项

- **许可证未声明（风险）**：上游 cn 仓库未包含 LICENSE 文件，其基于 MIT 的 VoltAgent/awesome-design-md 本地化，但本仓库未显式声明许可证；商用或再分发前请确认授权范围，具体以上游原始 LICENSE 为准。
- 资源为「只读参考」：本仓库仅做导航与说明，**不收录上游源码**，你复制 `DESIGN.md` 后请自行纳入版本管理。
- 案例持续同步上游新增站点（最近一次同步 2026-07-07），可作为 vibe design / AI 生成 UI 的风格速查表。
