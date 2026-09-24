---
record_type: entry-record
id: dembrandt
name_zh: Dembrandt 网站设计系统提取器
name_en: Dembrandt
summary_zh: 一条命令把任意网站的设计系统提取成设计 token：Logo、颜色、字体、间距、圆角、阴影、动效与组件样式，支持 W3C DTCG 导出、DESIGN.md、Tailwind v4 @theme 与 WCAG 对比度审计，内置 MCP 服务可被 Claude、Cursor 等直接调用。
summary_en: "Extract any website's design system into tokens: colors, typography, spacing, borders, shadows, motion and components, with DTCG, DESIGN.md and Tailwind exports, WCAG audit and a built-in MCP server."
category: design-creative
kind: cli-tool
tags: [cli, mcp, design-system, design-md, design-tokens]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://dembrandt.com/
repo: https://github.com/dembrandt/dembrandt
tier: standard
metrics:
  stars: 3522
  pushed_at: "2026-09-23T07:01:05Z"
  checked_at: "2026-09-24"
  archived: false
related: []
aliases: []
risk_notes: MIT 许可可商用；首次使用必须运行 install-browser 安装 Playwright Chromium，否则报 browser engine not available；通过读取公开页面 DOM 计算样式工作，Canvas/WebGL 站点无法分析，暗色模式需显式 --dark-mode；默认仅终端输出，需 --save-output 才落盘。
added_at: "2026-09-08"
updated_at: "2026-09-08"
---

# Dembrandt 网站设计系统提取器

> 一条命令把任意网站的设计系统提取成设计 token，并可在 CI 中拦截 token 漂移。上游：[dembrandt/dembrandt](https://github.com/dembrandt/dembrandt) · 许可证：MIT

## 这是什么

Dembrandt 是一个 TypeScript CLI：用 Playwright 渲染目标页面，读取 DOM 的计算样式，分析颜色使用与置信度、聚合字体排印、识别间距模式，最后输出结构化设计 token——覆盖颜色（语义色 / CSS 变量 / 渐变）、字体（字号 / 字重 / 字体文件 URL）、间距、圆角、阴影、动效曲线、组件样式与断点。

输出可直接对接设计工程链路：`--dtcg` 导出 W3C Design Tokens（Style Dictionary / Tokens Studio）、`--design-md` 生成给 AI Agent 的 DESIGN.md、`--tailwind` 生成 Tailwind v4 `@theme` CSS、`--wcag` 输出真实 DOM 配对的 AA/AAA 对比度等级；还提供 GitHub Action 在 CI 里对比基线、拦截 token 漂移。内置 MCP 服务让 Claude Code、Cursor、Windsurf 等客户端直接把"提取某站点的配色"变成一次工具调用。

## 怎么安装

```bash
# CLI（Node.js 18+）
npm install -g dembrandt
dembrandt install-browser        # 一次性：安装匹配的 Chromium
dembrandt dembrandt.com          # 提取目标站点

# 或免全局安装
npx dembrandt dembrandt.com      # 同样需先 npx dembrandt install-browser

# MCP 接入（Claude Code 示例）
claude mcp add --transport stdio dembrandt -- npx -y --package dembrandt dembrandt-mcp
```

## 怎么用

常用旗标：`--save-output` 保存 JSON、`--dtcg` W3C token 导出、`--design-md` 生成 DESIGN.md、`--tailwind` 生成 Tailwind v4 主题、`--wcag` 对比度审计、`--crawl 10` 抓取多页合并提升置信度、`--slow` 放宽 JS 重的站点超时。CI 漂移门禁可用 GitHub Action（`uses: dembrandt/dembrandt@v0.31.1`）或 `--compare baseline.json --json-only` 退出码判断。完整旗标见 [docs/usage.md](https://github.com/dembrandt/dembrandt/blob/main/docs/usage.md)。

MCP 模式下工具链为：`get_design_tokens` 等提取工具返回 `job_id`，用 `get_job_status` 轮询，再把同一 `job_id` 交给 `get_findings`、`export_dtcg`、`generate_design_md` 等纯分析工具。

## 注意事项

- **许可证 MIT**：宽松可商用。
- **浏览器依赖**：`playwright-core` 不带浏览器二进制，首次使用必须 `dembrandt install-browser`（或 `npx dembrandt install-browser`），浏览器落在共享 Playwright 缓存，只需装一次。
- **技术边界**：Canvas/WebGL 渲染的站点没有 DOM 可读，无法分析；暗色模式需显式 `--dark-mode`；hover/focus 状态从 CSS 提取，非完全交互。
- **配套技能**：作者另有 [dembrandt-skills](https://github.com/dembrandt/dembrandt-skills) 提供基于 token 的 UX 审查技能（`npx skills add dembrandt/dembrandt-skills`）。
- 维护活跃（2026-09-08 当天仍有推送），截至 2026-09-08 核验约 3,396 stars。
