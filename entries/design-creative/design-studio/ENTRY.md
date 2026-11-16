---
record_type: entry-record
id: design-studio
name_zh: "Design Studio 本地原型沙盒"
name_en: "Design Studio"
summary_zh: "面向设计师与产品经理的开源本地原型沙盒：把想法交给 Codex / Claude Code / Cursor 等编码 Agent，产出可交互的 React 原型、线框、Mermaid 图与 Excalidraw 画布；设计系统、产品上下文与决策文档同放一个自有文件夹，自带浏览器预览。"
summary_en: "Open-source local prototyping sandbox for designers and PMs using coding agents: interactive React prototypes, wireframes, diagrams, canvases and context docs in one owned folder with browser preview."
category: design-creative
mode: deploy
tags: [design-system, ui-generation, ai-agent, canvas]
languages: [typescript, javascript]
doc_languages: [en]
license: MIT
homepage: https://itspatmorgan.com/design-studio
repo: https://github.com/itspatmorgan/design-studio
tier: watch
metrics:
  stars: 168
  pushed_at: "2026-11-13T21:07:11Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [design-studio, Design Studio]
risk_notes: "早期 beta（2026-10 创建，v0.2.0）：目录结构、模块与安装流程仍可能变化，升级需手动跟随 release；自身不提供编码 Agent，需自备 Codex / Claude Code / Cursor 等能读写文件夹并执行命令的 harness 与账号；安装依赖 Git + mise（Node 24 / pnpm 12），接受 mise 信任前先审阅 mise.toml；发布的是静态浏览站，无内置登录，私密访问取决于托管平台；纯前端原型环境，数据与服务行为为模拟，接生产服务需额外开发。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# Design Studio 本地原型沙盒

> 面向设计师 / 产品经理的 AI 原型沙盒。上游：[itspatmorgan/design-studio](https://github.com/itspatmorgan/design-studio) · 许可证：MIT · 产品页：[itspatmorgan.com/design-studio](https://itspatmorgan.com/design-studio)

## 这是什么

Design Studio 是一个开源的本地原型沙盒，面向「自己动手做原型」的设计师和产品经理。它本身不提供编码 Agent，而是把工作文件组织成一个普通文件夹：你用 Codex、Claude Code 或 Cursor 打开这个文件夹，Agent 按仓库内的 `AGENTS.md` 与技能适配器（`.agents/skills/`、`.claude/skills/`）执行任务，Studio 提供浏览器预览与展示环境。

一个 Studio 里可以放：可交互的 React 原型（含状态与模拟数据）、线框与多方案对比、Mermaid 图与 Excalidraw 画布、原型背后的 Markdown 决策文档，以及可复用的设计系统（React 组件、主题、素材、产品上下文与指令）。仓库自带 Product / Marketing 两套设计系统与示例原型，可直接探索或替换。工作文件使用常规格式（React + TypeScript + Tailwind CSS），代码与上下文都留在自己的文件夹里；支持 Personal / Team 两种本地模式，团队通过 Git 共享改动。发布时生成静态浏览站，可托管在 Vercel、Netlify、Cloudflare 或任意静态站点服务。

## 怎么部署运行

前置：Git 与 [mise](https://mise.jdx.dev/getting-started.html)（由 mise 按仓库声明安装 Node 24 / pnpm 12）。官方安装流程固定到 release `v0.2.0`，并保留未来升级所需的历史与 `upstream` remote。

```bash
# 在存放项目的目录执行；文件夹名可改，已存在时不要覆盖
git clone --filter=blob:none --branch v0.2.0 https://github.com/itspatmorgan/design-studio.git design-studio
cd design-studio
git remote rename origin upstream
git switch -c main

# 安装工具链、依赖并启动预览
mise install          # 接受信任前先审阅 mise.toml
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm dev
```

终端会打印本地地址，浏览器打开即进入 Studio；使用期间保持该终端运行。只打开浏览器预览不等于把文件夹交给 Agent——还需要在编码 Agent 里把 `design-studio` 文件夹作为工作区打开。

## 怎么用

1. 在 Codex / Claude Code / Cursor 中打开 `design-studio` 文件夹，对 Agent 说：`Read AGENTS.md and help me configure my Design Studio. Start with the included examples and show me the running preview.`
2. 先玩自带示例，再描述要做的产品：Agent 会按 `AGENTS.md` 引导你选原型模板、设计系统与产品上下文。
3. 需要的话把 Studio 放进自己的私有 / 公司仓库，由 Git 管理协作与交接；新版本不会自动更新，按需让 Agent 检查并审阅变更。
4. 要分享时，让 Agent 按 `src/platform/context/publishing.md` 生成静态浏览构建并部署到你选定的静态托管；本地继续编辑、重新发布即可更新。

更多用法见仓库内手册（`src/platform/modules/documentation/pages/index.md`）与[安装指南](https://github.com/itspatmorgan/design-studio/blob/main/src/platform/context/installing.md)。

## 注意事项

- **早期 beta**：项目 2026-10 创建，当前 v0.2.0（2026-11-13），模块、目录与工作流可能调整；先归观察期，升级前先看 CHANGELOG 并让 Agent 预览变更。
- **Agent 需自备**：Studio 不附带编码 Agent，也不提供模型额度；Codex / Claude Code / Cursor 的账号或订阅自行准备。
- **工具链信任**：安装依赖 `mise`，接受项目工具配置前先审阅 `mise.toml`；依赖安装使用 `--frozen-lockfile`，不要随意改锁文件。
- **发布不等于私密**：生成的是静态浏览站，Studio 没有内置登录；私密访问只能用托管平台自身的访问控制。
- **只是前端沙盒**：数据与服务行为均为模拟，接生产接口、鉴权与真实数据需要额外开发。
- **许可证**：MIT；随仓库包含 Flexoki（MIT）与 Atlassian Pragmatic drag and drop（Apache-2.0）等第三方组件，分发时保留相应声明。
