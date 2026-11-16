---
record_type: entry-record
id: lightpanda
name_zh: "Lightpanda 轻量无头浏览器"
name_en: "Lightpanda Browser"
summary_zh: "用 Zig 从零编写的无头浏览器，专为 AI 与自动化设计：兼容 CDP 与 WebDriver BiDi，可替换 Puppeteer / Playwright 的浏览器端点；官方基准称内存约为无头 Chrome 的 1/16、速度快约 9 倍，支持 HTML / Markdown / PDF 导出、MCP 服务与内置 Agent 模式。"
summary_en: "A headless browser written from scratch in Zig for AI and automation: CDP and WebDriver BiDi compatible, with fetches, MCP, agent mode and a claimed 16x memory / 9x speed win over headless Chrome."
category: agent-infra
mode: connect
tags: [web-crawler, browser-automation, ai-agent, mcp, cli]
languages: [zig, javascript]
doc_languages: [en]
license: AGPL-3.0
homepage: https://lightpanda.io
repo: https://github.com/lightpanda-io/browser
tier: standard
metrics:
  stars: 42098
  pushed_at: "2026-11-16T01:12:21Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [lightpanda, Lightpanda]
risk_notes: "AGPL-3.0：修改后对外提供网络服务须开源修改版本；不是 Chromium 等价物，Web 平台特性是子集，复杂站点 / JS 可能渲染或交互失败，替换前先用目标站点回归；稳定版 1.0.4 已发布，但 README 快速开始仍指向 nightly，接口可能变化；无原生 Windows 二进制，只能 WSL2；Linux 二进制链接 glibc（musl / Alpine 不可用，arm64 需 glibc 2.38+）；默认开启匿名遥测（LIGHTPANDA_DISABLE_TELEMETRY=true 关闭）；默认不遵守 robots.txt，需显式 --obey-robots；CDP 示例绑定 127.0.0.1，勿直接暴露公网；Agent 模式会把页面内容发送给所选模型供应商；内存 / 速度数据为上游自报基准。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# Lightpanda 轻量无头浏览器

> 从零重写的 AI 专用无头浏览器。上游：[lightpanda-io/browser](https://github.com/lightpanda-io/browser) · 许可证：AGPL-3.0 · 官网：[lightpanda.io](https://lightpanda.io)

## 这是什么

Lightpanda 是一个用 Zig 从零编写的无头浏览器——不是 Chromium 的分支，也不是 WebKit 的补丁——目标是把浏览器做成 AI Agent 与自动化任务的轻量运行时。它对外提供与 Chrome 兼容的 **CDP**（Chrome DevTools Protocol）服务，也支持 **WebDriver BiDi**，因此 Puppeteer / Playwright 只需把连接地址指过来即可驱动；另有原生 MCP 服务、内置 Agent 模式和命令行抓取。

官方基准（AWS m5.large 上请求 933 个真实网页，自报数据）：100 页峰值内存 123MB vs 无头 Chrome 2GB（约 1/16），执行时间 5s vs 46s（约 9 倍）。已实现的能力包括 HTML5 解析、V8 JavaScript、DOM API、XHR / Fetch、点击与表单输入、Cookie、自定义 Header、代理、网络拦截、广告拦截、`robots.txt` 遵循（需显式开启）与 HTML / Markdown / PNG / PDF / structured_data 导出。

两种用法：

- **标准自动化**：`lightpanda serve` 起 CDP 服务（默认示例绑 `127.0.0.1:9222`），Puppeteer `connect({ browserWSEndpoint })` 或 Playwright `connectOverCDP` 直接接入，脚本基本不用改
- **Agent 原生**：`lightpanda agent` 用自然语言或斜杠命令驱动浏览器，支持 Anthropic / OpenAI / Gemini / Vertex / Mistral / Hugging Face / OpenRouter / Vercel AI Gateway / 任意 OpenAI 兼容端点与本地 Ollama；会话可 `/save` 导出为 **PandaScript**（原生 JS 原语），`lightpanda run` 无模型、确定性重放
- **MCP**：`lightpanda mcp` 走 stdio，或 `lightpanda mcp --port 9223` 走 HTTP 并按 session 隔离多个 Agent 的浏览上下文

## 怎么接入

支持 Linux x86_64 / aarch64 与 macOS x86_64 / aarch64；**没有原生 Windows 二进制**，需在 WSL2 里按 Linux 方式安装。Linux 二进制依赖 glibc（Alpine 等 musl 系统不可用；arm64 需 glibc 2.38+ 的镜像）。

```bash
# 下载稳定版二进制（最新 release 为 1.0.4）
curl -L -o lightpanda https://github.com/lightpanda-io/browser/releases/latest/download/lightpanda-x86_64-linux
chmod a+x ./lightpanda
./lightpanda version

# 或者 Homebrew / Docker
brew install lightpanda-io/browser/lightpanda
docker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:latest

# 启动 CDP 服务
./lightpanda serve --obey-robots --host 127.0.0.1 --port 9222
```

Puppeteer 接入示例（Playwright 用 `connectOverCDP('http://127.0.0.1:9222')`）：

```js
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:9222',
});
const context = await browser.createBrowserContext();
const page = await context.newPage();
await page.goto('https://example.com', { waitUntil: 'networkidle0' });
console.log(await page.evaluate(() => document.title));
await browser.disconnect();
```

接入 MCP 客户端（Claude Desktop / Cursor 等）：

```json
{
  "mcpServers": {
    "lightpanda": {
      "command": "/path/to/lightpanda",
      "args": ["mcp"]
    }
  }
}
```

## 怎么用

```bash
# 按 URL 抓取并导出（支持 html / markdown / png / pdf / structured_data）
./lightpanda fetch --obey-robots --dump markdown https://example.com
./lightpanda fetch --dump structured_data https://example.com

# Agent 模式：自然语言驱动，导出可复放脚本
./lightpanda agent --task "top story on news.ycombinator.com?"
./lightpanda run session.js          # 无模型、确定性重放 PandaScript

# MCP over HTTP（多 Agent 各用独立 session）
./lightpanda mcp --port 9223
```

抓取时可加 `--wait-until`、`--wait-ms`、`--wait-selector`、`--wait-script` 控制等待时机；需要走代理、带 Header 或拦截网络时用对应的 CDP 会话参数即可。完整的 CDP / BiDi 能力与 Web 平台覆盖度见[上游文档](https://lightpanda.io/docs)与 WPT 结果。

## 注意事项

- **不是 Chromium 等价物**：Web 平台特性是逐步实现的子集，复杂站点、深层 JS 交互与像素级渲染可能与 Chrome 不同；替换现有 Playwright 流程前，先对目标站点跑一轮回归。PNG / PDF 导出是文本化渲染，不是浏览器截图。
- **许可证 AGPL-3.0**：修改后对外提供网络服务须开源修改版本；把浏览器嵌进闭源服务前先评估合规。
- **版本与平台**：稳定版 1.0.4（2026-11-13）已提供二进制，但 README 的快速开始仍指向 nightly，功能与参数可能变化；无原生 Windows，WSL2 运行；Linux 依赖 glibc（musl 不可用），arm64 对 glibc 版本要求更高。
- **隐私与合规**：默认开启匿名遥测，用 `LIGHTPANDA_DISABLE_TELEMETRY=true` 关闭；默认不遵守 `robots.txt`，抓取需显式加 `--obey-robots`，合法性仍由使用者负责；Agent 模式会把页面内容发给所配置的模型供应商。
- **服务暴露**：CDP / MCP 示例都只绑 `127.0.0.1`，没有内置鉴权，不要直接暴露公网；远程使用请走 SSH 隧道或带鉴权的反向代理。
- **面板数据为自报**：16x 内存 / 9x 速度是上游基准（933 页、m5.large），实际收益取决于页面复杂度与任务类型。
