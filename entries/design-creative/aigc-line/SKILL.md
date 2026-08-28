---
record_type: entry-record
id: aigc-line
name_zh: "AIGC CANVAS 短剧生产工作台"
name_en: "AIGC Canvas — AI Short-Drama Production Workbench"
summary_zh: "面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台：从剧本解析、角色一致性底图、场景图与分镜到多模态视频生成与分析，Agent 通过内置 Skill 与 MCP 画布工具持续操作同一张无限画布。"
summary_en: "A harness-engineering desktop workbench for the AI short-drama loop: scripts, consistent characters, storyboards, multimodal video generation and analysis on one canvas."
category: design-creative
kind: framework
tags: [short-drama, video-production, image-generation, ai-agent, storyboard, seedance]
languages: [typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/zhangtuo723/aigc_line
repo: https://github.com/zhangtuo723/aigc_line
tier: standard
aliases: [AIGC Canvas, AIGC CANVAS]
risk_notes: Electron 桌面应用；连接本地 ComfyUI 与云端 AI 服务（Google、火山方舟、Qwen 等），部分密钥使用系统安全存储、方舟 Key 明文保存在本机设置，AI 生成会消耗配额或产生费用。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# AIGC CANVAS 短剧生产工作台

> 面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台。上游：[zhangtuo723/aigc_line](https://github.com/zhangtuo723/aigc_line) · 许可证：MIT

## 这是什么

AIGC CANVAS 输入剧本后，Agent 会为每个角色先生成唯一四联身份底图，再通过图生图派生不同场景/服装版本，同时生成无人俯视全景场景图，组织多模态参考并调用 ComfyUI 生成视频；需要时可分析实际视频。它基于 Electron 分层架构，React 渲染进程承载 Agent 对话、无限画布、自由画板与 3D 导演台，主进程连接本地 ComfyUI 与云端 AI 服务。

核心能力：剧本到 AI 短剧闭环、角色与场景一致性资产、Agent 项目助手、内置 Agent Skill 与 Skill 斜杠菜单、旁白配视频工作流、视频放大、3D 导演台、节点化生产流水线，以及多模型生成（ComfyUI、MiniMax H3、Seedance 2.0 等）。

## 怎么安装

```bash
git clone https://github.com/zhangtuo723/aigc_line.git
cd aigc_line
npm install
```

这是一个 Electron + Vite 桌面应用，具体启动/构建脚本以上游 `package.json` 的 scripts 为准（`README.en.md` 亦提供英文说明）。

## 怎么用

1. 在系统配置中连接 ComfyUI 与所需的 AI 云服务（Google AI、火山方舟 Seedream/Seedance、Qwen 等）
2. 输入剧本或创意，由 Agent 生成角色身份底图、场景图与分镜
3. 在无限画布上组织镜头、参考图片、生成视频与放大结果，右侧对话可直接读写画布节点
4. 通过内置 Skill（输入 `/` 搜索）与 MCP 画布工具实现端到端生产并沉淀项目资产

## 注意事项

- **桌面应用**：基于 Electron，依赖本地 ComfyUI 与云端服务；系统级工具涉及本机 AI 服务配置。
- **凭据与费用**：Google/Qwen 密钥使用系统安全存储，方舟 Key 明文保存在本机设置；AI 生成消耗配额并可能产生费用。
- **依赖服务**：ComfyUI、火山方舟、Google AI、Qwen 等外部服务下线或限流会影响可用性。
- **3D 导演台模型**：UE 白模来自第三方并采用独立的 Sketchfab Standard License，分发时需保留原始许可文件。