---
record_type: entry-record
id: vimax
name_zh: "ViMax 智能体视频生成框架"
name_en: "ViMax — Agentic Video Generation"
summary_zh: "HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。"
summary_en: "HKUDS agentic video framework: turn a concept into story, script, storyboard, shots, and a finished video. Includes Idea2Video, Script2Video, Novel2Video, AutoCameo, Agent Loop, TUI, and Web UI."
category: design-creative
kind: framework
tags: [video-production, cinematic, ai-agent, storyboard, framework]
languages: [python]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/HKUDS/ViMax
repo: https://github.com/HKUDS/ViMax
tier: standard
metrics:
  stars: 12103
  pushed_at: "2026-07-29T08:56:47Z"
  checked_at: "2026-08-26"
  archived: false
aliases: [vimax, hku-vimax]
risk_notes: "MIT 可商用；需 Python 3.12 + uv，Web UI 需 Node.js 18+；实际出片依赖所配置的 LLM/图像/视频生成供应商 API（如 OpenRouter、Google Gemini/Veo、Seedance 2.0），密钥与费用由使用者自行承担。"
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# ViMax 智能体视频生成框架

> 端到端智能体视频创作框架。上游：[HKUDS/ViMax](https://github.com/HKUDS/ViMax) · 许可证：MIT · 论文：[arXiv 2606.07649](https://arxiv.org/abs/2606.07649)

## 这是什么

ViMax 是香港大学 HKU Data Science 团队开源的智能体视频创作框架，把叙事规划、视觉一致性、图像生成、视频生成与成片合成连成一条可扩展流水线。输入一个想法，框架自动完成剧本、分镜、角色创建、参考图管理与最终渲染；提供 Idea2Video（概念到成片）、Script2Video（剧本到成片）、Novel2Video（小说到分集视频）、AutoCameo（人物/宠物照片入镜）等工作流，并支持 Agent Loop + TUI 与 Web UI 两种交互界面。

## 怎么安装

```bash
git clone https://github.com/HKUDS/ViMax.git
cd ViMax
uv sync
```

需要 Python 3.12 与 [uv](https://docs.astral.sh/uv/getting-started/installation/)。Web UI 另需 Node.js 18+。

## 怎么用

先用上游仓库根目录的配置模板创建本地配置：

```bash
cp configs/agent.example.yaml configs/agent.local.yaml
```

填入 LLM、图像生成、视频生成的模型与 API key 后，即可：

```bash
vimax tui new        # 启动 Agent Loop TUI 新会话
vimax tui resume     # 恢复已有会话
```

需要浏览器界面时进入 `web/` 目录执行 `npm install && npm run dev`，打开 `http://127.0.0.1:4173`；也可以直接使用 `main_idea2video.py` / `main_script2video.py` 等直连流水线入口。

## 注意事项

- **许可证 MIT**：可商用，需保留版权声明；实际生成依赖配置的模型供应商 API（OpenAI 兼容接口、Google Gemini/Veo、Seedance 2.0 等），会产生对应费用。
- **运行环境**：需要 Python 3.12 + uv；Web UI 需要 Node.js 18+。
- **研究级实现**：模型/供应商配置、角色一致性与成片质量建议先自测再投入生产。
- 维护活跃（v1.2.0，2026-07 更新），提供英文与中文 README、TUI/Web UI 与配套技术报告。
