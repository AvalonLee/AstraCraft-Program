---
record_type: entry-record
id: bisheng
name_zh: "BISHENG 企业级 Agent 平台"
name_en: "BISHENG"
summary_zh: "开源的企业级一站式 Agent 平台：任务模式的多步 Agent 与子 Agent 并行、可成环并行的工作流编排、权限细到单文件的知识空间、评测与 SFT、OCR 文档解析，Docker Compose 私有化部署。"
summary_en: "A self-hosted enterprise LLM platform: multi-step agents with parallel sub-agents, workflow orchestration, permissioned knowledge spaces, evaluation, SFT and OCR document parsing."
category: agent-infra
mode: deploy
tags: [ai-agent, multi-agent, rag, workflow, self-hosted, docker]
languages: [python]
doc_languages: [zh, en, ja]
license: Apache-2.0
homepage: https://www.bisheng.ai
repo: https://github.com/dataelement/bisheng
tier: standard
metrics:
  stars: 12131
  pushed_at: "2026-11-06T11:43:59Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["BiSheng", "BISHENG", "bisheng"]
related: [deepseek-ai-deepseek-harness, staffdeck]
risk_notes: "部署资源门槛高（官方要求 CPU ≥ 8 核、RAM ≥ 32 GB，默认附带 ES / Milvus / Onlyoffice 等第三方组件）；首个注册用户自动成为系统 admin，公网暴露前必须先注册占位并改密；统计看板、SSO/LDAP、高可用部署等属商业版能力，README 明列开源版不含；官方部署与使用文档托管在飞书 wiki，部分页面需登录；高精度文档解析模型虽可免费私有化，但模型文件本身不在本仓库、需另行获取。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# BISHENG 企业级 Agent 平台

> 把企业 AI 落地要的那些事——编排、知识、权限、评测、微调——收进一个可私有化部署的平台。上游：[dataelement/bisheng](https://github.com/dataelement/bisheng) · 许可证：Apache-2.0

## 这是什么

一个开源的**企业级一站式 Agent 平台**（★12.1k、fork 1.99k，2023 年起持续维护，作者为数据元素）：给目标即可跑的**任务模式**通用 Agent，主 Agent 动态拆任务清单、子 Agent 并行做调研，遇到只有你知道的关键信息会停下等人（Human in the loop），交付报告 / PPT / Excel / Word 且结论带可点开原文的引用角标；内置 PPT、Excel、Word 三个技能包，也能从本地或 GitHub 导入团队自己的技能。工作流编排不区分 chatflow 与 workflow，支持**画圈成环、并行、批量**与流程中途等人确认。知识空间按多级文件夹与标签组织，权限细到单个文件（RBAC 管功能菜单、ReBAC 管空间/文件夹/文件），检索时会再校验权限；另有频道订阅（公众号与网站自动聚合）、统一模型管理、评测、数据集与 SFT 微调，以及基于五年数据沉淀的高精度文档解析（印刷体 / 手写体 / 生僻字 / 表格 / 版式 / 印章，可免费私有化）。企业侧提供部门与配额、操作审批、审计、API Key 权限边界、信创适配（MySQL 与达梦 DM8）。桌面客户端基于 DeepSeek Harness（DSH）开发，与平台协同，另有开源的 [bisheng-desktop](https://github.com/dataelement/bisheng-desktop) 可改造。

## 怎么部署运行

前置（官方要求）：CPU ≥ 8 核、RAM ≥ 32 GB、Docker 19.03.9+、Docker Compose 1.25.1+。拉代码后用 Docker Compose 起：

```bash
git clone https://github.com/dataelement/bisheng.git
cd bisheng/docker
docker compose -f docker-compose.yml -p bisheng up -d
```

启动后浏览器访问 `http://IP:3001` 出现登录页并注册——**第一个注册的用户会成为系统 admin**，公网部署请先完成这一步再对外开放。除前后端外，默认还会一并装 Elasticsearch、Milvus 与 Onlyoffice。没有 git 时可下 zip：`wget https://github.com/dataelement/bisheng/archive/refs/heads/main.zip && unzip main.zip && cd bisheng-main/docker`。

## 怎么用

进平台后按场景挑入口：只要一个结果就用**任务模式**（附上文件、知识库、工具与技能，等它交付报告）；要把固定流程沉淀下来用**工作流**编排（成环做审核类循环、并行做批量、多选做批处理）；团队资料放**知识空间**并按部门授权，问答自动带溯源。模型、技能、插件与 MCP 工具由管理员在后台统一配置，员工按授权取用。平台也提供 API 与服务账号密钥签发，可配有效期、接口权限与可访问的应用/知识库范围。

## 注意事项

- **资源与运维门槛**：32 GB 内存起步并附带 ES / Milvus / Onlyoffice，是「一套系统」而不是「一个容器」；生产环境要评估存储、备份与升级成本。
- **开源版与商业版边界**：统计看板、SSO/LDAP、高可用部署方案、安全审查、流量控制、监控与漏洞修复等企业能力属商业版，README 已明确标注，选型前先对照。
- **权限初始化**：首个注册用户即 admin，公网暴露前务必先注册占位、改默认口令并配好角色，避免他人抢先注册。
- **文档入口**：官方私有化部署与使用说明托管在飞书 wiki，部分页面需要登录，离线环境建议先导出留档；模型文件与解析服务需按上游说明另行获取。
