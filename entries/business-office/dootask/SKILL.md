---
record_type: entry-record
id: dootask
name_zh: "DooTask 开源任务管理与团队协作系统"
name_en: "DooTask — Open Source Task Management & Team Collaboration"
summary_zh: "开源自托管任务管理与团队协作系统（PHP/Laravel + Vue）：任务、看板、团队 IM、文件与流程一体，Docker Compose 部署、`./cmd` 一键运维，仓库内置 5 个 Claude Code 运维技能与 AGENTS.md。"
summary_en: "Open source self-hosted task management and team collaboration system (PHP/Laravel + Vue) with Docker deployment, a `./cmd` ops CLI, and five bundled Claude Code skills plus AGENTS.md."
category: business-office
kind: framework
tags: [office, self-hosted, docker, agent-skills, project-management, kanban]
languages: [php, javascript]
doc_languages: [zh, en]
license: AGPL-3.0
homepage: https://www.dootask.com
repo: https://github.com/kuaifan/dootask
tier: standard
metrics:
  stars: 5583
  pushed_at: "2026-09-13T01:09:13Z"
  checked_at: "2026-09-24"
  archived: false
related: [kaneo, codex-taskboard]
aliases: []
risk_notes: "AGPL-3.0 强 copyleft：通过网络对外提供服务同样触发源码开放义务，改造后自建给他人使用需评估合规，纯内部自托管一般不受影响。部署硬性依赖 Docker v20.10+ 与 Docker Compose v2.0+，数据库为 MariaDB，建议 2 核 4G 以上，Windows 需先装 WSL2。默认分支是 pro 而非 main/master，一键安装脚本与文档链接都指向 pro。仓库含 resources/drawio（jgraph/drawio）与 resources/mobile（kuaifan/dootask-app）两个子模块，浅克隆不含。`./cmd install` 是重操作（建库并 migrate --seed），在已有数据的环境上重装会覆盖，务必先备份。"
added_at: "2026-09-24"
updated_at: "2026-09-24"
---

# DooTask 开源任务管理与团队协作系统

> 自托管的任务管理 + 团队 IM 一体系统，且自带 Agent 运维技能。上游：[kuaifan/dootask](https://github.com/kuaifan/dootask) · 许可证：AGPL-3.0

## 这是什么

DooTask（5.6k star，2021 年至今持续维护）是一套 PHP（Laravel）+ Vue 的开源任务管理系统，把**任务/项目/看板**与**团队即时通讯（IM）**放在同一个自托管实例里，配套文件、流程与在线绘图（内嵌 drawio）。服务端同一套代码支撑网页端、桌面端（`electron/`）与移动端（`resources/mobile` 子模块指向 [kuaifan/dootask-app](https://github.com/kuaifan/dootask-app)）。

它对本目录特别相关的一点是：**上游自己就把 Agent 接口做进了仓库**。默认分支 `pro` 上带有：

- `AGENTS.md` 与 `CLAUDE.md`：给编码 Agent 的项目约定；
- `.claude/skills/`：**5 个中文 Claude Code 技能** —— `dootask-install`、`dootask-update`、`dootask-backup`、`dootask-release`、`dootask-fix-permission`；
- `.claude/hooks/php-stan-check.sh` + `settings.json`：保存 PHP 文件时跑 phpstan 校验。

其中 `dootask-install` 是写得相当严格的「刚性技能」：前置检查（工作目录、Docker daemon、Node.js ≥ 20、`APP_ID` 冲突、sudo）→ 向用户确认一次 → 执行 → 报告，任何一步失败立即停止，并明确标注 `./cmd install` 会建库并 `migrate --seed`，已有数据环境重装须先确认。这类「重操作 + 单次确认 + 失败即停」的写法，是给 Agent 编排运维流程时值得参考的样本。

## 怎么安装

前置：Docker v20.10+、Docker Compose v2.0+，Linux/Unix 环境（Windows 走 WSL2），建议 2 核 4G 以上。

官方推荐的一键脚本——空目录中执行即自动克隆并安装，在已安装目录中执行则自动检查并升级：

```bash
curl -fsSL https://raw.githubusercontent.com/kuaifan/dootask/pro/bin/install | bash
```

手动部署（国内可用 Gitee 镜像）：

```bash
git clone --depth=1 https://github.com/kuaifan/dootask.git
# 或： git clone --depth=1 https://gitee.com/aipaw/dootask.git
cd dootask
./cmd install                 # 自定义端口： ./cmd install --port 80
```

`./cmd install` 内部已封装赋权 → 起容器 → `composer install` → `key:generate` → `migrate --seed` → `up -d` 整套流程。

## 怎么用

日常运维都走同一个 `./cmd` 入口：

```bash
./cmd help                 # 查看全部子命令
./cmd up                   # 启动服务
./cmd down                 # 停止服务
./cmd port 80              # 更换 HTTP 端口
./cmd https                # 自动申请配置 SSL（交互式）
./cmd https agent          # 改走 Nginx 反向代理
./cmd repassword           # 重置管理员密码
./cmd update               # 升级（升级前先备份数据）
./cmd reup                 # 升级后 502 时重启服务
./cmd mysql backup         # 备份数据库（迁移用）
./cmd mysql recovery       # 在新实例恢复数据库
./cmd uninstall            # 卸载
```

- **让 Agent 接手部署**：在项目根目录打开 Claude Code，`.claude/skills/` 下的安装、升级、备份、发版、权限修复技能会被自动发现；换其他 Agent 时，可把这几个 `SKILL.md` 作为流程蓝本喂给它，并保留其「先检查、再确认、失败即停」的约束。
- **数据迁移**：新实例装好后，搬运数据库备份 + `docker/appstore` + `public/uploads` 三处，再 `./cmd mysql recovery`。
- **二次开发**：需 Node.js 20+，`./cmd dev` 开发模式、`./cmd prod` 编译网页端；桌面/客户端构建参考 `.github/workflows/publish.yml`。

## 注意事项

- **许可证 AGPL-3.0**：与 MIT/Apache 不同，改造后通过网络对外提供服务会触发源码开放义务。内部自托管通常无碍，但二次封装成商用 SaaS 前请先做合规评估。
- **默认分支是 `pro`**：不是 `main`/`master`。写脚本、订阅更新或引用 raw 文件时都要带上 `pro`。
- **子模块**：`resources/drawio` 与 `resources/mobile` 为 git submodule，`--depth=1` 浅克隆不含其内容，需要时补 `git submodule update --init`。
- **安装/重装是破坏性操作**：`./cmd install` 会建库并灌种子数据，升级前官方明确要求先备份。
- **数据库固定为 MariaDB**（默认 compose 内的 `mariadb` 服务），换库需自行改造。
- 社区支持以 QQ 群 `546574618` 与 GitHub Issues 为主，中英文 README 齐全；演示与官网在 [dootask.com](https://www.dootask.com)。
