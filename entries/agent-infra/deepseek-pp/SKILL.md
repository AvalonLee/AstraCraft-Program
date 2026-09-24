---
record_type: entry-record
id: deepseek-pp
name_zh: DeepSeek++ 浏览器 Agent 工作台
name_en: DeepSeek++
summary_zh: "把 DeepSeek 网页版扩展成浏览器内 AI Agent 工作台：支持 MCP 工具、长期记忆、Skills、多模态媒体分析、网页控制、保存项、产物下载、对话导出与定时自动化。"
summary_en: "Browser extension that turns DeepSeek Web into an AI agent workspace with MCP, memory, Skills, media analysis, web control and automation."
category: agent-infra
kind: framework
tags: [ai-agent, mcp, memory, skill, skills-management, cn-localization]
languages: [typescript]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://github.com/zhu1090093659/deepseek-pp
repo: https://github.com/zhu1090093659/deepseek-pp
tier: standard
metrics:
  stars: 1871
  pushed_at: "2026-08-13T17:19:34Z"
  checked_at: "2026-09-24"
  archived: true
related: [officecli]
aliases: [DeepSeek++, deepseek-pp]
risk_notes: "Apache-2.0 可商用；依赖 DeepSeek 网页版界面，上游 DOM 或站点策略变化可能影响扩展功能；MCP/浏览器控制/Shell 能力需按需授权，Shell MCP 会获得本机命令执行能力，安装前应确认来源并限制权限；多模态 API Key 与配置保存在浏览器本地。"
added_at: "2026-09-11"
updated_at: "2026-09-11"
---

# DeepSeek++ 浏览器 Agent 工作台

> 把 DeepSeek 网页版升级为浏览器内 Agent 工作台。上游：[zhu1090093659/deepseek-pp](https://github.com/zhu1090093659/deepseek-pp) · 许可证：Apache-2.0

## 这是什么

DeepSeek++ 是一个开源浏览器扩展，支持 Chrome、Edge 和 Firefox。它在 DeepSeek 网页版旁边提供 Agent 工作台：侧边栏对话、MCP 服务与工具权限、长期记忆、内置/自定义 Skill、网页读取与控制、图片和视频分析、保存项、产物下载、对话导出与定时自动化。

它适合已经使用 DeepSeek Web、但需要工具调用、可复用上下文、结构化产物和自动化流程的用户。项目提供简体中文与英文界面，核心数据保存在浏览器本地，支持从应用商店安装或从源码构建。

## 怎么安装

```bash
# 源码构建（需要 Node.js 与 npm）
git clone https://github.com/zhu1090093659/deepseek-pp.git
cd deepseek-pp
npm install
npm run build
```

构建后按浏览器加载：

- Chrome：`chrome://extensions/` → 开启开发者模式 → 加载已解压的扩展程序 → 选择 `dist/chrome-mv3/`
- Edge：`edge://extensions/` → 加载解压缩的扩展 → 选择 `dist/edge-mv3/`
- Firefox：`about:debugging#/runtime/this-firefox` → 临时载入附加组件 → 选择 `dist/firefox-mv3/manifest.json`

也可以直接从 [Chrome Web Store](https://chromewebstore.google.com/detail/deepseek++/kdmpkkahkhdmdhfkdihkopikgcocbpbf?hl=zh-CN) 安装。

## 怎么用

1. 安装后打开 [DeepSeek 网页版](https://chat.deepseek.com)，在侧边栏启用记忆、Skill、MCP、联网工具、对话导出或自动化。
2. 在 `MCP` 页添加远程或本机服务，按服务或工具切换自动/手动执行，并测试连接。
3. 需要处理图片、视频或本机 Office 文档时，按侧边栏提示安装对应的 Native Host，再在设置页配置模型与权限。
4. 使用 `/skill` 快速切换任务模板，或导入/创建自定义 Skill。

## 注意事项

- **许可证 Apache-2.0**：宽松可商用。
- **浏览器支持**：当前面向桌面端 Chrome、Edge 和 Firefox，不提供移动端安装包。
- **站点依赖**：扩展围绕 DeepSeek 网页版工作，站点改版可能造成部分功能需要等待上游适配。
- **权限边界**：MCP、浏览器控制、Shell Native Host 都是有实际副作用的本地能力；建议只连接可信服务，按需开启手动确认。
- **维护状态**：截至 2026-09-11 核验约 1,841 stars，上游最近推送为 2026-08-13。
