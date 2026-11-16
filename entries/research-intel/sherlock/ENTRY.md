---
record_type: entry-record
id: sherlock
name_zh: "Sherlock 用户名跨平台检索"
name_en: "Sherlock"
summary_zh: "开源 OSINT 用户名检索 CLI：输入一个用户名，批量核查 400+ 社交网站是否存在同名账号，无需登录、无需 API Key；支持 CSV / XLSX / JSON 输出、站点白名单、代理与超时控制，是账号足迹排查的事实标准工具。"
summary_en: "Open-source OSINT CLI that hunts down social media accounts by username across 400+ networks, with CSV/XLSX/JSON output, site filters, proxy and timeout controls — no login or API key required."
category: research-intel
mode: connect
tags: [social-media, security, cli, osint]
languages: [python]
doc_languages: [en]
license: MIT
homepage: https://sherlockproject.xyz
repo: https://github.com/sherlock-project/sherlock
tier: standard
metrics:
  stars: 112486
  pushed_at: "2026-11-15T05:13:15Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [sherlock, Sherlock]
risk_notes: "OSINT 双用途工具：只应查询公开信息并用于合法授权场景（自查账号足迹、渗透测试授权范围、反诈溯源），不得用于骚扰、跟踪或人肉；结果存在误报 / 漏报，站点规则持续变化；一次查询会向数百个站点发请求，可能被限流或封 IP，必要时配代理与超时；--nsfw 会纳入成人站点，默认关闭；上游提示 ParrotOS 与 Ubuntu 24.04 的第三方包已损坏，请用 pipx / uv / pip 或 Docker 安装。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# Sherlock 用户名跨平台检索

> 按用户名追踪跨平台社交账号的 OSINT 工具。上游：[sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) · 许可证：MIT · 官网：[sherlockproject.xyz](https://sherlockproject.xyz)

## 这是什么

Sherlock 是一个用 Python 编写的用户名检索 CLI：给一个用户名，它按上游维护的站点清单逐站请求公开主页，判断该用户名在 400+ 社交网络、论坛与开发平台上是否存在同名账号。不需要登录、不需要 API Key，是 OSINT 与账号足迹排查领域使用最广的开源工具（★112k）。

主要能力：

- 支持一次检索多个用户名，结果默认写入 `<用户名>.txt`
- 输出 CSV / XLSX / JSON，或用 `--browse` 直接打开命中的主页
- `--site` 限定站点、`--proxy` 走代理、`--timeout` 控制超时
- `--print-all` 同时显示未命中的站点，`--nsfw` 可选纳入成人站点（默认关闭）
- 默认拉取上游最新站点清单；`--local` 强制使用随包内置的 `data.json`，离线或需要固定数据时用

## 怎么接入

前置：Python 3.9–3.14（上游要求 `>=3.9,<4.0`）。推荐用 pipx / uv 隔离安装，避免污染全局环境。

```bash
# 推荐：pipx 隔离安装（也可用 uv tool install sherlock-project）
pipx install sherlock-project

# 或 Docker
docker run -it --rm sherlock/sherlock

# 或用 venv + pip
python -m venv .venv && . .venv/bin/activate
pip install sherlock-project

# 验证
sherlock --version
```

上游提示：ParrotOS 与 Ubuntu 24.04 的第三方软件包当前是坏的，这两个系统请改用 pipx / uv / pip 或 Docker。

## 怎么用

```bash
# 查单个用户名
sherlock user123

# 一次查多个
sherlock user1 user2 user3

# 只查指定站点，并导出 CSV / XLSX
sherlock --site GitHub --site Reddit --csv --xlsx -o results user123

# 走代理、收紧超时（大批量查询时建议）
sherlock --proxy socks5://127.0.0.1:1080 --timeout 15 user123

# 使用内置站点清单（不拉上游最新数据）
sherlock --local user123
```

结果默认落在当前目录的 `<用户名>.txt`；完整参数见 `sherlock --help`，或上游的[使用文档](https://sherlockproject.xyz/usage)。

## 注意事项

- **合法与伦理边界**：只用于查询公开信息与合法授权场景，例如自查账号足迹、授权渗透测试、反诈溯源；不得用于骚扰、跟踪或人肉搜索，使用前确认所在地法律与目标平台服务条款。
- **结果不是证据**：同名账号可能属于不同的人，站点检测规则也会带来误报 / 漏报；结论需人工复核。
- **请求量与风控**：一次查询会向数百个站点发请求，容易被限流或封 IP；批量查询时调低并发、设置 `--timeout` 并考虑代理。
- **数据新鲜度**：默认从上游拉取站点清单，站点增删频繁；`--local` 使用内置快照，可能滞后。
- **许可证**：MIT，可商用与修改，保留版权声明即可；上游为社区项目，第三方发行版（Debian / Homebrew / Kali 等）不属官方支持范围。
