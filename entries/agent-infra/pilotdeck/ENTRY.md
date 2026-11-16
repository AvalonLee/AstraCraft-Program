---
record_type: entry-record
id: pilotdeck
name_zh: "PilotDeck 任务型 Agent 生产力平台"
name_en: "PilotDeck"
summary_zh: "OpenBMB 与清华 THUNLP 等联合开源的 Agent 生产力平台：以 WorkSpace 隔离文件、记忆与技能，主打白盒可追溯记忆、按任务难度智能路由降本与后台常驻执行；自带 Web UI / CLI / IM 前端，原生支持 MCP，可本地一键安装或 Docker 自托管。"
summary_en: "Open-source agent productivity platform with WorkSpace isolation, traceable white-box memory, smart model routing, always-on execution, MCP native, and Web UI, CLI and IM front-ends."
category: agent-infra
mode: deploy
tags: [ai-agent, memory, mcp, self-hosted]
languages: [typescript, javascript]
doc_languages: [en, zh]
license: AGPL-3.0
homepage: https://pilotdeck.openbmb.cn
repo: https://github.com/OpenBMB/PilotDeck
tier: standard
metrics:
  stars: 4997
  pushed_at: "2026-11-13T08:45:54Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [pilotdeck, PilotDeck]
risk_notes: "AGPL-3.0：修改后对外提供网络服务须开源修改版本；Node 运行时硬要求 22.13+ 且低于 23（依赖内置 node:sqlite），升级 Node 前先确认；一键安装脚本是官方 raw.githubusercontent 上的 curl | bash / irm | iex，执行前先审阅；必须配置模型供应商与 API Key（或本地 Ollama），费用与数据边界由所选供应商决定；常驻后台执行会持续消耗 token，需设预算并盯用量；性能与降本数据为上游自报基准，未独立复现；项目迭代快（2026-05 开源、2026-10 发 2.0），升级前看变更说明。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# PilotDeck 任务型 Agent 生产力平台

> 以 WorkSpace 为单位的开源 Agent 操作系统。上游：[OpenBMB/PilotDeck](https://github.com/OpenBMB/PilotDeck) · 许可证：AGPL-3.0 · 官网：[pilotdeck.openbmb.cn](https://pilotdeck.openbmb.cn)

## 这是什么

PilotDeck 是由 OpenBMB、清华 THUNLP、ModelBest 与 AI9Stars 联合开源的任务型 Agent 生产力平台，定位「Agent 操作系统」：以 **WorkSpace** 为基本单位，把每个项目的文件系统、记忆库与技能集完全隔离，避免多项目并行时的上下文污染。

三条主线能力：

- **白盒记忆**：记忆的生成、抽取、存储、检索全程可见可编辑——记错了能定位到具体条目直接改，关键决策可 pin 住；内置 Dream Mode 在空闲期整理记忆，支持一键回滚
- **智能路由**：自动判断任务难度，复杂任务走旗舰模型、简单任务下放轻量模型或子 Agent，用「强主 + 轻子」组合压低 token 成本
- **Always-on 常驻执行**：没人盯着时继续发现候选任务、跑长周期监控，最终把成果落成本地文件并留一份汇总报告

原生支持 MCP，插件体系覆盖 MCP server、自定义工具 / 技能（可经 ClawHub 拉社区技能）、生命周期钩子与自定义记忆存储；Web UI、CLI、IM 三种前端体验一致。自带 Web 界面可管理 WorkSpace、编辑记忆、可视化多 Agent 协作，也提供 Word / Excel / PPT 办公技能。上游在自建 Workbuddy Bench（260 个真实任务）上给出与 Claude Code、WorkBuddy 的对比数据，属上游自报，未经独立复现。

## 怎么部署运行

前置：Node.js **22.13+ 且 < 23**（依赖内置 `node:sqlite`；安装脚本会检查并安装该运行时）。支持 macOS / Linux 一键安装、Windows PowerShell 一键安装、源码运行与 Docker Compose。

```bash
# 方式一：一键安装（macOS / Linux；国内网络可加镜像变量）
curl -fsSL https://raw.githubusercontent.com/OpenBMB/PilotDeck/main/install.sh | bash
# 网络慢时：
# curl -fsSL https://raw.githubusercontent.com/OpenBMB/PilotDeck/main/install.sh | \
#   PILOTDECK_NODE_DIST_MIRROR=https://npmmirror.com/mirrors/node \
#   NPM_CONFIG_REGISTRY=https://registry.npmmirror.com bash

# 启动（默认 http://localhost:3001）
pilotdeck
pilotdeck status

# 方式二：Windows PowerShell（普通用户权限）
powershell -ExecutionPolicy Bypass -c "irm https://raw.githubusercontent.com/OpenBMB/PilotDeck/main/install.ps1 | iex"
pilotdeck

# 方式三：源码运行
GIT_LFS_SKIP_SMUDGE=1 git clone https://github.com/OpenBMB/PilotDeck.git
cd PilotDeck
corepack enable
corepack pnpm install --frozen-lockfile --filter pilotdeck --filter pilotdeck-ui
cd ui && npm run start        # 生产模式 http://localhost:3001；开发模式用 npm run dev

# 方式四：Docker Compose
docker compose up -d --build
```

首次打开 Web UI 会进入 onboarding，填模型供应商、API Key 与模型即可，配置会写入 `~/.pilotdeck/pilotdeck.yaml` 并自动启动 Gateway；也可手写配置文件。支持的协议包括 OpenAI、Anthropic、原生 Google Gemini、DeepSeek、Qwen、Kimi、MiniMax 等 OpenAI 兼容端点，以及免 Key 的本地 Ollama。

## 怎么用

1. 打开 `http://localhost:3001`，在 onboarding 里配好模型供应商与模型（或用 Ollama 本地模型）。
2. 每个项目建一个 WorkSpace，文件、记忆与技能各自隔离；把资料放进去，用自然语言派任务。
3. 在记忆面板查看 / 编辑 / pin 记忆条目，Dream Mode 整理后可一键回滚；需要控成本时开启智能路由。
4. 需要无人值守时启用常驻执行，让它后台推进并把成果落盘；回来查看汇总报告。
5. 扩展能力：接入 MCP server、安装或自写技能、用 `plugin.json` 注册工具 / 钩子 / 记忆存储。

源码与配置细节见仓库的 `README_SOURCE_INSTALL.md`、`README_DOCKER.md`，以及官网教程。

## 注意事项

- **AGPL-3.0**：可自由使用与修改，但修改后对外提供网络服务须按协议开源修改版本；开源核心与插件定制有边界，商用前确认插件授权。
- **Node 版本是硬约束**：仅支持 22.13+ 且低于 23，升级 Node 23+ 会导致内置 SQLite 不可用；不要用系统最新版硬顶。
- **安装脚本信任**：一键安装从 raw.githubusercontent 拉取并执行，执行前先审阅脚本；Windows 上原生依赖缺预编译包时需装 VS Build Tools（C++）与 Python，PowerShell 脚本执行策略也可能需要调整。
- **模型与数据边界**：必须自备模型供应商与 API Key；调用云端模型时内容会发往该供应商，敏感数据先做合规评估；本地 Ollama 可减少外发。
- **成本与常驻执行**：Always-on 会持续消耗 token；上线前设预算、观察用量。智能路由与基准数据来自上游自报，实际节省因任务而异。
- **数据位置**：配置与运行数据默认在 `~/.pilotdeck`，升级或迁移前先备份；Git LFS 演示媒体可选，不影响核心功能。
- **迭代速度**：2026-05 开源、2026-10 发布 2.0，接口与目录结构可能变化，升级前先看变更说明。
