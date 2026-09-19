---
record_type: entry-record
id: chengfeng-videocut-skills
name_zh: "成峰视频剪辑 Codex 插件包"
name_en: "chengfeng-videocut-skills — Codex Plugin for Chinese Video Cutting"
summary_zh: "面向中文创作者的视频剪辑 Codex Plugin 公开安装入口：插件向 Agent 提供方法与确认工具，Runtime / Studio 负责工程操作与工作台，串起字幕、剪辑与短视频流程；安装 Plugin、准备 Runtime、完成视频被明确列为三件不同的事。"
summary_en: "Public Codex Plugin install entry for a Chinese-language video cutting workflow: the plugin gives the agent methods and confirmation tools, while the Runtime/Studio does project work and UI."
category: design-creative
kind: skill-collection
tags: [video-production, short-video, codex, skill-pack, cn-localization]
languages: [typescript]
doc_languages: [zh]
license: Apache-2.0
homepage: https://github.com/Agentchengfeng/chengfeng-videocut-skills
repo: https://github.com/Agentchengfeng/chengfeng-videocut-skills
tier: watch
metrics:
  stars: 3000
  pushed_at: "2026-09-14T15:41:49Z"
  checked_at: "2026-09-19"
  archived: false
related: [manju-laoli-skill, video-shotcraft]
aliases: []
risk_notes: "观察期，原因有三。其一，3.0k star 集中在本安装入口仓，软件本体 Agentchengfeng/chengfeng-videocut 仅 11 star。其二，README 自述当前为 Plugin 0.10.10 / bootstrap 0.5.2 配套 Runtime v0.4.11 CLI-only 预发行，明确「本轮不推进 stable」，且「无 Bun 自动准备」仅覆盖 macOS arm64 固定官方资产，其他平台、常驻服务与业务流程不在验证结论内。其三，安装前提是 Node.js 18+、Git 与已登录且支持 codex plugin 子命令的 Codex CLI，非通用 Agent 可用。独立「小黑」包要求 Runtime >=0.5.9，0.4.10 与 0.4.11 均不满足其合同，仅装本 Plugin 不能宣称接通。Apache-2.0，仓库保留 LICENSE / NOTICE / CITATION.cff。"
added_at: "2026-09-19"
updated_at: "2026-09-19"
---

# 成峰视频剪辑 Codex 插件包

> 中文视频剪辑流程的 Codex Plugin 安装入口。上游：[Agentchengfeng/chengfeng-videocut-skills](https://github.com/Agentchengfeng/chengfeng-videocut-skills) · 许可证：Apache-2.0

## 这是什么

维护者成峰（AI产品自由）出品的中文短视频剪辑工具链，本仓是**公开 Codex Plugin 安装入口**。它把三件事刻意分开，README 反复强调不要混为一谈：

1. 安装 Plugin（本仓：给 Agent 的方法与确认工具，`plugins/` + `bin/install.cjs` + `installer-manifest.json`）；
2. 准备 Runtime（软件本体仓 [chengfeng-videocut](https://github.com/Agentchengfeng/chengfeng-videocut)：工程操作与 Studio 工作台）；
3. 完成视频（实际剪辑交付）。

仓库分工还包括独立的[安装与接入 Skill](https://github.com/Agentchengfeng/chengfeng-videocut-install)，以及各自维护的其他独立 Skills（如 [chengfeng-videocut-xiaohei](https://github.com/Agentchengfeng/chengfeng-videocut-xiaohei) 负责动画方法与 ChatCut 适配）。

## 怎么安装

前提：Node.js 18+、Git，以及**已登录且支持 `codex plugin` 命令的 Codex CLI**。按 README 要求先审阅取得的固定源码，再在该目录内运行：

```sh
node bin/install.cjs install --dry-run
node bin/install.cjs install
node bin/install.cjs doctor
```

安装身份是固定的，不要跟随可变分支：Plugin 0.10.10（内容提交 `ea3b0e4`）、带来源回执的安装快照 `442523b`、配套 Runtime [v0.4.11](https://github.com/Agentchengfeng/chengfeng-videocut/releases/tag/v0.4.11)。`installer-manifest.json` 同时固定 marketplaceRef 与 pluginRef；`stable` 只是发现入口，不能代替安装身份。

需要工作台时，按包内 `references/runtime-and-product-contract.md` 与 `scripts/ensure-runtime.cjs` 准备固定配套 Runtime，并以实际输出确认版本与能力。

## 怎么用

- 安装器只调用宿主 Codex 支持的 Plugin 命令，并回读来源、克隆提交与安装状态；遇到同名或来源不明的已有安装会拒绝覆盖，**不要靠删安装目录绕过检查**。
- 它不准备也不启动 Runtime；新任务能否发现 Skill 与 MCP 需分别验收，已有会话可能要重开。
- 媒体依赖、宿主加载、常驻服务与实际剪辑要逐项验收；本轮不提供新的 DMG / EXE。
- 已有健康且能力满足的 0.4.10+ Runtime 可继续复用，不会自动升级覆盖。

## 注意事项

- **预发行状态**：README 明确本轮仅按新候选的固定提交安装与复测，不宣称默认 stable 已修复；常驻服务生命周期尚未完成新版本验收。
- **平台覆盖有限**：「无 Bun 自动准备」仅覆盖 macOS arm64 固定官方资产与 SHA-256，其他平台不在结论内；CLI 安装器仍需 Node 或已有 Bun 启动，不改全局 Bun 或 shell 配置。
- **npm 打包坑**：npm 10.9.2 按完整提交做 Git 打包时可能报 `GitFetcher requires an Arborist constructor`，这是引导获取失败、尚未安装 Plugin，应按 Release 给定的完整提交取源码后核对 HEAD，而不是改用未锁定的 main/stable。
- **兼容边界**：独立小黑的 Runtime 路线要求 >=0.5.9（`workbench commands/connect`、`module publish/get`、`workbench visuals-put` 等接口），0.4.10 / 0.4.11 均不满足；只要独立动画时可交付 HTML/SVG，但不应声称已进入剪辑工程。
- 本条目按 `watch`（观察期）收录：等其 Runtime 完成新版本验收并推进 stable 后，可复评为常规收录。
