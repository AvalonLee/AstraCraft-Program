---
record_type: entry-record
id: weknora
name_zh: "WeKnora 开源 LLM 知识平台"
name_en: "WeKnora — LLM Knowledge Platform"
summary_zh: "腾讯开源的企业级 LLM 知识平台：把文档转成可检索 RAG、自主推理 Agent 与自维护 Wiki；支持多源知识库、MCP Server、DSH 插件、Agent Skills、Web/API/CLI/IM 渠道与私有化部署。"
summary_en: "Tencent's open-source LLM knowledge platform for RAG, autonomous agents, and self-maintaining Wikis, with MCP, DSH plugin, CLI, API, IM, and self-hosted deployment options."
category: agent-infra
kind: framework
tags: [rag, knowledge-management, ai-agent, mcp, dsh, self-hosted, docker]
languages: [go, typescript, python]
doc_languages: [zh, en, ja, ko]
license: MIT
homepage: https://weknora.weixin.qq.com
repo: https://github.com/Tencent/WeKnora
tier: standard
metrics:
  stars: 21375
  pushed_at: "2026-09-04T09:35:26Z"
  checked_at: "2026-09-05"
  archived: false
related: []
aliases: [weknora, tencent-weknora]
risk_notes: "整体采用 MIT License，但仓库 LICENSE 中另列 Apache-2.0 等第三方组件条款，商用需按上游 LICENSE 全文与第三方许可复核；部署需 Docker，实际 RAG/Agent 效果依赖所配置 LLM、嵌入与向量库服务；生产环境建议置于内网并配置访问控制。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# WeKnora 开源 LLM 知识平台

> 把散落文档变成可检索、可推理、可持续维护的知识资产。上游：[Tencent/WeKnora](https://github.com/Tencent/WeKnora) · 许可证：MIT

## 这是什么

WeKnora 是腾讯开源、面向企业文档理解、语义检索与自主推理的 LLM 知识平台。它围绕三类核心能力组织：

- **RAG 问答**：上传 PDF / Word / Markdown / Excel / PPT / 图片 / XMinD 等格式，自动解析、分块、嵌入，并支持向量 + 关键词混合检索、父子分块、GraphRAG、跨知识库检索与批量管理。
- **ReAct Agent**：自主编排检索、MCP 工具、租户技能目录与 Web 搜索，处理多步任务；技能在 Docker / E2B / Kube 沙箱中运行，并支持跨会话长期记忆。
- **Wiki 模式**：把原始文档提炼成互相链接的 Markdown 知识库，附带知识图谱、手动编辑、版本历史和一键回滚，让知识库能持续生长。

平台还提供多工作空间 RBAC、多源同步（飞书 / GitLab / Tencent IM / Notion / Yuque / RSS 等）、Web / REST API / CLI / IM / 浏览器扩展 / 网站嵌入等入口，并内置 MCP Server 与 DSH 插件。

## 怎么安装

标准 Docker Compose 部署：

```bash
git clone https://github.com/Tencent/WeKnora.git
cd WeKnora
cp .env.example .env   # 按需修改模型、存储与端口配置
docker compose pull
docker compose up -d
```

启动后访问 Web UI：

```text
http://localhost
```

也可在 `docker compose` 中启用 `full`、`neo4j`、`minio`、`langfuse` 等 profile 扩展完整功能。

## 怎么用

部署后在 Web UI 里创建知识库、上传文档或配置数据源，选择 LLM / 嵌入模型即可开始问答。要接 Agent 或 CLI 时：

- **DSH 插件**：`dsh plugin --profile web add @wxg-prc-cpg/dsh-weknora`，让编码 Agent 获得知识库搜索、读取与问答工具。
- **Claude Skill**：从 Claphub 安装 WeKnora Skill，用 Agent 完成文档导入、混合检索与知识条目管理。
- **CLI / MCP**：`weknora` CLI 支持 `profile add`、`auth login`、`kb list`、`doc upload`、`chat` 等命令，也可用 `weknora mcp serve` 暴露 MCP 工具。

典型流程：配置模型与存储 → 创建知识库 → 导入文档或同步外部源 → 配置检索策略 → 通过 Web / API / CLI / IM / Agent 调用。

## 注意事项

- **许可证**：主体 MIT 可商用，但上游 LICENSE 明确列出 Apache-2.0 等第三方组件条款；商用前请按 LICENSE 全文和实际依赖复核。
- **部署依赖**：需要 Docker 与 Docker Compose；实际效果取决于所配置 LLM、嵌入、向量库与对象存储，云服务和模型调用费用自担。
- **安全建议**：上游建议生产部署放在内网或私有网络，避免直接暴露公网，并配置防火墙、访问控制与定期升级。
- **中文生态适配好**：官方提供中 / 英 / 日 / 韩文档，支持飞书、腾讯 IM、微信等渠道，适合中文企业知识库场景。
