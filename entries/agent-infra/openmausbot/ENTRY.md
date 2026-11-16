---
record_type: entry-record
id: openmausbot
name_zh: "OpenMausBot 多 Bot 桌面 Agent 工作台"
name_en: "OpenMausBot"
summary_zh: "开源版 Grok Bot：像聊天软件一样管理一队 AI Agent，每个 Bot 有自己的模型、人格、记忆与一台虚拟机；底层跑你本机已登录的 Claude / Codex / Grok CLI，数据留在 ~/.openmausbot，敏感操作先弹审批卡，可通过 Composio 接 500+ 应用。"
summary_en: "Open-source Grok Bot alternative: a chat app where each bot is a real local Claude/Codex/Grok agent with its own model, memory, VM and connected apps, plus approval cards."
category: agent-infra
mode: deploy
tags: [ai-agent, multi-agent, self-hosted, mcp, claude-code, codex, computer-use]
languages: [typescript, javascript]
doc_languages: [en]
license: Apache-2.0
homepage: https://www.mausbot.com/
repo: https://github.com/milind-soni/OpenMausBot
tier: standard
metrics:
  stars: 23430
  pushed_at: "2026-11-16T01:22:28Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [openmausbot, OpenMausBot, MausBot, OpenGrokBot]
risk_notes: "早期版本（2026-08 创建，v0.1.x）：Ubuntu 版为 beta、Wayland 下禁用本机控制，Windows 安装包未签名（SmartScreen 提示未知发布者）；不自带模型，必须已装并登录 claude / codex / grok CLI 或用自带 Key；云电脑（Boat）试用后付费，Composio 与托管语音各有账号与条款，模型用量按你的订阅 / Key 计费；Bot 可控制本机（需显式开启），务必保留审批卡、不给不可信 Bot 开主机权限；打包桌面版用系统钥匙串加密供应商与服务密钥，但 CLI / 服务器模式的 config.json 以明文保存部分密钥（0600），引擎 Key 与 MCP header 也可能落在 config.json；许可证 Apache-2.0，但 enterprise/ 目录为另行授权的 source-available；与 xAI / Meta / OpenAI / Manus 无关联，也无任何代币。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# OpenMausBot 多 Bot 桌面 Agent 工作台

> 像聊天软件一样指挥一队 AI Agent。上游：[milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) · 许可证：Apache-2.0（`enterprise/` 除外） · 官网：[mausbot.com](https://www.mausbot.com/)

## 这是什么

OpenMausBot（又称 MausBot，原名 OpenGrokBot）是一个独立开源的 Grok Bot 替代品，也自称是 Meta Muse、OpenAI dots、Manus Cue 的开源对照物（与这些厂商均无关联）。它把 AI Agent 做成即时通讯软件里的「联系人」：侧边栏每个 Bot 都是一个真实的 Agent——底层跑你本机已登录的 `claude`、`codex` 或 `grok` CLI——各自拥有独立的人格、模型、线程记忆、一台电脑和一组已连接应用。

- **本地优先**：一个本地 harness 服务（`127.0.0.1:8799`）托管所有 Agent 进程，对话记录、密钥与事件存 `~/.openmausbot`，不经过中间云
- **每个 Bot 一台电脑**：云端 Linux 桌面（Boat，试用后付费）、隔离的本地虚拟机，或在明确开启后直接控制你的电脑（macOS / Windows / Ubuntu Xorg 支持，Wayland 下关闭）
- **动作先审批**：shell 命令、文件修改与提问以卡片形式出现，Allow / Deny 由你决定
- **连接应用**：基于 Composio Sessions 的一键市场，Gmail、Slack、GitHub、Notion、Linear 等 500+ 应用 OAuth 一次，所有 Bot 都能用
- **更像团队**：频道（Channel）隔离各自的记录、指令、工作目录与 Bot 名单，可设置 Chief of Staff；支持从 Markdown 团队包一键导入整队，也能把部门整体导出分享
- **可编排**：定时 / Webhook 触发器、语音播报与通话、给外部客户端用的 stdio MCP server（有界控制面，不暴露审批、凭据与电脑生命周期），以及无界面的 `openmausbot` CLI

桌面端覆盖 macOS（签名公证）、Windows x64（一键安装、未签名）与 Ubuntu 24.04 x64（beta），另有 Web / 手机接入与 VPS 自托管模式。当前版本 v0.1.161（2026-11-15），上游自称「早期但闭环可用」。

## 怎么部署运行

最省事的是安装包；开发或服务器场景用源码 / CLI。前置条件：macOS / Windows / Ubuntu 24.04 x64、Node.js 24+、pnpm，以及至少一个已安装并登录的 Agent CLI（`claude` / `codex` / `grok`）。桌面安装包内置 harness 服务，无需单独起服务。

```bash
# 方式一：下载桌面安装包（macOS Apple silicon / Intel .dmg，Windows x64 .exe，Ubuntu .deb / AppImage）
# https://github.com/milind-soni/OpenMausBot/releases/latest

# 方式二：源码运行（开发）
git clone https://github.com/milind-soni/OpenMausBot && cd OpenMausBot
pnpm install
pnpm dev:server     # harness → 127.0.0.1:8799
pnpm dev            # 应用 → http://127.0.0.1:5199
pnpm dev:desktop    # Electron 壳（保持上面两个进程运行）

# 方式三：CLI / 服务器
npm install -g openmausbot
openmausbot          # 首次引导选模型、登录取 Key，打开本地界面
npx openmausbot serve --public-url https://your.domain   # 也可 --tailscale / --lan / --tunnel
```

首次启动按引导选择 AI 访问方式（登录或粘贴 API Key）与模型；Composio、Boat 云电脑、ElevenLabs / Fish Audio 语音都是可选凭据，不配也能本地聊天。

## 怎么用

1. **建 Bot**：新建一个 Bot，选模型、写人格与指令，必要时分配电脑（云 / 本地 VM / 本机）与已连接应用。
2. **像聊天一样派活**：在对话里提需求，看它流式执行；遇到 shell、改文件或提问时在审批卡上 Allow / Deny / 回答。
3. **按场景分频道**：每个项目一个 Channel，独立记录、工作目录与 Bot 名单；需要时设 Chief of Staff 做调度。
4. **接应用与自动化**：在设置里配 Composio Key 接 Gmail / Slack / GitHub 等；用触发器做定时任务或 Webhook；需要外部编排时接它的 MCP server 或用 `openmausbot` CLI 跑无界面任务。
5. **分享团队**：把部门导出为一个 Markdown 团队包（不含对话、凭据与电脑权限），别人导入后技能默认关闭、例程暂停，审阅后再启用。

## 注意事项

- **早期版本**：v0.1.x、2026-08 创建，迭代很快；Ubuntu 为 beta，Wayland 下本机控制被安全门禁用，Windows 安装包未签名，SmartScreen 会提示「未知发布者」。
- **依赖既有 Agent 订阅**：Bot 跑的是本机 `claude` / `codex` / `grok` CLI，需要已有账号或 Key；模型用量按你的订阅 / Key 计费，项目本身不提供模型额度。
- **会产生第三方费用**：Boat 云电脑试用后付费，Composio 与托管语音（ElevenLabs / Fish Audio）各有账号与条款；不接云电脑也能本地使用。
- **主机控制风险**：Bot 能操作本机时风险等同把键盘交给 Agent，只在可信 Bot 上开启，保留审批卡，别对不可信模型开放主机权限。
- **密钥存储差异**：打包桌面版用操作系统钥匙串加密供应商与服务密钥；CLI / 服务器模式的 `config.json` 以明文保存部分密钥（Unix `0600`），引擎 Key 与 MCP header 也可能明文落在其中，服务器部署要限制文件权限与访问。
- **许可证边界**：整体 Apache-2.0，但 `enterprise/` 为单独的 source-available 授权；Cua Driver 等第三方组件保留各自 MIT / OFL / MPL 等许可。
- **无官方关联**：项目与 xAI、Meta、OpenAI、Manus 无关，也没有任何代币；遇到同名币种与本项目无关。
