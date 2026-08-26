---
id: zenstory
name_zh: "ZenStory AI 小说写作工作台"
name_en: "ZenStory"
summary_zh: "AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。"
summary_en: "An AI-agent-driven novel-writing workbench (React + FastAPI monorepo): chat-to-create, multi-agent pipeline, material library, 13 built-in writing skills, and Agent API."
category: writing-docs
kind: framework
tags: [novel-writing, ai-agent, multi-agent, writing-workbench, claude-code, openclaw]
languages: [python, typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://zenstory.ai/
repo: https://github.com/zenstory-ai/zenstory
tier: standard
featured: true
metrics:
  stars: 35
  pushed_at: "2026-08-25T11:21:09Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [小说写作工作台, 故事创作]
risk_notes: MIT 可商用；需自备 DeepSeek API Key，依赖 Docker（或本地 dev）运行；含订阅/配额/积分等商业化运营模块，自部署时按需关闭。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# ZenStory AI 小说写作工作台

> AI Agent 驱动的商业级小说写作工作台。上游：[zenstory-ai/zenstory](https://github.com/zenstory-ai/zenstory) · 许可证：MIT

## 这是什么

它是一套 **AI Agent 驱动的商业级小说写作工作台**（Monorepo：React 前端 `apps/web` + FastAPI 后端 `apps/server`，AI Agent 系统在 `apps/server/agent`）。与传统「聊天框 + 复制粘贴」不同，ZenStory 让 AI 通过完整工具链**直接操作你的创作文件**——建角色卡、拆参考素材、规划大纲、逐章写作，全在一次对话里完成。

核心能力：① 对话 × 文件系统（9 种 Agent 工具、Diff 审阅模式）；② 多 Agent 协作引擎（Router / Planner / Hook Designer / Writer / Quality Reviewer 五工作流）；③ 素材库 AI 拆解（8 类结构化元素 + 混合 RAG 检索）；④ 灵感库；⑤ 技能系统与市场（13 个内置写作技能，Markdown 定义、可自定义分享）；⑥ Agent API（Claude Code / OpenClaw 直连）；⑦ 专业编辑器（六种文件类型、版本快照）；⑧ 商业化运营（订阅 / 配额 / 积分 / 管理后台）。支持长篇、短篇、短剧三种创作路径。

## 怎么安装

```bash
# 一行命令启动（需 Docker，且自备 DeepSeek API Key）
export DEEPSEEK_API_KEY=your-key
git clone https://github.com/zenstory-ai/zenstory.git
cd zenstory
docker compose up -d --build
# 前端 http://localhost:5173 · API 文档 http://localhost:8000/docs
```

## 怎么用

启动后在 Web 工作台对话式创作；或生成 API Key 粘贴到 Claude Code / OpenClaw，让外部 Agent 直接读写你的小说项目（章节、角色、素材库）。内置 13 个写作技能覆盖继续写作、场景描写、对话、开头、冲突 / 悬念 / 反转设计、沉浸增强、角色 / 大纲 / 世界观构建。

## 注意事项

- **许可证 MIT**：可商用、可自部署；但仓库内置订阅 / 配额 / 积分等商业化模块，自部署时按需裁剪。
- **运行依赖**：需 Docker 与 DeepSeek API Key（或其他后端兼容模型）；生产部署建议 PostgreSQL + Redis。
- **数据本地化**：创作文件在本地 / 自托管环境，注意备份与访问权限控制。
- 维护活跃（2026-08 更新），暂无已知重大缺陷。
