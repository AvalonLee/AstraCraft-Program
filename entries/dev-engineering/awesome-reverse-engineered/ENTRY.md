---
record_type: entry-record
id: awesome-reverse-engineered
name_zh: "awesome-reverse-engineered 逆向工程开源工具索引"
name_en: "awesome-reverse-engineered"
summary_zh: "17,000+ 个把闭源应用、API、设备、协议、文件格式和游戏逆向出来的开源工具索引，带搜索站、Agent 技能与 MCP 服务端，每晚自动刷新——动手逆向前先查这里，别重复造轮子。"
summary_en: "An index of 17,000+ open-source tools built by reverse engineering closed apps, APIs, devices, protocols, file formats and games — searchable site, agent skill and MCP server, refreshed nightly."
category: dev-engineering
mode: install
tags: [awesome-list, agent-skills, reverse-engineering, mcp, claude-code, interoperability]
languages: [python]
doc_languages: [en, zh]
license: MIT
homepage: https://alexgaoth.github.io/awesome-reverse-engineered/
repo: https://github.com/alexgaoth/awesome-reverse-engineered
docs_url: https://alexgaoth.github.io/awesome-reverse-engineered/
tier: standard
metrics:
  stars: 1152
  pushed_at: "2026-11-02T16:12:04Z"
  checked_at: "2026-11-03"
  archived: false
aliases: ["awesome-reverse-engineered", "逆向工程索引"]
related: [rea, reverse-skill]
risk_notes: "收录的是索引而非工具本体，其中大量条目为非官方 API 客户端、固件或协议实现，可能违反目标服务条款或随上游变更失效，使用前自行评估合规与安全；数据每晚自动刷新，个别条目可能已失维护；项目与所列工具的官方厂商均无关联。"
added_at: "2026-11-03"
updated_at: "2026-11-03"
---

# awesome-reverse-engineered 逆向工程开源工具索引

> 别把同一个东西逆向两遍：17,000+ 个前人逆向成果，先搜再动手。上游：[alexgaoth/awesome-reverse-engineered](https://github.com/alexgaoth/awesome-reverse-engineered) · 许可证：MIT（数据 CC0）

## 这是什么

一份持续维护的逆向工程开源工具索引（★1.1k+，每晚自动刷新）：17,726 个项目，覆盖游戏反编译（6,100+）、设备/IoT/硬件（3,100+）、非官方 API 客户端（990+）、中文平台工具（770+）、文件格式、固件、车机、网络协议、RE 工具链等 20 个分类，合计 1,230 万 star；另有 129 个「被官方砍掉、被开源续命」的产品案例。它不收录源码，只做索引与检索：可上[搜索站](https://alexgaoth.github.io/awesome-reverse-engineered/)按分类、语言、健康度筛选，也可装成 Agent 技能或 MCP 服务端，让 Agent 遇到"要跟没有官方 API 的东西打交道"的任务时先查这里。

## 怎么安装

装成 Agent 技能（索引数据随技能分发，无需 clone）：

```bash
npx skills add alexgaoth/awesome-reverse-engineered
```

其他形态：Claude Code 插件 `/plugin install reverse-engineered --marketplace alexgaoth/awesome-reverse-engineered`；MCP 服务端 `claude mcp add reverse-engineered -- uvx --from "git+https://github.com/alexgaoth/awesome-reverse-engineered#subdirectory=mcp" reverse-engineered-mcp`；任何能跑 Python 的环境可直接下载单文件脚本 `plugin/skills/find-reverse-engineered/scripts/re_index.py`（仅用标准库）离线检索。

## 怎么用

把任务直接交给装好技能的 Agent：例如"找一个控制 Tuya 智能插座的本地开源方案"，Agent 会在索引里按 star 数、活跃度、许可证排序并给出 README 摘要。命令行方式：`python3 re_index.py search tuya local` 列出匹配，`info <条目>` 看详情，`clone <条目>` 浅克隆到 `vendor/`。

## 注意事项

- **合规自担**：索引里大量条目是非官方客户端、固件与协议实现，可能违反目标服务条款或随上游改版失效；用在授权与合规范围内，法律风险自行评估。
- **索引非工具**：本条目收录的是检索层，不是其中任何工具的发行版；单个子项目的质量、维护状态与协议以各自上游为准。
- **厂商无关联**：项目与所列产品的官方厂商均无关联，属社区互操作性成果。
