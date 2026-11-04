---
record_type: entry-record
id: shadcn-ui
name_zh: "shadcn/ui 组件库"
name_en: "shadcn/ui"
summary_zh: "把组件源码复制进你自己项目的前端组件库：基于 React + Tailwind CSS，可访问性默认值齐全，代码归你所有、可随意改，是 AI 编码时代事实上的 UI 底座，经 CLI 一条命令安装。"
summary_en: "A component collection you copy into your project: React + Tailwind CSS, accessible defaults, code you own and customize. The de-facto UI base for AI-assisted coding, installed via CLI."
category: design-creative
mode: install
tags: [design-system, framework, cli, react, tailwindcss, frontend]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://ui.shadcn.com
repo: https://github.com/shadcn-ui/ui
docs_url: https://ui.shadcn.com/docs
tier: standard
metrics:
  stars: 127217
  pushed_at: "2026-11-02T07:02:07Z"
  checked_at: "2026-11-03"
  archived: false
aliases: ["shadcn", "shadcn/ui"]
risk_notes: "组件源码复制进项目后由使用者自行维护升级，上游更新不会自动同步；依赖 React 与 Tailwind CSS 技术栈，非 React 项目不适用；未收录测试快照，升级后需自行回归。"
added_at: "2026-11-03"
updated_at: "2026-11-03"
---

# shadcn/ui 组件库

> 不是装依赖，是把组件源码复制进你的项目：代码归你，随便改。上游：[shadcn-ui/ui](https://github.com/shadcn-ui/ui) · 许可证：MIT

## 这是什么

一套可直接复制进项目的高质量 React + Tailwind CSS 组件（★127k+）：按钮、表单、对话框、数据表等数十类，可访问性默认值齐全，主题经 CSS 变量定制。与传统组件库最大的区别是**没有 npm 包**——组件源码经 CLI 拷进你的仓库，归你所有、可任意修改扩展，官方定位就是"用它搭你自己的组件库"。社区注册表生态庞大，也是 AI 编码工具生成前端时的事实标准底座。

## 怎么安装

前置：已有 React / Next.js 项目并配置 Tailwind CSS，Node.js ≥ 20。在项目根目录执行：

```bash
npx shadcn@latest init        # 初始化：生成 components.json、写主题变量
npx shadcn@latest add button dialog   # 按需添加组件，源码落在 components/ui/
```

之后直接 import 使用，如 `import { Button } from "@/components/ui/button"`。完整组件清单与框架指南见[官方文档](https://ui.shadcn.com/docs)。

## 怎么用

加什么组件跑一次 `npx shadcn@latest add <组件名>`，改样式直接改复制进来的源码；主题色经 `components.json` 与 CSS 变量统一调整。想预览某个组件再决定要不要加，可用 `npx shadcn@latest view button card dialog`。

## 注意事项

- **升级不自动**：组件是复制进项目的源码，上游更新后需手动同步（CLI 提供 `diff` 辅助对比）；换来的是完全的可控性。
- **技术栈限定**：基于 React 与 Tailwind CSS，Vue 等其他框架请用社区移植版（如 shadcn-vue），不在本条目范围。
- **协议清晰**：MIT，可商用；组件依赖的底层库（Radix / Base UI 等）均为 MIT 开源。
