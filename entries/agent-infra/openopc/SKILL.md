---
record_type: entry-record
id: openopc
name_zh: "OpenOPC 个人 AI 原生公司"
name_en: "OpenOPC"
summary_zh: "港大 HKUDS 出品的个人 AI 原生公司运行时：给定目标自动建组织（Self-Built）、状态机驱动多角色协作交付（Self-Run）、按角色归因学习沉淀组织记忆（Self-Grown）；支持 Codex / Claude Code / Cursor 等作为执行引擎，附像素风办公室 UI 与 10+ 消息渠道。"
summary_en: "AI-native company runtime from HKU HKUDS: auto-staffing, multi-role collaboration with work-item DAGs, role-attributed learning, Codex and Claude Code as engines."
category: agent-infra
kind: framework
tags: [ai-agent, multi-agent, framework, memory, self-hosted, codex, claude-code, digital-employee]
languages: [python, typescript]
doc_languages: [en, zh]
license: MIT
homepage: https://github.com/HKUDS/OpenOPC
repo: https://github.com/HKUDS/OpenOPC
tier: standard
metrics:
  stars: 1614
  pushed_at: "2026-09-04T12:03:08Z"
  checked_at: "2026-09-05"
  archived: false
related: [codex, claude-code, mcp, multi-agent]
aliases: [OpenOPC, opc, AI-Native Company]
risk_notes: "LLM API 调用费用自担（LiteLLM/OpenRouter 兼容配置）；外部 agent（Codex / Claude Code / Cursor 等）的审批与沙箱设置独立于 OpenOPC 的三级权限体系，需分别配置；full-access 仅关闭 Native 工具审批但组织审校与 WorkItem 门禁仍生效；工作区信任绑定配置指纹，修改 YAML 后需重新 opc trust add；JiuwenSwarm-team 作为黑盒团队运行，内部代理不可由 OpenOPC 管理。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# OpenOPC 个人 AI 原生公司

> Build Your Personal AI-Native Company — Self-Built, Self-Run, Self-Grown。上游：[HKUDS/OpenOPC](https://github.com/HKUDS/OpenOPC) · 许可证：MIT · 港大数据智能实验室（HKUDS）出品

## 这是什么

OpenOPC 不是单 agent 编排器，而是一个完整的**组织运行时**：把你的 AI 助手变成一家可组建、可运行、可成长的"公司"。给定目标后它自动画组织架构图、招聘角色员工、按 work-item 状态机分解任务（DAG 依赖 + 并行执行）、跟踪审批与交接，最后按角色归因反馈并沉淀组织记忆——下次同类任务开箱即用，越用越聪明。

**三大机制**：

- **Self-Built（自建组织）**：目标 → 自动推导角色与汇报线 → recruiter agent 决定复用有经验的员工还是从人才库招新人
- **Self-Run（自运行）**：经理分解任务为 DAG，五种模式（执行 / 委派 / 审校 / 整合 / 返工）驱动协作；团队内阻塞消息自动唤醒最合适的角色，超出权限时升级给人类
- **Self-Grown（自成长）**：用户反馈解析为按员工的评估（功劳归给真正做对的角色），执行轨迹蒸馏为高信号经验存入角色私有 profile，重复经验升华为共享 playbooks 供新员工继承

**两种执行模式**：

| 模式 | 说明 |
|------|------|
| **Task Mode** | 类 LobeChat 单 agent 工作区：一个 chat 一个任务，可选 OpenOPC Native / Codex / Claude Code / Cursor / OpenCode / JiuwenSwarm 作为执行引擎 |
| **Company Mode** | 多角色公司运行时：brief → 运行时会话 + 角色持有的 work items，Chat / Agents / Comms / Team 四个面板实时跟踪 |

**九大垂直领域**：AI 技术与研究、软件开发、金融投资、销售增长、内容与媒体、行业助手、会计财务、品牌电商、教育培训——OpenOPC 会为目标组装对应团队并端到端交付。

**Office UI**：React + Phaser 像素风办公室可视化——每个角色是办公室里的角色人物，可查看状态、当前工具、任务与座位；Workspace 看板、Execution Progress、Org 编辑器、人才市场四页联动。

**生态共享**：组织架构、员工、人才模板、技能全部是文件——`opc talent import` 导入人才库、`opc org export` 导出 YAML、`opc market install` 安装 `.opcpkg` 社区包。

## 怎么安装

前置条件：Python >= 3.10（推荐 uv 管理）；Office UI 前端构建需 Node.js >= 18；浏览器工具需 Playwright Chromium。

```bash
# 1. uv 环境（macOS / Linux）
cd /path/to/OpenOPC
uv python install 3.12
uv venv --python 3.12
source .venv/bin/activate

# 2. 安装 OpenOPC
uv pip install -e .

# 3. 可选：浏览器工具
uv run python -m playwright install chromium

# 4. 初始化本地配置、记忆、技能、项目与工作区
uv run opc init

# 5. 编辑 .opc/config/llm_config.yaml 填入 API Key

# 6. 启动 Office UI（默认 http://localhost:8765）
uv run opc ui
```

Windows PowerShell 等其他环境与开发构建见上游 [README](https://github.com/HKUDS/OpenOPC#quick-start)。

## 怎么用

### CLI

```bash
# 交互式聊天（Task Mode）
uv run opc chat -p demo

# Company Mode（内置 Corporate 架构）
uv run opc chat -p demo --mode company --company-profile corporate "Plan, implement, review, and document this feature"

# 脚本化执行 / CI
uv run opc exec -p demo --mode task --agent native --json "Summarize the current repo status"

# 常用运维命令
opc project list        # 项目管理
opc session send ...    # 会话继续 / 停止
opc runtime status      # 运行时检查
opc talent import ...   # 导入人才库
opc permissions set auto # 三级权限：read-only / auto / full-access
```

### 消息渠道

```bash
# 飞书（可选：Telegram / Slack / Discord / 钉钉 / Email / Matrix / QQ 等）
pip install -e ".[channels-feishu]"
opc init
opc channels login feishu
opc channels start -p demo
```

渠道凭据在 `.opc/config/channel_config.yaml`，入站发件人默认拒绝（`allow_from` 白名单显式开启）。

### 可扩展执行引擎

Task Mode 和 Company Mode 都支持把 Codex、Claude Code、Cursor、OpenCode、JiuwenSwarm 设为具体执行引擎（`opc chat --agent codex` 或 Org 页面按角色配置）。JiuwenSwarm-team 可将整个子树打包为一个不透明 Team 交给自组织集群处理。

## 注意事项

- **许可证 MIT**：可自由使用、修改与分发。
- **LLM 费用**：所有模型调用按 API 计费，LiteLLM/OpenRouter 兼容配置（`.opc/config/llm_config.yaml`）；组织模式的多角色并行会消耗更多 token。
- **权限体系**：OpenOPC Native 有 `read-only / auto / full-access` 三级权限 + 沙箱；但 **外部 agent（Codex、Claude Code 等）的审批与沙箱独立于这套体系**，需在各自 harness 里单独配置。
- **工作区信任**：`opc init` 自动信任自己创建的工作区；打开已有项目需 `opc trust add` 授权，修改安全相关 YAML 后需续期。
- **渠道入站默认拒绝**：`allow_from` 为空列表时拒绝所有消息，需显式添加发件人 ID。
- **维护活跃**（2026-09 更新），提供中英文 README，HKUDS 实验室出品（LightRAG / AI-Researcher 同源团队）。
