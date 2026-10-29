---
record_type: entry-record
id: open-code-review
name_zh: "OpenCodeReview AI 代码审查 CLI"
name_en: "OpenCodeReview"
summary_zh: "阿里巴巴开源的 AI 代码审查 CLI（内部验证两年后开源）：确定性流水线负责文件选取、打包与规则匹配等硬约束，LLM Agent 负责动态决策与上下文检索，产出行级精准评论；内置 NPE、线程安全、XSS、SQL 注入等多语言规则集，兼容 OpenAI / Anthropic 接口。"
summary_en: "Alibaba's AI code review CLI: deterministic pipelines handle file selection, bundling and rule matching while an LLM agent does dynamic retrieval, producing precise line-level comments."
category: dev-engineering
mode: connect
tags: [code-review, ai-agent, cli, claude-code]
languages: [go]
doc_languages: [en, zh]
license: Apache-2.0
homepage: https://open-codereview.ai
repo: https://github.com/alibaba/open-code-review
docs_url: https://open-codereview.ai/docs
tier: standard
metrics:
  stars: 48873
  pushed_at: "2026-10-29T04:18:23Z"
  checked_at: "2026-10-29"
  archived: false
related: [ai-agent, cli]
aliases: ["OpenCodeReview", "Open Code Review", "open-code-review", "ocr"]
risk_notes: "评审召回率低于通用 Agent（官方有意以精度换低噪音），不宜作为唯一质量防线；diff 与相关文件内容会发送到所配置的 LLM 服务商（delegation 模式则交给宿主编码 Agent 执行），涉密仓库先做合规评估；token 与精度对比数据来自官方 AACR-Bench 自测基准。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# OpenCodeReview AI 代码审查 CLI

> 确定性工程 × LLM Agent 混合架构的代码审查 CLI，阿里内部验证两年后开源。上游：[alibaba/open-code-review](https://github.com/alibaba/open-code-review) · 许可证：Apache-2.0

## 这是什么

阿里巴巴出品的 AI 代码审查 CLI（Go 编写，npm 分发，官方称内部已服务数万开发者、累计发现数百万缺陷）。读 Git diff 后交给可配置 LLM 的工具型 Agent，产出**行级精准**的结构化评审意见；Agent 能读完整文件、搜索代码库、查看其他改动文件，做的是有上下文的深评审而非表面 diff 点评。`ocr scan` 还能整文件扫描，适合审计陌生代码库。

核心设计是混合架构：**不该出错的环节用确定性工程兜底**——精确文件选取（大变更集不漏文件）、相关文件智能打包分包评审、模板引擎做细粒度规则匹配（内置 NPE、线程安全、XSS、SQL 注入等多语言规则集）、独立的评论定位与反思模块；**Agent 只做动态决策**——场景调优的提示词与工具集，支持经 MCP 扩展外部工具。官方 AACR-Bench 基准（50 仓库 / 200 真实 PR / 10 语言 / 1505 个标注缺陷）显示：同模型下精度与 F1 显著高于通用 Agent、token 约为其 1/9，代价是召回率更低（有意以精度换噪音）。

## 怎么接入

前提：Git ≥ 2.41。全局安装 CLI，再配置模型端点：

```bash
npm install -g @alibaba-group/open-code-review   # 装完全局可用 ocr 命令

# 配置 LLM（交互式选 provider、填 API key、选模型，自动测连通性）
ocr config provider
ocr config model
```

内置 OpenAI / Anthropic 兼容 provider，也支持自定义端点与环境变量配置；另有安装脚本、GitHub Release 二进制、源码编译等方式（见[官方安装文档](https://open-codereview.ai/docs/installation)）。不想配 LLM 可用 **delegation 模式**：OCR 只负责文件选取与规则解析，评审交给宿主编码 Agent 执行（`ocr delegate preview` 预览）。支持 Claude Code、Codex、Cursor、Kimi Code 等集成。

## 怎么用

在项目根目录按场景选择评审方式：

```bash
ocr review                                  # 工作区模式：暂存 + 未暂存 + 未跟踪的改动
ocr review --from main --to feature-branch  # 分支区间（merge-base，适合 PR 前自审）
ocr review --commit abc123                  # 单个提交
ocr scan --path internal/agent              # 全文件扫描（无需 git 历史）
ocr review --format json --output result.json  # 结果落盘 JSON，推荐给宿主 Agent 消费
```

大范围评审中断后可用 `ocr session list` 查会话、`--resume <session-id>` 续跑。评审规则支持按路径过滤与定向配置（见官方 Review Rules 文档）。

## 注意事项

- **精度换召回**：官方基准明确召回率低于通用 Agent——它更少误报，但也会有漏报，重要变更别拿它当唯一质量防线。
- **代码外发**：diff 与相关文件内容会发送到所配置的 LLM 服务商；delegation 模式则由宿主编码 Agent 执行评审。涉密 / 合规敏感仓库接入前先评估数据流向。
- **基准是官方自测**：精度 / token 对比来自官方 AACR-Bench（数据集在 HuggingFace 开放），换模型、换场景会有差异。
- Apache-2.0，可商用；上游为阿里巴巴官方维护，2026-05 开源、更新活跃。
