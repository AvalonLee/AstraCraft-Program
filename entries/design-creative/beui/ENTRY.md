---
record_type: entry-record
id: beui
name_zh: "beUI 动效组件库"
name_en: "beUI (ui-components)"
summary_zh: "109 个动效 React 组件的 shadcn 兼容注册表：motion 驱动的动效块、区块、Agent 组件、图表与博彩组件，一条 `npx shadcn add @beui/...` 拷源码进项目，另有 Agent 技能与托管 MCP。"
summary_en: "109 motion-driven React components shipped as a shadcn-compatible registry: copy source with one `npx shadcn@latest add @beui/<slug>`, plus an agent skill and hosted MCP server."
category: design-creative
mode: install
tags: [design-system, motion-design, react, shadcn, mcp]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://beui.dev
repo: https://github.com/starc007/ui-components
tier: standard
metrics:
  stars: 1927
  pushed_at: "2026-11-06T02:52:28Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["beUI", "ui-components"]
related: [shadcn-ui, animate-ui, boardui]
risk_notes: "仓库名（ui-components）与产品名（beUI）不一致，检索与引用时以 beui.dev 为准；无 npm 包可锁版本，升级依赖 registry URL 的公开契约；运行前提为 React 19 + Tailwind v4 + motion 12，停在旧版本的项目有摩擦；含 casino 类博彩组件（Crash / Mines / Plinko），上线前自行确认合规；beUI Pro 与部分 Agent 技能在付费墙后；单人主导（作者 695 次提交），bus factor 低，测试以可访问性为主、动效质量靠人工浏览器验证。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# beUI 动效组件库

> shadcn 生态里的动效件：复制粘贴，装完即用。上游：[starc007/ui-components](https://github.com/starc007/ui-components) · 许可证：MIT

## 这是什么

一套以动效为主轴的 React 组件库（★1.9k，产品名 **beUI**，仓库名沿用旧称 `ui-components`）：109 个条目分五类——动效件 51、页面区块 20、Agent 组件 18、图表 17、博彩演示件 3，其中 156 个 slug 可直接安装。动效全部基于 `motion`（framer-motion 的后继），无障碍与交互件沿用 React 生态常见约定。分发走 **shadcn 兼容 registry**：组件以源码形式拷进项目，已注册进 shadcn 官方目录的 `@beui` 命名空间，因此任何 shadcn 项目或编码 Agent 都能一条命令加装；同时提供 Agent 技能、`llms.txt` 与托管 MCP 服务端。

## 怎么安装

前置：项目已初始化 shadcn/ui（有 `components.json`），React 19 + Tailwind CSS v4。在项目根目录执行：

```bash
npx shadcn@latest add @beui/animated-toast-stack        # 官方命名空间装单个组件
npx shadcn@latest add https://beui.dev/r/<slug>.json    # 或直接指定 registry URL
```

装本地开发版需要 Bun：`bun install && bun run dev`（校验用 `bun run check`、`bun test`）。React Native 版本在独立仓库，命令为 `npx beui-native add <slug>`。

## 怎么用

组件落进项目后直接 import 使用，依赖由 registry 带回（clsx、tailwind-merge、lucide-react、motion）。让 AI 助手代劳：`claude mcp add --transport http beui https://mcp.beui.dev/mcp`（Codex 用 `codex mcp add beui --url ...`），或装技能 `npx skills add starc007/ui-components --skill beui`（Pro 版为 `--skill beui-pro`），之后直接说「加一个带动效的 toast 栈」即可。

## 注意事项

- **命名易混**：仓库叫 `ui-components`，站点与产品叫 beUI，文档、包名与 Issue 都按 beUI 走；引用时最好同时给出两者。
- **无版本可锁**：没有 npm 包，靠 registry JSON 分发，升级要重新执行 add 命令并自查改动；casino 分类是博彩交互演示件，上线前自行确认目标市场合规要求。
- **协议边界**：仓库 MIT，Pro 组件不在仓库内、需 license key；依赖库（lucide-react、@paper-design/shaders-react、lenis 等）各自协议需一并遵守。
- **维护结构**：16 位贡献者但作者一人提交 695 次，实际 bus factor 低；CI 覆盖类型检查、lint、registry 校验与可访问性，动画观感仍靠人工浏览器检查。
