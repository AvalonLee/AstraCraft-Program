---
record_type: entry-record
id: plane
name_zh: "Plane 开源项目管理平台"
name_en: "Plane"
summary_zh: "开源的 Jira / Linear / ClickUp 替代品（★61k+）：工作项、周期（Sprint）、模块、看板与甘特图、项目文档与收件箱分诊一体，API 与 Webhook 齐全；自托管提供 Docker Compose 与 Kubernetes 两种部署并带实例管理面板（God Mode），另有云服务版。Django + Next.js 构建。"
summary_en: "An open-source Jira/Linear alternative for project management: work items, cycles, modules, kanban boards, gantt charts, docs and inbox triage; self-host via Docker Compose or Kubernetes."
category: business-office
mode: deploy
tags: [office, project-management, kanban, self-hosted, docker]
languages: [typescript, python]
doc_languages: [en]
license: AGPL-3.0
homepage: https://plane.so
repo: https://github.com/makeplane/plane
docs_url: https://developers.plane.so/
tier: standard
metrics:
  stars: 61640
  pushed_at: "2026-10-28T21:48:56Z"
  checked_at: "2026-10-29"
  archived: false
related: [office, self-hosted]
aliases: ["Plane Labs", "makeplane"]
risk_notes: "AGPL-3.0：对 Plane 做修改后以网络服务对外提供，需按协议开源修改版本；品牌与商标使用受上游政策约束；自托管版默认面向可信网络设计，暴露公网前先做访问控制与加固。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# Plane 开源项目管理平台

>现代项目管理平台：管理任务、Sprint、文档与分诊，Jira / Linear / Monday / ClickUp 的开源替代。上游：[makeplane/plane](https://github.com/makeplane/plane) · 许可证：AGPL-3.0

## 这是什么

Plane 是开源（AGPL-3.0）的现代项目管理平台（★61k+）：以工作项（Work Items）为中心，配富文本编辑器与子属性引用；周期（Cycles）跑 Sprint、模块（Modules）按功能切分、视图（Views）自定义筛选、甘特图与看板可视化进度；项目文档（Pages）协作、收件箱（Inbox）分诊缺陷与反馈。提供完整 API 与 Webhook，方便接入自动化。

技术栈 Django + Next.js + PostgreSQL/Redis；交付形态三种：Plane Cloud（免运维）、自托管 Docker Compose、自托管 Kubernetes，自托管附带实例管理面板 God Mode（统一配置 SMTP、认证方式等）。

## 怎么部署运行

社区版一条脚本起全栈（生成 `plane-app/` 目录并 docker compose 拉起）：

```bash
curl -fsSL https://raw.githubusercontent.com/makeplane/plane/master/deployments/cli/community/install.sh | bash
# 浏览器打开 http://localhost 完成工作区初始化；升级与迁移脚本在同目录
```

Kubernetes 部署、环境变量与外置数据库等进阶配置见官方自托管文档（developers.plane.so/self-hosting）。

## 怎么用

注册后创建工作区（Workspace）→ 建项目，按「工作项 + 周期 + 模块」组织开发节奏，看板拖拽流转、甘特图看排期；用 Pages 沉淀需求与会议纪要，Inbox 收集外部反馈并分诊成工作项。管理员在 God Mode 里配置实例参数。

## 注意事项

- **协议**：AGPL-3.0——修改后对外提供网络服务需开源对应修改；二次开发做商业分发前先评估协议义务与上游商标政策。
- **数据与升级**：版本迭代较快，升级前按官方文档跑迁移脚本并备份数据卷；面向公网部署时做好认证与反代加固。
- 与同类相比偏产品团队的全功能项目管理；轻量任务看板可对比仓库内 kaneo、dootask 条目。
