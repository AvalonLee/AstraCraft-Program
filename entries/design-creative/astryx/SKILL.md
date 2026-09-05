---
record_type: entry-record
id: astryx
name_zh: "Astryx 设计系统"
name_en: "Astryx Design System"
summary_zh: "Meta 八年打磨的开源 React 19 设计系统：150+ 可访问组件、7 主题、agent-ready CLI（能力清单 + typed JSON + 稳定错误码），`astryx init` 自动写入 AGENTS.md；内置 StyleX 但不锁定样式，Tailwind / CSS 原生覆盖。"
summary_en: "Open-source React 19 design system from Meta: 150+ accessible components, 7 themes, dark mode, page templates, and an agent-ready CLI with capability manifests, typed JSON, and stable error codes."
category: design-creative
kind: framework
tags: [design-system, ui-generation, framework, ai-agent, claude-code, codex]
languages: [typescript, react, stylex]
doc_languages: [en]
license: MIT
homepage: https://astryx.atmeta.com
repo: https://github.com/facebook/astryx
docs_url: https://astryx.atmeta.com
tier: core
metrics:
  stars: 12791
  pushed_at: "2026-09-05T09:04:44Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [astryx-design, Astryx DS]
risk_notes: "Beta 状态，API 可能变动；需要 React 19+（peer dependency）；StyleX 为内部实现但消费者不可见，覆盖样式用 className 即可；agent 覆盖面依赖 init 写入的 AGENTS.md 块，新组件需重新运行 init 或手动更新。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Astryx 设计系统

> Meta 内部打磨八年、13,000+ apps 在用的设计系统，现在开源了。上游：[facebook/astryx](https://github.com/facebook/astryx) · 许可证：MIT · 12.8k stars · [文档](https://astryx.atmeta.com) · [Storybook](https://facebook.github.io/astryx/storybook/)

## 这是什么

Astryx 是 Meta 开源的 React 19 设计系统，在公司内部使用八年后成为 Meta 最常用的设计系统（13,000+ 应用），现在以 MIT 协议向公众开放。它提供 150+ 可访问的 TypeScript 组件、7 个可完全定制的主题、深色模式、页面模板和一套面向 AI Agent 的 CLI 工具链。

**对 Agent 的设计**——这不是 marketing 话术，而是系统级架构：

- **`astryx init`**：一行命令把组件索引、设计 token、模板清单写入你的 `AGENTS.md` / `CLAUDE.md` / `.cursorrules`，Agent 打开项目即刻知道可用组件和用法，不用猜测。
- **CLI 即 Agent 接口**：`astryx search`（跨组件/hook/文档/模板统一搜索）、`astryx component Button`（完整 props + 示例 + 最佳实践）、`astryx template dashboard`（生成整页源码）、`astryx theme build`（主题 CSS 构建）——人类和 Agent 用同一套 CLI 完成同样的工作。
- **Capability manifest**：`astryx manifest --json` 返回自描述清单（每条命令、参数、类型、choices、defaults、response type），相当于 CLI 的 OpenAPI spec，Agent 不用爬 `--help`。
- **Typed JSON 输出**：所有命令支持 `--json`，统一 `{type, data}` envelope；错误返回稳定机器可读 `code`（append-only，永不变更）+ suggestions，Agent 可按 code 分支处理而不是正则猜测。
- **稳定错误码**：42+ 个 `ERR_*` 常量，从 `ERR_UNKNOWN_COMPONENT` 到 `ERR_PATH_TRAVERSAL`，附带建议替代项。

**对人类的设计**——Agent 友好的每一处也是人类友好的：

- **开放内部结构**：组件的构建积木直接导出，`astryx swizzle Button` 可 eject 组件源码到你的项目中自由修改。
- **无样式锁定**：内部用 StyleX 但对消费者不可见，`className` 用 Tailwind / CSS modules / 原生 CSS 随便覆盖。
- **主题即 CSS 变量**：一个主题就是一组 CSS custom property 覆盖，设计师不 fork 组件就能让 Astryx 变成自己的品牌。
- **预构建 CSS + typed 组件**：import 三份样式表（reset → 组件 → 主题）+ ThemeProvider 即可运行，无需 build plugin、PostCSS、Babel。

**7 个主题**：neutral（默认）、butter、chocolate、matcha、stone、gothic、y2k——全部可深度定制。

## 怎么安装

前置条件：React 19+。

```bash
# npm
npm install @astryxdesign/core @astryxdesign/theme-neutral @stylexjs/stylex
npm install -D @astryxdesign/cli
```

最简 Next.js 设置（无 build plugin / PostCSS / Babel）：

```css
/* globals.css —— 顺序即层叠：reset → 组件 → 主题 */
@import '@astryxdesign/core/reset.css';
@import '@astryxdesign/core/astryx.css';
@import '@astryxdesign/theme-neutral/theme.css';
```

```tsx
// providers.tsx
import {Theme} from '@astryxdesign/core/theme';
// <Theme theme={...}> 包裹你的 app
```

**Agent 项目初始化（一键）：**

```bash
npx astryx init    # 写入 AGENTS.md / CLAUDE.md，Agent 即刻可用
```

## 怎么用

```bash
# Agent 搜索：跨组件/hook/文档/模板统一搜索
npx @astryxdesign/cli search button

# 组件文档
npx @astryxdesign/cli component Button       # 完整 props + 示例
npx @astryxdesign/cli component --list       # 全部组件

# 页面模板
npx @astryxdesign/cli template --list        # 浏览全部模板
npx @astryxdesign/cli template dashboard     # 生成整页源码

# 设计 token
npx @astryxdesign/cli docs tokens            # 间距/颜色/圆角/字体

# 自定义
npx @astryxdesign/cli swizzle Button         # eject 组件源码
npx @astryxdesign/cli theme build            # 构建主题 CSS

# 升级 codemod
npx @astryxdesign/cli upgrade --apply        # 版本迁移

# 诊断
npx @astryxdesign/cli doctor                 # 环境检查 + 修复建议
```

Agent 可用 `--json` 获取 typed 输出，用 `--zh` 获取中文文档，用 `--dense` 获取压缩格式（省 token）。

## 注意事项

- **许可证 MIT**：可自由商用。
- **Beta 状态**：API 可能变动，建议关注 GitHub Releases 或用 `astryx upgrade` 做 codemod 迁移。
- **React 19+ 必需**：`react` 和 `react-dom` >= 19.0.0 是 peer dependency。
- **样式覆盖**：内部 StyleX 对消费者不可见，用 `className` + Tailwind / CSS modules / 原生 CSS 覆盖即可。
- **Agent 文档更新**：新组件发布后需重新运行 `astryx init` 或手动更新 `AGENTS.md` 中的 Astryx 区块。
- **维护极其活跃**（Meta 出品，2026-09-05 当天仍有提交，12.8k stars），Node 22+ / pnpm 11 构建，提供 Storybook / Sandbox / Discord 社区。
