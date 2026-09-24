---
record_type: entry-record
id: emilkowalski-skills
name_zh: Emil Kowalski 设计与动效技能集
name_en: Emil Kowalski Skills
summary_zh: 面向设计师与工程师的 UI 与动效技能集，12 个技能覆盖动画实现与审查、动效机会挖掘、动画词汇、Apple 设计原则、Swift 编写、UI 库选型与原型切换，基于作者在 Vercel 与 Linear 的多年实战经验，一条 npx 命令即可装进 Agent。
summary_en: "A skill pack for designers and engineers: 12 skills for animation building, review, opportunities, vocabulary, Apple design principles, Swift and prototyping; installs with one npx command."
category: design-creative
kind: skill-collection
tags: [skill-pack, motion-design, ui-generation, design-system, ai-agent]
languages: [markdown]
doc_languages: [en]
license: MIT
homepage: https://emilkowal.ski/skill
repo: https://github.com/emilkowalski/skills
tier: standard
metrics:
  stars: 40899
  pushed_at: "2026-09-23T23:18:27Z"
  checked_at: "2026-09-24"
  archived: false
related: []
aliases: [emil-skills]
risk_notes: MIT 许可可商用；技能以英文编写，通过 skills.sh CLI（npx skills@latest add）安装到支持的 Agent；内容为作者个人经验沉淀，动画建议偏 Web/React 与 React Native（animate-expo），非通用设计规范。
added_at: "2026-09-08"
updated_at: "2026-09-08"
---

# Emil Kowalski 设计与动效技能集

> 面向设计师与工程师的 UI 与动效技能集。上游：[emilkowalski/skills](https://github.com/emilkowalski/skills) · 许可证：MIT

## 这是什么

Emil Kowalski（Vercel / Linear 背景）开源的设计工程技能合集：作者认为 Agent 缺"品味"，容易在动效上犯 `ease-in` / `ease-out` 误用、实色边框代替半透明阴影这类小错，技能集把这些经验规则显式写进 SKILL.md，让 Agent 在写 UI 和动画时少踩坑。

共 12 个技能：`emil-design-eng`（主技能，动效 + 设计建议）、`animate` / `animate-expo`（从零构建动画，覆盖 Web 与 React Native）、`review-animations`（严格审查）、`improve-animations`（全库审计并输出可执行计划）、`find-animation-opportunities`（挖掘值得加动效的位置）、`animation-vocabulary`（用对的词描述想要的动效）、`apple-design`（WWDC 设计原则转译到 Web）、`write-swift`（现代 Swift 写法）、`pick-ui-library`（按作者信任的库做选型）、`prototype`（多版本原型切换）和 `ask-sonner`（Sonner toast 库指南）。

## 怎么安装

```bash
npx skills@latest add emilkowalski/skills
```

也可以按需手动复制单个技能目录（`skills/<name>/SKILL.md`）到你的 Agent skills 目录。

## 怎么用

装好后直接向 Agent 提需求即可，例如"用 animate 给卡片入场做动画"、"按 review-animations 的标准审查这个页面"、"找找这个界面里哪些地方值得加动效"。各技能的触发方式见仓库 [README 的 Reference 表](https://github.com/emilkowalski/skills#reference)。

## 注意事项

- **许可证 MIT**：宽松可商用。
- **安装方式**：依赖 skills.sh CLI（`npx skills@latest add`），支持主流 Agent；手动安装则复制对应技能目录。
- **语言**：技能正文为英文，无中文本地化。
- **适用范围**：动效建议以 Web/React 为主，`animate-expo` 覆盖 React Native/Expo；`write-swift` 面向 Swift 开发者。
- 维护活跃（2026-08 持续更新），截至 2026-09-08 核验约 36,165 stars。
