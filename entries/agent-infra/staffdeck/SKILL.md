---
record_type: entry-record
id: staffdeck
name_zh: "StaffDeck 企业数字员工平台"
name_en: "StaffDeck — Enterprise Digital Employee Platform"
summary_zh: "OpenBMB 开源的企业数字员工平台：把业务经验、SOP、决策标准与知识库沉淀为可持续运行的数字员工，支持状态机流程、文档感知检索、MCP/HTTP 工具执行、长期记忆与审计。"
summary_en: "OpenBMB's enterprise platform for governed digital employees: state-machine SOPs, document-aware retrieval, audited tool execution, and long-term memory."
category: agent-infra
kind: framework
tags: [digital-employee, ai-agent, enterprise, sop, knowledge-management, mcp, self-hosted]
languages: [python, typescript]
doc_languages: [zh, en]
license: AGPL-3.0
homepage: https://staffdeck.openbmb.cn/
repo: https://github.com/OpenBMB/StaffDeck
tier: standard
metrics:
  stars: 1833
  pushed_at: "2026-09-01T11:03:12Z"
  checked_at: "2026-09-05"
  archived: false
related: []
aliases: [staffdeck, digital-employee-platform]
risk_notes: "AGPL-3.0 有强 Copyleft：对外提供网络服务需满足开源义务，商用前请评估；平台可执行 HTTP/MCP/定时任务等真实操作，应配置最小权限凭证与高风险操作审批；源码部署默认管理员 admin/admin，首次登录必须改密；法律、医疗、金融、安全等受监管场景不得替代专业审查。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# StaffDeck 企业数字员工平台

> 把个人经验与业务流程变成可治理、可复用、可审计的数字员工。上游：[OpenBMB/StaffDeck](https://github.com/OpenBMB/StaffDeck) · 许可证：AGPL-3.0

## 这是什么

StaffDeck 是 OpenBMB / ModelBest / THUNLP 等联合开发的企业数字员工平台。它不只是包装一个聊天模型，而是把岗位、能力、知识库、SOP、工具、记忆与审计记录组织成一个持续工作的「员工」体系：

- **数字员工管理**：定义职位、工号、能力画像、访问边界、发布范围与工作记录；支持能力成长、权限隔离和复用。
- **状态机 SOP**：把自然语言业务流程转成结构化 SOP，用状态机执行复杂流程；支持多流程切换、上下文保持、可视化编辑、版本管理与分支演化。
- **文档感知检索**：按文档、章节、页码、摘要等层级建索引，先估计信息可能所在位置，再逐步定位原文；支持知识桶、定向检索、来源引用与检索调试。
- **真实执行与改进闭环**：通过 HTTP API、MCP 与定时任务执行业务动作，配合长期记忆、执行轨迹、人工接管、用户反馈和反馈分析持续优化。

平台还提供 Web 工作台、多数字员工市场、权限管理、执行记录、微信 / 企业微信渠道接入等企业化能力。

## 怎么安装

桌面版可直接从官方站点或 GitHub Releases 下载；源码部署推荐先准备 Python 3.11+ 和 Node.js 20+：

```bash
git clone https://github.com/OpenBMB/StaffDeck.git
cd StaffDeck
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install -e "backend[dev]"
npm --prefix frontend-enterprise ci
cp backend/.env.example backend/.env
scripts/dev_up.sh --detach
```

Windows PowerShell：

```powershell
git clone https://github.com/OpenBMB/StaffDeck.git
cd StaffDeck
py -3 -m venv backend\.venv
.\backend\.venv\Scripts\python.exe -m pip install -e "backend[dev]"
npm --prefix frontend-enterprise ci
Copy-Item backend\.env.example backend\.env
.\scripts\dev_up.ps1 --detach
```

源码部署启动后访问：

```text
http://127.0.0.1:5173/workspace/gallery
```

健康检查：

```bash
curl http://127.0.0.1:5173/api/health
```

预期返回 `{"status":"ok"}`。

## 怎么用

1. 在 `backend/.env` 配置 `APP_SECRET`、OpenAI 兼容模型地址、模型名和 API Key。
2. 打开工作台，创建数字员工并定义职位、角色边界、服务风格和访问范围。
3. 为员工挂载知识库、通用技能、SOP 和工具；市场资源可复制后再定制，不直接改原始模板。
4. 在会话中下任务，查看流式意图、检索、技能、工具、审核与回复事件。
5. 需要时人工接管、取消运行或处理待确认结果；通过记忆、反馈与定时任务持续运营。

## 注意事项

- **AGPL-3.0**：强 Copyleft。若以网络服务对外提供 StaffDeck 或其衍生版本，需仔细评估开源义务；企业商用前应先做许可与合规评估。
- **真实副作用**：HTTP API、MCP 和定时任务会触发真实业务动作。生产使用建议最小权限凭证、白名单、审计日志，并为高风险操作配置人工审批。
- **默认凭据**：源码部署初始管理员是 `admin/admin`，首次登录必须立即修改；`APP_SECRET` 要用长随机值，且不要提交 `.env`。
- **模型与数据**：平台本身不要求本地 GPU，但响应质量和检索效果取决于模型、文档质量、索引与权限设计；敏感数据需做好隔离和授权。
- **受监管场景**：法律、医疗、金融、安全等场景不能把数字员工当作专业审查替代品；重要决策需要人工监督和授权。
