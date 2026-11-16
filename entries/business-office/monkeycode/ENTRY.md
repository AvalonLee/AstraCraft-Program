---
record_type: entry-record
id: monkeycode
name_zh: "百智办公 MonkeyAI 团队 AI 工作台"
name_en: "MonkeyCode / MonkeyAI"
summary_zh: "长亭科技开源的企业级团队 AI 办公工作台：用自然语言让 AI 完成 PPT / 文档 / 表格、编程与设计任务并直接交付成果；自带企业管理面板，统一管理模型、知识库、技能、专家、MCP 与规则，支持权限审计与用量计费，可私有化部署。"
summary_en: "Open-source team AI office workbench for slides, documents, spreadsheets, coding and design, with enterprise resource management, permissions, audit and usage billing; self-hosted."
category: business-office
mode: deploy
tags: [office, ai-agent, self-hosted, document-generation, docker]
languages: [typescript, go, rust, python]
doc_languages: [zh]
license: AGPL-3.0
homepage: https://work.baizhi.cloud/
repo: https://github.com/chaitin/MonkeyCode
docs_url: https://work.docs.baizhi.cloud/
tier: standard
metrics:
  stars: 5210
  pushed_at: "2026-11-15T08:48:15Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [MonkeyCode, monkeyai, MonkeyAI, 百智办公]
risk_notes: "AGPL-3.0：修改后对外提供网络服务须开源修改版本；一键安装脚本是官方域名下的 curl | bash，执行前先审阅或改用源码 Docker Compose；首次启动才创建初始管理员，之后务必移除 .env 中的初始账号密码并修改数据库密码，生产环境用 HTTPS；数据存自有服务器，但使用外部模型 / 工具时相关内容仍会发送到所配置服务；远程执行中转默认开启，需设备本机授权，runtime 卷保存控制面标识与签名私钥，备份时一并保存（down -v 会删除）；云电脑、更丰富内置内容与技术支持属付费版，免费版最多 10 席；云端执行环境上游仍标注待统一人工验收。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# 百智办公 MonkeyAI 团队 AI 工作台

> 开源的企业级团队 AI 办公工作台（原 MonkeyCode）。上游：[chaitin/MonkeyCode](https://github.com/chaitin/MonkeyCode) · 许可证：AGPL-3.0 · 文档：[work.docs.baizhi.cloud](https://work.docs.baizhi.cloud/)

## 这是什么

百智办公（MonkeyAI，仓库仍名 MonkeyCode）是长亭科技开源的团队级 AI 办公工作台：成员用自然语言提出需求，AI 直接交付办公、编程与设计成果——做汇报 PPT、写文档、处理表格、整理文件，也能按需求实现功能、补测试、修问题，或制作海报与页面设计。

它不只是单体 Agent，而是一套带企业管理面板的私有化平台：

- **团队资源共享**：在团队内共享大模型、知识库、技能、专家、MCP 连接器与规则，成员直接复用
- **统一管控**：资源访问权限、使用审计、用量统计与计费管理
- **自带模型与工具**：接入自有模型服务，通过 MCP 连接业务系统，再叠加知识库、技能与规则
- **多端接入**：Web、Windows x64、macOS（Apple Silicon / Intel）、Linux x64 客户端连接同一个团队服务器

免费版最多 10 个席位；云电脑、更丰富的内置内容与技术支持属付费版。

## 怎么部署运行

两种方式：一键安装脚本（最省事），或从源码用 Docker Compose 自建。最低配置 1 核 CPU + 1 GB 内存，可随团队规模调整。

```bash
# 方式一：官方一键安装脚本（会从 release.monkeycode-ai.com 拉取并执行安装脚本，建议先审阅）
bash -c "$(curl -kfsSL https://release.monkeycode-ai.com/public/monkeyai-install.sh)"

# 方式二：源码 Docker Compose（需要 Docker 与 Compose，仓库内置 PostgreSQL）
git clone https://github.com/chaitin/MonkeyCode.git
cd MonkeyCode/monkeyai
cp .env.example .env
# 至少修改数据库密码、初始管理员邮箱 / 密码与 MONKEYAI_PUBLIC_URL
docker compose up --build
# 启动后访问 http://localhost:8080，点「管理后台」登录
```

首次启动时若用户表为空会创建初始管理员，成功后可从 `.env` 移除 `MONKEYAI_INITIAL_ADMIN_EMAIL` 与 `MONKEYAI_INITIAL_ADMIN_PASSWORD`；生产环境把 `MONKEYAI_PUBLIC_URL` 设为实际 HTTPS 地址，Admin 镜像内置了自动申请和续期 Let's Encrypt 证书的开关。

## 怎么用

1. 用初始管理员登录管理后台，先改密码，再配置模型服务（也可用团队共享的模型）。
2. 按需导入知识库、技能、专家、规则，接入 MCP 连接器，并给团队分配访问权限。
3. 成员用 Web 或桌面客户端填写团队服务器地址登录，直接用自然语言派活：整理资料成 PPT、汇总表格、实现功能、做海报等。
4. 管理端查看用量统计与审计记录，按团队需要调整席位、模型与资源配额。

上游提供演示环境可先试：Web 端 <https://demo.work.baizhi.cloud/>，管理后台 <https://admin.demo.work.baizhi.cloud/>（演示账号见上游 README）。客户端下载地址在官网与仓库 `admin/public/downloads.json` 中配置。

## 注意事项

- **AGPL-3.0**：可自由使用、修改与二次开发，但修改后对外提供网络服务须按协议开源修改版本。
- **部署安全**：一键安装脚本是 `curl | bash`，执行前先阅读脚本或改用源码 Compose；必须在 `.env` 中改掉数据库密码与初始管理员密码，生产环境配 HTTPS 与可信代理网段（`MONKEYAI_TRUSTED_PROXY_CIDRS`），否则来源 IP 与 OAuth 回调可能不可靠。
- **数据边界**：团队数据存在自有服务器，但调用外部模型、MCP 工具或对象存储时，相关内容会发送到所配置的服务，接入前做数据合规评估。
- **远程执行与备份**：服务端远程执行中转默认开启，设备需在本机开启远程访问并批准权限；`runtime` 卷保存身份标识与签名私钥，备份要一并保存，`docker compose down -v` 会删除。
- **功能成熟度**：云端执行环境（containerd / gVisor 云电脑）上游仍标注待统一人工验收，Firecracker 与 Kubernetes 属后续扩展；免费版席位与内置内容有限。
- **许可证与品牌**：AGPL-3.0 只覆盖代码；「百智办公 / MonkeyAI」等品牌与付费服务不在开源授权内。
