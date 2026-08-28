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

共 38 个条目，按分类与名称排序。

| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |
|---|---|---|---|---|---|---|
| ⚠️ | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | Agent 基础设施 | 框架 | Apache-2.0 | 常规 | 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。 |
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 商业与办公 | 技能集 | LicenseRef-Anthropic-Source-Available | 常规 | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| ⚠️ | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台：从剧本解析、角色一致性底图、场景图与分镜到多模态视频生成与分析，Agent 通过内置 Skill 与 MCP 画布工具持续操作同一张无限画布。 |
| ⚠️ | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | 设计与创意 | 框架 | MIT | 观察 | 利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，集成剧情生成、分镜布局、角色设定与页间连续性分析，支持多页漫画导出为 PNG/PDF。 |
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 观察 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 设计与创意 | 技能集 | UNKNOWN | 常规 | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | 设计与创意 | 框架 | MIT | 观察 | 把一段普通参考视频转换成时空一致的灰度深度视频，为 AI 视频工具提供角色姿态、动作、轮廓与相机距离的空间引导，辅助换角色、加角色或保持动作一致。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 开源 AI 影视与短剧创作工作台：自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务与本地 Agent 放在同一条创作链路，支持自部署与 Codex MCP 插件协作。 |
| ⚠️ | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 面向 AI 图片、视频与分镜创作的本地节点画布：把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台与全景环境放进同一块可无限扩展的画布，支持画布 Agent 协作与多供应商统一管理。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 常规 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 设计与创意 | 技能包 | Apache-2.0 | 常规 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |
| ⚠️ | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) | 研发与代码 | 技能包 | MIT | 常规 | 把 Andrej Karpathy 关于 LLM 编码通病的观察提炼成一份行为指南，用「先思考、简洁优先、外科手术式改动、目标驱动执行」四条原则改善 Agent 编码行为，支持注入 CLAUDE.md、Claude Code 插件与 Cursor 规则。 |
| ⚠️ | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 大型工程 Agent、插件与技能集合，按研发阶段覆盖架构、测试、调试、安全和交付协作。 |
| ⚠️ | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | DSH 插件 | 技能集 | CC0-1.0 | 常规 | 社区维护的 DSH 可复现配置与插件组合，覆盖编码、工作流、可靠性和生产力场景。 |
| ⚠️ | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | DSH 插件 | 技能包 | MIT | 常规 | 通过自然语言需求在 DeepSeek Harness 插件目录中检索并推荐合适插件的发现工具。 |
| ⚠️ | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | DSH 插件 | CLI 工具 | MIT | 常规 | 为 DeepSeek Harness 提供键盘优先的全屏终端界面，展示流式输出、状态、上下文和会话控制。 |
| ⚠️ | [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | DeepSeek 官方开源 Agent Harness，以 Cordis 为基础提供一切皆插件的模型、工具、界面与技能运行时。 |
| ⚠️ | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | 嵌入 DeepSeek Harness 的插件市场，用于浏览、安装、更新、启停和备份社区插件。 |
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 技能工程 | 规范 | CC-BY-4.0 | 常规 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ⚠️ | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 研究与信息获取 | 框架 | Apache-2.0 | 常规 | 自动规划检索、汇总来源并生成带引用研究报告的开源深度研究 Agent 框架。 |
| ⚠️ | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 研究与信息获取 | 框架 | Apache-2.0 | 常规 | 面向科学论文的检索增强问答与文献综述工具，强调来源定位、证据引用和研究可追溯性。 |
| ⚠️ | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 研究与信息获取 | 技能集 | MIT | 常规 | 覆盖生物、化学、医学和科研数据库的科学 Agent 技能库，用于文献、分析与研究工作流。 |
| ⚠️ | [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 研究与信息获取 | 框架 | MIT | 常规 | 微软开源的研究与开发自动化 Agent 框架，支持数据驱动实验、模型迭代与研究流程编排。 |
| ⚠️ | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 研究与信息获取 | 框架 | MIT | 常规 | 斯坦福开源的主题研究与长篇知识文章生成系统，通过多视角检索组织有引用的内容。 |
| ⚠️ | [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) | 写作与文档 | 技能包 | AGPL-3.0 | 常规 | 面向职场的可编辑 PPT 生成 Skill：把文档丢给 AI Agent，一键生成自带浏览器编辑控制台的演示文稿，支持 12 套视觉主题、1020 个版式，并可导出 HTML / PDF / 真实可编辑的 PPTX。 |
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
| ⚠️ | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。 |
| ⚠️ | [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) | 写作与文档 | 技能集 | Apache-2.0 | 常规 | 面向 Claude Code 与 Codex 的 AI 短剧制作 skill 合集：从一本小说到直接喂生成管线的制作素材——拆角色、排大纲、出场景与道具设定、写剧本、切分镜。5 个技能线性协作，每段自带质量门脚本检查。 |
| ⚠️ | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 写作与文档 | 框架 | MIT | 常规 | AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。 |

---

## 二、按分类

| 分类 | 定位 | 条目数 |
|---|---|---|
| [写作与文档](#写作与文档) | 文案、报告、技术写作、文档生成 | 5 |
| [研发与代码](#研发与代码) | 编码、重构、测试、代码审查 | 2 |
| [设计与创意](#设计与创意) | UI/UX、视觉、品牌、素材生成 | 17 |
| 数据与分析 | 数据处理、可视化、表格、BI | 0 |
| [研究与信息获取](#研究与信息获取) | 检索、调研、信息聚合、竞品分析 | 5 |
| 运维与自动化 | 部署、CI/CD、脚本、系统维护 | 0 |
| [商业与办公](#商业与办公) | 办公文档、协作、流程、商务 | 1 |
| [Agent 基础设施](#Agent 基础设施) | MCP server、框架、CLI 工具 | 2 |
| [DSH 插件](#DSH 插件) | DeepSeek Harness 插件——「一切皆插件」，模型适配器、工具、界面、技能、Agent 均可插拔扩展 | 5 |
| [技能工程](#技能工程) | 写 skill 的 skill、规范、模板、元技能 | 1 |

### 写作与文档

`entries/writing-docs/` —— 文案、报告、技术写作、文档生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) | 技能包 | AGPL-3.0 | 面向职场的可编辑 PPT 生成 Skill：把文档丢给 AI Agent，一键生成自带浏览器编辑控制台的演示文稿，支持 12 套视觉主题、1020 个版式，并可导出 HTML / PDF / 真实可编辑的 PPTX。 |
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 技能集 | MIT | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
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
| ⚠️ | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | 框架 | MIT | 面向完整 AI 短剧生产闭环的 Harness Engineering 桌面工作台：从剧本解析、角色一致性底图、场景图与分镜到多模态视频生成与分析，Agent 通过内置 Skill 与 MCP 画布工具持续操作同一张无限画布。 |
| ⚠️ | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | 框架 | MIT | 利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，集成剧情生成、分镜布局、角色设定与页间连续性分析，支持多页漫画导出为 PNG/PDF。 |
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 框架 | AGPL-3.0 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 技能集 | UNKNOWN | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 技能集 | MIT | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | 框架 | MIT | 把一段普通参考视频转换成时空一致的灰度深度视频，为 AI 视频工具提供角色姿态、动作、轮廓与相机距离的空间引导，辅助换角色、加角色或保持动作一致。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 框架 | MIT | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) | 框架 | MIT | 开源 AI 影视与短剧创作工作台：自由画布、结构化分镜、角色与风格资产、图片/视频/音频生成、异步任务与本地 Agent 放在同一条创作链路，支持自部署与 Codex MCP 插件协作。 |
| ⚠️ | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) | 框架 | MIT | 面向 AI 图片、视频与分镜创作的本地节点画布：把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台与全景环境放进同一块可无限扩展的画布，支持画布 Agent 协作与多供应商统一管理。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 框架 | AGPL-3.0 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 技能集 | MIT | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 框架 | Apache-2.0 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 技能包 | Apache-2.0 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 框架 | MIT | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |

### 研究与信息获取

`entries/research-intel/` —— 检索、调研、信息聚合、竞品分析

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 框架 | Apache-2.0 | 自动规划检索、汇总来源并生成带引用研究报告的开源深度研究 Agent 框架。 |
| ⚠️ | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 框架 | Apache-2.0 | 面向科学论文的检索增强问答与文献综述工具，强调来源定位、证据引用和研究可追溯性。 |
| ⚠️ | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 技能集 | MIT | 覆盖生物、化学、医学和科研数据库的科学 Agent 技能库，用于文献、分析与研究工作流。 |
| ⚠️ | [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 框架 | MIT | 微软开源的研究与开发自动化 Agent 框架，支持数据驱动实验、模型迭代与研究流程编排。 |
| ⚠️ | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 框架 | MIT | 斯坦福开源的主题研究与长篇知识文章生成系统，通过多视角检索组织有引用的内容。 |

### 商业与办公

`entries/business-office/` —— 办公文档、协作、流程、商务

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 技能集 | LicenseRef-Anthropic-Source-Available | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |

### Agent 基础设施

`entries/agent-infra/` —— MCP server、框架、CLI 工具

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | 框架 | Apache-2.0 | 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。 |
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 框架 | MIT | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |

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

---

## 三、按标签

共 77 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，但可以有多个标签。

| 标签 | 条目 |
|---|---|
| `agent-methodology` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) |
| `agent-skills` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) |
| `ai-agent` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `automation` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `awesome-list` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `casting` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `character-design` | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `cinematic` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) |
| `claude-code` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `cli` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) |
| `cn-localization` | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `code-graph` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `code-review` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `codex` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `cover-generation` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `de-slop` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `design-md` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `design-system` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `docker` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) |
| `document-generation` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `docx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `dsh` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `fashion-visual` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `film-language` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `framework` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) |
| `google-stitch` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `image-generation` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) |
| `interoperability` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `jianying` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) |
| `life-force` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `llm-wiki` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `long-term-memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `marketplace` | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `mcp` | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) |
| `memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `motion-design` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) |
| `multi-agent` | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `multilingual` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) |
| `novel-writing` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `office` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `openclaw` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `pdf` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `photography` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `photorealistic` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `plugin` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `portrait` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `pptx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `prompt-engineering` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `python` | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) |
| `remotion` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) |
| `research` | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `science` | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) |
| `screenwriting` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `search` | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `seedance` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) |
| `self-hosted` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) |
| `short-drama` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `short-video` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `skill` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) |
| `skill-md` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `skill-pack` | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `social-media` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `software-engineering` | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `spec` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `standard` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `storyboard` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `tencent` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `testing` | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `triptych` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `tts` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `ui-generation` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `vector-search` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) |
| `video-production` | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) |
| `web-fiction` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `writing` | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `writing-workbench` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `xlsx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |

---

## 四、按语言

实现语言。纯文档/提示词类条目标记为 `markdown`。

| 语言 | 条目 |
|---|---|
| `go` | [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) |
| `html` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `javascript` | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `markdown` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `python` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `rust` | [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) |
| `typescript` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |

---

## 五、按协议

协议仅作为判断能否商用的参考（本仓库不转载源码，因此不承担再分发义务）。

| 协议 | 条目数 | 条目 |
|---|---|---|
| `AGPL-3.0` | 3 | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `Apache-2.0` | 6 | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `CC-BY-4.0` | 1 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `CC0-1.0` | 1 | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `LicenseRef-Anthropic-Source-Available` | 1 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `MIT` | 22 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) · [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) · [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `UNKNOWN` | 4 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |

---

## 六、排行

star 数不参与收录判断，仅作为排序维度。`—` 表示尚未采集。

### 按 star

| # | 条目 | star | 最近提交 |
|---|---|---|---|
| 1 | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 116792 | 2026-08-26T09:37:30Z |
| 2 | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 50726 | 2026-08-22T18:22:24Z |
| 3 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 21060 | 2026-08-11T12:12:06Z |
| 4 | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 19916 | 2026-08-26T08:54:32Z |
| 5 | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 14622 | 2026-08-26T10:49:08Z |
| 6 | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 12103 | 2026-07-29T08:56:47Z |
| 7 | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 6923 | 2026-08-06T11:00:29Z |
| 8 | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 6400 | 2026-08-26 |
| 9 | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 6086 | 2026-08-26T05:28:29Z |
| 10 | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | 2611 | 2026-08-26T08:54:06Z |
| 11 | [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) | 2100 | 2026-08-26 |
| 12 | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 1201 | 2026-08-26T06:48:55Z |
| 13 | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 1113 | 2026-07-25T13:28:39Z |
| 14 | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 287 | 2026-07-19T09:05:19Z |
| 15 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 140 | 2026-07-07T07:47:56Z |
| 16 | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 67 | 2026-08-19T05:20:41Z |
| 17 | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 35 | 2026-08-25T11:21:09Z |
| 18 | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | — | — |
| 19 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | — | — |
| 20 | [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | — | — |
| 21 | [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | — | — |
| 22 | [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) | — | — |
| 23 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | — | — |
| 24 | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | — | — |
| 25 | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | — | — |
| 26 | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | — | — |
| 27 | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | — | — |
| 28 | [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) | — | 2026-08-26 |
| 29 | [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | — | — |
| 30 | [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | — | — |

### 最近加入

| 条目 | 加入日期 | 最后更新 |
|---|---|---|
| [Karpathy 编码指南](entries/dev-engineering/andrej-karpathy-skills/SKILL.md) | 2026-08-28 | 2026-08-28 |
| [AIGC CANVAS 短剧生产工作台](entries/design-creative/aigc-line/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [AIMangaStudio 漫画创作](entries/design-creative/aimangastudio/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Depth Studio 深度视频生成](entries/design-creative/depth-studio/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [影策 Open AI Canvas 影视创作工作台](entries/design-creative/open-ai-canvas/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Open Storyboard Canvas 开源画布](entries/design-creative/open-storyboard-canvas/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 2026-08-26 | 2026-08-26 |

---

---

由 `scripts/gen_index.py` 生成 · 最后更新 2026-08-28 · 共 38 个条目
