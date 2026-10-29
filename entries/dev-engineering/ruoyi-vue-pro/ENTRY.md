---
record_type: entry-record
id: ruoyi-vue-pro
name_zh: "芋道 ruoyi-vue-pro 快速开发平台"
name_en: "ruoyi-vue-pro (yudao)"
summary_zh: "芋道出品的 Spring Boot 快速开发平台（RuoYi-Vue 全新 Pro 版，★40k+）：RBAC 动态权限、数据权限、SaaS 多租户、Flowable 工作流、三方登录、支付、短信、商城、CRM、ERP、AI 大模型、IoT 等模块开箱即用；提供 JDK8 / 17 / 25 三条分支与代码生成器，支持 MySQL、Oracle、PostgreSQL 及达梦等国产数据库。"
summary_en: "A Spring Boot rapid development platform with RBAC, SaaS multi-tenancy, Flowable workflows, pay, mall, CRM/ERP, AI and IoT modules, a code generator, and three JDK branches (8/17/25)."
category: dev-engineering
mode: deploy
tags: [framework, software-engineering, cn-localization]
languages: [java]
doc_languages: [zh]
license: MIT
homepage: https://doc.iocoder.cn/
repo: https://github.com/YunaiV/ruoyi-vue-pro
tier: standard
metrics:
  stars: 40103
  pushed_at: "2026-10-29T02:08:54Z"
  checked_at: "2026-10-29"
  archived: false
related: [framework, software-engineering]
aliases: ["yudao", "芋道", "RuoYi-Vue-Pro"]
risk_notes: "完整版模块庞大（商城、ERP、工作流等全量内置），上手建议按官方《迁移文档》裁剪到精简版 yudao-boot-mini；JDK8 / 17-21 / 25 对应 master / master-jdk17 / master-jdk25 三条分支，选型前先对齐团队技术栈；信创与国产数据库支持依赖官方持续适配，关键项目升级前先看兼容性说明。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# 芋道 ruoyi-vue-pro 快速开发平台

> 以开发者为中心的中国主流 Spring Boot 快速开发平台，个人与企业可 100% 免费使用。上游：[YunaiV/ruoyi-vue-pro](https://github.com/YunaiV/ruoyi-vue-pro) · 许可证：MIT

## 这是什么

芋道（yudao）出品的后台管理系统 + 快速开发平台，RuoYi-Vue 的全新重构 Pro 版（★40k+，中文文档完善）：后端 Spring Boot 多模块 + MyBatis Plus + Redis/Redisson，管理台 Vue3（element-plus / vben 两版）+ uni-app 移动端一套代码多端适配。

功能覆盖：RBAC 动态权限与按钮级控制、数据权限、SaaS 多租户、Flowable 工作流（在线设计流程、会签或签）、三方登录、支付、短信、商城、会员、CRM、ERP、MES、HRM、IM、AI 大模型、IoT 等；代码生成器一键生成 Java / Vue 前后端代码与 SQL。支持 MySQL、Oracle、PostgreSQL、SQL Server 及达梦、人大金仓、openGauss 等国产数据库（信创适配）。另有只含系统与基础设施功能的精简版 [yudao-boot-mini](https://github.com/yudaocode/yudao-boot-mini)。

## 怎么部署运行

前置：JDK（按分支选 8 / 17-21 / 25）、Maven、MySQL、Redis。以 master-jdk17 分支为例：

```bash
git clone -b master-jdk17 https://github.com/YunaiV/ruoyi-vue-pro.git
# 1) 导入 sql/mysql/ 目录的初始化脚本（Oracle / PostgreSQL / 达梦等见 sql/ 各对应目录）
# 2) 修改 yudao-server/src/main/resources/application-local.yaml 的 MySQL / Redis 连接
# 3) IDE 运行 yudao-server 模块的 YudaoServerApplication（Maven 构建可先 -DskipTests）
```

启动后访问管理台，默认账号 admin / admin123；管理台前端在 yudao-ui-admin 系列仓库（Vue3 两版），完整步骤见官方《快速启动》文档（doc.iocoder.cn/quick-start）。

## 怎么用

用代码生成器对准数据库表一键生成增删改查的前后端代码与接口文档；按需在「基础设施 → 代码生成」导入表结构即可。新业务模块建议基于精简版起步，再按《迁移文档》（约 5-10 分钟一个模块）从完整版按需搬功能。

## 注意事项

- **分支与裁剪**：三条 JDK 分支功能一致、依赖版本不同；完整版体量大，正式项目先裁剪（精简版 + 按需迁移）再开发。
- **协议与商业**：MIT 开源、个人与企业 100% 免费商用；上游另有配套商业服务与文档站，边界以官网说明为准。
- **信创适配**：国产数据库 / 中间件支持依赖上游持续维护，生产升级前先核对其信创兼容文档。
