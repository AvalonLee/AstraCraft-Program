---
record_type: entry-record
id: public-apis
name_zh: "Public APIs 免费 API 合集"
name_en: "Public APIs"
summary_zh: "GitHub 星标最高的免费 API 合集：50+ 分类、约 2400 条公开 API 索引，每条标注是否需要认证、HTTPS 与 CORS；附带可搜索官网、免 Key 列表、实时状态页与给 Agent 用的 MCP 服务列表，找外部数据源先从这里查。"
summary_en: "One of GitHub's most-starred free API directories: ~2,400 public APIs in 50+ categories with Auth, HTTPS and CORS tags, plus a searchable site, no-key list, live status and MCP servers for agents."
category: dev-engineering
mode: read
tags: [awesome-list, api, mcp]
languages: [markdown, python]
doc_languages: [en]
license: MIT
homepage: https://publicapis.lol
repo: https://github.com/public-apis/public-apis
tier: core
metrics:
  stars: 499307
  pushed_at: "2026-11-15T18:53:24Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [public-apis, Public APIs, PublicAPIs]
risk_notes: "这是索引不是运行时：条目由社区手工维护，可能过期、下线、收费化或缩减免费额度，Auth / HTTPS / CORS 标注也未必准确（常见 Unknown）；接入前务必读官方文档与条款，免费不等于无限制（限流、注册、署名要求都可能存在）；MIT 只覆盖清单本身，不覆盖各 API 的数据与使用条款；README 顶部有赞助商内容，部分条目是付费服务的免费档。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# Public APIs 免费 API 合集

> 找免费公开 API 的第一站。上游：[public-apis/public-apis](https://github.com/public-apis/public-apis) · 许可证：MIT · 搜索站：[publicapis.lol](https://publicapis.lol)

## 这是什么

Public APIs 是持续维护了十年的免费 API 合集：社区手工整理，按领域分成 50+ 个分类（动物、金融、地理编码、机器学习、新闻、天气、安全等），当前约 2,400 条 API 条目（2026-11 核对）。每条记录四个关键字段：

| 字段 | 含义 |
|---|---|
| Auth | 是否需要 API Key / OAuth，`No` 表示可直接调用 |
| HTTPS | 是否支持 HTTPS |
| CORS | 是否允许浏览器跨域调用（`Unknown` 需自行验证） |
| Description | 一句话说明能拿到什么数据 |

除 README 主表外，还有给 AI Agent 用的 **MCP Servers** 表（列出 transport 与安装入口），以及官方搜索站 [publicapis.lol](https://publicapis.lol)：可按认证方式 / HTTPS / CORS 筛选、看「免 Key」专区、实时状态页与 API 索引自身提供的查询接口。星标近 50 万，是这一领域的默认清单；但它只做导航，不托管接口，也不为任何 API 的可用性背书。

## 怎么阅读

清单就是仓库根目录的 `README.md`；也可以在官方搜索站直接浏览。要离线查或让 Agent 读，拉一份到本地：

```bash
# 拉取最新清单（README 即完整列表）
curl -fsSL https://raw.githubusercontent.com/public-apis/public-apis/master/README.md -o public-apis.md

# 列出所有分类
grep '^### ' public-apis.md

# 只找无需认证的条目（Auth 列为 No，且支持 HTTPS）
grep '| No | Yes |' public-apis.md | head -20

# 或只克隆清单与校验脚本（不带历史）
git clone --depth 1 https://github.com/public-apis/public-apis.git
```

## 怎么用

1. 先看 Index 定位分类，或在 [publicapis.lol/search](https://publicapis.lol/search) 按关键词、认证方式过滤。
2. 在表里比较 Description 与 Auth / HTTPS / CORS，点进链接读官方文档，确认免费额度、限流、署名与商用条款。
3. 想让 Agent 用，把 `public-apis.md` 放进项目上下文，或从 MCP Servers 表挑一个可直接安装的 MCP 服务（按 transport 与 Install 列操作）。
4. 想贡献条目：按 `CONTRIBUTING.md` 的格式提 PR；仓库带 Python 校验脚本（`scripts/validate`、`scripts/tests`），适合批量核对链接与字段格式。

## 注意事项

- **索引会过期**：社区手工维护，条目可能已下线、转为付费或缩减免费额度；Auth / HTTPS / CORS 也可能不准，接入前以官方文档为准。
- **免费不等于无限制**：多数接口仍有速率限制、注册 / Key、署名或非商用条款；部分条目是商业服务的免费档，README 顶部与个别条目含赞助内容。
- **许可证边界**：MIT 只覆盖清单文本与脚本，不覆盖各 API 的数据、商标与使用条款；商用前逐条确认。
- **不做 SLA 背书**：清单不保证任何接口的稳定性与合规性，生产接入要自己做可用性与合规评估。
- **官网归属**：publicapis.lol 由上游 README 标注为官方搜索站，站点内容（每日测试、状态页）也属第三方运营，结论仍以 API 官方文档为准。
