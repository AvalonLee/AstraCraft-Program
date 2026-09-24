# 变更日志

本文件记录 AstraCraft Program（天工计划）的条目增减与结构变更，按月倒序排列。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

变更类型：

- **新增** —— 新收录的条目
- **更新** —— 上游同步、协议重判、评级变化
- **移除** —— 因链接失效、上游删库、协议变更、安全问题而下架的条目
- **结构** —— 分类体系、模板、脚本、CI 的变更

---

## 2026-09

### 新增
- **ToolKnit Desktop 本地文件工作台（2026-09-24）**：收录 `business-office/toolknit-desktop`（Apache-2.0）。★1.2k 的 Tauri 2 + Rust 本地优先文件工作台，三种工作方式（toolknit.com 网页端 / Windows 桌面端 / CLI + MCP），桌面端 12 类 68 项工具覆盖 PDF、PPT、图像、音视频、文本转写、AI 工作台与开发者工具。收录重点在于它把本地能力做成了 Agent 可验证契约：`@toolknit/cli` 输出 JSON、退出码分级（0/2/3/4/5/6）、要求显式输出路径、未给 `--overwrite` 绝不覆盖、临时文件原子发布、敏感输入不写日志；`toolknit mcp serve` 可直接挂进 Trae / Cursor / VS Code。注意 Apache-2.0 不授予名称与域名等品牌权利、toolknit.com 不在开源范围内，桌面端仅 Windows 且依赖 WebView2，CLI 侧图像与部分 AI 能力仍标 Planned。评级：常规。目录总数由 94 增至 **95**。
- **DooTask 开源任务管理与团队协作系统（2026-09-24）**：收录 `business-office/dootask`（AGPL-3.0）。★5.6k 的 PHP（Laravel）+ Vue 自托管任务管理系统：任务、看板、团队 IM、文件与流程一体，网页 / 桌面（electron）/ 移动多端同源，Docker Compose 部署并以 `./cmd` 统一运维（install / update / backup / https / port / mysql backup 等）。收录理由含 Agent 视角：默认分支 `pro` 自带 `AGENTS.md`、`CLAUDE.md` 与 `.claude/skills/` 下 5 个中文运维技能（install / update / backup / release / fix-permission），其中 install 技能采用「前置检查 → 单次确认 → 失败即停」的刚性流程。注意 AGPL-3.0 对外提供服务触发源码开放义务、默认分支为 pro、含 drawio 与 mobile 两个子模块。评级：常规。目录总数由 93 增至 **94**。
- **OpenCut 开源视频剪辑器（2026-09-19）**：收录 `design-creative/opencut`（MIT）。★89.8k 的 CapCut 开源替代（web / 桌面 / 移动）：主仓库正以 Rust 核心 + 插件优先架构重写，规划 Editor API、内置 MCP 服务与 headless 批量渲染；今天可用的仍是 opencut.app 上运行的 classic 版，其源码仓 `opencut-app/opencut-classic` 已于 2026-05-17 归档。本地跑主仓库需先装 proto + moon 工具链。评级：常规。
- **Pixelle-Video AI 全自动短视频引擎（2026-09-19）**：收录 `design-creative/pixelle-video`（Apache-2.0）。★28.2k 的中文全自动短视频引擎：输入主题即完成文案、AI 配图/视频、配音、BGM 与合成出片，提供 Streamlit WebUI、Docker 与 API；图像/视频/TTS 可换 ComfyUI 工作流、RunningHub 或 DashScope / Seedream / Seedance / Kling 直连，Windows 有免环境一键整合包。上游已从 `AIDC-AI` 迁至 `ATH-MaaS`（旧地址跳转），最近推送 2026-06-14。评级：常规。
- **video-use 用编码 Agent 剪视频（2026-09-19）**：收录 `design-creative/video-use`（MIT）。★25.1k 的 browser-use 团队作品：素材丢进文件夹、跟 Claude Code 说一句话拿回 `final.mp4`，自动去口水词与废片段、逐段调色、切点 30ms 音频淡变防爆音、按样式烧字幕、并行子 Agent 生成动画叠加层，并在展示预览前对每个切点做渲染自检。思路是给 LLM 结构化输入而非抽帧：读 ElevenLabs Scribe 的 word 级转录（约 12KB）+ 按需 `timeline_view` 合成图。硬依赖 ffmpeg 与 ElevenLabs API Key。评级：常规。
- **成峰视频剪辑 Codex 插件包（2026-09-19）**：收录 `design-creative/chengfeng-videocut-skills`（Apache-2.0）。★3.0k 的中文短视频剪辑 Codex Plugin 公开安装入口：插件向 Agent 提供方法与确认工具，Runtime / Studio 负责工程操作与工作台，README 明确「装插件、备 Runtime、出片」是三件事。按观察期收录：3.0k star 集中在本安装入口仓，软件本体 `chengfeng-videocut` 仅 11 star；当前为 Plugin 0.10.10 配套 Runtime v0.4.11 CLI-only 预发行，本轮不推进 stable，无 Bun 自动准备仅覆盖 macOS arm64，安装需 Node 18+ 与支持 `codex plugin` 的 Codex CLI。评级：观察（watch）。目录总数由 89 增至 **93**（四条同批）。
- **Claude Code Haha 桌面工作台（2026-09-11）**：收录 `agent-infra/cc-haha`（MIT）。★14.3k 的本地优先跨平台桌面端 Claude Code / Agent 工作台（TypeScript + Electron + React + Bun）：多会话、分支/Worktree、Diff 审阅、内置浏览器预览、权限审批、模型自选、MCP 管理、SubAgent 与动态 Workflow 编排、Computer Use、技能市场、H5 远程访问与多 IM 接入。评级：常规。目录总数由 87 增至 **88**。
- **DeepSeek++ 浏览器 Agent 工作台（2026-09-11）**：收录 `agent-infra/deepseek-pp`（Apache-2.0）。★1.8k 的 DeepSeek 网页版浏览器扩展（Chrome / Edge / Firefox，TypeScript）：侧边栏 Agent 工作台，支持 MCP 工具、长期记忆、Skills、多模态媒体分析、网页控制、保存项、产物下载、对话导出与定时自动化。评级：常规。目录总数由 88 增至 **89**（两条同批）。

- **Caveman Agent 省 Token 工具集（2026-09-09）**：收录 `agent-infra/caveman`（MIT + BSL-1.1 拆分）。★104.5k 的 meme 外壳、严肃内核 token 优化工具集（Go + Markdown）：MIT skill 压缩 Agent 输出（10 条真实 Claude API 基准平均 -65%，代码/命令/路径/错误信息不压缩，30+ Agent 可装，含 wenyan 文言模式）；本地 Go proxy 压缩 Agent 读取的输入流（54-run Claude Code 基准 -33.2%，18/18 精确答案通过，原内容本地 SQLite 备份可恢复）；配套 learn / trial / shrink / browse / mem / convert 等 CLI 动词与 5 个 MCP 工具。评级：常规。目录总数由 81 增至 **82**。
- **Emil Kowalski 设计与动效技能集（2026-09-08）**：收录 `design-creative/emilkowalski-skills`（MIT）。★36.2k 的面向设计师与工程师技能合集（12 个 SKILL.md）：动画构建（Web / React Native）、严格动画审查、全库审计、动效机会挖掘、动画词汇、Apple 设计原则转译、现代 Swift、UI 库选型、多版本原型切换与 Sonner toast 指南；`npx skills@latest add emilkowalski/skills` 一键安装。评级：常规。
- **Dembrandt 网站设计系统提取器（2026-09-08）**：收录 `design-creative/dembrandt`（MIT）。★3.4k 的 TypeScript CLI（Node 18+）：Playwright 渲染并读取 DOM 计算样式，一条命令提取任意网站的设计 token（颜色 / 字体 / 间距 / 圆角 / 阴影 / 动效 / 组件 / 断点），支持 W3C DTCG、DESIGN.md、Tailwind v4 `@theme`、WCAG 审计、GitHub Action 漂移门禁与内置 MCP（`dembrandt-mcp`）。评级：常规。目录总数由 79 增至 **81**（两条同批）。
- **Kaneo 开源极简项目管理平台（2026-09-08）**：收录 `agent-infra/kaneo`（MIT）。★9.0k 的极简自托管项目管理平台（TypeScript / React + Hono）：看板、Issue、项目与标签一体，官方反对"功能堆叠"；每个实例内置 HTTP MCP 端点 `/api/mcp` 并发布官方 `@kaneo/mcp`（npm stdio），Claude、Cursor 等 MCP 客户端可在对话中直接管理任务、项目与标签；支持 Docker Compose / Coolify / Helm 自托管。评级：常规。目录总数由 78 增至 **79**。
- **CC Switch 多 Agent 供应商切换器（2026-09-06）**：收录 `agent-infra/cc-switch`（MIT）。★131.3k 的跨平台桌面应用（Tauri 2）：统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw、Grok Build 与 Hermes 等 8 款 AI 编程工具的供应商切换、MCP/Skills/Prompts 同步、本地代理故障转移与用量统计；50+ 内置供应商预设一键导入，SQLite 原子写入。评级：主推（core）。目录总数由 76 增至 **78**。
- **Codex++ Codex 桌面增强器（2026-09-06）**：收录 `agent-infra/codexplusplus`（AGPL-3.0-only）。★30.3k 的 OpenAI Codex / ChatGPT 桌面应用外部启动器与管理工具（Tauri 2 / Rust）：通过 CDP 注入提供供应商切换（官方登录 / 混入 API / 纯 API / 聚合轮转）、协议转换、会话管理（批量删除 / Markdown 导出 / Token 统计）与界面增强（中文 / 插件市场 / 滚动恢复），不修改 app.asar。评级：常规。目录总数由 76 增至 **77**（与 CC Switch 同批合计增至 **78**）。
- **Hell Grind AIGC Skill（2026-09-05）**：收录 `design-creative/hell-grind-aigc-skill`（MIT）。受 Higgsfield《Hell Grind》95 分钟 AI 故事片生产结构启发的模型无关 AIGC 视频生产管理器：七层提示词架构、22 个按需加载方法模块、14 张 schema v2 项目表、六大失败分类稳定错误码、本地确定性提示词审计器和只读项目校验器（0 网络请求 0 数据库操作）。评级：常规。目录总数由 75 增至 **76**。
- **Crawl4AI LLM 友好爬虫（2026-09-05）**：收录 `research-intel/crawl4ai`（Apache 2.0）。★81.4k 的 GitHub 最多 star 开源 LLM 友好爬虫：网页 → 干净 LLM-ready Markdown（Fit Markdown 去噪），异步浏览器池、深度爬取 + 崩溃恢复 + prefetch、CLI + Docker 部署；爬取零 API Key。评级：主推（core）。目录总数由 74 增至 **75**。
- **MediaCrawler 自媒体爬虫（2026-09-05）**：收录 `research-intel/mediacrawler`（NON-COMMERCIAL LEARNING LICENSE，仅限学习）。★64.5k 的多平台自媒体采集工具：小红书 / 抖音 / 快手 / B 站 / 微博 / 贴吧 / 知乎的关键词搜索、帖子详情、二级评论、创作者主页全支持；Playwright 保留登录态免 JS 逆向，CDP 模式降低风控风险。评级：常规。目录总数由 73 增至 **74**。
- **OpenScreen 开源录屏工具（2026-09-05）**：收录 `design-creative/openscreen`（MIT）。★39.9k 的 Screen Studio 免费开源替代：自动缩放跟随光标、光标主题、本地离线字幕、运动模糊、时间线标注、MP4 / GIF 多比例导出；100% 免费商用无水印；已官宣即将归档，社区 fork 继续维护。评级：常规。目录总数由 72 增至 **73**。
- **PMAgent-Canvas 本地创作画布（2026-09-05）**：收录 `design-creative/promptcard-agentcanvas`（Apache 2.0）。面向 AIGC 创作者的本地桌面创作上下文：参考素材 / Prompt / 分镜 / Agent 对话 / 生成结果以项目资产沉淀；Seedream 5.0 Pro 图片生成、Doubao Seed 2.0 Agent 协作、全能参考式提示词编辑；Windows 开发预览（稳定基线 stable-2026-08-25）。评级：常规。目录总数由 71 增至 **72**。
- **Cowart Codex 无限画布（2026-09-05）**：收录 `design-creative/cowart`（MIT）。★5.8k 的 Codex 原生 tldraw 画布 widget 插件：AI 图片框按框生成、标注截图自动去痕修订、AI HTML 框生成可运行单文件、AI Slides 16:9 演示文稿；画布数据持久化到项目目录；遵循 Agent Plugins v1.0.0 规范。评级：常规。目录总数由 70 增至 **71**。
- **Voicebox 本地 AI 语音工作室（2026-09-05）**：收录 `design-creative/voicebox`（MIT）。★52.4k 的开源本地 AI 语音工作室（ElevenLabs + WisprFlow 替代）：零样本声音克隆、7 个 TTS 引擎 23 语言、全局热键听写、Stories 多轨编辑、内置 MCP server 让任何 Agent 开口说话；Tauri (Rust) 原生，100% 本地隐私。评级：主推（core）。目录总数由 69 增至 **70**。
- **Palmier Pro AI 视频剪辑（2026-09-05）**：收录 `design-creative/palmier-pro`（历史 GPLv3 / 当前二进制专有）。★14.3k 的 YC S24 macOS 原生视频剪辑器（Swift 从零构建，对标 Premiere Pro）：时间线上直接调用 Seedance / Kling / Nano Banana Pro 生成内容，MCP 让 Claude / Codex / Cursor 直接操作时间线。评级：常规。目录总数由 68 增至 **69**。
- **Meetily 隐私优先会议助手（2026-09-05）**：收录 `ops-automation/meetily`（MIT）。★30.4k 的 100% 本地 AI 会议助手：Parakeet / Whisper 实时转写（4 倍速）+ 说话人分离 + Ollama 本地摘要，零云端依赖；支持导入已有音频重转写、自定义 OpenAI 端点；macOS / Windows 桌面应用。评级：主推（core）。目录总数由 67 增至 **68**。
- **HyperFrames HTML 视频渲染（2026-09-05）**：收录 `design-creative/hyperframes`（Apache 2.0）。★44.1k 的 HeyGen 开源 HTML → 确定性 MP4 渲染框架：Agent 写 HTML + 可 seek 动画，20 个内置 skill 按需加载（产品发布视频 / 无脸解说 / PR-to-video 等），agent-first 设计区别于 Remotion 的 React 路线。评级：主推（core）。目录总数由 66 增至 **67**。
- **Humanizer-zh AI 写作去痕（2026-09-05）**：收录 `writing-docs/humanizer-zh`（MIT）。★16.7k 的 blader/humanizer 中文汉化版 Claude Code Skill：识别并修复 24 种 AI 写作痕迹（内容 / 语法 / 风格 / 填充词四大类），附中文 AI 高频词警示列表。评级：常规。目录总数由 65 增至 **66**。
- **Guizang PPT Skill 网页 PPT（2026-09-05）**：收录 `design-creative/guizang-ppt-skill`（AGPL-3.0）。★25.7k 的歸藏出品 Agent PPT 技能：单文件 HTML 横向翻页，双视觉系统（电子杂志 / 瑞士国际主义）+ 32 种锁定版式，GPT-Image 配图、多平台封面、演讲者模式。评级：主推（core）。目录总数由 64 增至 **65**。
- **CapCut Mate 剪映自动化（2026-09-05）**：收录 `design-creative/capcut-mate`（Apache 2.0）。★1.7k 的剪映草稿自动化 API（FastAPI）：创建草稿 / 添加素材 / 关键帧 / 字幕 / 云渲染，支持 Coze 插件一键导入与 n8n 工作流集成，让大模型具备剪映剪辑能力。评级：常规。目录总数由 63 增至 **64**。
- **OpenPencil AI 原生矢量设计工具（2026-09-05）**：收录 `design-creative/openpencil`（MIT）。★5.8k 的首个开源 AI 原生矢量设计工具：Prompt → Canvas 流式呈现、并发 Agent Teams 空间分解并行作画、Design-as-Code（.op 文件 JSON 可 diff）、MCP Server 一键接入 Claude Code / Codex、10+ 平台代码导出（React / Vue / SwiftUI / Flutter 等）。评级：主推（core）。目录总数由 62 增至 **63**。
- **Cangjie Skill 内容蒸馏（2026-09-05）**：收录 `meta-skillcraft/cangjie-skill`（MIT）。★9.5k 的内容蒸馏为 Agent Skills 框架：RIA-TV++ 七阶段流水线（Adler 分析 → 5 专项提取 → 三重验证 → 能力卡 → Zettelkasten 链接 → 压力测试 → 确定性编译），把书 / 长视频 / 播客蒸馏为可调用可组合的压力测试 Agent Skills；附 20+ 已蒸馏示例；支持 OpenClaw / Claude Code / DeepSeek Harness。评级：主推（core）。目录总数由 61 增至 **62**。
- **VoxCPM2 无 Tokenizer TTS（2026-09-05）**：收录 `design-creative/voxcpm`（Apache 2.0）。★36.7k 的 OpenBMB 2B tokenizer-free TTS：扩散自回归直接生成连续语音，30 语言（含 9 种中文方言）、自然语言 voice design、可控与终极克隆、48kHz 输出、RTF 低至 0.13（vLLM-Omni）；Apache 2.0 商用可用。评级：主推（core）。目录总数由 60 增至 **61**。
- **TREK 自托管旅行规划（2026-09-05）**：收录 `ops-automation/trek`（AGPL-3.0）。★13.2k 的自托管实时协作旅行规划器：日计划拖拽 + OSRM 路由 2-opt 排线、Leaflet/Mapbox/MapLibre 地图、16 种预订类型（4,045 内置机场免 key 时区解析）、费用分摊多币种、打包清单、GPX/KML 导入导出、PWA、SSO/Passkey/TOTP MFA、内置 AI 解析与 MCP addon。评级：常规。目录总数由 59 增至 **60**。
- **InfiniteTalk 无限长口播视频（2026-09-05）**：收录 `design-creative/infinitetalk`（Apache 2.0）。★7.8k 的 MeiGen-AI 音频驱动无限长口播视频生成：稀疏帧配音同时对齐唇形 + 头部 + 肢体 + 表情，支持 image-to-video 与 video-to-video；Gradio demo + ComfyUI 分支 + Wan2GP 低显存集成；后续演进为 LongCat-Video-Avatar 系列。评级：常规。目录总数由 58 增至 **59**。
- **Abogen 有声书生成器（2026-09-05）**：收录 `design-creative/abogen`（MIT）。★5.9k 的本地 TTS 工具：ePub / PDF / 文本 / Markdown / 字幕文件一键转高质量音频 + 同步字幕；基于 Kokoro-82M 本地推理（无 API 费用），支持 voice mixer、章节控制、队列批量、M4B 带章节输出。评级：常规。目录总数由 57 增至 **58**。
- **Astryx 设计系统（2026-09-05）**：收录 `design-creative/astryx`（MIT）。★12.8k 的 Meta 开源 React 19 设计系统：150+ 可访问组件、7 主题、深色模式、页面模板；agent-ready CLI 提供能力清单、typed JSON、稳定错误码，`astryx init` 自动写入 AGENTS.md / CLAUDE.md 让 Agent 即刻上手；内置 StyleX 但不锁定样式。评级：主推（core）。目录总数由 56 增至 **57**。
- **OfficeCLI AI Office 套件（2026-09-05）**：收录 `business-office/officecli`（Apache 2.0）。★29.9k 的 AI Agent 专用 Office 套件 CLI：单二进制（内嵌 .NET）无需安装 Office，读写编辑 Word / Excel / PowerPoint 三格式；内置渲染引擎（HTML / PNG / watch 实时预览）、350+ Excel 函数自动求值、OOXML 原生数据透视表、模板合并与 round-trip dump，MCP server 一键接入 Claude Code / Cursor。评级：主推（core）。目录总数由 55 增至 **56**。
- **OpenOPC 个人 AI 原生公司（2026-09-05）**：收录 `agent-infra/openopc`（MIT）。港大 HKUDS 出品的个人 AI 原生公司运行时：Self-Built 自动建组织、Self-Run 状态机驱动多角色 DAG 协作、Self-Grown 按角色归因学习沉淀组织记忆；支持 Codex / Claude Code / Cursor 等作为执行引擎，附像素风办公室 UI 与 10+ 消息渠道。评级：常规。目录总数由 54 增至 **55**。
- **AI Job Search 求职申请框架（2026-09-05）**：收录 `business-office/ai-job-search`（MIT）。★40.8k 的 Claude Code 求职申请框架：13 个斜杠命令覆盖建档、多门户职位抓取与批量评分、drafter-reviewer 流水线生成 LaTeX 定制 CV 与求职信（PDF 排版 + ATS 文本层双重校验）、面试准备与结果跟踪；作者实测 69 份申请拿到 offer。评级：主推（core）。目录总数由 53 增至 **54**。
- **AI MediaKit CLI 音视频工具箱（2026-09-05）**：收录 `design-creative/mediakit-cli`（MIT）。火山引擎 MediaKit 官方 CLI：兼容 FFmpeg 命令面，本地跑裁剪/拼接/字幕等 23 项剪辑操作，`--cloud` 一键切换云端 AI 能力（画质增强、字幕擦除、ASR、OCR、高光智剪、剧情线分析等），覆盖视频/图像/音频 80+ 原子能力与 5 个 Agent Skill。评级：常规。目录总数由 52 增至 **53**。
- **Browser Use 浏览器 Agent（2026-09-05）**：收录 `agent-infra/browser-use`（MIT）。让 AI Agent 像人一样操作浏览器的开源框架：支持页面导航、表单填写、数据提取、自定义工具与多种 LLM，可作为 Python 库嵌入自动化流程，也可通过 CLI/技能接入 Claude Code、Codex、Cursor 等编码 Agent。评级：主推。目录总数由 51 增至 **52**。
- **Anime.js 动画引擎（2026-09-05）**：收录 `design-creative/animejs`（MIT）。Julian Garnier 维护的轻量 JavaScript 动画引擎：统一驱动 CSS、SVG、DOM 属性与 JavaScript 对象，V4 提供模块化时间轴、弹簧缓动、滚动、拖拽、文本拆分、WAAPI 与可选 Three.js 适配。评级：主推。目录总数由 50 增至 **51**。
- **AiToEarn AI 内容营销智能体（2026-09-05）**：收录 `agent-infra/aitoearn`（MIT）。面向一人公司与创作者的 AI 内容营销平台：Agent 批量生成视频/图文，排期分发到抖音、小红书、TikTok、YouTube、X 等平台，并支持自动化互动、转化信号识别与 CPS/CPE/CPM 变现；提供 Web、MCP、OpenClaw 插件、Docker 自部署与 Electron 客户端。评级：常规。目录总数由 49 增至 **50**。
- **GSAP 动画平台（2026-09-05）**：收录 `design-creative/gsap`（Standard “no charge” license，LicenseRef 标注）。GreenSock 维护的高性能 JavaScript 动画框架：统一驱动 CSS、SVG、Canvas、WebGL 与通用对象的时间轴动画，内置 ScrollTrigger、Flip、MotionPath 等插件。评级：主推。目录总数由 48 增至 **49**。
- **StaffDeck 企业数字员工平台（2026-09-05）**：收录 `agent-infra/staffdeck`（AGPL-3.0）。OpenBMB 开源的企业数字员工平台：把业务经验、SOP、决策标准与知识库沉淀为可持续运行的数字员工，支持状态机流程、文档感知检索、MCP/HTTP 工具执行、长期记忆与审计。评级：常规。目录总数由 47 增至 **48**。
- **Skill Recorder 屏幕工作录制转技能（2026-09-05）**：收录 `meta-skillcraft/skill-recorder`（MIT）。微软开源的桌面应用：录制屏幕工作过程，用 GitHub Copilot CLI 重建为意图与有序步骤，再生成可复用 Skill 或定时 Automation，供 Scout / Copilot Cowork / Copilot Studio 使用。评级：常规。目录总数由 46 增至 **47**。
- **WeKnora 开源 LLM 知识平台（2026-09-05）**：收录 `agent-infra/weknora`（MIT）。腾讯开源的企业级 LLM 知识平台：把文档转成可检索 RAG、自主推理 Agent 与自维护 Wiki，支持多源知识库、MCP Server、DSH 插件、Agent Skills、Web/API/CLI/IM 渠道与私有化部署。评级：常规。目录总数由 45 增至 **46**。
- **Visual Skills AI 影像导演技能集（2026-09-05）**：收录 `design-creative/visual-skills`（CC BY 4.0）。面向 Agent 的电影级 AI 影像导演技能集，`video` 负责先做戏剧结构再生成 Seedance / Kling / Veo 提示词，`image` 负责 Nano Banana / GPT Image 的分镜与关键帧。评级：常规。目录总数由 44 增至 **45**。

---

### 更新
- **全量刷新上游指标（2026-09-24）**：对 77 个带 `metrics` 块的条目重新拉取 GitHub 数据，76 条更新 `stars` 与 `pushed_at`，`checked_at` 统一置为 2026-09-24。涨幅居前：`awesome-gpt-image-2` 19,916→33,475、`openmontage` 50,726→61,149、`hyperframes` 44,054→52,821、`money-printer-turbo` 116,792→125,471、`weknora` 21,375→29,644；另把 `anthropics-office-skills`、`agent-skills-spec`、`dashi-ppt-skill` 三条 `stars: null` 补成实际值。
- **两处上游已归档**：`design-creative/openscreen`（★39,966，末次推送 2026-06-17）与 `agent-infra/deepseek-pp`（★1,871，末次推送 2026-08-13）的 `metrics.archived` 由 false 改为 true。两者 tier 暂仍为 `standard`，是否按收录标准降为 `watch` 待维护者判定。
- **正文写死的星号同步刷新**：条目详情页与 `skills.json` 不同，正文里的星号是手写进散文的（如 `> 上游：… · 44.1k stars`），不随 `metrics` 自动更新。本次把 27 个条目「当前状态」语义的星号（标题行与「维护活跃」句）改到实测值，千位以下改用实际数字（如 `约 0.3k` → `约 331`）；明确标注「截至 <日期> 核验」的历史陈述保持原样不动。

## 2026-08

### 新增

- **ChatGPT Shortcut 提示词快捷指令库（2026-08-30）**：收录 `business-office/chatgpt-shortcut`（MIT）。★8.7k 的可检索提示词库网站（AiShort）：按职业/场景分类的现成提示词卡片，支持搜索、筛选与个人收藏库，配浏览器扩展与 Docker 自托管。注意其为网站形态、非 SKILL.md 项目，仅作提示词参考库收录。评级：常规。目录总数由 43 增至 **44**。
- **漫剧老李 AIGC 全流程 Skill（2026-08-30）**：收录 `design-creative/manju-laoli-skill`（MIT）。面向抖音 & 红果短剧/漫剧的工业化编剧与视听导演系统：五阶门控剧本、七维台词诊断、资产三视图锁、文武双模分镜、15 秒打戏 PREVIS、Seedance 三层解耦提示词与 P0~P2 质检门禁。测试版，评级：观察。目录总数由 42 增至 **43**。
- **口播视频动效工作室（2026-08-30）**：收录 `design-creative/video-talkcraft`（PolyForm Noncommercial 1.0.0）。video-shotcraft 系列口播篇：字级配音同步、78 张动效配方卡、七层反 PPT 镜头系统、三重验收，Remotion 渲染解说成片。评级：常规。目录总数由 41 增至 **42**。
- **Remotion 官方 Agent Skills（2026-08-29）**：收录 `design-creative/remotion-skills`（协议未标注，UNKNOWN），评级：主推（core）。Remotion（React 写视频的事实标准框架）官方维护的约 12 个 Agent Skills：建项目、标记最佳实践、Studio 预览、渲染、地图动画、字幕、SaaS 架构、文档检索与升级等，`npx skills add remotion-dev/skills` 一键安装。目录总数由 40 增至 **41**。
- **花叔设计 HTML 原生设计系统（2026-08-29）**：收录 `design-creative/huashu-design`（MIT），评级：**主推（core）并入选首页精选**。花叔旗舰设计技能（★23.6k，库内热度第一）：Agent 内一句话产出高保真原型、可编辑 PPTX 幻灯片、MP4/GIF 时间轴动画与印刷级信息图，内置三套逻辑设计顾问、60 种纯 CSS 风格库、品牌资产协议与 5 维专家评审，核心链路 100% 本地运行，跨 Claude Code/Codex/Cursor 等通用。目录总数由 39 增至 **40**。
- **花叔开源 Skills 总目录（2026-08-29）**：收录 `writing-docs/huashu-skills`（协议未标注，UNKNOWN）。花叔（alchaincyf）全部开源 Agent Skills 的总目录，52 个标准 SKILL.md 技能分三层：16 旗舰独立仓库 + 14 人物视角 + 22 内置轻量创作技能，覆盖选题/写作/审校/配图/分发流水线，附 AI Agent 安装协议与机器可读 skills.json。评级：常规。目录总数由 38 增至 **39**。
- **Open Storyboard Canvas 开源画布（2026-08-27）**：收录 `design-creative/open-storyboard-canvas`（MIT）。面向 AI 图片、视频与分镜创作的本地节点画布，含画布 Agent、导演台与多供应商管理。评级：常规。
- **AIMangaStudio（2026-08-27）**：收录 `design-creative/aimangastudio`（MIT）。利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，导出 PNG/PDF。早期项目，评级：观察。
- **AIGC CANVAS 短剧生产工作台（2026-08-27）**：收录 `design-creative/aigc-line`（MIT）。面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台。评级：常规。
- **影策 Open AI Canvas 影视创作工作台（2026-08-27）**：收录 `design-creative/open-ai-canvas`（MIT）。开源 AI 影视与短剧创作工作台，支持自部署与 Codex MCP。评级：常规。
- **Depth Studio 深度视频生成（2026-08-27）**：收录 `design-creative/depth-studio`（MIT）。把参考视频转换为时空一致的灰度深度视频，为 AI 视频工具提供空间引导（换角色、加角色、保持动作）。早期项目，评级：观察。
- **Karpathy 编码指南（2026-08-28）**：收录 `dev-engineering/andrej-karpathy-skills`（MIT）。将 Andrej Karpathy 关于 LLM 编码通病的观察提炼为「先思考、简洁优先、外科手术式改动、目标驱动执行」四条编码准则，支持 CLAUDE.md、Claude Code 插件与 Cursor 规则。评级：常规。
- 本次共新增 6 个条目，目录总数由 47 增至 53。

### 移除

- **人工筛选中剔除 15 个条目（2026-08-28）**：维护者人工复核后下架 15 个方向不符或分类重叠/协议受限的条目，目录总数由 53 减至 **38**。其中 `data-analytics` 与 `ops-automation` 两个分类因此整体清空，`meta-skillcraft` 的 core 主推 `superpowers` 一并下架。明细见文末「已移除条目存档」。

### 结构

- **目录格式与自动审核边界（2026-08-27）**：新增 `entry-record` 与 `installable-skill` 两种机器可校验格式；根目录推荐器是唯一可安装 Skill，`entries/**/SKILL.md` 仅作为目录数据。新增上游仓库、许可证、安装来源、分类置信度与健康分审核，确定性推荐初筛、离线回归测试和每周漂移报告。

- **新增 DSH 一级分类（2026-08-26）**：为收录 DeepSeek Harness（DSH）社区插件，新增一级分类 `dsh`
  （`entries/dsh/`，中文名「DSH 插件」）。同步更新 `scripts/schema/meta.schema.json` 的 `category`
  枚举、`scripts/_common.py` 的 `CATEGORIES` 字典、`README.md` 与 `docs/writing-skill-md.md` 的
  「九大分类」措辞（改为十大 / 一级分类）；`entries/dsh/README.md` 记录 DSH 定位、安装方式与 11 个
  插件子类。该分类当前为空，待后续以 `category: dsh` 收录具体插件条目。
- **新增在线预览静态站 + README 改版（2026-08-26）**：参照 awesome-design-md-cn 的项目形态，
  新增 `scripts/gen_site.py`（解析 `entries/**/SKILL.md` 自动生成 `site/data/skills.json` 与
  `site/skills/<id>.html` 详情页）；新增 `site/`（首页搜索 + 分类 / 标签 / 评级 / 协议 筛选 +
  卡片网格、`assets/style.css`、`assets/app.js`）；新增 `.github/workflows/deploy.yml`
  （push main 时自动生成并发布到 GitHub Pages `gh-pages`，在线地址
  [在线地址](https://avalonlee.github.io/AstraCraft-Program/)）；README 改写为 awesome-list 风格（徽章、什么是
  SKILL.md、每个 SKILL.md 里有什么、九大分类、在线预览入口），保留原有收录标准 / 协议 / 贡献 /
  下架等实质内容；`index-check.yml` 增加站点生成器校验任务。
- **设定调整：从「快照式收录」改为「轻量索引」**：不再收录上游源码快照——删除所有
  `src/`、`upstream.lock` 与 vendoring 工具链（`vendor.py` 移除）；每个条目只保留一个
  `SKILL.md`（frontmatter 元数据 + 介绍 + 安装指令），Agent 据此快速定位并安装对应
  skill 项目。脚本（validate/gen_index 改为解析 SKILL.md frontmatter）、docs、
  .gitignore/.gitattributes、CI 同步改写
- **仓库结构重组**：九大用途分类移入统一 `entries/` 大目录；文档类文件
  （CONTRIBUTING / CODE_OF_CONDUCT / CHANGELOG / THIRD_PARTY_NOTICES）统一移入 `docs/`；
  根目录仅保留 README / INDEX / LICENSE / LICENSE-CODE 等核心入口。脚本与 CI 同步适配
  新路径（`_common.py` 的发现路径与常量、`gen_index.py` 的链接前缀、
  `.gitignore` 白名单、`.gitattributes` linguist 规则）
- 仓库初始化：确立九大用途分类、三色协议分级、快照式 vendoring 机制
- 建立 `_template/` 条目脚手架（`meta.yml` / `upstream.lock` / `README.zh-CN.md` /
  `NOTES.zh-CN.md` / `GET-IT.md`）
- 建立 `scripts/` 工具链：`validate.py`（校验）、`gen_index.py`（索引生成）、
  `vendor.py`（快照拷贝）
- 建立 CI：`index-check.yml`（元数据校验 + INDEX 防脱节）、
  `link-check.yml`（PR 增量 + 每周全量死链检查）
- 确立双许可：原创文档 CC BY 4.0，`scripts/` 代码 MIT

### 修复

- **修复 `.gitattributes` 换行符陷阱**：原 `* text=auto eol=lf` 会把 vendored 的
  `src/` 在全新 checkout 时归一化成 LF，导致 `upstream.lock` 的 `content_hash`
  失配、`vendor.py --verify` 在 Linux CI runner 必然失败。改为对 `**/src/**` 设
  `-text`（git 不触碰换行符），仓库存上游原始字节；已 `git add --renormalize`
  让 superpowers/src 的 blob 回到 CRLF。同时修正了 `docs/vendoring-guide.md`
  里与之相反的错误说明。

### 新增

- **补齐五个空分类（2026-08-27）**：研发与代码、数据与分析、研究与信息获取、运维与自动化、DSH 插件各新增 5 个经自动核验的真实 GitHub 项目，目录总数由 22 增至 47。两个已归档首选项目由同分类后备 `microsoft/RD-Agent` 与 `PrefectHQ/prefect` 替换；两个无法机器识别许可证的数据技能条目降为 `watch`。

- `agent-infra/tencentdb-agent-memory` —— 腾讯云 Agent 团队级记忆中心（📦 vendored，
  MIT，A 级，standard 评级，未实测）
- `meta-skillcraft/agent-skills-spec` —— Agent Skills 开放规范（🔗 存根）
- `meta-skillcraft/superpowers` —— obra/superpowers 技能集（📦 vendored，MIT）
- `business-office/anthropics-office-skills` —— Anthropic Office 文档技能
  （🔗 存根，source-available 不可转载）
- `design-creative/awesome-design-md-cn` —— 中文 DESIGN.md 设计资源集
  （🔗 链接索引，基于 VoltAgent/awesome-design-md 中文本地化；上游未声明许可证，standard 评级）
- `design-creative/character-casting-studio-skill` —— 人物角色 Casting 工作室 Skill
  （🔗 链接索引，面向 Codex 的素材参考驱动写实人物角色生成；上游未声明许可证，standard 评级）
- `design-creative/cinema-dna-21x9x3` —— Cinema DNA 21:9×3 电影画面生成 Skill
  （🔗 链接索引，面向 Codex 的电影感三联叙事画面生成；上游未声明许可证，standard 评级）
- `design-creative/fantasy-life-force-portrait-photography` —— Fantasy 生命感人像摄影 Skill
  （🔗 链接索引，面向 Codex 的生命感人像摄影；上游未声明许可证，standard 评级）
- `writing-docs/zenstory` —— ZenStory AI 小说写作工作台
  （🔗 链接索引，React+FastAPI 多 Agent 小说写作工作台；MIT，standard 评级）
- `writing-docs/oh-story-claudecode` —— OH-Story 网文/小说写作 Skill 包
  （🔗 链接索引，Claude Code 网文写作 skill 包，13 个 skill；GitHub 识别 MIT，standard 评级）
- `writing-docs/drama-skills` —— Drama Skills AI 短剧创作技能合集
  （🔗 链接索引，Claude Code/Codex 短剧创作 skill 合集，10 个技能；MIT，standard 评级）
- `design-creative/awesome-gpt-image-2` —— GPT-Image2 工业级提示词引擎与模板库
  （🔗 链接索引，面向 GPT-Image2 的 Prompt-as-Code 提示词/模板库，530+ 案例、20+ 模板、自带 Agent Skill；MIT，standard 评级）
- `agent-infra/codex-taskboard` —— Codex Taskboard 本地任务看板
  （🔗 链接索引，本地优先 issue 看板 + taskctl CLI + 随附 Codex Skill；Apache-2.0，standard 评级）
- `writing-docs/dashi-ppt-skill` —— Dashi PPT Skill 大师 PPT
  （🔗 链接索引，面向职场的可编辑 PPT 生成 Skill，npx 安装，导出 HTML/PDF/PPTX；AGPL-3.0，standard 评级）
- `SKILL.md`（仓库根目录）—— 天工精选（AstraCraft Recommender）：本计划配套推荐技能，Agent 安装后依据项目描述与运行情况在本库做语义匹配并给出安装指引；每轮推荐 3 个标准化格式、本地数据超 7 天主动提示更新、推荐新项目仅限 GitHub 公开开源（CC-BY-4.0，standard 评级）。该技能作为仓库根目录**独立配套技能**存在，不纳入库目录条目计数（当前库目录 22 个），便于 Agent 直接抓取安装；2026-08-27 新增。配套地，README 与在线预览站首页同步增加「一句话装到你的 Agent」快捷安装指令（复制引导句发给 AI Agent 即可完成安装）。
- **安装机制修复（2026-08-27）**：根 `SKILL.md` 原「怎么安装」让 Agent `git clone` 整个仓库，导致 Agent 的技能扫描把 `entries/` 下 22 份库条目 `SKILL.md` 一并注册成 22 个技能（误装）。已改为「只下载根目录这一份 `SKILL.md` 单文件」安装，库数据拉取到与 skills 隔离的缓存目录（`~/.cache/astracraft-entries/`），并新增显式警告与「误装清理」指引；README / 首页安装引导句同步强调「只装根目录那一份」。

---

## 已移除条目存档

- **nimrodfisher-data-analytics-skills** — <https://github.com/nimrodfisher/data-analytics-skills> — 2026-08-28 — 人工筛选剔除
- **pymc-labs-python-analytics-skills** — <https://github.com/pymc-labs/python-analytics-skills> — 2026-08-28 — 人工筛选剔除
- **astronomer-agents** — <https://github.com/astronomer/agents> — 2026-08-28 — 人工筛选剔除
- **evidence-dev-evidence** — <https://github.com/evidence-dev/evidence> — 2026-08-28 — 人工筛选剔除
- **marimo-team-marimo** — <https://github.com/marimo-team/marimo> — 2026-08-28 — 人工筛选剔除
- **addyosmani-agent-skills** — <https://github.com/addyosmani/agent-skills> — 2026-08-28 — 人工筛选剔除
- **alirezarezvani-claude-skills** — <https://github.com/alirezarezvani/claude-skills> — 2026-08-28 — 人工筛选剔除
- **sickn33-antigravity-awesome-skills** — <https://github.com/sickn33/antigravity-awesome-skills> — 2026-08-28 — 人工筛选剔除
- **github-awesome-copilot** — <https://github.com/github/awesome-copilot> — 2026-08-28 — 人工筛选剔除
- **superpowers** — <https://github.com/obra/superpowers> — 2026-08-28 — 人工筛选剔除
- **ansible-ansible** — <https://github.com/ansible/ansible> — 2026-08-28 — 人工筛选剔除
- **dagu-org-dagu** — <https://github.com/dagu-org/dagu> — 2026-08-28 — 人工筛选剔除
- **kestra-io-kestra** — <https://github.com/kestra-io/kestra> — 2026-08-28 — 人工筛选剔除
- **prefecthq-prefect** — <https://github.com/PrefectHQ/prefect> — 2026-08-28 — 人工筛选剔除
- **pulumi-pulumi** — <https://github.com/pulumi/pulumi> — 2026-08-28 — 人工筛选剔除
