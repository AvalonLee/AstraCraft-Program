---
record_type: entry-record
id: cc-switch
name_zh: CC Switch 多 Agent 供应商切换器
name_en: CC Switch
summary_zh: 跨平台桌面应用，统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Grok Build 与 Hermes 等 8 款 AI 编程工具的供应商切换、MCP/Skills/Prompts 同步、本地代理故障转移与用量统计。
summary_en: Cross-platform desktop app that unifies provider switching, MCP/Skills/Prompts sync, proxy failover and usage tracking across Claude Code, Codex, Gemini CLI, OpenCode, OpenClaw, Grok Build and Hermes.
category: agent-infra
kind: framework
tags: [provider-switching, mcp, skills-management, claude-code, codex, gemini-cli, tauri, desktop-app]
languages: [rust, typescript]
doc_languages: [en, zh, ja, de]
license: MIT
homepage: https://ccswitch.io
repo: https://github.com/farion1231/cc-switch
tier: core
metrics:
  stars: 136390
  pushed_at: "2026-09-24T14:43:18Z"
  checked_at: "2026-09-24"
  archived: false
related: [codexplusplus]
aliases: [CCSwitch, cc-switch]
risk_notes: MIT 许可可商用；切换供应商后大多数 CLI 工具需重启终端（Claude Code 除外）；API Key 保存在本机 SQLite，切换操作会写入各工具的配置文件，建议定期备份 ~/.cc-switch 目录；首次启动可导入现有配置作为默认供应商，系统始终保留一个活跃配置以防工具不可用。
added_at: "2026-09-06"
updated_at: "2026-09-06"
---

# CC Switch 多 Agent 供应商切换器

> 一款桌面应用统一管理 8 款 AI 编程工具的供应商与配置。上游：[farion1231/cc-switch](https://github.com/farion1231/cc-switch) · 许可证：MIT

## 这是什么

CC Switch 解决的核心问题是：Claude Code、Codex、Gemini CLI 等工具各有自己的配置格式，切换 API 供应商需要手动编辑 JSON/TOML/.env 文件，MCP 和 Skills 也无法跨工具统一管理。

它提供一个 Tauri 2 桌面应用（Windows / macOS / Linux），把供应商管理、MCP/Prompts/Skills 同步、本地代理故障转移和用量统计放在同一个界面里，50+ 内置供应商预设一键导入，支持系统托盘快捷切换和云端同步。数据库使用 SQLite 原子写入保护配置不被损坏。

## 怎么安装

```bash
# macOS（Homebrew，代码签名公证）
brew install --cask cc-switch

# Arch Linux（paru）
paru -S cc-switch-bin
```

Windows / Linux 从 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) 下载：

- Windows：`CC-Switch-v{version}-Windows.msi` 或便携版 `.zip`
- Linux：`.deb`（Debian/Ubuntu）、`.rpm`（Fedora/RHEL）、`.AppImage`（通用）

## 怎么用

1. **添加供应商**：点击"Add Provider"，从 50+ 内置预设选择或自定义配置，粘贴 API Key 一键导入
2. **切换供应商**：主界面选中供应商点"Enable"，或从系统托盘直接点击切换；切换后重启终端生效（Claude Code 支持热切换）
3. **统一 MCP**：点击"MCP"面板，通过模板或自定义配置添加 MCP Server，按工具逐个同步开关
4. **Skills 管理**：点击"Skills"，从 GitHub 仓库或 ZIP 一键安装技能到支持的 AI 工具
5. **用量看板**：查看花费、请求数和 Token 消耗趋势图表

## 注意事项

- **许可证 MIT**：宽松可商用。
- **系统要求**：Windows 10+、macOS 12+、Ubuntu 22.04+ / Debian 11+ / Fedora 34+。
- **最小侵入设计**：即使卸载 CC Switch，各 CLI 工具仍正常工作；系统始终保留一个活跃配置以防工具不可用。
- **数据位置**：配置数据库在 `~/.cc-switch/cc-switch.db`，自动备份保留最近 10 份；Skills 软链到 `~/.cc-switch/skills/`。
- **Wayland 兼容**：AppImage 默认强制 `GDK_BACKEND=x11`（XWayland），Wayland + NVIDIA 环境如遇黑屏可用 `CC_SWITCH_GDK_BACKEND=wayland` 回退原生 Wayland。
- 维护非常活跃（2026-09 持续更新），当前 131,268 stars。
