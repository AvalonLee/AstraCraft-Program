---
record_type: entry-record
id: open-agent-api
name_zh: "Open Agent API 自托管智能体网关"
name_en: "Open Agent API"
summary_zh: "把本机已配置的编程智能体发布为 API。调用方用限定到指定智能体的密钥提交任务、查看进度、读取正文和文件；审批与调用权限可以分开。内置离线 ACP 示例，不用模型账号就能试一次完整调用。"
summary_en: "A self-hosted gateway that exposes configured coding agents as an API, with scoped caller keys, run results, and separate approval authority."
category: agent-infra
mode: deploy
tags: [ai-agent, self-hosted, acp, mcp, api]
languages: [typescript, javascript]
doc_languages: [zh, en]
license: Apache-2.0
homepage: https://openagentapi.pages.dev/
repo: https://github.com/jiangxingfan1-coder/Open-Agent-API
tier: standard
added_at: "2026-11-24"
updated_at: "2026-11-24"
---

# Open Agent API 自托管智能体网关

## 这是什么

适合已经在用编程智能体、想从内部工具或脚本给它派任务的开发者。把智能体发布到本地网关后，调用方按 `agent/...` 调用它，拿到运行编号、正文与产物，而不必直接控制它的终端。项目提供 OpenAI Responses / Chat Completions 兼容入口和本地 MCP 桥。

## 怎么部署运行

下面固定到已发布的 v0.0.71，使用 Node.js 24.18+（低于 27）。在空闲的本机端口启动一次离线样例；如果 `19761` 已占用，先换成另一个空闲端口。

```bash
git clone --depth 1 --branch v0.0.71 https://github.com/jiangxingfan1-coder/Open-Agent-API.git
cd Open-Agent-API
npm ci
npm run build
demo="$(mktemp -d)"
npm run oaa -- quickstart --dir "$demo/gateway" --port 19761
```

## 怎么用

`quickstart` 发布并调用一次 `agent/sample`。成功后可以打开 `http://127.0.0.1:19761` 查看控制台。本机独立验证过样例调用和服务停止；体验结束后运行：

```bash
npm run oaa -- stop --config "$demo/gateway/config.json"
```

要接已登录的编程智能体，或者给脚本生成只限一个智能体的密钥，见[固定版本中文上手指南](https://github.com/jiangxingfan1-coder/Open-Agent-API/blob/v0.0.71/docs/zh-CN/quickstart.md)。

## 注意事项

- `agent/sample` 返回确定性示例，不验证真实模型的质量或账号兼容性；真实智能体用的是你已有、获准使用的客户端与账号。
- 示例只监听本机回环地址。业务应用应使用单独的限权密钥，不要把管理员令牌写进网页源码、日志或公共仓库。
