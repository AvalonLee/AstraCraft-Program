---
record_type: entry-record
id: toonflow
name_zh: "Toonflow 一站式 AI 短剧创作工具"
name_en: "Toonflow — AI Short Drama Creation Workbench"
summary_zh: "开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。"
summary_en: "Open-source AI workbench that turns novels and scripts into animated short dramas, with AI scriptwriting, storyboarding, character/video generation, agent workflow, and Docker self-hosting."
category: design-creative
kind: framework
tags: [short-drama, screenwriting, storyboard, ai-agent, video-production, docker, self-hosted]
languages: [typescript]
doc_languages: [zh, zh-tw, en, th, vi, ja, ru]
license: Apache-2.0
homepage: https://toonflow.net
repo: https://github.com/HBAI-Ltd/Toonflow-app
tier: standard
metrics:
  stars: 14622
  pushed_at: "2026-08-26T10:49:08Z"
  checked_at: "2026-08-26"
  archived: false
aliases: [toonflow-app, toon-flow]
risk_notes: "Apache-2.0 可商用；核心能力依赖外部模型服务（LLM、视频/图像生成，如 Sora、豆包、Nano Banana Pro），需自行配置 API 与费用；Docker 部署默认账号 admin/admin123，首次登录后应尽快改密。"
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Toonflow 一站式 AI 短剧创作工具

> 开源一站式 AI 短剧创作工具。上游：[HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app) · 许可证：Apache-2.0 · 官网：[toonflow.net](https://toonflow.net)

## 这是什么

Toonflow 是面向短剧生产的 AI 工作台，把「策划 → 编剧 → 分镜 → 出片」串成完整闭环：导入小说或剧本后，可完成章节事件提取、AI 编剧、无限画布分镜、角色/素材/视频节点编排与成片导出。它内置三层 Agent 协作体系（决策层/执行层/监督层）、基于本地 ONNX 向量检索的持久化 Agent 记忆，以及支持在线编写 TypeScript 逻辑的可编程供应商系统；ScriptAgent 与 ProductionAgent 的核心提示词外化为 Markdown Skill 文件，便于直接调优。

## 怎么安装

### 桌面端

直接从 [GitHub Releases](https://github.com/HBAI-Ltd/Toonflow-app/releases) 下载 Windows、Linux 或 macOS 安装包，安装后启动即可。

### Docker 自部署

```bash
git clone https://github.com/HBAI-Ltd/Toonflow-app.git
cd Toonflow-app

# 本地构建并启动
yarn docker:local
# 或手动构建
docker build -t toonflow .
docker run -d -p 10588:10588 -v /path/to/data:/app/data toonflow
```

启动后访问 `http://localhost:10588/web/index.html`。

## 怎么用

1. 首次登录使用默认账号 `admin` / `admin123`；
2. 在设置中心配置文本/图像/视频模型供应商；
3. 新建项目并导入原著，执行章节事件提取；
4. 用 ScriptAgent 生成故事骨架、改编策略与结构化剧本；
5. 切换到 ProductionAgent，在无限画布中组织分镜、素材与视频节点；
6. 节点化精调分镜图后回流工作台，完成视频拼接与导出。

## 注意事项

- **许可证 Apache-2.0**：可商用，需保留版权声明；核心生成能力依赖外部模型服务（如 Sora、豆包、Nano Banana Pro），需自备接口与密钥并承担费用。
- **Docker 部署**：默认账号 `admin` / `admin123`，首次登录后请尽快修改；默认服务端口 `10588`。
- **运行环境**：桌面端支持 Windows/Linux/macOS；Docker 部署需 Docker 20.10+，云端部署需 Node.js 24（最低 23.11.1）。
- 软件界面提供简体中文、繁體中文、English、ไทย、Tiếng Việt、日本語、Русский 多语言支持。
- 维护活跃（2026-08 更新），同时提供 GitHub、Gitee、AtomGit 分发渠道。
