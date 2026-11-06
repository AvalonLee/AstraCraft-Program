---
record_type: entry-record
id: libraries-dev
name_zh: "Libraries.dev AI 界面效果库"
name_en: "Libraries.dev"
summary_zh: "一组零运行时依赖的 React「AI 界面效果」小包（光束边框、思考球、机器人头像、液态模糊、语音波形等），配教 Agent 何时该用哪种效果的技能与 CLI，代码 MIT、模型文件另有许可。"
summary_en: "Zero-dependency React packages for next-gen AI interface effects (border beams, thinking orbs, liquid gooey, voice glow), plus an agent skill and CLI that decide which effect fits which wait time."
category: design-creative
mode: install
tags: [design-system, motion-design, react, ai-agent, agent-skills, mcp]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://libraries.dev
repo: https://github.com/Jakubantalik/Libraries.dev
tier: standard
metrics:
  stars: 4612
  pushed_at: "2026-11-05T16:05:24Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["Libraries.dev", "libraries-dev"]
related: [shadcn-ui, animate-ui, beui]
risk_notes: "双层许可：代码 MIT，站点下载的 .mfxl 模型文件另按 LICENSE-MODEL（免费仅限开发/原型/非商业，商用发布需订阅），Studio 导出与 Pro 预设按订阅授权；Pro 技能、MCP 与调参后端 api.libraries.dev 在私有仓库、不可自托管，强依赖订阅 token；单人维护（675 次提交全为作者）、已关闭 Issue 为 0、13 个 PR 挂空，协作通道基本不开放；「按等待时长选效果」是作者主观约定而非客观基准；img-fx / metal-fx 走 WebGL，有体积与性能成本；README 部分文档链接已失效。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# Libraries.dev AI 界面效果库

> 代码 MIT、效果即装即用；何时用哪种效果，交给那份给 Agent 的技能。上游：[Jakubantalik/Libraries.dev](https://github.com/Jakubantalik/Libraries.dev) · 许可证：MIT（模型文件另有许可）

## 这是什么

一个面向「AI 产品界面」的 monorepo（★4.6k）：`packages/` 下 7 至 9 个各含单个组件的 React 小包——光束边框 `border-beam`、思考态圆球 `thinking-orbs`、机器人头像 `bot-avatars`、液态模糊 `liquid-gooey`、语音波形 `voice-glow`、金属质感 `metal-fx`、图像特效 `img-fx` 等，除个别需要 `three` 外**零运行时依赖**，已实际发布 10 个 npm 包。配套一份 Agent 技能（`skills/libraries-dev/SKILL.md` + 7 份参数参考）：按用户等待时长（<2 秒 / ≥2 秒 / >3 秒）决定该给哪种反馈效果，再落到具体包与参数。另有 CLI、站点的 Studio 调参后端与 `llms.txt` 入口。

## 怎么安装

组件按包安装（在项目根目录，任选需要的效果）：

```bash
npm install border-beam
npm install thinking-orbs liquid-gooey
```

把「何时用哪种效果」的判断交给编码 Agent：

```bash
npx libraries-dev skill                      # 免费技能，装到 ~/.claude/skills
npx skills add Jakubantalik/Libraries.dev    # 通用技能安装器
npx libraries-dev mcp --claude               # MCP 接入（需 Business 席位）
```

前置：React ≥ 18，Node 20（仓库 `.node-version`，CLI 要求 Node ≥ 18）；仓库内开发用 `npm install && npm run build:site-home`，类型检查 `npm run typecheck`。

## 怎么用

import 后按 props 配置即可，例如给加载态套 `thinking-orbs`、给等待超过三秒的任务上 `border-beam`；参数规格在每个包的 `spec.ts` 与技能参考里。深度调参、Pro 预设与 Studio 导出属于站点订阅（`https://api.libraries.dev`），模型文件 `.mfxl` 需从站点下载。

## 注意事项

- **协议分层要交底**：代码是 MIT，但 `.mfxl` 模型文件按 `LICENSE-MODEL.md` 授权——**免费仅限开发、原型与非商业，商用发布需要 Pro / Business / Enterprise 订阅**；Studio 导出与 Pro 预设同样按订阅授权。
- **不可自托管**：Pro 技能、MCP 与调参后端在私有仓库 `libraries-pro`，强依赖订阅 token，价值与 libraries.dev 站点可用性绑定。
- **维护与协作**：单人项目（作者一人 675 次提交），开放 Issue 8 个、PR 13 个但**已关闭 Issue 为 0**，实际协作基本不开放；README 里部分文档链接已失效。
- **效果规则是主观约定**：按等待时长选效果、动效克制程度等是作者审美判断，不是客观基准；WebGL 类（`img-fx` / `metal-fx`）有体积与性能成本，低端设备慎用。
