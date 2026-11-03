---
record_type: entry-record
id: animate-ui
name_zh: "Animate UI 动效组件库"
name_en: "Animate UI"
summary_zh: "给 shadcn/ui 组件一键加动效的 Radix/Base UI/React Aria 动画基元库：换一行 import 就有 Motion 弹簧动效，附带 CLI codemod、Vue 版本与 Agent 技能，让现有组件原地「活」起来。"
summary_en: "Animated drop-in primitives for Radix UI, Base UI and React Aria built with Motion: swap the import to keep your shadcn/ui components, with a CLI codemod, Vue port and an agent skill."
category: design-creative
mode: install
tags: [design-system, motion-design, framework, react, tailwindcss]
languages: [typescript]
doc_languages: [en]
license: LicenseRef-MIT-Commons-Clause
homepage: https://animate-ui.com
repo: https://github.com/imskyleen/animate-ui
docs_url: https://animate-ui.com/docs
tier: standard
metrics:
  stars: 4861
  pushed_at: "2026-11-02T20:24:15Z"
  checked_at: "2026-11-03"
  archived: false
aliases: ["Animate UI", "animate-ui"]
related: [shadcn-ui]
risk_notes: "协议为 MIT + Commons Clause：可用于任何应用/网站/产品（含商用），但不得单独或打包出售、再分发组件本体；复制进项目后自行维护升级，上游更新不自动同步；CLI codemod 会原地改写组件文件，建议先提交工作区或用 --dry-run 预览。"
added_at: "2026-11-03"
updated_at: "2026-11-03"
---

# Animate UI 动效组件库

> 换一行 import，shadcn/ui 组件原地动起来：Motion 弹簧动效的 Radix / Base UI / React Aria 基元。上游：[imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) · 许可证：MIT + Commons Clause

## 这是什么

一套「即插即用」的动画基元库（★4.9k，Vercel OSS 计划项目）：为 Radix UI、Base UI、React Aria（Vue 侧为 reka-ui）的每个基元提供 **API 完全一致**的 Motion 动画版——组件代码不用改，只换 import 源，弹窗、下拉、手风琴等就带上统一的弹簧动效。动效体系成体系：几乎全部走弹簧、每种运动角色一个令牌、入场离场 ease-out、按压反馈与轻模糊过渡（借鉴 Emil Kowalski 的实践规则）。配套三条上手路径：官方 CLI 对已装的 shadcn/ui 组件整体做 codemod；shadcn 注册表直接加装图标、背景、特效按钮等成品；仓库还随附一份 Agent 技能（`skills/animate-ui`），让 AI 编码助手按规则给任意组件加动效、审计卡顿动画、把任意图标变成动效图标。

## 怎么安装

前置：已有 shadcn/ui 项目（含 `components.json`），Node.js ≥ 22.12。在项目根目录执行：

```bash
npx @animate-ui/cli@latest animate all      # 已装的 shadcn/ui 组件全部换用动画基元（原地改写）
npx @animate-ui/cli@latest animate dialog tooltip   # 或只动指定组件；--dry-run 先预览
```

不用 CLI 也可手动换 import（组件代码零改动）：

```tsx
import { Accordion as AccordionPrimitive } from '@animate-ui/react/primitives/radix-ui';
```

让 AI 助手直接检索并加装它的图标 / 背景 / 成品组件：在 `components.json` 加注册表 `"@animate-ui": "https://animate-ui.com/r/{name}.json"`，再跑 `npx shadcn@latest mcp init --client claude` 配好 shadcn MCP。Vue / Nuxt 项目用 `@animate-ui/vue`（基于 reka-ui 与 motion-v），见[官方文档](https://animate-ui.com/docs)。

## 怎么用

codemod 跑完后项目里的 shadcn/ui 组件即已是动画版，业务代码不需要任何改动；想调节奏（更快/更慢/更克制）按文档的 tokens 一节调弹簧参数。把仓库里的 `skills/animate-ui` 目录装进 Agent 技能目录后，可直接让 Agent「给这个组件加入场/按压动画」「审计页面里卡顿的动效」「把这个 Lucide 图标变成动效图标」。

## 注意事项

- **协议限制**：MIT + Commons Clause——随应用/产品使用（含商用）没问题，但**不得把组件本体单独或打包出售、再分发**；商用分发产品前读一遍上游 [LICENSE.md](https://github.com/imskyleen/animate-ui/blob/main/LICENSE.md)。
- **codemod 原地改写**：`animate` 命令直接修改组件文件并删除被 Motion 取代的 CSS 动画，执行前先提交工作区或用 `--dry-run` 预览；它不复制任何组件，升级随 npm 包走。
- **技术栈限定**：面向 React（Radix / Base UI / React Aria）与 Vue（reka-ui）+ Tailwind CSS 生态，与 shadcn/ui 的安装约定（`components.json`）深度耦合，非该技术栈不适用。
