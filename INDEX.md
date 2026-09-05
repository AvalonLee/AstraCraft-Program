<!--
  ⚠️ 本文件由 scripts/gen_index.py 自动生成，请勿手动编辑。

  修改条目信息请编辑对应的 entries/<分类>/<id>/SKILL.md（frontmatter），然后执行：
      python scripts/gen_index.py

  CI 会重新渲染并与本文件比对，不一致将导致构建失败。
-->

# 索引

AstraCraft Program（天工计划）全部收录条目的交叉检索表。六个视图对应六种找东西的方式：
知道大概用途就看[分类](#二按分类)，有明确关键词就看[标签](#三按标签)，
关心技术栈就看[语言](#四按语言)，在意合规就看[协议](#五按协议)。

图例：★ 主推 · ⚠️ 有风险备注

> 每个条目只有一个 `SKILL.md`（介绍 + 安装指令）。Agent 点链接读取该文件，
> 即可快速定位并安装对应的 skill 项目；本仓库**不收录上游源码快照**。

---

## 一、全量总表

共 76 个条目，按分类与名称排序。

| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |
|---|---|---|---|---|---|---|
| ⚠️ | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 面向一人公司与创作者的 AI 内容营销平台：用 Agent 批量生成视频/图文，排期分发到抖音、小红书、TikTok、YouTube、X 等平台，并支持自动化互动、评论转化信号识别与 CPS/CPE/CPM 内容变现。 |
| ★ ⚠️ | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) | Agent 基础设施 | 框架 | MIT | 主推 | 让 AI Agent 像人一样操作浏览器的开源框架：打开页面、点击、输入、填表和提取结构化数据；可作为 Python 库嵌入自动化流程，也可通过 CLI/技能接入 Claude Code、Codex、Cursor 等编码 Agent，并支持自定义工具与多种 LLM。 |
| ⚠️ | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | Agent 基础设施 | 框架 | Apache-2.0 | 常规 | 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。 |
| ⚠️ | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 港大 HKUDS 出品的个人 AI 原生公司运行时：给定目标自动建组织（Self-Built）、状态机驱动多角色协作交付（Self-Run）、按角色归因学习沉淀组织记忆（Self-Grown）；支持 Codex / Claude Code / Cursor 等作为执行引擎，附像素风办公室 UI 与 10+ 消息渠道。 |
| ⚠️ | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) | Agent 基础设施 | 框架 | AGPL-3.0 | 常规 | OpenBMB 开源的企业数字员工平台：把业务经验、SOP、决策标准与知识库沉淀为可持续运行的数字员工，支持状态机流程、文档感知检索、MCP/HTTP 工具执行、长期记忆与审计。 |
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |
| ⚠️ | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 腾讯开源的企业级 LLM 知识平台：把文档转成可检索 RAG、自主推理 Agent 与自维护 Wiki；支持多源知识库、MCP Server、DSH 插件、Agent Skills、Web/API/CLI/IM 渠道与私有化部署。 |
| ★ ⚠️ | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) | 商业与办公 | 框架 | MIT | 主推 | 基于 Claude Code 的开源求职申请框架：建档、职位抓取与批量评分、fit 评估、drafter-reviewer 流水线生成 LaTeX 定制 CV 与求职信（PDF 排版 + ATS 文本层双重校验）、面试准备与模拟，共 13 个斜杠命令；作者实测 69 份申请拿到 offer。 |
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 商业与办公 | 技能集 | LicenseRef-Anthropic-Source-Available | 常规 | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| ⚠️ | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) | 商业与办公 | 框架 | MIT | 常规 | 面向普通用户的可检索提示词库——按职业与场景分类的现成提示词卡片，拿来就用，支持搜索、筛选、收藏自己的常用库，覆盖文案、办公、营销、编程等场景，配浏览器扩展与 Docker 自托管方案。注意：非 SKILL.md 形态，作为提示词参考库使用而非可安装技能。 |
| ★ ⚠️ | [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) | 商业与办公 | CLI 工具 | Apache-2.0 | 主推 | 专为 AI Agent 设计的 Office 套件 CLI：单二进制无需安装 Office，读写编辑 Word / Excel / PowerPoint；内置渲染引擎（HTML / PNG / watch 实时预览）、350+ Excel 函数求值、原生数据透视表、模板合并与 round-trip dump，MCP server 一键接入主流 Agent。 |
| ⚠️ | [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) | 设计与创意 | CLI 工具 | MIT | 常规 | 把 ePub / PDF / 文本 / Markdown / 字幕文件转为高质量音频并生成同步字幕：基于 Kokoro-82M 本地 TTS，支持语音混合器、章节控制、队列批量处理、多输出格式（WAV / FLAC / MP3 / OPUS / M4B 带章节），跨 Windows / macOS / Linux。 |
| ⚠️ | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台：从剧本解析、角色一致性底图、场景图与分镜到多模态视频生成与分析，Agent 通过内置 Skill 与 MCP 画布工具持续操作同一张无限画布。 |
| ⚠️ | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | 设计与创意 | 框架 | MIT | 观察 | 利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，集成剧情生成、分镜布局、角色设定与页间连续性分析，支持多页漫画导出为 PNG/PDF。 |
| ★ ⚠️ | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) | 设计与创意 | 框架 | MIT | 主推 | 轻量多用途 JavaScript 动画引擎：用统一 API 驱动 CSS、SVG、DOM 属性与 JavaScript 对象；V4 提供模块化时间轴、弹簧缓动、滚动、拖拽、文本拆分、WAAPI 与 Three.js 适配，适合界面、图表和创意页面动效。 |
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 观察 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ★ ⚠️ | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) | 设计与创意 | 框架 | MIT | 主推 | Meta 八年打磨的开源 React 19 设计系统：150+ 可访问组件、7 主题、agent-ready CLI（能力清单 + typed JSON + 稳定错误码），`astryx init` 自动写入 AGENTS.md；内置 StyleX 但不锁定样式，Tailwind / CSS 原生覆盖。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 设计与创意 | 技能集 | UNKNOWN | 常规 | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | 开源剪映草稿自动化助手（FastAPI）：让大模型具备剪映基础剪辑能力——创建草稿、添加视频/音频/图片/贴纸/字幕/特效/蒙版、关键帧控制、文本样式与动画；支持独立部署、Coze/n8n 工作流集成、剪映云渲染直接生成成片，提供 Coze 插件一键导入。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) | 设计与创意 | 技能包 | MIT | 常规 | 面向 Codex 的原生无限画布 widget 插件（基于 tldraw）：在 Codex 内直接打开可视化画布用于构思、标注、AI 图片生成与迭代；AI 图片框按框位置和比例生成并替换、标注截图自动去痕生成修订图、AI HTML 框生成可运行单文件页面、AI Slides 组合为 16:9 演示文稿；画布数据持久化到项目目录。 |
| ⚠️ | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | 设计与创意 | 框架 | MIT | 观察 | 把一段普通参考视频转换成时空一致的灰度深度视频，为 AI 视频工具提供角色姿态、动作、轮廓与相机距离的空间引导，辅助换角色、加角色或保持动作一致。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ★ ⚠️ | [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) | 设计与创意 | 框架 | LicenseRef-GSAP-Standard-No-Charge | 主推 | 高性能 JavaScript 动画库：统一驱动 CSS、SVG、Canvas、WebGL 与通用对象的时间轴动画，内置 ScrollTrigger、Flip、MotionPath 等插件，适合交互页面、数据可视化和产品演示的动效实现。 |
| ★ ⚠️ | [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) | 设计与创意 | 技能包 | AGPL-3.0 | 主推 | 歸藏出品的 AI Agent 网页 PPT 技能：生成单文件 HTML 横向翻页 PPT，内置双视觉系统（Style A 电子杂志 × 电子墨水 / Style B 瑞士国际主义）、32 种锁定版式、PPT 配图（GPT-Image 2.0）、多平台封面（公众号 21:9 / 小红书 3:4）、演讲者模式与低性能静态模式。 |
| ⚠️ | [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) | 设计与创意 | 技能包 | MIT | 常规 | 模型无关的 AIGC 视频生产管理器（受 Higgsfield《Hell Grind》95 分钟 AI 故事片生产结构启发）：七层提示词架构、22 个按需加载方法模块、14 张 schema v2 项目表（资产 / 场次 / 镜头契约 / 提示词 / 生成 / 迭代 / 选片 / 豁免）、六大失败分类稳定错误码、本地确定性提示词审计器和只读项目校验器（0 网络请求 0 数据库操作）。 |
| ★ ⚠️ | [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) | 设计与创意 | 技能包 | MIT | 主推 | 在 Agent 里一句话拿回可交付设计的 HTML 原生设计技能：高保真原型、演讲幻灯片（导出可编辑 PPTX）、时间轴动画（导出 MP4/GIF）、印刷级信息图，内置三套逻辑设计顾问、60 种风格库、品牌资产协议与 5 维专家评审。 |
| ★ ⚠️ | [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 主推 | HeyGen 开源的 HTML → MP4 视频渲染框架：把 HTML、CSS、媒体和可 seek 动画变成确定性 MP4 视频——Agent 写 HTML、框架负责渲染；20 个内置 skill 按需加载（路由 /hyperframes 按请求分发创建工作流），支持产品发布视频、无脸解说、PR-to-video、deck 和组合移植等场景。 |
| ⚠️ | [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | MeiGen-AI 的音频驱动无限长口播视频生成框架：给定输入视频和音频，合成唇形同步的新视频，同时对齐头部运动、肢体姿态与面部表情；支持 image-to-video 和 video-to-video 两种模式，提供 Gradio demo 与 ComfyUI 分支。 |
| ⚠️ | [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) | 设计与创意 | 技能包 | MIT | 观察 | 面向抖音 & 红果爆款短剧/漫剧的工业化编剧与视听导演系统：五阶门控剧本、七维台词诊断、资产三视图锁、文武双模分镜、15 秒打戏 PREVIS、Seedance 三层解耦提示词与 P0~P2 质检门禁，一条龙贯穿小说分析到独立质检。 |
| ⚠️ | [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) | 设计与创意 | CLI 工具 | MIT | 常规 | 火山引擎 MediaKit 官方 CLI：兼容 FFmpeg 命令面，本地跑裁剪/拼接/字幕等剪辑操作，一键切云端调用画质增强、字幕擦除、ASR、OCR、剧情线分析等 AI 能力，覆盖视频/图像/音频 80+ 原子能力和 5 个 Agent Skill。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 开源 AI 影视与短剧创作工作台：自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务与本地 Agent 放在同一条创作链路，支持自部署与 Codex MCP 插件协作。 |
| ⚠️ | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 面向 AI 图片、视频与分镜创作的本地节点画布：把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台与全景环境放进同一块可无限扩展的画布，支持画布 Agent 协作与多供应商统一管理。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 常规 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ★ ⚠️ | [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) | 设计与创意 | 框架 | MIT | 主推 | 首个开源 AI 原生矢量设计工具：Prompt → Canvas、并发 Agent Teams 并行作画、Design-as-Code（.op 文件 JSON 可 diff）、MCP Server 一键接入 Claude Code / Codex、多模型智能适配、10+ 平台代码导出（React / Vue / SwiftUI / Flutter 等）。 |
| ⚠️ | [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | Screen Studio 的免费开源替代：录屏 + 自动缩放跟随光标 + 自定义光标主题 + 本地离线字幕 + 运动模糊 + 时间线标注，导出 MP4 / GIF 多比例多分辨率；100% 免费（个人和商用）、无订阅、无水印、无付费墙。已官宣即将归档，社区 fork 由核心贡献者继续维护。 |
| ⚠️ | [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) | 设计与创意 | 框架 | GPL-3.0 | 常规 | 为 AI 打造的 macOS 原生视频剪辑器（Swift 从零构建，北极星对标 Premiere Pro）：内置 SOTA 生成模型（Seedance / Kling / Nano Banana Pro）在时间线上直接生成视频和图片；通过 MCP 让 Claude / Codex / Cursor 直接在时间线上创建和编辑，或用内置 Agent 协作。 |
| ⚠️ | [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | 面向 AIGC 创作者的本地桌面创作上下文环境：参考素材、Prompt、分镜、Agent 对话、生成结果和复盘经验以可携带的项目资产沉淀在同一画布；Seedream 5.0 Pro 图片生成与编辑、Doubao Seed 2.0 Agent 协作、全能参考式提示词编辑（一目标多参考 @ 节点）、Prompt 库与媒体库、分镜切割与标注。 |
| ★ ⚠️ | [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) | 设计与创意 | 技能集 | UNKNOWN | 主推 | Remotion 官方维护的 Agent Skills 合集：约 12 个技能覆盖用 React 写视频的最佳实践——建项目/合成、标记与动画、Studio 预览、渲染导出、地图动画、字幕、SaaS 架构、Studio 交互、文档检索、升级与 Mediabunny 多媒体处理。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 设计与创意 | 技能包 | Apache-2.0 | 常规 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) | 设计与创意 | 技能包 | PolyForm-Noncommercial-1.0.0 | 常规 | 把 Claude Code / Codex 变成口播视频动效工作室的 agent skill：字级配音同步、78 张动效配方卡、七层反 PPT 镜头系统、三重验收，用 Remotion 渲出动态字卡、证据截图、运镜与音效全部锁在人声上的解说成片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |
| ⚠️ | [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) | 设计与创意 | 技能集 | CC-BY-4.0 | 常规 | 面向 Agent 的电影级 AI 影像导演技能集：`video` 子技能先定场景欲望、障碍、镜头几何与剪辑节奏，再生成 Seedance / Kling / Veo 提示词；`image` 子技能负责 Nano Banana 与 GPT Image 的分镜与关键帧。 |
| ★ ⚠️ | [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) | 设计与创意 | 框架 | MIT | 主推 | 开源本地 AI 语音工作室（ElevenLabs + WisprFlow 替代）：零样本声音克隆、7 个 TTS 引擎 23 语言、全局热键听写、Stories 多轨编辑；内置 MCP server 让任何 Agent 一行调用开口说话；Tauri (Rust) 原生、100% 本地。 |
| ★ ⚠️ | [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 主推 | OpenBMB 出品的 2B 参数 tokenizer-free TTS：扩散自回归架构直接生成连续语音表征，支持 30 语言（含 9 种中文方言）、自然语言 voice design、可控声音克隆与终极克隆（参考音频+转写续写）、48kHz 工作室级输出，RTF 低至 0.3（4090）或 0.13（vLLM-Omni 加速），Apache 2.0 商用可用。 |
| ⚠️ | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) | 研发与代码 | 技能包 | MIT | 常规 | 把 Andrej Karpathy 关于 LLM 编码通病的观察提炼成一份行为指南，用「先思考、简洁优先、外科手术式改动、目标驱动执行」四条原则改善 Agent 编码行为，支持注入 CLAUDE.md、Claude Code 插件与 Cursor 规则。 |
| ⚠️ | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 大型工程 Agent、插件与技能集合，按研发阶段覆盖架构、测试、调试、安全和交付协作。 |
| ⚠️ | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | DSH 插件 | 技能集 | CC0-1.0 | 常规 | 社区维护的 DSH 可复现配置与插件组合，覆盖编码、工作流、可靠性和生产力场景。 |
| ⚠️ | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | DSH 插件 | 技能包 | MIT | 常规 | 通过自然语言需求在 DeepSeek Harness 插件目录中检索并推荐合适插件的发现工具。 |
| ⚠️ | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | DSH 插件 | CLI 工具 | MIT | 常规 | 为 DeepSeek Harness 提供键盘优先的全屏终端界面，展示流式输出、状态、上下文和会话控制。 |
| ⚠️ | [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | DeepSeek 官方开源 Agent Harness，以 Cordis 为基础提供一切皆插件的模型、工具、界面与技能运行时。 |
| ⚠️ | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | 嵌入 DeepSeek Harness 的插件市场，用于浏览、安装、更新、启停和备份社区插件。 |
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 技能工程 | 规范 | CC-BY-4.0 | 常规 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ★ ⚠️ | [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) | 技能工程 | 技能包 | MIT | 主推 | 把书、长视频、播客、课程等高价值内容蒸馏成可独立调用的 Agent Skills：RIA-TV++ 七阶段流水线（Adler 分析阅读 → 5 专项提取器并行 → 三重验证 + 晋级门 → RIA++ 能力卡 → Zettelkasten 链接 → 压力测试 → 确定性编译），支持 OpenClaw / Claude Code / DeepSeek Harness 三平台，附 20+ 已蒸馏示例。 |
| ⚠️ | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) | 技能工程 | 框架 | MIT | 常规 | 微软开源的桌面应用：录制屏幕工作过程，用 GitHub Copilot CLI 重建为意图与有序步骤，再生成可复用 Skill 或定时 Automation，供 Scout / Copilot Cowork / Copilot Studio 使用。 |
| ★ ⚠️ | [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) | 运维与自动化 | 框架 | MIT | 主推 | 隐私优先的 AI 会议助手：完全本地运行——Parakeet / Whisper 实时转写（4 倍速）、说话人分离、Ollama 本地摘要，零云端依赖；支持自定义 OpenAI 兼容端点、多会议平台、导入已有音频并重转写；macOS / Windows 桌面应用，数据 100% 不离开本机。 |
| ⚠️ | [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) | 运维与自动化 | 框架 | AGPL-3.0 | 常规 | 自托管实时协作旅行规划器：日计划拖拽排线（OSRM 路由 + 2-opt 优化）、Leaflet/Mapbox/MapLibre 地图、16 种预订类型（航班/火车多段 + 4,045 内置机场时区）、费用分摊与多币种、打包清单、旅行日志、GPX/KML 导入导出、PWA 支持、SSO/Passkey/TOTP MFA，内置 AI 解析与 MCP addon。 |
| ⚠️ | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 研究与信息获取 | 框架 | Apache-2.0 | 常规 | 自动规划检索、汇总来源并生成带引用研究报告的开源深度研究 Agent 框架。 |
| ★ ⚠️ | [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) | 研究与信息获取 | 框架 | Apache-2.0 | 主推 | GitHub 最多 star 的开源 LLM 友好爬虫：网页 → 干净的 LLM-ready Markdown（Fit Markdown 启发式去噪）；异步浏览器池、深度爬取 + 崩溃恢复 + prefetch 加速；CLI + Docker 部署、爬取零 API Key。 |
| ⚠️ | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 研究与信息获取 | 框架 | Apache-2.0 | 常规 | 面向科学论文的检索增强问答与文献综述工具，强调来源定位、证据引用和研究可追溯性。 |
| ⚠️ | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 研究与信息获取 | 技能集 | MIT | 常规 | 覆盖生物、化学、医学和科研数据库的科学 Agent 技能库，用于文献、分析与研究工作流。 |
| ⚠️ | [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) | 研究与信息获取 | CLI 工具 | LicenseRef-NC-Learning | 常规 | 多平台自媒体数据采集工具：小红书 / 抖音 / 快手 / B 站 / 微博 / 贴吧 / 知乎的关键词搜索、帖子详情、二级评论、创作者主页全支持；基于 Playwright 浏览器自动化保留登录态（无需 JS 逆向），CDP 模式复用已有 Chrome 降低风控风险；支持 IP 代理池、登录态缓存、评论词云图。 |
| ⚠️ | [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 研究与信息获取 | 框架 | MIT | 常规 | 微软开源的研究与开发自动化 Agent 框架，支持数据驱动实验、模型迭代与研究流程编排。 |
| ⚠️ | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 研究与信息获取 | 框架 | MIT | 常规 | 斯坦福开源的主题研究与长篇知识文章生成系统，通过多视角检索组织有引用的内容。 |
| ⚠️ | [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) | 写作与文档 | 技能包 | AGPL-3.0 | 常规 | 面向职场的可编辑 PPT 生成 Skill：把文档丢给 AI Agent，一键生成自带浏览器编辑控制台的演示文稿，支持 12 套视觉主题、1020 个版式，并可导出 HTML / PDF / 真实可编辑的 PPTX。 |
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
| ⚠️ | [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) | 写作与文档 | 技能集 | UNKNOWN | 常规 | 花叔全部开源 Agent Skills 的总目录：16 个旗舰 + 14 个人物视角 + 22 个内置共 52 个标准 SKILL.md 技能，覆盖公众号/短视频/小红书从选题、写作、审校、配图到分发的创作流水线，附 AI Agent 安装协议与机器可读 skills.json。 |
| ⚠️ | [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) | 写作与文档 | 技能包 | MIT | 常规 | Humanizer 的中文汉化版 Claude Code Skill：识别并修复 24 种 AI 写作痕迹（内容 / 语言语法 / 风格 / 交流填充词四大类），把 AI 生成文本改写得更自然、更像人写的；附 AI 高频词汇警示列表和改写前后对比示例。 |
| ⚠️ | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。 |
| ⚠️ | [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) | 写作与文档 | 技能集 | Apache-2.0 | 常规 | 面向 Claude Code 与 Codex 的 AI 短剧制作 skill 合集：从一本小说到直接喂生成管线的制作素材——拆角色、排大纲、出场景与道具设定、写剧本、切分镜。5 个技能线性协作，每段自带质量门脚本检查。 |
| ⚠️ | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 写作与文档 | 框架 | MIT | 常规 | AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。 |

---

## 二、按分类

| 分类 | 定位 | 条目数 |
|---|---|---|
| [写作与文档](#写作与文档) | 文案、报告、技术写作、文档生成 | 7 |
| [研发与代码](#研发与代码) | 编码、重构、测试、代码审查 | 2 |
| [设计与创意](#设计与创意) | UI/UX、视觉、品牌、素材生成 | 39 |
| 数据与分析 | 数据处理、可视化、表格、BI | 0 |
| [研究与信息获取](#研究与信息获取) | 检索、调研、信息聚合、竞品分析 | 7 |
| [运维与自动化](#运维与自动化) | 部署、CI/CD、脚本、系统维护 | 2 |
| [商业与办公](#商业与办公) | 办公文档、协作、流程、商务 | 4 |
| [Agent 基础设施](#Agent 基础设施) | MCP server、框架、CLI 工具 | 7 |
| [DSH 插件](#DSH 插件) | DeepSeek Harness 插件——「一切皆插件」，模型适配器、工具、界面、技能、Agent 均可插拔扩展 | 5 |
| [技能工程](#技能工程) | 写 skill 的 skill、规范、模板、元技能 | 3 |

### 写作与文档

`entries/writing-docs/` —— 文案、报告、技术写作、文档生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) | 技能包 | AGPL-3.0 | 面向职场的可编辑 PPT 生成 Skill：把文档丢给 AI Agent，一键生成自带浏览器编辑控制台的演示文稿，支持 12 套视觉主题、1020 个版式，并可导出 HTML / PDF / 真实可编辑的 PPTX。 |
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 技能集 | MIT | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
| ⚠️ | [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) | 技能集 | UNKNOWN | 花叔全部开源 Agent Skills 的总目录：16 个旗舰 + 14 个人物视角 + 22 个内置共 52 个标准 SKILL.md 技能，覆盖公众号/短视频/小红书从选题、写作、审校、配图到分发的创作流水线，附 AI Agent 安装协议与机器可读 skills.json。 |
| ⚠️ | [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) | 技能包 | MIT | Humanizer 的中文汉化版 Claude Code Skill：识别并修复 24 种 AI 写作痕迹（内容 / 语言语法 / 风格 / 交流填充词四大类），把 AI 生成文本改写得更自然、更像人写的；附 AI 高频词汇警示列表和改写前后对比示例。 |
| ⚠️ | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 技能集 | MIT | 面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。 |
| ⚠️ | [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) | 技能集 | Apache-2.0 | 面向 Claude Code 与 Codex 的 AI 短剧制作 skill 合集：从一本小说到直接喂生成管线的制作素材——拆角色、排大纲、出场景与道具设定、写剧本、切分镜。5 个技能线性协作，每段自带质量门脚本检查。 |
| ⚠️ | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 框架 | MIT | AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。 |

### 研发与代码

`entries/dev-engineering/` —— 编码、重构、测试、代码审查

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) | 技能包 | MIT | 把 Andrej Karpathy 关于 LLM 编码通病的观察提炼成一份行为指南，用「先思考、简洁优先、外科手术式改动、目标驱动执行」四条原则改善 Agent 编码行为，支持注入 CLAUDE.md、Claude Code 插件与 Cursor 规则。 |
| ⚠️ | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 技能集 | MIT | 大型工程 Agent、插件与技能集合，按研发阶段覆盖架构、测试、调试、安全和交付协作。 |

### 设计与创意

`entries/design-creative/` —— UI/UX、视觉、品牌、素材生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) | CLI 工具 | MIT | 把 ePub / PDF / 文本 / Markdown / 字幕文件转为高质量音频并生成同步字幕：基于 Kokoro-82M 本地 TTS，支持语音混合器、章节控制、队列批量处理、多输出格式（WAV / FLAC / MP3 / OPUS / M4B 带章节），跨 Windows / macOS / Linux。 |
| ⚠️ | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | 框架 | MIT | 面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台：从剧本解析、角色一致性底图、场景图与分镜到多模态视频生成与分析，Agent 通过内置 Skill 与 MCP 画布工具持续操作同一张无限画布。 |
| ⚠️ | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | 框架 | MIT | 利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，集成剧情生成、分镜布局、角色设定与页间连续性分析，支持多页漫画导出为 PNG/PDF。 |
| ★ ⚠️ | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) | 框架 | MIT | 轻量多用途 JavaScript 动画引擎：用统一 API 驱动 CSS、SVG、DOM 属性与 JavaScript 对象；V4 提供模块化时间轴、弹簧缓动、滚动、拖拽、文本拆分、WAAPI 与 Three.js 适配，适合界面、图表和创意页面动效。 |
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 框架 | AGPL-3.0 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ★ ⚠️ | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) | 框架 | MIT | Meta 八年打磨的开源 React 19 设计系统：150+ 可访问组件、7 主题、agent-ready CLI（能力清单 + typed JSON + 稳定错误码），`astryx init` 自动写入 AGENTS.md；内置 StyleX 但不锁定样式，Tailwind / CSS 原生覆盖。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 技能集 | UNKNOWN | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 技能集 | MIT | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) | 框架 | Apache-2.0 | 开源剪映草稿自动化助手（FastAPI）：让大模型具备剪映基础剪辑能力——创建草稿、添加视频/音频/图片/贴纸/字幕/特效/蒙版、关键帧控制、文本样式与动画；支持独立部署、Coze/n8n 工作流集成、剪映云渲染直接生成成片，提供 Coze 插件一键导入。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) | 技能包 | MIT | 面向 Codex 的原生无限画布 widget 插件（基于 tldraw）：在 Codex 内直接打开可视化画布用于构思、标注、AI 图片生成与迭代；AI 图片框按框位置和比例生成并替换、标注截图自动去痕生成修订图、AI HTML 框生成可运行单文件页面、AI Slides 组合为 16:9 演示文稿；画布数据持久化到项目目录。 |
| ⚠️ | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | 框架 | MIT | 把一段普通参考视频转换成时空一致的灰度深度视频，为 AI 视频工具提供角色姿态、动作、轮廓与相机距离的空间引导，辅助换角色、加角色或保持动作一致。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ★ ⚠️ | [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) | 框架 | LicenseRef-GSAP-Standard-No-Charge | 高性能 JavaScript 动画库：统一驱动 CSS、SVG、Canvas、WebGL 与通用对象的时间轴动画，内置 ScrollTrigger、Flip、MotionPath 等插件，适合交互页面、数据可视化和产品演示的动效实现。 |
| ★ ⚠️ | [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) | 技能包 | AGPL-3.0 | 歸藏出品的 AI Agent 网页 PPT 技能：生成单文件 HTML 横向翻页 PPT，内置双视觉系统（Style A 电子杂志 × 电子墨水 / Style B 瑞士国际主义）、32 种锁定版式、PPT 配图（GPT-Image 2.0）、多平台封面（公众号 21:9 / 小红书 3:4）、演讲者模式与低性能静态模式。 |
| ⚠️ | [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) | 技能包 | MIT | 模型无关的 AIGC 视频生产管理器（受 Higgsfield《Hell Grind》95 分钟 AI 故事片生产结构启发）：七层提示词架构、22 个按需加载方法模块、14 张 schema v2 项目表（资产 / 场次 / 镜头契约 / 提示词 / 生成 / 迭代 / 选片 / 豁免）、六大失败分类稳定错误码、本地确定性提示词审计器和只读项目校验器（0 网络请求 0 数据库操作）。 |
| ★ ⚠️ | [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) | 技能包 | MIT | 在 Agent 里一句话拿回可交付设计的 HTML 原生设计技能：高保真原型、演讲幻灯片（导出可编辑 PPTX）、时间轴动画（导出 MP4/GIF）、印刷级信息图，内置三套逻辑设计顾问、60 种风格库、品牌资产协议与 5 维专家评审。 |
| ★ ⚠️ | [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) | 框架 | Apache-2.0 | HeyGen 开源的 HTML → MP4 视频渲染框架：把 HTML、CSS、媒体和可 seek 动画变成确定性 MP4 视频——Agent 写 HTML、框架负责渲染；20 个内置 skill 按需加载（路由 /hyperframes 按请求分发创建工作流），支持产品发布视频、无脸解说、PR-to-video、deck 和组合移植等场景。 |
| ⚠️ | [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) | 框架 | Apache-2.0 | MeiGen-AI 的音频驱动无限长口播视频生成框架：给定输入视频和音频，合成唇形同步的新视频，同时对齐头部运动、肢体姿态与面部表情；支持 image-to-video 和 video-to-video 两种模式，提供 Gradio demo 与 ComfyUI 分支。 |
| ⚠️ | [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) | 技能包 | MIT | 面向抖音 & 红果爆款短剧/漫剧的工业化编剧与视听导演系统：五阶门控剧本、七维台词诊断、资产三视图锁、文武双模分镜、15 秒打戏 PREVIS、Seedance 三层解耦提示词与 P0~P2 质检门禁，一条龙贯穿小说分析到独立质检。 |
| ⚠️ | [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) | CLI 工具 | MIT | 火山引擎 MediaKit 官方 CLI：兼容 FFmpeg 命令面，本地跑裁剪/拼接/字幕等剪辑操作，一键切云端调用画质增强、字幕擦除、ASR、OCR、剧情线分析等 AI 能力，覆盖视频/图像/音频 80+ 原子能力和 5 个 Agent Skill。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 框架 | MIT | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) | 框架 | MIT | 开源 AI 影视与短剧创作工作台：自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务与本地 Agent 放在同一条创作链路，支持自部署与 Codex MCP 插件协作。 |
| ⚠️ | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) | 框架 | MIT | 面向 AI 图片、视频与分镜创作的本地节点画布：把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台与全景环境放进同一块可无限扩展的画布，支持画布 Agent 协作与多供应商统一管理。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 框架 | AGPL-3.0 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ★ ⚠️ | [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) | 框架 | MIT | 首个开源 AI 原生矢量设计工具：Prompt → Canvas、并发 Agent Teams 并行作画、Design-as-Code（.op 文件 JSON 可 diff）、MCP Server 一键接入 Claude Code / Codex、多模型智能适配、10+ 平台代码导出（React / Vue / SwiftUI / Flutter 等）。 |
| ⚠️ | [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) | 框架 | MIT | Screen Studio 的免费开源替代：录屏 + 自动缩放跟随光标 + 自定义光标主题 + 本地离线字幕 + 运动模糊 + 时间线标注，导出 MP4 / GIF 多比例多分辨率；100% 免费（个人和商用）、无订阅、无水印、无付费墙。已官宣即将归档，社区 fork 由核心贡献者继续维护。 |
| ⚠️ | [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) | 框架 | GPL-3.0 | 为 AI 打造的 macOS 原生视频剪辑器（Swift 从零构建，北极星对标 Premiere Pro）：内置 SOTA 生成模型（Seedance / Kling / Nano Banana Pro）在时间线上直接生成视频和图片；通过 MCP 让 Claude / Codex / Cursor 直接在时间线上创建和编辑，或用内置 Agent 协作。 |
| ⚠️ | [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) | 框架 | Apache-2.0 | 面向 AIGC 创作者的本地桌面创作上下文环境：参考素材、Prompt、分镜、Agent 对话、生成结果和复盘经验以可携带的项目资产沉淀在同一画布；Seedream 5.0 Pro 图片生成与编辑、Doubao Seed 2.0 Agent 协作、全能参考式提示词编辑（一目标多参考 @ 节点）、Prompt 库与媒体库、分镜切割与标注。 |
| ★ ⚠️ | [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) | 技能集 | UNKNOWN | Remotion 官方维护的 Agent Skills 合集：约 12 个技能覆盖用 React 写视频的最佳实践——建项目/合成、标记与动画、Studio 预览、渲染导出、地图动画、字幕、SaaS 架构、Studio 交互、文档检索、升级与 Mediabunny 多媒体处理。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 技能集 | MIT | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 框架 | Apache-2.0 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 技能包 | Apache-2.0 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) | 技能包 | PolyForm-Noncommercial-1.0.0 | 把 Claude Code / Codex 变成口播视频动效工作室的 agent skill：字级配音同步、78 张动效配方卡、七层反 PPT 镜头系统、三重验收，用 Remotion 渲出动态字卡、证据截图、运镜与音效全部锁在人声上的解说成片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 框架 | MIT | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |
| ⚠️ | [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) | 技能集 | CC-BY-4.0 | 面向 Agent 的电影级 AI 影像导演技能集：`video` 子技能先定场景欲望、障碍、镜头几何与剪辑节奏，再生成 Seedance / Kling / Veo 提示词；`image` 子技能负责 Nano Banana 与 GPT Image 的分镜与关键帧。 |
| ★ ⚠️ | [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) | 框架 | MIT | 开源本地 AI 语音工作室（ElevenLabs + WisprFlow 替代）：零样本声音克隆、7 个 TTS 引擎 23 语言、全局热键听写、Stories 多轨编辑；内置 MCP server 让任何 Agent 一行调用开口说话；Tauri (Rust) 原生、100% 本地。 |
| ★ ⚠️ | [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) | 框架 | Apache-2.0 | OpenBMB 出品的 2B 参数 tokenizer-free TTS：扩散自回归架构直接生成连续语音表征，支持 30 语言（含 9 种中文方言）、自然语言 voice design、可控声音克隆与终极克隆（参考音频+转写续写）、48kHz 工作室级输出，RTF 低至 0.3（4090）或 0.13（vLLM-Omni 加速），Apache 2.0 商用可用。 |

### 研究与信息获取

`entries/research-intel/` —— 检索、调研、信息聚合、竞品分析

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 框架 | Apache-2.0 | 自动规划检索、汇总来源并生成带引用研究报告的开源深度研究 Agent 框架。 |
| ★ ⚠️ | [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) | 框架 | Apache-2.0 | GitHub 最多 star 的开源 LLM 友好爬虫：网页 → 干净的 LLM-ready Markdown（Fit Markdown 启发式去噪）；异步浏览器池、深度爬取 + 崩溃恢复 + prefetch 加速；CLI + Docker 部署、爬取零 API Key。 |
| ⚠️ | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 框架 | Apache-2.0 | 面向科学论文的检索增强问答与文献综述工具，强调来源定位、证据引用和研究可追溯性。 |
| ⚠️ | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 技能集 | MIT | 覆盖生物、化学、医学和科研数据库的科学 Agent 技能库，用于文献、分析与研究工作流。 |
| ⚠️ | [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) | CLI 工具 | LicenseRef-NC-Learning | 多平台自媒体数据采集工具：小红书 / 抖音 / 快手 / B 站 / 微博 / 贴吧 / 知乎的关键词搜索、帖子详情、二级评论、创作者主页全支持；基于 Playwright 浏览器自动化保留登录态（无需 JS 逆向），CDP 模式复用已有 Chrome 降低风控风险；支持 IP 代理池、登录态缓存、评论词云图。 |
| ⚠️ | [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 框架 | MIT | 微软开源的研究与开发自动化 Agent 框架，支持数据驱动实验、模型迭代与研究流程编排。 |
| ⚠️ | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 框架 | MIT | 斯坦福开源的主题研究与长篇知识文章生成系统，通过多视角检索组织有引用的内容。 |

### 运维与自动化

`entries/ops-automation/` —— 部署、CI/CD、脚本、系统维护

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ★ ⚠️ | [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) | 框架 | MIT | 隐私优先的 AI 会议助手：完全本地运行——Parakeet / Whisper 实时转写（4 倍速）、说话人分离、Ollama 本地摘要，零云端依赖；支持自定义 OpenAI 兼容端点、多会议平台、导入已有音频并重转写；macOS / Windows 桌面应用，数据 100% 不离开本机。 |
| ⚠️ | [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) | 框架 | AGPL-3.0 | 自托管实时协作旅行规划器：日计划拖拽排线（OSRM 路由 + 2-opt 优化）、Leaflet/Mapbox/MapLibre 地图、16 种预订类型（航班/火车多段 + 4,045 内置机场时区）、费用分摊与多币种、打包清单、旅行日志、GPX/KML 导入导出、PWA 支持、SSO/Passkey/TOTP MFA，内置 AI 解析与 MCP addon。 |

### 商业与办公

`entries/business-office/` —— 办公文档、协作、流程、商务

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ★ ⚠️ | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) | 框架 | MIT | 基于 Claude Code 的开源求职申请框架：建档、职位抓取与批量评分、fit 评估、drafter-reviewer 流水线生成 LaTeX 定制 CV 与求职信（PDF 排版 + ATS 文本层双重校验）、面试准备与模拟，共 13 个斜杠命令；作者实测 69 份申请拿到 offer。 |
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 技能集 | LicenseRef-Anthropic-Source-Available | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| ⚠️ | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) | 框架 | MIT | 面向普通用户的可检索提示词库——按职业与场景分类的现成提示词卡片，拿来就用，支持搜索、筛选、收藏自己的常用库，覆盖文案、办公、营销、编程等场景，配浏览器扩展与 Docker 自托管方案。注意：非 SKILL.md 形态，作为提示词参考库使用而非可安装技能。 |
| ★ ⚠️ | [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) | CLI 工具 | Apache-2.0 | 专为 AI Agent 设计的 Office 套件 CLI：单二进制无需安装 Office，读写编辑 Word / Excel / PowerPoint；内置渲染引擎（HTML / PNG / watch 实时预览）、350+ Excel 函数求值、原生数据透视表、模板合并与 round-trip dump，MCP server 一键接入主流 Agent。 |

### Agent 基础设施

`entries/agent-infra/` —— MCP server、框架、CLI 工具

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) | 框架 | MIT | 面向一人公司与创作者的 AI 内容营销平台：用 Agent 批量生成视频/图文，排期分发到抖音、小红书、TikTok、YouTube、X 等平台，并支持自动化互动、评论转化信号识别与 CPS/CPE/CPM 内容变现。 |
| ★ ⚠️ | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) | 框架 | MIT | 让 AI Agent 像人一样操作浏览器的开源框架：打开页面、点击、输入、填表和提取结构化数据；可作为 Python 库嵌入自动化流程，也可通过 CLI/技能接入 Claude Code、Codex、Cursor 等编码 Agent，并支持自定义工具与多种 LLM。 |
| ⚠️ | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | 框架 | Apache-2.0 | 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。 |
| ⚠️ | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) | 框架 | MIT | 港大 HKUDS 出品的个人 AI 原生公司运行时：给定目标自动建组织（Self-Built）、状态机驱动多角色协作交付（Self-Run）、按角色归因学习沉淀组织记忆（Self-Grown）；支持 Codex / Claude Code / Cursor 等作为执行引擎，附像素风办公室 UI 与 10+ 消息渠道。 |
| ⚠️ | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) | 框架 | AGPL-3.0 | OpenBMB 开源的企业数字员工平台：把业务经验、SOP、决策标准与知识库沉淀为可持续运行的数字员工，支持状态机流程、文档感知检索、MCP/HTTP 工具执行、长期记忆与审计。 |
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 框架 | MIT | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |
| ⚠️ | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) | 框架 | MIT | 腾讯开源的企业级 LLM 知识平台：把文档转成可检索 RAG、自主推理 Agent 与自维护 Wiki；支持多源知识库、MCP Server、DSH 插件、Agent Skills、Web/API/CLI/IM 渠道与私有化部署。 |

### DSH 插件

`entries/dsh/` —— DeepSeek Harness 插件——「一切皆插件」，模型适配器、工具、界面、技能、Agent 均可插拔扩展

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | 技能集 | CC0-1.0 | 社区维护的 DSH 可复现配置与插件组合，覆盖编码、工作流、可靠性和生产力场景。 |
| ⚠️ | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | 技能包 | MIT | 通过自然语言需求在 DeepSeek Harness 插件目录中检索并推荐合适插件的发现工具。 |
| ⚠️ | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | CLI 工具 | MIT | 为 DeepSeek Harness 提供键盘优先的全屏终端界面，展示流式输出、状态、上下文和会话控制。 |
| ⚠️ | [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | 框架 | MIT | DeepSeek 官方开源 Agent Harness，以 Cordis 为基础提供一切皆插件的模型、工具、界面与技能运行时。 |
| ⚠️ | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | 框架 | MIT | 嵌入 DeepSeek Harness 的插件市场，用于浏览、安装、更新、启停和备份社区插件。 |

### 技能工程

`entries/meta-skillcraft/` —— 写 skill 的 skill、规范、模板、元技能

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 规范 | CC-BY-4.0 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ★ ⚠️ | [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) | 技能包 | MIT | 把书、长视频、播客、课程等高价值内容蒸馏成可独立调用的 Agent Skills：RIA-TV++ 七阶段流水线（Adler 分析阅读 → 5 专项提取器并行 → 三重验证 + 晋级门 → RIA++ 能力卡 → Zettelkasten 链接 → 压力测试 → 确定性编译），支持 OpenClaw / Claude Code / DeepSeek Harness 三平台，附 20+ 已蒸馏示例。 |
| ⚠️ | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) | 框架 | MIT | 微软开源的桌面应用：录制屏幕工作过程，用 GitHub Copilot CLI 重建为意图与有序步骤，再生成可复用 Skill 或定时 Automation，供 Scout / Copilot Cowork / Copilot Studio 使用。 |

---

## 三、按标签

共 115 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，但可以有多个标签。

| 标签 | 条目 |
|---|---|
| `agent-methodology` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) |
| `agent-skills` | [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |
| `ai-agent` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) · [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `aitoearn` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) |
| `animation` | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) |
| `animejs` | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) |
| `audiobook` | [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) |
| `automation` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `awesome-list` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `browser-automation` | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) |
| `browser-use` | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) |
| `canvas` | [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) |
| `career` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `casting` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `character-design` | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `cinematic` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) |
| `claude-code` | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `cli` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) |
| `cn-localization` | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) |
| `code-graph` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `code-review` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `codex` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `collaboration` | [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) |
| `content-marketing` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) |
| `copilot` | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `cover-generation` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `cover-letter` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `cv` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `de-slop` | [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `design-md` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `design-system` | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) |
| `digital-employee` | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) |
| `docker` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) · [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) |
| `document-generation` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `docx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) |
| `dsh` | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `enterprise` | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) |
| `fashion-visual` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `ffmpeg` | [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) |
| `film-language` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) |
| `framework` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) |
| `frontend` | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) |
| `google-stitch` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `gsap` | [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) |
| `html` | [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) |
| `image-generation` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |
| `interoperability` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `interview-prep` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `jianying` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) |
| `job-search` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `knowledge-management` | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) |
| `life-force` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `llm-wiki` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `long-term-memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `marketplace` | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `mcp` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) |
| `meeting` | [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) |
| `memory` | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `monetization` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) |
| `motion-design` | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) |
| `multi-agent` | [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `multilingual` | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) |
| `multimodal` | [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) |
| `novel-writing` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `office` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) |
| `openclaw` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `pdf` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) |
| `photography` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `photorealistic` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `playwright` | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) |
| `plugin` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `portrait` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `pptx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `privacy` | [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) |
| `product-video` | [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) |
| `prompt-engineering` | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `python` | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) |
| `rag` | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) |
| `remotion` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) |
| `research` | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `science` | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) |
| `screen-recording` | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `screenwriting` | [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `search` | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `seedance` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) |
| `self-hosted` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) · [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) |
| `short-drama` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `short-video` | [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |
| `skill` | [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) |
| `skill-collection` | [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |
| `skill-generation` | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `skill-md` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `skill-pack` | [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `social-media` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |
| `software-engineering` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `sop` | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) |
| `spec` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `standard` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `storyboard` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `tencent` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `testing` | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `travel` | [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) |
| `triptych` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `tts` | [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) |
| `ui-generation` | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) |
| `vector-search` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) |
| `video-dubbing` | [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) |
| `video-production` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) |
| `voice` | [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) |
| `web-animation` | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) |
| `web-crawler` | [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) · [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) |
| `web-fiction` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `writing` | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) |
| `writing-workbench` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `xlsx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) |

---

## 四、按语言

实现语言。纯文档/提示词类条目标记为 `markdown`。

| 语言 | 条目 |
|---|---|
| `csharp` | [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) |
| `css` | [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) |
| `dotnet` | [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) |
| `go` | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) |
| `html` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) |
| `javascript` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) · [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `latex` | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) |
| `markdown` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) |
| `powershell` | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `python` | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `react` | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) |
| `rust` | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) |
| `shell` | [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) |
| `stylex` | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) |
| `swift` | [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) |
| `typescript` | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) · [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |

---

## 五、按协议

协议仅作为判断能否商用的参考（本仓库不转载源码，因此不承担再分发义务）。

| 协议 | 条目数 | 条目 |
|---|---|---|
| `AGPL-3.0` | 6 | [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `Apache-2.0` | 13 | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) · [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) · [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) · [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) · [PMAgent-Canvas 本地创作画布](entries/design-creative/promptcard-agentcanvas/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `CC-BY-4.0` | 2 | [Visual Skills AI 影像导演技能集](entries/design-creative/visual-skills/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `CC0-1.0` | 1 | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `GPL-3.0` | 1 | [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) |
| `LicenseRef-Anthropic-Source-Available` | 1 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `LicenseRef-GSAP-Standard-No-Charge` | 1 | [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) |
| `LicenseRef-NC-Learning` | 1 | [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) |
| `MIT` | 43 | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) · [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) · [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) · [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) · [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) · [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) · [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) · [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) · [漫剧老李 AIGC 全流程 Skill](entries/design-creative/manju-laoli-skill/SKILL.md) · [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) · [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) · [Skill Recorder 屏幕工作录制转技能](entries/meta-skillcraft/skill-recorder/SKILL.md) · [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `PolyForm-Noncommercial-1.0.0` | 1 | [口播视频动效工作室](entries/design-creative/video-talkcraft/SKILL.md) |
| `UNKNOWN` | 6 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Remotion 官方 Agent Skills](entries/design-creative/remotion-skills/SKILL.md) · [花叔开源 Skills 总目录](entries/writing-docs/huashu-skills/SKILL.md) |

---

## 六、排行

star 数不参与收录判断，仅作为排序维度。`—` 表示尚未采集。

### 按 star

| # | 条目 | star | 最近提交 |
|---|---|---|---|
| 1 | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 116792 | 2026-08-26T09:37:30Z |
| 2 | [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) | 112327 | 2026-09-05T07:00:06Z |
| 3 | [Crawl4AI LLM 友好爬虫](entries/research-intel/crawl4ai/SKILL.md) | 81396 | 2026-09-01T07:58:26Z |
| 4 | [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) | 72674 | 2026-08-21T21:29:50Z |
| 5 | [MediaCrawler 自媒体爬虫](entries/research-intel/mediacrawler/SKILL.md) | 64464 | 2026-08-14T08:19:00Z |
| 6 | [Voicebox 本地 AI 语音工作室](entries/design-creative/voicebox/SKILL.md) | 52350 | 2026-08-09T00:03:42Z |
| 7 | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 50726 | 2026-08-22T18:22:24Z |
| 8 | [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) | 44054 | 2026-09-05T08:39:34Z |
| 9 | [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) | 40808 | 2026-09-03T17:44:17Z |
| 10 | [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) | 39904 | 2026-06-17T02:34:20Z |
| 11 | [VoxCPM2 无 Tokenizer TTS](entries/design-creative/voxcpm/SKILL.md) | 36718 | 2026-09-02T12:12:35Z |
| 12 | [Meetily 隐私优先 AI 会议助手](entries/ops-automation/meetily/SKILL.md) | 30366 | 2026-09-05T09:03:14Z |
| 13 | [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) | 29872 | 2026-09-03T07:16:42Z |
| 14 | [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) | 28252 | 2026-04-13T13:08:58Z |
| 15 | [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) | 25715 | 2026-08-15T15:20:35Z |
| 16 | [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) | 25657 | 2026-08-07T03:58:08Z |
| 17 | [花叔设计 HTML 原生设计系统](entries/design-creative/huashu-design/SKILL.md) | 23662 | 2026-08-25 |
| 18 | [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) | 21375 | 2026-09-04T09:35:26Z |
| 19 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 21060 | 2026-08-11T12:12:06Z |
| 20 | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 19916 | 2026-08-26T08:54:32Z |
| 21 | [Humanizer-zh AI 写作去痕](entries/writing-docs/humanizer-zh/SKILL.md) | 16695 | 2026-01-19T07:46:35Z |
| 22 | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 14622 | 2026-08-26T10:49:08Z |
| 23 | [Palmier Pro AI 视频剪辑](entries/design-creative/palmier-pro/SKILL.md) | 14291 | 2026-08-28T23:30:01Z |
| 24 | [TREK 自托管旅行规划](entries/ops-automation/trek/SKILL.md) | 13181 | 2026-09-04T23:10:40Z |
| 25 | [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) | 12791 | 2026-09-05T09:04:44Z |
| 26 | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 12103 | 2026-07-29T08:56:47Z |
| 27 | [Cangjie Skill 内容蒸馏为 Agent Skill](entries/meta-skillcraft/cangjie-skill/SKILL.md) | 9515 | 2026-09-04T11:44:34Z |
| 28 | [ChatGPT Shortcut 提示词快捷指令库](entries/business-office/chatgpt-shortcut/SKILL.md) | 8730 | 2026-08-29 |
| 29 | [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) | 7785 | 2026-05-22T02:35:51Z |
| 30 | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 6923 | 2026-08-06T11:00:29Z |

### 最近加入

| 条目 | 加入日期 | 最后更新 |
|---|---|---|
| [AiToEarn AI 内容营销智能体](entries/agent-infra/aitoearn/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Browser Use 浏览器 Agent](entries/agent-infra/browser-use/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [OpenOPC 个人 AI 原生公司](entries/agent-infra/openopc/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [StaffDeck 企业数字员工平台](entries/agent-infra/staffdeck/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [WeKnora 开源 LLM 知识平台](entries/agent-infra/weknora/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [AI Job Search 求职申请框架](entries/business-office/ai-job-search/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [OfficeCLI AI Office 套件](entries/business-office/officecli/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Abogen 有声书生成器](entries/design-creative/abogen/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Anime.js 动画引擎](entries/design-creative/animejs/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Astryx 设计系统](entries/design-creative/astryx/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [CapCut Mate 剪映自动化](entries/design-creative/capcut-mate/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Cowart Codex 无限画布](entries/design-creative/cowart/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [GSAP 动画平台](entries/design-creative/gsap/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Guizang PPT Skill 网页 PPT](entries/design-creative/guizang-ppt-skill/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [Hell Grind AIGC Skill](entries/design-creative/hell-grind-aigc-skill/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [HyperFrames HTML 视频渲染](entries/design-creative/hyperframes/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [InfiniteTalk 无限长口播视频生成](entries/design-creative/infinitetalk/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [AI MediaKit CLI](entries/design-creative/mediakit-cli/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [OpenPencil AI 原生矢量设计工具](entries/design-creative/openpencil/SKILL.md) | 2026-09-05 | 2026-09-05 |
| [OpenScreen 开源录屏演示工具](entries/design-creative/openscreen/SKILL.md) | 2026-09-05 | 2026-09-05 |

---

---

由 `scripts/gen_index.py` 生成 · 最后更新 2026-09-05 · 共 76 个条目
