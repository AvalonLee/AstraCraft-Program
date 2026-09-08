---
record_type: entry-record
id: codexplusplus
name_zh: Codex++ Codex 桌面增强器
name_en: Codex++ (CodexPlusPlus)
summary_zh: 面向 OpenAI Codex / ChatGPT 桌面应用的外部启动器与管理工具，通过 CDP 注入提供供应商切换、协议转换、会话管理与界面增强，不修改官方应用文件。
summary_en: An external launcher and manager for the OpenAI Codex desktop app with provider switching, protocol conversion, session management and UI enhancement via CDP injection.
category: agent-infra
kind: framework
tags: [codex, provider-switching, desktop-app, tauri, rust, session-management, cdp-injection]
languages: [rust, typescript]
doc_languages: [zh, en]
license: AGPL-3.0-only
homepage: https://codexpp.cc/
repo: https://github.com/BigPizzaV3/CodexPlusPlus
tier: standard
metrics:
  stars: 30281
  pushed_at: "2026-09-04T09:01:05Z"
  checked_at: "2026-09-06"
  archived: false
related: [cc-switch]
aliases: [CodexPlusPlus, Codex++]
risk_notes: AGPL-3.0-only 要求修改分发或网络服务时开放源码；通过 CDP 注入依赖官方桌面应用页面结构，官方更新后部分功能可能需适配；修改供应商配置和本地会话数据前应保留备份；macOS 安装包未签名时需手动解除 Gatekeeper 隔离。
added_at: "2026-09-06"
updated_at: "2026-09-06"
---

# Codex++ Codex 桌面增强器

> OpenAI Codex / ChatGPT 桌面应用的外部启动器与管理工具。上游：[BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus) · 许可证：AGPL-3.0-only

## 这是什么

Codex++ 是一个不侵入官方应用的增强工具：它通过 Chromium DevTools Protocol 和本地辅助服务为 Codex 桌面版提供供应商切换、协议转换（Chat Completions 转 Responses）、会话管理（批量删除、Markdown 导出、Token 用量历史）和界面增强（中文界面、插件市场、会话宽度恢复等）。不修改 `app.asar`，不向安装目录写补丁。

供应商管理是它的强项：支持官方登录、官方登录混入 API、纯 API 和聚合供应商（故障转移、按会话/请求/权重轮转）四种模式，每供应商可配置 Responses 或 Chat Completions 协议、模型列表、上下文窗口和自动压缩阈值，还可按供应商启用不同的 MCP Server、Skill 和 Plugin。

## 怎么安装

从 [GitHub Releases](https://github.com/BigPizzaV3/CodexPlusPlus/releases) 下载最新安装包：

```bash
# Windows：CodexPlusPlus-*-windows-x64-setup.exe
# macOS Intel：CodexPlusPlus-*-macos-x64.dmg
# macOS Apple Silicon：CodexPlusPlus-*-macos-arm64.dmg
```

安装后有两个入口：`Codex++` 用于静默启动官方应用，`Codex++ 管理工具` 用于配置供应商、模型和增强功能。

macOS 如遇 Gatekeeper 拦截（"已损坏，无法打开"），执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/Codex++\ 管理工具.app
sudo xattr -rd com.apple.quarantine /Applications/Codex++.app
```

## 怎么用

1. 首次使用先打开 **管理工具**，确认应用路径和运行状态
2. 配置供应商：选择模式（官方登录 / 混入 API / 纯 API / 聚合供应商），填入 Base URL 和 Key，用模型测试验证连通性
3. 从 **Codex++** 入口启动官方应用，增强功能和供应商配置自动生效
4. 在管理工具中管理会话（批量删除 / 导出 / Token 统计）、MCP/Skill/Plugin 白名单和用户脚本

## 注意事项

- **许可证 AGPL-3.0-only**：修改并分发本项目或通过网络提供修改后版本时，需按 AGPLv3 开放源码；许可证不覆盖 OpenAI、ChatGPT、Codex 的商标和应用资源。
- **兼容性**：依赖官方桌面应用的页面结构、CDP 和本地数据格式，官方更新后部分注入功能可能需要跟随适配。
- **数据备份**：修改供应商配置或本地会话数据前应保留备份；配置在 `~/.codex/config.toml`，登录状态在 `~/.codex/auth.json`。
- **macOS 未签名**：安装包未签名/未公证时，Gatekeeper 会拦截，需手动解除隔离。
- 维护活跃（2026-09 持续更新），当前 30,281 stars。
