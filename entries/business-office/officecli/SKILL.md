---
record_type: entry-record
id: officecli
name_zh: "OfficeCLI AI Office 套件"
name_en: "OfficeCLI"
summary_zh: "专为 AI Agent 设计的 Office 套件 CLI：单二进制无需安装 Office，读写编辑 Word / Excel / PowerPoint；内置渲染引擎（HTML / PNG / watch 实时预览）、350+ Excel 函数求值、原生数据透视表、模板合并与 round-trip dump，MCP server 一键接入主流 Agent。"
summary_en: "AI agent-first Office CLI: single binary, no Office needed. Read, edit, create docx/xlsx/pptx with built-in rendering, 350+ Excel formulas, pivot tables, template merge, and MCP."
category: business-office
kind: cli-tool
tags: [cli, docx, xlsx, pptx, document-generation, mcp, ai-agent, office]
languages: [csharp, dotnet]
doc_languages: [en, zh, ja, ko]
license: Apache-2.0
homepage: https://officecli.ai
repo: https://github.com/iOfficeAI/OfficeCLI
docs_url: https://github.com/iOfficeAI/OfficeCLI/wiki
tier: core
metrics:
  stars: 29872
  pushed_at: "2026-09-03T07:16:42Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [office-cli, officecli-cli]
risk_notes: "单二进制内嵌 .NET 运行时，无需额外安装；后台自动检查更新（可关），config 存于 ~/.officecli/config.json；resident 模式延迟磁盘写入，其他程序读取前需 officecli save 或 OFFICECLI_RESIDENT_FLUSH=each；源码构建需 .NET 10 SDK，但运行时不需要。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# OfficeCLI AI Office 套件

> The world's first and the best Office suite designed for AI agents。上游：[iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) · 许可证：Apache 2.0 · 29.9k stars · [officecli.ai](https://officecli.ai)

## 这是什么

OfficeCLI 是第一个专为 AI Agent 设计的 Office 套件 CLI：单二进制（内嵌 .NET 运行时）、零依赖、无需安装 Microsoft Office，跨 Windows / macOS / Linux 全平台。给任何 AI Agent 一行命令就能读写编辑 Word（.docx）、Excel（.xlsx）、PowerPoint（.pptx）。

**核心设计**：

- **内置渲染引擎（"给 AI 一双眼睛"）**：从零实现的高保真 HTML 渲染，覆盖 shapes、charts（趋势线 / 误差线 / 瀑布图 / K线 / sparklines）、公式（OMML → KaTeX）、3D .glb 模型（Three.js）、morph 切换、slide zoom、shape effects。`view html` 输出独立 HTML、`view screenshot` 输出逐页 PNG（供多模态 agent 阅读）、`watch` 本地实时预览（每次 add / set / remove 即刻刷新浏览器）。Agent 在 CI、Docker、无显示器服务器上都能**看到**自己生成的东西再修——不是从 DOM 猜。
- **三层架构（L1 → L2 → L3）**：L1 语义视图（`view` outline / text / annotated / stats / issues / html / screenshot）→ L2 结构化元素操作（`get` / `query` / `set` / `add` / `remove` / `move` / `swap`）→ L3 原始 XML（`raw` / `raw-set` / XPath）。Agent 从高层开始，只在需要时下沉，最小化 token 消耗。
- **路径寻址**：每个元素有稳定路径（`/slide[1]/shape[2]`），agent 不需要理解 XML 命名空间。1-based 索引、元素本地名（非 XPath 语法）。
- **确定性 JSON 输出**：所有命令支持 `--json`，统一 schema；错误返回结构化 error code + suggestion + 有效范围，agent 可自纠正。
- **350+ Excel 函数自动求值**：写入 `=SUM(A1:A2)` 立即出值，无需经 Office 回算；支持 spilling 动态数组（FILTER / SORT / UNIQUE / SEQUENCE / LET / LAMBDA / MAP）、财务债券（XIRR / PRICE / YIELD / DURATION）、统计回归（LINEST）。
- **OOXML 原生数据透视表**：一条命令从源范围生成多字段 pivot table（10 种聚合、showDataAs、日期分组、计算字段、top-N、布局），Excel 打开即见结果。
- **模板合并**：agent 设计一次排版（贵），生产代码用 JSON 填充 `{{key}}` N 次（便宜、确定、零 token 消耗），避免 agent 每次从零重新生成导致 N 份报告风格不一致。
- **Round-trip dump**：`dump` 把任意 .docx / .pptx / .xlsx（含子树）序列化为可回放的 batch JSON，agent 读懂结构化规格后 `batch` 回放——桥接"我有一个模板"和"生成 100 个变体"。

**Agent 集成**：

- **MCP Server**：`officecli mcp claude` / `cursor` / `vscode` / `lmstudio` 一行注册，暴露全部文档操作为 JSON-RPC 工具。
- **自动安装**：`officecli install` 检测 Claude Code / Cursor / Windsurf / GitHub Copilot 等 agent 的配置目录，自动部署 skill 文件，无需手动配置。
- **Self-healing 工作流**：`validate`（OpenXML schema 校验）+ `view issues`（排版溢出 / 缺 alt text / 公式错误）+ 结构化错误码 + 属性名自动纠错——agent 无需人工干预即可自修。

## 怎么安装

**一行安装：**

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.ps1 | iex
```

**或包管理器：**

```bash
brew install officecli      # macOS / Linux
scoop install officecli     # Windows
npm install -g @officecli/officecli  # 全平台
```

**或从 [GitHub Releases](https://github.com/iOfficeAI/OfficeCLI/releases) 下载单文件二进制**（macOS arm64/x64、Linux x64/arm64、Windows x64/arm64），运行 `officecli install` 部署到 PATH 并自动配置 agent。

## 怎么用

### 30 秒上手

```bash
# 1. 创建空白 PowerPoint
officecli create deck.pptx

# 2. 开启实时预览（浏览器 http://localhost:26315）
officecli watch deck.pptx

# 3. 另一个终端加内容，浏览器即时刷新
officecli add deck.pptx / --type slide --prop title="Q4 Report" --prop background=1A1A2E
officecli add deck.pptx '/slide[1]' --type shape \
  --prop text="Revenue grew 25%" --prop x=2cm --prop y=5cm \
  --prop font=Arial --prop size=24 --prop color=FFFFFF
```

### 三层渐进

```bash
# L1 — 语义视图
officecli view report.docx annotated
officecli view budget.xlsx text --cols A,B,C --max-lines 50

# L2 — 元素操作
officecli query report.docx "run:contains(TODO)"
officecli add budget.xlsx / --type sheet --prop name="Q2 Report"
officecli move report.docx /body/p[5] --to /body --index 1

# L3 — 原始 XML 兜底
officecli raw deck.pptx '/slide[1]'
officecli raw-set report.docx document --xpath "//w:p[1]" --action append --xml '<w:r><w:t>Injected</w:t></w:r>'
```

### Agent 自修工作流

```bash
# 1. 创建 + 填充
officecli create report.pptx
officecli add report.pptx / --type slide --prop title="Q4 Results"

# 2. 校验
officecli validate report.pptx
officecli view report.pptx issues --json

# 3. 根据错误建议修复
officecli set report.pptx '/slide[1]/shape[1]' --prop font=Arial
```

### 模板合并与批量

```bash
# Agent 设计一次模板，代码填充 N 份
officecli merge invoice-template.docx out-001.docx --data '{"client":"Acme","total":"$5,200"}'

# 批量操作（默认原子：任一失败全部回滚）
officecli batch deck.pptx --input updates.json --json
officecli batch deck.pptx --input updates.json --best-effort --json  # 允许部分成功
```

### MCP 注册

```bash
officecli mcp claude    # Claude Code
officecli mcp cursor    # Cursor
officecli mcp vscode    # VS Code / Copilot
officecli mcp list      # 查看注册状态
```

## 注意事项

- **许可证 Apache 2.0**：可自由商用。
- **单二进制**：内嵌 .NET 运行时，无需安装 .NET 或 Office；源码构建需 .NET 10 SDK（仅编译用）。
- **resident 模式磁盘刷新**：resident 会话延迟磁盘写入，其他程序（python-docx / openpyxl / Microsoft Word）读取前需 `officecli save` 或 `officecli close` 刷新，或设 `OFFICECLI_RESIDENT_FLUSH=each` 让每次变更即时落盘。
- **自动更新**：后台自动检查新版本（`officecli config autoUpdate false` 关闭），配置存于 `~/.officecli/config.json`。
- **维护活跃**（2026-09 更新，29.9k stars），提供英文/中文/日文/韩文四语 README、完整 Wiki 文档与 runnable examples，iOfficeAI 团队出品。
