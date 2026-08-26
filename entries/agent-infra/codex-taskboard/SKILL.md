---
id: codex-taskboard
name_zh: Codex Taskboard 本地任务看板
name_en: Codex Taskboard
summary_zh: 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。
summary_en: A local-first issue board that runs in the browser and embeds into Codex via CDP launcher or injection; one HTTP API powers the React UI and the taskctl CLI used by the bundled Codex Skill.
category: agent-infra
kind: framework
tags: [codex, cli, framework, ai-agent]
languages: [typescript]
doc_languages: [en, zh]
license: Apache-2.0
homepage: https://github.com/chuspeeism/dashi-taskboard
repo: https://github.com/chuspeeism/dashi-taskboard
tier: standard
metrics:
  stars: 2611
  pushed_at: "2026-08-26T08:54:06Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [dashi-taskboard, codex-task-board]
risk_notes: Apache-2.0 宽松可商用；本地运行需 Node.js 22.5+（npm install / build / start 起本地服务 127.0.0.1:47823）；若构建 macOS/Windows 桌面版需 Rust 1.88+ 与 Xcode/VS Build Tools（Tauri）。随附 Codex Skill 通过软链到 ~/.agents/skills/ 安装。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Codex Taskboard 本地任务看板

> 本地优先的 issue 看板，可嵌入 Codex。上游：[chuspeeism/dashi-taskboard](https://github.com/chuspeeism/dashi-taskboard) · 许可证：Apache-2.0

## 这是什么

一个**本地优先（local-first）的任务看板**：在浏览器中运行，既可以通过独立的 CDP 启动器、也可以通过注入脚本嵌入 Codex 使用。同一套 HTTP API 同时驱动 React Web UI 和随附 Codex Skill 使用的 `taskctl` CLI，形成一个"看板 + CLI + Agent 技能"一体的任务管理底座。

它让 Agent（Codex）拥有持久化的项目 / issue 视图与命令行操作能力，适合把长任务拆成可跟踪的 issue 并交给 Agent 推进。

## 怎么安装

```bash
# 1) 克隆并安装依赖
git clone --depth 1 https://github.com/chuspeeism/dashi-taskboard.git /tmp/codex-taskboard
cd /tmp/codex-taskboard
npm install
npm run build
npm start
# 打开 http://127.0.0.1:47823 ，SQLite 库位于 .data/taskboard.sqlite
```

把随附的 Codex Skill 接入 Codex：

```bash
ln -s /absolute/path/to/codex-taskboard/skills/manage-taskboard \
  ~/.agents/skills/manage-taskboard
```

CLI 走 `npm run taskctl -- <subcommand>`（如 `project create` / `issue create`），也可用 `npm link` 把 `taskctl` 放到 PATH；用 `CODEX_TASKBOARD_URL` 指向其他本地 / 局域网服务。

## 怎么用

- **看板**：浏览器打开本地服务，创建项目与 issue，按状态 / 优先级 / 标签跟踪；
- **CLI**：`npm run taskctl -- issue create --project <id> --title "..." --status todo --priority high`；
- **Codex 集成**：装好 manage-taskboard 技能后，在新的 Codex 任务里即可让 Agent 直接读写看板。

## 注意事项

- **许可证 Apache-2.0**：宽松可商用。
- **运行环境**：本地运行需 Node.js 22.5+；构建 macOS App / Windows NSIS 桌面版额外需要 Rust 1.88+ 与 Xcode Command Line Tools / Visual Studio Build Tools（Tauri），纯本地 Web 运行无需这些。
- 云端部署通过 **loopback companion**（设备本地的 loopback 鉴权与路径映射服务，非聊天人格）配置 `taskctl cloud login`。
- 维护活跃（2026-08 持续更新），当前 2,611 stars。
