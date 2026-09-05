---
record_type: entry-record
id: browser-use
name_zh: "Browser Use 浏览器 Agent"
name_en: "Browser Use — AI Browser Agent"
summary_zh: "让 AI Agent 像人一样操作浏览器的开源框架：打开页面、点击、输入、填表和提取结构化数据；可作为 Python 库嵌入自动化流程，也可通过 CLI/技能接入 Claude Code、Codex、Cursor 等编码 Agent，并支持自定义工具与多种 LLM。"
summary_en: "Open-source browser agent framework for web navigation, form filling, extraction and custom tools, usable as a Python library or CLI skill with Claude Code, Codex and Cursor."
category: agent-infra
kind: framework
tags: [browser-use, browser-automation, ai-agent, mcp, python, playwright, self-hosted]
languages: [python]
doc_languages: [en]
license: MIT
homepage: https://browser-use.com
repo: https://github.com/browser-use/browser-use
docs_url: https://docs.browser-use.com
tier: core
metrics:
  stars: 112327
  pushed_at: "2026-09-05T07:00:06Z"
  checked_at: "2026-09-05"
  archived: false
related: [mcp, ai-agent]
aliases: [Browser Use, browseruse]
risk_notes: "MIT 许可，但开源库默认会向浏览器执行真实点击、输入、上传与数据读取；使用前必须确认目标网站条款、账号策略与隐私影响，为敏感站点配置人工审批或最小权限。生产规模建议使用远程浏览器与代理管理；LLM 与云服务调用会产生费用，且仓库另有 Cloud 服务条款。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Browser Use 浏览器 Agent

> 让 AI Agent 像人一样打开网页、点击、输入和提取数据。上游：[browser-use/browser-use](https://github.com/browser-use/browser-use) · 许可证：MIT

## 这是什么

Browser Use 是把浏览器操作能力交给 AI Agent 的开源框架。它不只在页面上“截图问答”，而是让模型按任务驱动真实浏览器：打开链接、点击按钮、填写表单、等待结果、抓取页面内容并输出结构化数据。

项目有两条主要使用路径：

- **Python 库**：用于自己的自动化产品或脚本，可选择任意支持的 LLM、定义自定义工具、结构化输出和细粒度浏览器控制。
- **CLI / Agent 技能**：安装后接入 Claude Code、Codex、Cursor、Hermes、OpenClaw 等 Agent，由 Agent 直接下发一次性浏览器任务。

核心能力覆盖表单填写、数据提取、多步任务编排、认证会话管理、自定义工具、远程/云浏览器、代理轮换和 MCP/云 API 集成。

## 怎么安装

Python 环境为 3.11+。用 uv 安装并注册 Agent 技能：

```bash
uv add browser-use
browser-use skill install
```

或用 pip：

```bash
pip install browser-use
```

如果只是给 Claude Code、Codex、Cursor 等 Agent 用，可直接让 Agent 执行官方 Quickstart 中的安装提示词，它会安装稳定版并连接本地浏览器。

## 怎么用

先在 `.env` 配置 LLM 或 Browser Use Cloud Key：

```env
BROWSER_USE_API_KEY=your-key
# GOOGLE_API_KEY=your-key
# ANTHROPIC_API_KEY=your-key
```

最小 Agent 示例：

```python
import asyncio

from browser_use import Agent, ChatBrowserUse

async def main():
    agent = Agent(
        task="Find the number of stars of the browser-use repo",
        llm=ChatBrowserUse(model="openai/gpt-5.5"),
    )
    history = await agent.run()

asyncio.run(main())
```

也可以用 `Tools()` 注册自定义动作，让 Agent 在浏览器任务中调用自己的内部 API 或本地命令。

## 注意事项

- **真实副作用**：Agent 会操作真实网页和账号。不要把高风险操作完全交给无人值守任务，建议设置人工确认、白名单和最小权限会话。
- **网站条款与隐私**：自动化访问、抓取和登录可能受目标网站条款约束；处理个人信息时需要另行评估隐私与合规要求。
- **成本依赖**：LLM、云浏览器、代理、验证码处理和 Cloud API 都可能产生费用。
- **部署规模**：本地 Chrome 并行任务会占用大量内存；生产环境建议使用远程浏览器基础设施和资源管理。
