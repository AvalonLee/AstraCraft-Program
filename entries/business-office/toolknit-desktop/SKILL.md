---
record_type: entry-record
id: toolknit-desktop
name_zh: "ToolKnit Desktop 本地文件工作台（桌面 / CLI / MCP）"
name_en: "ToolKnit Desktop — Local-first File Workbench with CLI and MCP"
summary_zh: "Tauri 2 + Rust 的开源本地文件工作台：桌面端 12 类 68 项工具覆盖 PDF、PPT、图像、音视频、文本转写、清理与开发者工具；同一套能力经 @toolknit/cli 与 MCP 暴露给 IDE Agent，输出 JSON、退出码分级、原子写入且不覆盖源文件。"
summary_en: "Local-first file workbench on Tauri 2 and Rust: 68 tools across 12 groups for PDF, PPT, image, audio, video, text and AI work, exposed to IDE agents via @toolknit/cli and an MCP server."
category: business-office
kind: framework
tags: [office, mcp, cli, pdf, pptx, document-generation, ai-agent]
languages: [javascript, rust]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://toolknit.com
repo: https://github.com/ZihangDong/toolknit-desktop
tier: standard
metrics:
  stars: 1165
  pushed_at: "2026-09-23T06:21:32Z"
  checked_at: "2026-09-24"
  archived: false
related: [officecli, anthropics-office-skills]
aliases: [toolknit]
risk_notes: "Apache-2.0 只覆盖 Desktop 与 CLI/MCP 源码，README 明确不授予 ToolKnit 名称、Logo、视觉标识、域名、托管网页服务与账号的使用权（另见 NOTICE），toolknit.com 网页端不在本仓开源范围内。桌面端仅支持 Windows 10 1803（17134）+/Windows 11，依赖 Microsoft Edge WebView2 Runtime（安装包内置引导程序，首次安装仍需联网），无 macOS/Linux 桌面版；安装包须只从本仓 Releases 下载并核对随附 .sha256，实际签名状态以对应 Release 说明为准。项目 2026-07-30 创建、当前 3.0.0，历史约两个月。CLI 契约文档中图像转换与压缩、图标生成、AI 润色与翻译仍标注 Planned，CLI 覆盖面小于桌面端。AI 功能会把符合说明的数据发往你所配置的模型服务，需 DEEPSEEK_API_KEY 或 TOOLKNIT_AI_API_KEY；官方明确「本地优先」不表示程序完全不联网。"
added_at: "2026-09-24"
updated_at: "2026-09-24"
---

# ToolKnit Desktop 本地文件工作台（桌面 / CLI / MCP）

> 把文件处理能力做成 Agent 可调用契约的桌面工具箱。上游：[ZihangDong/toolknit-desktop](https://github.com/ZihangDong/toolknit-desktop) · 许可证：Apache-2.0

## 这是什么

ToolKnit Desktop 3.0（Tauri 2.x + Rust 桌面容器，Vite + JavaScript 界面）提供三种工作方式：**网页端**（toolknit.com，开箱即用）、**Windows 桌面端**（文件留在本机）、以及 **CLI 与 MCP**（脚本、批处理、CI 与 IDE Agent）。

桌面端按 12 个分类列出 68 项工具：PDF 文档 13 项、PPT 演示 7 项、图像 7 项、开发者 6 项、文本与转写 5 项、计算器 5 项、AI 工作台 5 项、硬件与系统 8 项、音频 4 项、视频 3 项、创意 3 项、清理 2 项。

它对本目录的价值主要不在工具箱本身，而在**它把本地能力设计成了 Agent 可验证的契约**：

- 每个写文件的命令都要求显式目标路径；只接受常规 `.pdf`（拒绝符号链接）；未显式给 `--overwrite` 绝不覆盖已有文件，且拒绝覆盖自己的输入文件；
- 输出先写同目录临时文件，处理成功后原子发布；
- 加 `--json` 即得结构化结果，退出码分级明确：`0` 成功、`2` 用法错误、`3` 输入无效或缺失、`4` 输出路径不安全或拒绝覆盖、`5` 缺少引擎、`6` 处理失败；
- 密码等敏感输入不写入日志、输出 JSON、文件名或 Agent 回复。

隐私边界也写得很清楚：PDF/PPT/图像/音视频/文本/计算器/硬件/清理类工具默认本机运行；只有主动使用 AI 润色、翻译、AI 文档、AI 表格、AI PDF 转 Markdown、PPT 文本 AI 整理、AI PPT 大纲、AI PPTX 草稿、转写后 `refine` 时，符合该功能说明的数据才会发往你配置的模型服务；大文件清理只发送元数据。桌面端 AI Key 用 Windows DPAPI 加密保存。运行时按需复用本机已有的 FFmpeg 与 LibreOffice，Whisper 模型与缺失运行时按需下载（支持校验和与镜像源选择）。

## 怎么安装

Agent / 脚本路线（npm 包已发布，`@toolknit/cli`，bin 为 `toolknit`）：

```powershell
npm install --global @toolknit/cli
toolknit doctor --json
toolknit --help
```

Windows 桌面端从仓库 Releases 下载安装包，运行前核对随附的 `.sha256`：

```text
https://github.com/ZihangDong/toolknit-desktop/releases
```

从源码运行（建议 Node.js 24，与 GitHub Actions 一致；Vite 8 要求 Node `20.19+` 或 `22.12+`；构建桌面端还需 Rust stable、VS C++ Build Tools、Windows SDK 与 WebView2）：

```powershell
git clone --branch "ToolKnit-Desktop-V3.0-正式版" --single-branch https://github.com/ZihangDong/toolknit-desktop.git
Set-Location toolknit-desktop\toolknit-desktop
npm ci
npm run tauri dev
```

## 怎么用

在 Trae、Cursor、VS Code 等任意支持 MCP 的客户端里加一段配置，就能让 Agent 调用本地文件能力：

```json
{
  "mcpServers": {
    "toolknit": {
      "command": "toolknit",
      "args": ["mcp", "serve"]
    }
  }
}
```

命令行侧已定契约的能力示例（PDF / 音频 / 视频）：

```powershell
toolknit pdf inspect --input .\report.pdf --json
toolknit pdf merge --input .\part-a.pdf --input .\part-b.pdf --output .\merged.pdf --json
toolknit pdf split --input .\report.pdf --pages 1,3-5 --output-dir .\pages --json
toolknit pdf compress --input .\report.pdf --output .\small.pdf --level high --json
toolknit pdf to-image --input .\report.pdf --output-dir .\out --mode images --format png --clarity high --json
toolknit audio convert --input .\meeting.m4a --output-dir .\out --format mp3 --quality high --json
toolknit audio extract --input .\lesson.mp4 --output-dir .\out --format mp3 --track-index 0 --json
toolknit video convert --input .\recording.mov --output-dir .\out --format mp4 --json
```

- 基础文件工具与非 AI 的 PPT 工具**不需要 AI Key**；AI 文档、AI 表格、PPT 文本整理、AI PPT 大纲、AI PPTX 草稿与转写后 `refine` 需在 CLI/MCP 进程环境配置 `DEEPSEEK_API_KEY` 或 `TOOLKNIT_AI_API_KEY`。
- 分工定位：桌面端负责可视化预览与交互，CLI 负责批处理，Agent 负责自然语言编排。
- 必读文档（都在仓库的 `toolknit-desktop/docs/` 下）：[CLI 与 MCP 契约](https://github.com/ZihangDong/toolknit-desktop/blob/main/toolknit-desktop/docs/cli-agent.md)、[中文 Agent 手册](https://github.com/ZihangDong/toolknit-desktop/blob/main/toolknit-desktop/docs/agent-guide.zh-CN.md)、[English Agent guide](https://github.com/ZihangDong/toolknit-desktop/blob/main/toolknit-desktop/docs/agent-guide.en.md)、[AI 文档工程规范](https://github.com/ZihangDong/toolknit-desktop/blob/main/toolknit-desktop/docs/ai-document-project-spec.md)。

## 注意事项

- **商标与品牌不在授权范围内**：Apache-2.0 只覆盖源码，ToolKnit 名称、Logo、域名、托管网页服务与账号均不授予使用权（见 `NOTICE`）；二次分发产品需改名或另行取得授权。
- **仅 Windows 桌面端**：macOS/Linux 用户走网页端或 CLI；Win7/8/8.1 与 1803 之前的 Win10 不受支持，安装器会在复制文件前直接提示原因。
- **供应链纪律**：官方要求只从本仓 Releases 下载并核对 SHA-256；代码签名状态以各 Release 说明为准，另有 `CODE_SIGNING_POLICY.md`。
- **CLI 覆盖小于桌面端**：契约文档中图像转换/压缩、图标生成、AI 润色与翻译等仍标 `Planned`，编排 Agent 工作流前先 `toolknit --help` 确认实际可用面。
- **仓库结构有嵌套**：应用源码与 Agent 文档位于 `toolknit-desktop/` 子目录下，根目录 `docs/` 放的是架构与更新说明；源码运行需 `cd` 进嵌套目录。
- 项目 2026-07-30 创建，至今约两个月但迭代很密（2026-09-23 仍在推送），star 规模尚小（1.2k），选型时留意长期维护。
