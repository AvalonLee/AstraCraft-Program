---
record_type: entry-record
id: rea
name_zh: "REA Agent 逆向工程工具链"
name_en: "REA — Reverse Engineer Anything"
summary_zh: "让 Agent 逆向万物的统一 MCP + CLI 工具链：`npx rea-agents setup` 一键接入 Claude Code / Codex / Cursor 等，本地分析原生二进制、JS/Electron 应用、.NET、APK、固件、GPU 代码与模型文件等 30+ 类目标，结论带证据与局限；原生深度分析可接 Ghidra / IDA / Hopper / Kuna。"
summary_en: "One MCP + CLI that lets agents reverse engineer binaries, apps, firmware and more with evidence-backed local analysis; `npx rea-agents setup` integrates Claude Code, Codex, Cursor and more."
category: dev-engineering
mode: connect
tags: [mcp, cli, ai-agent, reverse-engineering, binary-analysis, claude-code]
languages: [typescript]
doc_languages: [en, zh]
license: MIT
homepage: https://rea.tools
repo: https://github.com/morluto/rea
docs_url: https://rea.tools/guides/
tier: standard
metrics:
  stars: 404489
  pushed_at: "2026-10-29T08:26:51Z"
  checked_at: "2026-10-29"
  archived: false
aliases: ["rea-agents", "Reverse Engineer Anything", "rea.tools"]
risk_notes: "逆向属双重用途能力：官方定位仅限合法研究、教育、互操作、软件保存与分析自有或已授权的目标，破解、盗版与未授权分析不在授权范围；参照他人应用重建「类似功能」时注意著作权与许可协议边界。原生分析依赖的 Ghidra / IDA / Hopper / JEB 等商业工具须自行合法取得授权；运行时分析以当前用户权限执行目标进程，敏感目标建议放沙箱。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# REA Agent 逆向工程工具链

> 一个 MCP 覆盖二进制、应用与运行时行为的 Agent 逆向工程。上游：[morluto/rea](https://github.com/morluto/rea) · 许可证：MIT

## 这是什么

REA（Reverse Engineer Anything，★404k）把逆向工程的工具面统一成一个 MCP server + CLI：Agent 通过 MCP 检查目标、追踪相关代码，返回的结论**附带证据与局限**，Agent 再据此追问、解释行为或实现并验证一个自己的版本。分析覆盖 30+ 类目标——原生二进制（伪代码 / 汇编 / 符号 / 调用引用）、桌面安装、JS/Electron 应用、网站与抓包（HAR/SAZ/pcap）、.NET 程序集、Android APK 与设备（ADB）、固件、Go/Rust/IL2CPP/Godot/PyInstaller 产物、GPU 代码对象（CUDA/HIP/PTX）、模型文件（GGUF/safetensors）、EVM 字节码、SQLite、崩溃转储等。分析在本地运行；JS/Electron 与 .NET 静态分析无需原生分析引擎，原生深度分析可接 Ghidra / IDA / Hopper / Kuna。还支持把录制的 Web 会话导出为可跑任务的 RL 环境做训练评测。

## 怎么接入

前置 Node.js 22.x（≥22.23.4）/ 24.x（≥24.22.1）/ 26.12.1+ 与 npm。一条命令把 MCP server 与配套工作流说明注册进 Claude Code、Codex、Cursor、Gemini CLI、Grok Build 等 Agent（会备份既有配置）：

```bash
npx rea-agents setup
# 选择要接入的 Agent，审阅变更后批准；完成后重启 Agent 生效
```

也可全局安装 CLI 供终端直接使用：

```bash
npm install --global rea-agents
rea --help
rea update   # REA 迭代很快，保持更新并按提示刷新 Agent 注册
```

## 怎么用

直接向 Agent 下达调查任务：

```text
Understand how search works in the Notes app, show me the evidence,
and build a similar feature for my project.
```

或用 CLI 一次性分析（返回模块、导入、Electron 边界及证据）：

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/app --json
```

原生二进制分析需本机已装 Ghidra / IDA / Hopper / Kuna 之一（setup 可在批准后代装 Hopper；IDA / JEB 等商业工具须自行合法取得授权），provider 选择与大文件超时调优见 [CLI 与证据指南](https://rea.tools/guides/)。MCP 默认用紧凑输入 schema 降上下文开销，需要完整字段指引时在注册里设 `REA_MCP_INPUT_SCHEMA_PROFILE=full`。

## 注意事项

- **合规红线（官方免责声明）**：仅限合法研究、教育、互操作、软件保存，以及分析**你拥有或被授权检查**的软件；非法或未授权使用的立场覆盖所有发行渠道。参照他人应用「重建类似功能」时注意著作权与许可协议边界。
- **商业工具授权**：IDA Pro / Hex-Rays、Hopper、JEB 等必须自行合法取得许可，REA 不提供任何 key 或激活授权，破解版与共享 key 均不受支持。
- **运行时副作用**：静态分析只读文件；运行时捕获会以当前用户权限执行 / 交互目标进程，敏感目标建议放虚拟机或沙箱。
- **迭代节奏**：更新非常频繁（`rea update`），API 与能力面持续扩张；Linux 上部分流程需要 procps 兼容的 `ps`。
