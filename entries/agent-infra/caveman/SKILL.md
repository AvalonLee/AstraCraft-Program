---
record_type: entry-record
id: caveman
name_zh: Caveman Agent 省 Token 工具集
name_en: Caveman
summary_zh: 让 AI 编码 Agent 说更少、读更省的组合工具：MIT 技能让输出 token 省 65%（30+ Agent 可装），本地 Go 代理压缩输入流（Claude Code 基准 -33.2%、18/18 正确性通过），原内容本地备份可恢复，/caveman 分级模式含 wenyan 文言文风。
summary_en: "A token-saving toolkit for AI coding agents: an MIT skill that cuts 65% of output tokens across 30+ agents, plus a local Go proxy that shrinks what agents read with byte-exact local recovery."
category: agent-infra
kind: framework
tags: [prompt-engineering, claude-code, codex, ai-agent, cli, token-optimization]
languages: [go, markdown]
doc_languages: [en]
license: MIT AND BSL-1.1
homepage: https://docs.caveman.so/docs/quickstart
repo: https://github.com/JuliusBrussee/caveman
tier: standard
metrics:
  stars: 107662
  pushed_at: "2026-09-24T07:39:42Z"
  checked_at: "2026-09-24"
  archived: false
related: []
aliases: [caveman-ai]
risk_notes: 拆分许可证：skill/CLI/SDK 为 MIT，Engine/Proxy/Browse/MCP server 等 Go 运行时为 BSL-1.1（源可用非 OSI，自托管第一方流量含生产免费，第三方托管需商业授权，2030-06-21 或发布四年后转 Apache-2.0）；skill 只省输出，每轮固定多花约 1-1.5k input token，本就简洁的任务可能亏损；CLI 默认匿名遥测（caveman telemetry off 或 DO_NOT_TRACK=1 关闭）；所有压缩本地可恢复。
added_at: "2026-09-09"
updated_at: "2026-09-09"
---

# Caveman Agent 省 Token 工具集

> "why use many token when few token do trick"——让 AI 编码 Agent 说更少、读更省。上游：[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) · 许可证：MIT（skill/CLI）+ BSL-1.1（引擎运行时）

## 这是什么

Caveman 是 meme 外壳、严肃内核的 token 优化工具集，两个组件可叠加：

**小石头（skill）**：一个规则文件，把 Agent 的"口水话"压短——代码、命令、路径、错误信息原样保留，只压缩说明性文字。30+ Agent 可装，`/caveman lite|full|ultra` 控强度，另有 wenyan 文言模式；附 `/caveman-commit`（极简 Conventional Commit）、`/caveman-review`（一行式审查发现）、`cavecrew-*` 压缩子代理预设和 `investigate-first` 等省 token 工作模式。

**大石头（proxy）**：本地 Go 进程位于 Agent 与 provider 之间，`detect()` 按 payload 类型（json / log / code / diff / search-result / text）压缩 Agent 读取的上下文，原内容存本地 SQLite 并返回 recovery handle，Agent 可随时 `caveman_retrieve` 拉回原文。无 Caveman 服务器在链路中，Claude Pro/Max 登录直通。

上游自报基准：skill 十条真实 Claude API 提示平均输出 1214 → 294 tokens（-65%）；proxy 54-run Claude Code 基准输入 -33.2%（885,793 → 591,673），18/18 精确答案检查通过；网页浏览压缩 129.8 倍。维护者公开保留反例（无压缩变换的 HTML 案例 +9.9%）并维护 [HONEST-NUMBERS.md](https://github.com/JuliusBrussee/caveman/blob/main/docs/HONEST-NUMBERS.md) 全账本。

## 怎么安装

```bash
# 小石头：skill（30+ Agent，MIT）
npx skills add JuliusBrussee/caveman

# 大石头：本地代理（Node.js 22.13+，MIT CLI + BSL-1.1 引擎）
npm install -g @caveman-ai/cli && caveman setup --install
caveman claude        # 或 codex · gemini · aider · kilo · qwen · opencode · hermes · openclaw · pi
```

一次性安装 Claude Code hooks 与状态栏徽章：

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v2.6.0/install.sh | bash
# Windows PowerShell 5.1+：irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v2.6.0/install.ps1 | iex
```

## 怎么用

- 装好 skill 后 `/caveman` 唤醒，`off` 关闭；`caveman <agent>` 常驻代理并启动 Agent，`caveman wrap <agent>` 单次会话不留痕、不改配置文件。
- 不在列表的 Agent / 框架（Vercel AI SDK、LangChain、LiteLLM 等）把 baseURL 指向本地代理即可；MCP 宿主可用 5 个工具：`caveman_compress` / `caveman_retrieve` / `caveman_stats` / `caveman_toon_encode` / `caveman_toon_decode`。
- `caveman learn` 本地只读分析历史会话的 token 去向并按最差排序列出修复项，`learn implement` 逐 diff 应用（不降 token 自动回滚）；`caveman trial -- claude` 做真实 A/B 后再决定常驻。
- 其他动词：`caveman shrink -- pnpm test`（压缩命令输出，字节级可恢复）、`caveman browse`（压缩 a11y 树的本地浏览）、`caveman mem`（跨会话记忆）、`caveman convert`（pixel 模式把 skill 渲染成图片省 token）。

## 注意事项

- **拆分许可证**：MIT 覆盖 skill、CLI、Agent SDK、client SDK、contracts；BSL-1.1 覆盖 Engine、Proxy、Cache Engine、rewriter、Browse、MCP server 等 Go 运行时——自托管第一方流量（含生产）免费，为第三方托管需商业授权，每版本 2030-06-21 或发布四年后转 Apache-2.0。
- **诚实数字**：skill 只省输出，规则本身每轮多花约 1-1.5k input token；整账单节省低于基准表，本就简洁的任务可能亏钱，先用 `caveman trial` 实测自己的工作负载。
- **隐私**：全部本地运行、无需账号；CLI 默认匿名遥测（仅命令名与 token 计数），`caveman telemetry off` 或 `DO_NOT_TRACK=1` 永久关闭。
- **可恢复**：所有压缩都留本地备份（SQLite recovery handle / `SKILL.orig.md`），pixel 模式转换失败时字节级还原；Codex 暂跳过 shrink hook（上游 runtime 限制）。
- 维护非常活跃（2026-09-09 当天仍有推送），截至 2026-09-09 核验约 104,494 stars。
