---
record_type: entry-record
id: skill-recorder
name_zh: "Skill Recorder 屏幕工作录制转技能"
name_en: "Skill Recorder"
summary_zh: "微软开源的桌面应用：录制屏幕工作过程，用 GitHub Copilot CLI 重建为意图与有序步骤，再生成可复用 Skill 或定时 Automation，供 Scout / Copilot Cowork / Copilot Studio 使用。"
summary_en: "Microsoft desktop app that records on-screen work, reconstructs it with GitHub Copilot CLI into intent and steps, and turns it into reusable Skills or scheduled Automations."
category: meta-skillcraft
kind: framework
tags: [skill-generation, screen-recording, automation, ai-agent, copilot]
languages: [typescript, javascript, powershell, shell]
doc_languages: [en]
license: MIT
homepage: https://github.com/microsoft/skill-recorder
repo: https://github.com/microsoft/skill-recorder
tier: standard
metrics:
  stars: 3837
  pushed_at: "2026-09-03T12:03:38Z"
  checked_at: "2026-09-05"
  archived: false
related: []
aliases: [skill-recorder, microsoft-skill-recorder]
risk_notes: "MIT 可商用；分析阶段会把屏幕截图、窗口/URL/剪贴板预览与叙述文本发送到 GitHub Copilot 云端处理，录制前必须避免密码、令牌、API Key 等敏感信息；需要 GitHub Copilot 访问权限；macOS 与 Windows 11 为主，Linux 仅支持 Ubuntu。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Skill Recorder 屏幕工作录制转技能

> 记录一次真实工作过程，让 Agent 以后能重复它。上游：[microsoft/skill-recorder](https://github.com/microsoft/skill-recorder) · 许可证：MIT

## 这是什么

Skill Recorder 是微软开源的桌面应用：你正常完成一次任务，它在本地捕获屏幕、窗口切换、访问的页面和可选语音叙述，然后调用 **GitHub Copilot CLI** 把这次操作重建成清晰的「意图 + 有序步骤」，再一键生成：

- **Skill**：一份 `SKILL.md` 过程，Agent 可按需调用；
- **Automation**：同一过程绑定定时器或触发器自动执行。

它偏向让 Agent 优先使用原生工具（如 `gh` CLI、`web_fetch`），而不是机械重放 UI 点击；并且能从单个示例泛化，比如录一次「提交表单」，教会 Agent 提交同类表单。

## 怎么安装

推荐从上游 Releases 页复制你平台的官方一键安装命令。macOS / Ubuntu 通用格式：

```bash
commit="<40-character-release-commit>"; curl -fsSL "https://raw.githubusercontent.com/microsoft/skill-recorder/$commit/install.sh" | SKILL_RECORDER_COMMIT="$commit" bash
```

Windows PowerShell：

```powershell
$commit="<40-character-release-commit>"; $env:SKILL_RECORDER_COMMIT=$commit; irm "https://raw.githubusercontent.com/microsoft/skill-recorder/$commit/install.ps1" | iex
```

这两个命令会下载固定 commit 的源码并在本机构建，最后注册一个 **Skill Recorder (Source)** 应用；不会全局安装。需要 GitHub Copilot 访问权限。

## 怎么用

1. 启动 Skill Recorder，授予权限后按录制键（macOS `⌥⌘R` / Windows `Ctrl+Shift+R`）。
2. 正常执行你的任务；需要时打开叙述开关补充说明。
3. 完成后点击 **Analyze**，Copilot 会重建意图与步骤。
4. 审阅并修正步骤，再选择生成 **Skill** 或 **Automation**。

典型提示词：

```text
录一遍我把新 issue 分派给负责人的流程，生成一个可复用的 Skill。
```

## 注意事项

- **敏感信息**：分析阶段会把窗口标题、URL、剪贴板预览、截图和叙述文本发送到 GitHub 云端给 Copilot 处理；录制前务必关闭或避开密码、令牌、API Key、客户数据等。
- **平台支持**：macOS 是主目标，Windows 11 x64 / ARM64 也支持；Linux 只有 Ubuntu。
- **依赖**：需要 GitHub Copilot 访问权限，首次分析需登录；叙述转录首次使用会下载约 252 MB 的 Whisper 模型（本地执行）。
- **许可证**：MIT 可商用，但微软商标和品牌使用需遵守上游商标政策。
