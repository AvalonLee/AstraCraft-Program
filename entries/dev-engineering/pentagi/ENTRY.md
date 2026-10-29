---
record_type: entry-record
id: pentagi
name_zh: "PentAGI 自主渗透测试 Agent 系统"
name_en: "PentAGI"
summary_zh: "自托管的全自主渗透测试多 Agent 系统：自然语言描述目标与意图，专业 Agent 团队即在隔离 Docker 沙箱内规划并执行 nmap / Metasploit / sqlmap 等 20+ 工具，支持 10+ LLM 供应商与本地模型（Ollama / vLLM），pgvector 长期记忆、可选 Neo4j 知识图谱、REST / GraphQL API 与漏洞报告。"
summary_en: "Self-hosted autonomous pentesting multi-agent system: agents plan and run 20+ tools in an isolated Docker sandbox, with 10+ LLM providers, pgvector memory and an optional Neo4j knowledge graph."
category: dev-engineering
mode: deploy
tags: [security, pentesting, multi-agent, self-hosted, docker, ai-agent]
languages: [go]
doc_languages: [en]
license: MIT
homepage: https://pentagi.com
repo: https://github.com/vxcontrol/pentagi
docs_url: https://pentagi.com/downloads/
tier: standard
metrics:
  stars: 32692
  pushed_at: "2026-10-22T23:26:13Z"
  checked_at: "2026-10-29"
  archived: false
related: [crawl4ai]
aliases: ["PentAGI Enterprise", "VXControl"]
risk_notes: "攻击性安全工具，上游明示仅限授权测试（for authorized testing only）；Agent 在沙箱 Docker 中执行真实探测与利用动作，务必在网络与资源上与生产环境隔离；交互式 installer 需要 Docker socket 权限（root 等价），生产建议 rootless Docker；LLM 与搜索 API 调用费用自理；PentAGI Enterprise（Agent 档案 / 插件 / MCP / 客户级报告）为另售商业版。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# PentAGI 自主渗透测试 Agent 系统

> 自然语言下达任务，多 Agent 团队在沙箱里自主完成渗透测试并出报告。上游：[vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) · 许可证：MIT

## 这是什么

PentAGI（★32.7k，VXControl 出品）是开源自托管的多 Agent 自主渗透测试系统：用自然语言描述目标与意图，一组分工明确的 Agent（含研究 / 开发 / 基础设施委托）自动规划并执行测试步骤，在隔离 Docker 沙箱内调用 nmap、Metasploit、sqlmap 等 20+ 专业工具，结果与成功路径存入 PostgreSQL + pgvector 供后续复用，可选 Graphiti / Neo4j 知识图谱跟踪主机、服务与发现，Grafana / Prometheus 监控执行，最终产出带利用指引的漏洞报告。模型层开放：10+ 云供应商（OpenAI / Anthropic / Gemini / Bedrock / DeepSeek / GLM / Kimi / Qwen 等）或经 Ollama / vLLM 用本地模型，另有 REST + GraphQL API 供自动化集成。注意当前定位是自主 / 辅助渗透测试平台，不是预定义攻击链的 BAS / 对手模拟产品。

## 怎么部署运行

系统要求：Docker 与 Docker Compose（或 Podman）、2 vCPU / 4GB 内存 / 20GB 磁盘起步。推荐用交互式安装器（Linux / macOS / Windows）：

```bash
mkdir -p pentagi && cd pentagi
wget -O installer.zip https://pentagi.com/downloads/linux/amd64/installer-latest.zip
unzip installer.zip
sudo ./installer   # 引导完成系统检查、.env 生成、LLM 供应商与搜索引擎配置、安全加固并 docker compose 拉起
```

装完登录 Web UI 即可下发任务；Docker 直连方案与 Podman 配置见上游 Quick Start。

## 怎么用

在 Web UI 用自然语言描述目标与预期结果（如「对授权范围内的站点做一次 Web 渗透测试并输出报告」），Agent 团队自动拆解执行；过程可观察、可干预，报告支持网页查看与 PDF 下载。API 场景用 Bearer token 调 REST / GraphQL；记忆与知识图谱让同一目标的后续会话沿用既有发现。

## 注意事项

- **授权红线**：攻击性安全工具，上游明示仅限授权测试；执行的是真实探测与利用动作，务必在网络与资源上与生产环境隔离。
- **权限与部署**：installer 需要 Docker socket（root 等价权限），生产环境建议 rootless Docker 或受控用户组；沙箱镜像按任务自动选择，注意磁盘与出口流量。
- **模型与费用**：LLM 与搜索 API（Tavily、Firecrawl 等）用量自付；本地化部署可参考上游 vLLM + Qwen 指南。
- **商业边界**：开源为 MIT；PentAGI Enterprise（Agent 档案、插件与 MCP、客户级报告、实时攻击链视图）为另售商业版。
