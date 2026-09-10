---
record_type: entry-record
id: directors-console
name_zh: "Director's Console AI 影视工作台"
name_en: "Director's Console"
summary_zh: "把电影化提示词工程、分镜画布、素材库和多 ComfyUI 渲染编排放进统一工作流：用真实相机、镜头、胶片与灯光约束生成提示词，在无限画布管理分镜，并并行调度本地或远程 ComfyUI。"
summary_en: "A unified AI VFX production console with cinema prompt engineering, storyboard canvas, media gallery, and distributed multi-node ComfyUI rendering for images and videos."
category: design-creative
kind: framework
tags: [comfyui, storyboard, image-generation, video-production, cinematic, film-language, prompt-engineering, ai-agent]
languages: [python, typescript]
doc_languages: [en]
license: LicenseRef-Proprietary-All-Rights-Reserved
homepage: https://github.com/NickPittas/DirectorsConsole
repo: https://github.com/NickPittas/DirectorsConsole
tier: watch
metrics:
  stars: 324
  pushed_at: "2026-02-25T18:56:05Z"
  checked_at: "2026-09-10"
  archived: false
related: []
aliases: ["DirectorsConsole", "Director Console"]
risk_notes: "README 明确 proprietary software, all rights reserved，不可默认商用或再分发；需同时准备 Python、Node.js、Git 和至少一个 ComfyUI 实例；仓库最近更新距 2026-09-10 较久。"
added_at: "2026-09-10"
updated_at: "2026-09-10"
---

# Director's Console AI 影视工作台

> 电影化 AI VFX 生产管线。上游：[NickPittas/DirectorsConsole](https://github.com/NickPittas/DirectorsConsole) · 许可证：Proprietary / All rights reserved · 约 0.3k stars

## 这是什么

Director's Console 面向电影与视频生产，把提示词工程、分镜、素材和渲染调度放在一个工作台里：

- **Cinema Prompt Engineering（CPE）**：规则引擎用真实相机、镜头、胶片、灯光、构图和运镜约束生成提示，避免物理/历史上不可能的组合。
- **影视预设**：内置 67 个真人电影预设和 43 个动画预设，分别加载真实器材、胶片、灯光、比例或动画风格语法。
- **Storyboard Canvas**：自由无限画布管理分镜面板，每个面板可有独立工作流、参数、生成历史、评分、Markdown 笔记与目标 ComfyUI 节点。
- **Gallery**：浏览、组织、重命名、评分、搜索 PNG 元数据、查重和管理生成图片/视频，并能把参考图或工作流参数回传分镜。
- **多节点渲染**：连接多个本地/远程 ComfyUI 后端并行渲染，WebSocket 跟踪每节点与工作流阶段进度，支持健康检查和重启。
- **AI 提示增强**：接入 13+ LLM 提供商（OpenAI、Anthropic、Google、Ollama 等）润色电影提示。

## 怎么安装

```bash
git clone https://github.com/NickPittas/DirectorsConsole.git
cd DirectorsConsole
python start.py --setup
```

前置依赖：Python 3.10+、Node.js 18+、Git，以及至少一个可访问的 ComfyUI 实例。`--setup` 会创建 CPE 后端与 Orchestrator 的虚拟环境、安装 Python 依赖、安装前端 npm 包并验证导入。

## 怎么用

```bash
python start.py
```

默认启动：

| 服务 | 地址 |
|---|---|
| CPE Backend | `http://localhost:9800` |
| Storyboard Frontend | `http://localhost:5173` |
| Orchestrator | `http://localhost:9820` |

在界面中配置 ComfyUI 节点地址与工作流，创建分镜项目；在 CPE 中选择真人电影或动画预设生成提示，把参数分配给分镜面板，随后并行渲染并到 Gallery 管理/回看结果。

## 注意事项

- 许可证为 **proprietary software, all rights reserved**；Agent 不应默认复制、再分发或商用，使用前须阅读上游授权。
- 图像/视频生成效果取决于你接入的 ComfyUI 工作流、模型与硬件；视频支持 Wan 2.2、CogVideoX、HunyuanVideo 等，但需正确配置输出检测。
- 项目支持本地或 NAS 路径存储；多用户/公网暴露未在 README 中声明为默认安全模型，建议先在可信环境使用。
- 截至 2026-09-10 核验，上游最近推送为 2026-02-25，更新频率低于其他新条目，故列入观察档。
