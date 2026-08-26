# DSH 插件（DeepSeek Harness）

本分类用于收录 **DeepSeek Harness（简称 DSH）** 的社区插件。归类规则：每个条目仍是单个 `SKILL.md`（介绍 + 安装指令），其 frontmatter 的 `category` 字段填 `dsh`。

## 什么是 DeepSeek Harness（DSH）？

DeepSeek Harness 是 DeepSeek AI 于 2026 年 8 月推出的开源 AI Agent 运行时框架，当前处于 **Developer Preview**（迭代快，插件可能出现兼容性 breaking change）。官方给出的核心公式：

> Agent = Model + Harness

- **Model（大脑）**：负责思考与决策，内置 DeepSeek V4-Pro / V4-Flash 原生适配，并通过 OpenAI 兼容协议支持第三方模型。
- **Harness（身体/执行底座）**：负责连接真实环境、调度工具、管理会话与驱动任务循环，让大模型从纯对话机器人升级为可自主完成复杂任务的执行体，对标 Claude Code 与 Codex。

### 核心架构理念：一切皆插件（Everything is a Plugin）

DSH 基于 Cordis 插件内核构建，从模型适配器、工具注册表、会话日志到 Agent Loop，所有能力都以插件形式存在，**不存在不可替换的特权核心**。开发者仅通过配置即可选择、替换或扩展任意能力，无需修改框架底层源码。每次运行全可追溯——模型请求、工具调用、执行结果与中间状态都会完整写入会话日志，支持轨迹查看、断点续做、任务分叉、历史搜索与过程回放。

### 插件安装

```bash
npx @deepseek-ai/dsh web                  # 启动 DSH，Web UI 默认开在 http://127.0.0.1:3080
dsh plugin --profile web add <plugin>     # 安装社区插件（建议锁定版本号，勿用 @latest）
dsh plugin --profile web remove <plugin>  # 卸载插件（插件导致无法启动时可用此命令恢复）
```

社区插件中心：[dsh-plugin.org](https://dsh-plugin.org/)（收录 5000+ DSH 插件，按 11 个子类归类，人工核验、可溯源）。

## DSH 插件的 11 个子类

| 子类 | 作用 |
|---|---|
| UI & Experience（interface） | 定制 Web UI 外观与交互：主题、皮肤、侧边栏、面板 |
| Sessions & Messages（session） | 优化对话与消息体验：提示词、输入、会话管理 |
| Memory & Context（memory） | 管理上下文与长期记忆：压缩、召回、持久化 |
| Tools & Capabilities（tools） | 扩展工具能力：网页检索、文件处理、命令执行 |
| Skills & Agents（agent） | 技能包与子智能体：Skill 目录、Agent 编排 |
| Workflow & Automation（workflow） | 工作流与自动化：任务编排、审批策略 |
| Integrations & Connections（integration） | 连接外部系统：MCP、通知推送、协议桥接 |
| Models & Reasoning（model） | 接入模型与推理：第三方模型、路由、成本 |
| Development & Operations（dev） | 开发与运维：调试、测试、诊断、安全 |
| Data & Knowledge（knowledge） | 数据与知识：可视化、研究、知识库 |
| Entertainment（fun） | 娱乐与趣味：游戏、宠物、整活 |

## 收录约定

- 本分类下的每个条目仍是单个 `SKILL.md`，`category: dsh`，遵循全仓库统一规范（frontmatter + 「是什么 / 怎么安装 / 怎么用 / 注意事项」四段式）。
- 收录重点是社区中**有代表性、可稳定安装**的 DSH 插件；建议附 `metrics`（stars / pushed_at）并标注兼容性状态，因为 DSH 处于快速迭代期，插件可能随版本出现 breaking change。
- 安装指令一律使用 `dsh plugin --profile <profile> add <plugin>` 形式（必要时锁定版本号），并给出插件仓库 / 主页链接。

> 参考：DeepSeek Harness 官方仓库 `deepseek-ai/deepseek-harness`、社区插件中心 `dsh-plugin.org`。本项目与 DeepSeek AI 无隶属关系，仅作导航与说明，不收录上游源码。
