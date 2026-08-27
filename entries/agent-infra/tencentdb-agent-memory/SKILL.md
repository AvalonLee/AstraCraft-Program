---
record_type: entry-record
id: tencentdb-agent-memory
name_zh: TencentDB Agent Memory
name_en: TencentDB Agent Memory
summary_zh: 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。
summary_en: "Team memory hub for AI agents: turns conversations, docs and code into reusable assets (Chat Memory, Skill, LLM-Wiki, CodeGraph), shared across agents and frameworks."
category: agent-infra
kind: framework
tags: [memory, long-term-memory, llm-wiki, code-graph, claude-code, openclaw, vector-search, tencent]
languages: [typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/TencentCloud/TencentDB-Agent-Memory
repo: https://github.com/TencentCloud/TencentDB-Agent-Memory
tier: standard
metrics:
  stars: 21060
  pushed_at: "2026-08-11T12:12:06Z"
  checked_at: "2026-08-13"
  archived: false
related: []
aliases: [TencentDB Agent Memory, tencent-agent-memory]
risk_notes: 默认分支为迭代中的 feat/server_team；README 安装段 clone URL 有笔误（Tencent 应为 TencentCloud）；需 Docker 三件套 + LLM 配置，非即插即用。
added_at: "2026-08-13"
updated_at: "2026-08-13"
---

# TencentDB Agent Memory

> 腾讯云出品的 **Agent 团队级记忆中心（Memory Hub）**：让经验在 Agent 之间沉淀、流动、继承。
> 上游：[TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) · 许可证：MIT

## 这是什么

面向 **Agent 团队**的长期记忆基础设施。把"对话、文档、代码"沉淀为四类可复用记忆资产：
**Chat Memory**（L0 对话 → L1 原子 → L2 场景 → L3 人格逐层沉淀）、**Skill**（带版本/资源/
触发边界的可复用技能）、**LLM-Wiki**（文档知识）、**CodeGraph**（代码图谱）。部署形态为
`memory-core + memory-hub + memory-proxy` 三件套 + SDK，接入 OpenClaw / Hermes / Claude Code /
CodeBuddy 等。当前版本 v2.0.0。

## 怎么安装

```bash
# 1) 克隆上游（默认分支 feat/server_team，直接 clone 即得该版本）
git clone https://github.com/TencentCloud/TencentDB-Agent-Memory.git /tmp/tdb
cd /tmp/tdb/deploy/global-images

# 2) 配置并一键启动（需两组 LLM 参数：memory 组 + proxy 组）
cp .env.example .env
# 用编辑器填入 .env 中的两组 LLM 参数
./start-all.sh

# 3) 打开控制台
#    http://localhost:8125
```

环境要求：Node ≥ 22.16，以 Docker 部署为主。完整安装（Memory Hub 单独部署 / Claude Code /
CodeBuddy / 停止清理 / 端口说明）见上游 `INSTALL_CN.md`。

## 怎么用

- **接入**：按上游文档配置 OpenClaw / Hermes / Claude Code / CodeBuddy 或 SDK 接入；
- **独立记忆**：每个 Agent 创建时自动获得独立记忆，不用每次自我介绍；
- **Skill 流转**：个人 Skill 默认私有 → 审核分享给团队 → 配装给其他 Agent；
- **冷启动**：导入已有文档、代码库与对话 Session，团队从现有经验开始。

## 注意事项

- 默认分支是**迭代中的 `feat/server_team`**，非主干命名；需要稳定版请核对上游 release/tag；
- README 安装段把仓库写成 `Tencent/TencentDB-Agent-Memory`（无 Cloud），实际是
  `TencentCloud/TencentDB-Agent-Memory`，clone 时注意；
- Wiki / CodeGraph 异步构建，接入后需等待 ready；
- CodeGraph 当前优先支持公开 HTTPS 仓库，私有仓库与 SSH 接入仍在完善；
- MIT 许可；Benchmark：PersonaMem 48% → 76%（+59%）。
