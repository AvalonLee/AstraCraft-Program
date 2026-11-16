---
record_type: entry-record
id: claude-code-game-studios
name_zh: "Claude Code Game Studios 游戏工坊模板"
name_en: "Claude Code Game Studios"
summary_zh: "把 Claude Code 变成一支完整游戏开发团队：克隆模板即得 49 个角色 Agent（制作人、设计、程序、美术、QA 等）与近百个流程技能，从提问、一页需求简报到可玩的浏览器游戏，再到逐步迭代、分享与发行收尾，全程有检查与回滚点。"
summary_en: "Turn Claude Code into a full game studio: 49 role agents and ~99 workflow skills take an idea from questions and a brief to a playable browser game, then iterate and cut it for release."
category: dev-engineering
mode: install
tags: [ai-agent, multi-agent, claude-code, skill-pack, game-development]
languages: [shell, markdown]
doc_languages: [en]
license: MIT
homepage: https://github.com/Donchitos/Claude-Code-Game-Studios
repo: https://github.com/Donchitos/Claude-Code-Game-Studios
tier: standard
metrics:
  stars: 39571
  pushed_at: "2026-11-09T23:33:14Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [claude-code-game-studios, Claude Code Game Studios, game-studios]
risk_notes: "只支持 Claude Code——需要可用的 Claude Code 与模型额度，不是独立游戏引擎；Python 3 必装（每个技能 / hook 都读 project.yaml，缺失时设置会静默回落到默认值），Bash 必装（Windows 用 Git Bash，否则 hooks 自跳过、会话提示检查关闭），/prototype 的自动验收需本机 Chrome / Edge / Chromium；必须在仓库根目录启动 Claude Code，子目录启动会跳过 hooks、deny 规则与 ask-first 权限；模板带 hooks / deny 规则 / statusline 等 Agent 行为改造，使用前读 CLAUDE.md 与 .claude/settings.json；每个项目克隆一份，升级需按 UPGRADING.md 手动合并；上游自述引擎路线（Godot / Unity / Unreal）已实现但尚未像浏览器路线那样经过对照测试。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# Claude Code Game Studios 游戏工坊模板

> 克隆一份模板，把 Claude Code 变成一支游戏工作室。上游：[Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) · 许可证：MIT

## 这是什么

Claude Code Game Studios 是一个面向 Claude Code 的游戏开发项目模板：克隆到一个新文件夹，就等于搭起一套「虚拟工作室」——49 个角色化 Agent（制作人、游戏设计、程序、美术、音频、QA、无障碍等）配上近百个流程技能（`/start`、`/prototype`、`/next-step`、`/project-settings`、`/setup-engine`、`/create-stories`、`/cut` 等），用 `.claude/` 下的 hooks、权限规则与 `project.yaml` 把流程、质量和安全边界固定下来。

它主打「从一句想法到能玩的东西」：你说一个游戏点子，Claude Code 先问一轮关键问题（怎么玩、手感、画面、难度、目标），写出一页 `design/game-brief.md` 给你确认，然后在 `prototypes/<name>/` 生成双击即开的浏览器游戏；自动用无头浏览器做按键与布局检查，逐条核对需求简报告知哪些已实现、缺失或损坏。之后可以按需求改（每次接受都留检查点）、导出干净的 itch.io 分享版、长成 Vite + TypeScript 工程逐步加功能，最后用 `/cut` 定裁剪与打磨清单。已有浏览器游戏也能用 `/prototype --from <path>` 接入。

支持 Web（默认，可加 three.js / Phaser / PixiJS）、Godot 4、Unity、Unreal Engine 5 四条引擎路线；`project.yaml` 用 `modes.rigor`（minimal / standard / full）一个旋钮控制需求文档、QA、评审与团队规模，适合先轻后重。

## 怎么安装

前置：Git；可用的 [Claude Code](https://code.claude.com/docs/en/setup)；**Python 3**（读 `project.yaml`，缺失时设置静默回落）；**Bash**（Windows 装 Git for Windows 用 Git Bash）；验证阶段需要 Chrome / Edge / Chromium；推荐 Node.js（长成 Web 工程、three.js、构建测试）与 jq（hook 校验）。

```bash
# 1) 克隆模板到你的游戏项目目录（每个项目一份，不要把游戏做在本仓库副本之外）
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game

# 2) 必须在含 CLAUDE.md 与 project.yaml 的根目录启动 Claude Code（子目录会跳过 hooks 与权限规则）
claude

# 3) 在会话里选一条入口
# /start                          按引导回答你在哪一步，自动选择流程
# /prototype a fishing game where the rare fish only bite at dusk
# /setup-engine godot 4.7         已确定引擎时先配置（Web / Godot / Unity / Unreal）
```

安装不需要往全局 skills 目录复制文件；模板本身就是项目骨架（`.claude/agents`、`.claude/skills`、`.claude/hooks`、`CLAUDE.md`、`project.yaml`）。升级已有项目请按 `UPGRADING.md` 手动合并。

## 怎么用

1. `/start` 或 `/prototype <想法>`：回答一轮问题 → 读 `design/game-brief.md` → 说 Build it，得到 `prototypes/<name>/` 下的可玩浏览器游戏。
2. 玩过后直接提修改：每次改动对照你「要保留 / 要避免」的约束检查，接受的改动成为可回滚检查点；说「tune it」会生成带滑块的调参面板。
3. 满意后导出分享版（去掉调参面板与工作文件），或让模板长成 Vite + TypeScript 正式工程，一次加一个功能并自动跑同一套种子测试。
4. 需要正式流程时再开 stories（`/create-stories` → `/dev-story` → `/story-done`），用 `/project-settings modes.rigor=full` 提高文档 / QA / 评审强度；`/cut` 给出裁剪与打磨清单。
5. 随时用 `/next-step` 让工作室告诉你下一步；用 `/project-settings` 查看或修改引擎、命名、流程与自动化档位。

上游说明：浏览器路线的「先做简报再开发」在三次盲测中被选中三次；引擎路线（Godot / Unity / Unreal）与设计文档深挖已实现并通过框架自检，但尚未做同类对照测试。模板刻意不附带成品游戏。

## 注意事项

- **绑定 Claude Code**：这是 Claude Code 的项目模板，需要可用的 Claude Code 与模型额度；不适用于其他 Agent harness，也不是独立游戏引擎。
- **Python 3 与 Bash 是硬前提**：缺 Python 时 `project.yaml` 设置会静默回落到默认值；Windows 缺 Bash 时 hooks 全部跳过，质量检查等于关闭。缺 Chrome 类浏览器时自动验收会标注「未评估」。
- **从根目录启动**：在子目录（如 `src/`）启动 Claude Code 会跳过 hooks、deny 规则与 ask-first 权限模式，等于绕过安全网。
- **会改造 Agent 行为**：模板包含 hooks、权限 deny 规则、statusline 与规则文件；使用前读 `CLAUDE.md` 与 `.claude/settings.json`，确认允许的命令范围。
- **模板而非产品**：每个项目克隆一份，升级按 `UPGRADING.md` 手动合并；不附带示例游戏；引擎路线成熟度低于浏览器路线。
- **许可证**：MIT，可商用与修改；生成游戏的知识产权与素材合规由使用者负责，注意不要复刻受版权保护的现有游戏。
