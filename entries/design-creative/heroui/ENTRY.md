---
record_type: entry-record
id: heroui
name_zh: "HeroUI React 组件库"
name_en: "HeroUI"
summary_zh: "前身 NextUI 的现代 React 组件库：可访问性走 React Aria、样式走 Tailwind CSS v4 纯 CSS，89 个组件以 npm 包发布，v3 去掉 Provider 包裹与运行时 CSS，配 CLI、MCP 与 Agent 技能。"
summary_en: "The modern React UI library formerly known as NextUI: React Aria for accessibility, Tailwind CSS v4 for styles, 89 components as an npm package, with CLI, MCP server and agent skills."
category: design-creative
mode: install
tags: [design-system, framework, react, tailwindcss, accessibility]
languages: [typescript]
doc_languages: [en]
license: Apache-2.0
homepage: https://heroui.com
repo: https://github.com/heroui-inc/heroui
docs_url: https://heroui.com/docs
tier: standard
metrics:
  stars: 31130
  pushed_at: "2026-11-04T04:35:08Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["NextUI", "HeroUI"]
related: [shadcn-ui, boardui]
risk_notes: "硬约束 React 19+ 与 Tailwind CSS v4，Tailwind v3 / React 18 项目须先整体升级；v2 到 v3 破坏性变更大（移除 HeroUIProvider、部分 hooks 改名或废弃、集合项改用 id+textValue、Autocomplete 并入 ComboBox），官方明确 v2/v3 不可共存；npm 上残留 alpha/rc 标签易误装，应显式锁 ^3.2；旧资料仍以 NextUI 命名易踩错版本；CLI、MCP 与 heroui-native 分属独立仓库与包，版本不联动。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# HeroUI React 组件库

> 前身 NextUI，把可访问性交给 React Aria、把样式交给 Tailwind v4。上游：[heroui-inc/heroui](https://github.com/heroui-inc/heroui) · 许可证：Apache-2.0

## 这是什么

一个「开箱即用」型的现代 React 组件库（★31.1k，248 位贡献者）：89 个组件，无障碍底层用 React Aria，样式是 Tailwind CSS v4 的纯 CSS（无 CSS-in-JS 运行时、v3 起不再需要 `<Provider>` 包裹），API 采用复合组件写法（`Card.Header`、`Select.Item`）。与 shadcn/ui 的「复制粘贴再改」不同，HeroUI 走 **npm 依赖**路线，靠 CLI 做装包、脚手架、升级与健康检查。发布节奏稳定（近一年 100+ 版本，最新稳定 v3.2.7），另有 React Native 版 `heroui-native`（独立仓库）。

## 怎么安装

前置：React 19+、Tailwind CSS v4（CLI 另需 Node.js ≥ 22.22）。装包并在 CSS 入口按顺序引入（`tailwindcss` 必须在前）：

```bash
npm i @heroui/styles @heroui/react
```

```css
@import "tailwindcss";
@import "@heroui/styles";
```

新项目用脚手架，存量项目用安装/升级/体检命令：

```bash
npx heroui-cli@latest init -t app       # 模板：app / pages(Next.js) / vite / react-router
npx heroui-cli@latest install            # 存量项目装组件依赖
npx heroui-cli@latest upgrade            # 版本升级
npx heroui-cli@latest doctor             # 环境与配置体检
```

## 怎么用

按需 `import { Button, Card, Select } from "@heroui/react"`，主题与语义色改 CSS 变量。给 AI 编码工具接入上下文：`npx heroui-cli@latest agents-md --react` 生成 `AGENTS.md` 规则，`npx skills add heroui-inc/heroui` 装官方技能，或 `claude mcp add heroui-react -- npx -y @heroui/react-mcp@latest` 接 MCP 查询组件；单个组件的用法可跑 `npx heroui-cli@latest info <component>`。

## 注意事项

- **v2 → v3 是破坏性升级**：移除 `HeroUIProvider`、`useDisclosure` 等 hooks 改名或废弃、集合项改用 `id` + `textValue`、`Autocomplete` 并入 `ComboBox`，且需删掉旧的 `heroui()` Tailwind 插件与 `hero.ts`；官方明确 v2/v3 不能共存，迁移前先看官方迁移指南。
- **技术栈硬约束**：React 19+ 与 Tailwind v4，停在 v3/React 18 的项目必须先整体升级。
- **版本误装风险**：npm 上仍挂着 `alpha` / `rc` 标签，装的时候显式锁 `^3.2`。
- **品牌沿革**：项目原名 NextUI，网上大量旧教程仍写 NextUI，检索时注意区分版本。
