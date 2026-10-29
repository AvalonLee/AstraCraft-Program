---
record_type: entry-record
id: reverse-skill
name_zh: "reverse-skill 安全技能路由包"
name_en: "reverse-skill — Cybersecurity Skills Router"
summary_zh: "装给 AI 代码客户端的安全技能路由包：遇到 APK / 二进制 / 前端 JS 加密 / CTF / 渗透目标时，按 44 条规则路由到正确方法论与工具链（jadx、Frida、IDA、BurpSuite 等），带 175 例回归基准、按需自举工具链与自动进化经验库，支持 Claude Code / Codex / Cursor / Cline 等。"
summary_en: "Cybersecurity skills router for AI coding clients: routes APK, binary, JS-encryption, CTF and pentest tasks to the right methodology across 44 rules, with a benchmark and self-evolving knowledge base."
category: dev-engineering
mode: install
tags: [skill-pack, security, reverse-engineering, pentesting, claude-code, codex]
languages: [powershell, shell]
doc_languages: [en, zh]
license: MIT
homepage: https://reverse.apivix.com/
repo: https://github.com/zhaoxuya520/reverse-skill
docs_url: https://reverse.apivix.com/docs/
tier: standard
metrics:
  stars: 43696
  pushed_at: "2026-09-22T06:43:21Z"
  checked_at: "2026-10-29"
  archived: false
aliases: ["逆向技能路由包", "Cybersecurity Skills Router"]
risk_notes: "双用途安全能力：仅限授权目标——工作流强制先经 case-init / scope.md 登记授权范围与网络档位才可对目标动手；工具链自举需本地备有 Java / Node.js / Python 及相应安全工具；路由核心以 PowerShell 为主（Windows 主场，Ubuntu 经 CI 覆盖）；上游 2026-09 起推送放缓。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# reverse-skill 安全技能路由包

> 让 AI 客户端接安全任务不再瞎猜命令：44 条路由规则 + 按需工具链 + 经验复用。上游：[zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) · 许可证：MIT

## 这是什么

一个装给 AI 代码客户端（Claude Code、Codex、Cursor、OpenCode、Cline、Kiro 等）的**安全技能路由包**（★43.7k）：当 Agent 遇到 APK、原生二进制、前端 JS 加密、CTF 题目或渗透测试目标时，按 44 条路由规则（R0–R45）把它导向正确的方法论、检查本机可用工具并执行可复现的工作流，而不是瞎猜命令。核心是一份结构化路由配置（PRIMARY 阶梯 + 全量矩阵），经 175 例回归基准与 Windows / Ubuntu 跨平台 CI 验证，与可选的客户端适配器分离；工具、MCP 与脚本按需自举，执行过程中的时间线、证据链（Evidence→Finding→Path）沉淀为经验库与现场日志供后续任务复用。

## 怎么安装

前置：Java / JDK（jadx、apktool）、Node.js ≥ 22.12、Python 3.x（Frida 与辅助脚本）按需安装。克隆后刷新工具索引：

```bash
git clone https://github.com/zhaoxuya520/reverse-skill.git

# Windows
powershell -File skills/scripts/refresh-tool-index.ps1
# Linux / macOS
bash skills/scripts/refresh-tool-index.sh
# Kali Linux
bash kali/scripts/refresh-tool-index.sh
```

查看 `skills/tool-index.md` 确认识别到的工具；把仓库（或其中的 skills 目录）挂进所用客户端的技能 / 工作流配置即可，Agent 侧入口见上游 `README_AI.md`。

## 怎么用

把任务直接交给接好路由包的 Agent：先经 `case-init` 生成 `scope.md`（登记**授权范围**与网络档位），再走 `MASTER-ROUTING` / `master-route.ps1` 主路由选场景技能，按技能指引调用工具 / MCP / 脚本执行，最后产出时间线、证据链与报告并写入经验日志。快速上手与教程见[官方文档](https://reverse.apivix.com/docs/)。

## 注意事项

- **授权红线**：仅限对已获授权的目标使用；工作流本身强制先登记授权范围（scope.md）才允许对目标实际操作——不要绕过这一步。
- **平台与工具**：路由核心以 PowerShell 为主，Windows 是主场（Ubuntu 有 CI 覆盖，Kali 有专门脚本）；方法论只做路由，工具链本身（IDA、BurpSuite 等商业工具）须自行合法取得。
- **维护节奏**：上游 2026-09-22 后暂无推送，版本 v1.0.1；路由规则与基准可自行扩展（结构化配置 + 回归测试护住质量）。
