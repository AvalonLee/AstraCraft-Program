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

共 47 个条目，按分类与名称排序。

| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |
|---|---|---|---|---|---|---|
| ⚠️ | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | Agent 基础设施 | 框架 | Apache-2.0 | 常规 | 本地优先的 issue 看板，可在浏览器运行并通过 CDP 启动器或注入脚本嵌入 Codex；同一套 HTTP API 驱动 React UI 与随附 Codex Skill 使用的 taskctl CLI。 |
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 商业与办公 | 技能集 | LicenseRef-Anthropic-Source-Available | 常规 | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| ⚠️ | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) | 数据与分析 | 框架 | Apache-2.0 | 常规 | 面向 Airflow 与数据仓库的 Agent 工具集，结合 MCP、Jupyter 与技能执行数据工程和分析任务。 |
| ⚠️ | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) | 数据与分析 | 框架 | MIT | 常规 | 以代码和 SQL 构建数据报告与交互式数据产品的开源框架，适合版本化分析交付。 |
| ⚠️ | [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) | 数据与分析 | 框架 | Apache-2.0 | 常规 | Git 友好的响应式 Python Notebook，支持可复现执行、交互应用、SQL 与数据分析工作流。 |
| ⚠️ | [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) | 数据与分析 | 技能集 | UNKNOWN | 观察 | 面向通用商业数据分析的便携技能集合，覆盖清洗、探索、指标、洞察和报告输出。 |
| ⚠️ | [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) | 数据与分析 | 技能集 | UNKNOWN | 观察 | 为 PyMC 与 marimo 工作流提供贝叶斯建模、统计分析和响应式 Notebook 的 Agent Skills。 |
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 观察 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 设计与创意 | 技能集 | UNKNOWN | 常规 | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 设计与创意 | 框架 | AGPL-3.0 | 常规 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 设计与创意 | 技能集 | MIT | 常规 | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 设计与创意 | 框架 | Apache-2.0 | 常规 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 设计与创意 | 技能包 | Apache-2.0 | 常规 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 设计与创意 | 框架 | MIT | 常规 | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |
| ⚠️ | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 面向编码 Agent 的工程工作流技能集，覆盖规格、前端、测试、性能、安全审查与发布纪律。 |
| ⚠️ | [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 面向 Claude Code 等编码 Agent 的技能库，提供研发、测试、文档和业务工作流及配套脚本。 |
| ⚠️ | [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | GitHub 官方维护的 Copilot 指令、提示词、Agent、技能与配置示例集合，适合复用工程实践。 |
| ⚠️ | [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 覆盖研发、安全、云平台、数据与 Agent 工作流的大型技能集合，可用于多种编码助手。 |
| ⚠️ | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 研发与代码 | 技能集 | MIT | 常规 | 大型工程 Agent、插件与技能集合，按研发阶段覆盖架构、测试、调试、安全和交付协作。 |
| ⚠️ | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | DSH 插件 | 技能集 | CC0-1.0 | 常规 | 社区维护的 DSH 可复现配置与插件组合，覆盖编码、工作流、可靠性和生产力场景。 |
| ⚠️ | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | DSH 插件 | 技能包 | MIT | 常规 | 通过自然语言需求在 DeepSeek Harness 插件目录中检索并推荐合适插件的发现工具。 |
| ⚠️ | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | DSH 插件 | CLI 工具 | MIT | 常规 | 为 DeepSeek Harness 提供键盘优先的全屏终端界面，展示流式输出、状态、上下文和会话控制。 |
| ⚠️ | [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | DeepSeek 官方开源 Agent Harness，以 Cordis 为基础提供一切皆插件的模型、工具、界面与技能运行时。 |
| ⚠️ | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | DSH 插件 | 框架 | MIT | 常规 | 嵌入 DeepSeek Harness 的插件市场，用于浏览、安装、更新、启停和备份社区插件。 |
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 技能工程 | 规范 | CC-BY-4.0 | 常规 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ★ | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 技能工程 | 技能集 | MIT | 主推 | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |
| ⚠️ | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) | 运维与自动化 | 框架 | GPL-3.0 | 常规 | 以声明式 Playbook 执行配置管理、应用部署和跨主机运维自动化的成熟开源引擎。 |
| ⚠️ | [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) | 运维与自动化 | 框架 | GPL-3.0 | 常规 | 单二进制、自托管的 DAG 工作流引擎，可通过 YAML 编排批处理、计划任务与运维作业。 |
| ⚠️ | [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) | 运维与自动化 | 框架 | Apache-2.0 | 常规 | 事件驱动的开源工作流编排平台，适合数据管道、基础设施任务和跨系统自动化。 |
| ⚠️ | [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) | 运维与自动化 | 框架 | Apache-2.0 | 常规 | 以 Python 构建、调度和观察数据及运维工作流的开源编排平台，支持本地与服务化部署。 |
| ⚠️ | [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) | 运维与自动化 | 框架 | Apache-2.0 | 常规 | 使用常见编程语言定义、部署和管理云基础设施的开源 IaC 平台与自动化引擎。 |
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
| [研发与代码](#研发与代码) | 编码、重构、测试、代码审查 | 5 |
| [设计与创意](#设计与创意) | UI/UX、视觉、品牌、素材生成 | 12 |
| [数据与分析](#数据与分析) | 数据处理、可视化、表格、BI | 5 |
| [研究与信息获取](#研究与信息获取) | 检索、调研、信息聚合、竞品分析 | 5 |
| [运维与自动化](#运维与自动化) | 部署、CI/CD、脚本、系统维护 | 5 |
| [商业与办公](#商业与办公) | 办公文档、协作、流程、商务 | 1 |
| [Agent 基础设施](#Agent 基础设施) | MCP server、框架、CLI 工具 | 2 |
| [DSH 插件](#DSH 插件) | DeepSeek Harness 插件——「一切皆插件」，模型适配器、工具、界面、技能、Agent 均可插拔扩展 | 5 |
| [技能工程](#技能工程) | 写 skill 的 skill、规范、模板、元技能 | 2 |

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
| ⚠️ | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) | 技能集 | MIT | 面向编码 Agent 的工程工作流技能集，覆盖规格、前端、测试、性能、安全审查与发布纪律。 |
| ⚠️ | [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) | 技能集 | MIT | 面向 Claude Code 等编码 Agent 的技能库，提供研发、测试、文档和业务工作流及配套脚本。 |
| ⚠️ | [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) | 技能集 | MIT | GitHub 官方维护的 Copilot 指令、提示词、Agent、技能与配置示例集合，适合复用工程实践。 |
| ⚠️ | [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) | 技能集 | MIT | 覆盖研发、安全、云平台、数据与 Agent 工作流的大型技能集合，可用于多种编码助手。 |
| ⚠️ | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 技能集 | MIT | 大型工程 Agent、插件与技能集合，按研发阶段覆盖架构、测试、调试、安全和交付协作。 |

### 设计与创意

`entries/design-creative/` —— UI/UX、视觉、品牌、素材生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
|  | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | 框架 | AGPL-3.0 | 开源自托管的 AI 视频生产工作台：将小说、剧本或商品素材转化为角色一致、过程可控、成本可追踪的短视频，支持 Docker 一键部署、Agent 编排、剪映草稿导出。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 技能集 | UNKNOWN | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 技能集 | MIT | 面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ⚠️ | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 框架 | MIT | 一站式 AI 短视频生成工具：输入主题或关键词，自动生成脚本、匹配高清素材、合成字幕与背景音乐并输出 9:16/16:9 短视频；提供 Agent、WebUI、API、CLI、批量生成与多平台发布。 |
| ⚠️ | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 框架 | AGPL-3.0 | 首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。 |
| ⚠️ | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 技能集 | MIT | 面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。 |
| ⚠️ | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 框架 | Apache-2.0 | 开源一站式 AI 短剧创作工作台：把小说或剧本转化为动画短剧，覆盖 AI 编剧、无限画布分镜、角色/素材/视频节点编排、三层 Agent 协作与持久化记忆；支持 Windows/Linux/macOS 桌面端、Docker 自部署与可编程供应商系统。 |
| ⚠️ | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 技能包 | Apache-2.0 | 面向 Claude Code 与 Codex 的 AI 产品视频动态设计 skill：152 张镜头配方卡、209 种动态预览、一套可投产的 Remotion 模板，把 Agent 变成动态设计工作室，一键生成电影级产品宣传片。 |
| ⚠️ | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 框架 | MIT | HKU Data Science 团队开源的智能体视频创作框架：输入一个概念，即可自动完成剧本、分镜、角色创建、图像/视频生成与最终合成；内置 Idea2Video、Script2Video、Novel2Video、AutoCameo 工作流，并支持 Agent Loop、TUI 与 Web UI。 |

### 数据与分析

`entries/data-analytics/` —— 数据处理、可视化、表格、BI

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) | 框架 | Apache-2.0 | 面向 Airflow 与数据仓库的 Agent 工具集，结合 MCP、Jupyter 与技能执行数据工程和分析任务。 |
| ⚠️ | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) | 框架 | MIT | 以代码和 SQL 构建数据报告与交互式数据产品的开源框架，适合版本化分析交付。 |
| ⚠️ | [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) | 框架 | Apache-2.0 | Git 友好的响应式 Python Notebook，支持可复现执行、交互应用、SQL 与数据分析工作流。 |
| ⚠️ | [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) | 技能集 | UNKNOWN | 面向通用商业数据分析的便携技能集合，覆盖清洗、探索、指标、洞察和报告输出。 |
| ⚠️ | [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) | 技能集 | UNKNOWN | 为 PyMC 与 marimo 工作流提供贝叶斯建模、统计分析和响应式 Notebook 的 Agent Skills。 |

### 研究与信息获取

`entries/research-intel/` —— 检索、调研、信息聚合、竞品分析

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | 框架 | Apache-2.0 | 自动规划检索、汇总来源并生成带引用研究报告的开源深度研究 Agent 框架。 |
| ⚠️ | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) | 框架 | Apache-2.0 | 面向科学论文的检索增强问答与文献综述工具，强调来源定位、证据引用和研究可追溯性。 |
| ⚠️ | [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) | 技能集 | MIT | 覆盖生物、化学、医学和科研数据库的科学 Agent 技能库，用于文献、分析与研究工作流。 |
| ⚠️ | [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) | 框架 | MIT | 微软开源的研究与开发自动化 Agent 框架，支持数据驱动实验、模型迭代与研究流程编排。 |
| ⚠️ | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) | 框架 | MIT | 斯坦福开源的主题研究与长篇知识文章生成系统，通过多视角检索组织有引用的内容。 |

### 运维与自动化

`entries/ops-automation/` —— 部署、CI/CD、脚本、系统维护

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) | 框架 | GPL-3.0 | 以声明式 Playbook 执行配置管理、应用部署和跨主机运维自动化的成熟开源引擎。 |
| ⚠️ | [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) | 框架 | GPL-3.0 | 单二进制、自托管的 DAG 工作流引擎，可通过 YAML 编排批处理、计划任务与运维作业。 |
| ⚠️ | [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) | 框架 | Apache-2.0 | 事件驱动的开源工作流编排平台，适合数据管道、基础设施任务和跨系统自动化。 |
| ⚠️ | [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) | 框架 | Apache-2.0 | 以 Python 构建、调度和观察数据及运维工作流的开源编排平台，支持本地与服务化部署。 |
| ⚠️ | [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) | 框架 | Apache-2.0 | 使用常见编程语言定义、部署和管理云基础设施的开源 IaC 平台与自动化引擎。 |

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
| ★ | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 技能集 | MIT | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |

---

## 三、按标签

共 91 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，但可以有多个标签。

| 标签 | 条目 |
|---|---|
| `agent-methodology` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `agent-skills` | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) |
| `ai-agent` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `analytics` | [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) |
| `automation` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `awesome-list` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `casting` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `character-design` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `cinematic` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) |
| `claude-code` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `cli` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) |
| `cloud` | [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `cn-localization` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `code-graph` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `code-review` | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `codex` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `cover-generation` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `data-analytics` | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) |
| `de-slop` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `deployment` | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `design-md` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `design-system` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `docker` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) |
| `document-generation` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `docx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `dsh` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `fashion-visual` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `film-language` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `framework` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `git-worktree` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `github-copilot` | [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) |
| `google-stitch` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `image-generation` | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `interoperability` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `jianying` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) |
| `life-force` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `llm-wiki` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `long-term-memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `marketplace` | [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `mcp` | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) |
| `memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `motion-design` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) |
| `multi-agent` | [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `multilingual` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) |
| `notebook` | [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) |
| `novel-writing` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `office` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `openclaw` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `ops-automation` | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `pdf` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `photography` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `photorealistic` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `plugin` | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) |
| `portrait` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `pptx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `prompt-engineering` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `python` | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) |
| `remotion` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) |
| `research` | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `science` | [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) |
| `screenwriting` | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `search` | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `security` | [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) |
| `seedance` | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) |
| `self-hosted` | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) |
| `short-drama` | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `short-video` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `skill-md` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `skill-pack` | [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `social-media` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `software-engineering` | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `spec` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `sql` | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) |
| `standard` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `statistics` | [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) |
| `storyboard` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `subagent` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `tdd` | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `tencent` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `testing` | [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) |
| `triptych` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `tts` | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) |
| `ui-generation` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `vector-search` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) |
| `video-production` | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) |
| `visualization` | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) |
| `web-fiction` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `workflow` | [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) |
| `writing` | [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) |
| `writing-workbench` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `xlsx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |

---

## 四、按语言

实现语言。纯文档/提示词类条目标记为 `markdown`。

| 语言 | 条目 |
|---|---|
| `go` | [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) |
| `html` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `java` | [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) |
| `javascript` | [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `markdown` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `python` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `typescript` | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |

---

## 五、按协议

协议仅作为判断能否商用的参考（本仓库不转载源码，因此不承担再分发义务）。

| 协议 | 条目数 | 条目 |
|---|---|---|
| `AGPL-3.0` | 3 | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) · [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) · [Dashi PPT Skill 大师 PPT](entries/writing-docs/dashi-ppt-skill/SKILL.md) |
| `Apache-2.0` | 11 | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) · [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) · [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) · [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) · [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) · [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) · [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) · [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) · [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) · [PaperQA 文献问答](entries/research-intel/future-house-paper-qa/SKILL.md) · [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) |
| `CC-BY-4.0` | 1 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `CC0-1.0` | 1 | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) |
| `GPL-3.0` | 2 | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) · [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) |
| `LicenseRef-Anthropic-Source-Available` | 1 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `MIT` | 22 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) · [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) · [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) · [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) · [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) · [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) · [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) · [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) · [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) · [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) · [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) · [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) · [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) · [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) · [科学研究 Agent Skills](entries/research-intel/k-dense-ai-scientific-agent-skills/SKILL.md) · [RD-Agent 研发自动化](entries/research-intel/microsoft-rd-agent/SKILL.md) · [STORM 知识研究系统](entries/research-intel/stanford-oval-storm/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `UNKNOWN` | 6 | [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) · [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |

---

## 六、排行

star 数不参与收录判断，仅作为排序维度。`—` 表示尚未采集。

### 按 star

| # | 条目 | star | 最近提交 |
|---|---|---|---|
| 1 | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 270037 | 2026-08-08T01:45:49Z |
| 2 | [MoneyPrinterTurbo 一站式 AI 短视频生成工具](entries/design-creative/money-printer-turbo/SKILL.md) | 116792 | 2026-08-26T09:37:30Z |
| 3 | [OpenMontage 开源智能体视频制作系统](entries/design-creative/openmontage/SKILL.md) | 50726 | 2026-08-22T18:22:24Z |
| 4 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 21060 | 2026-08-11T12:12:06Z |
| 5 | [GPT-Image2 工业级提示词引擎与模板库](entries/design-creative/awesome-gpt-image-2/SKILL.md) | 19916 | 2026-08-26T08:54:32Z |
| 6 | [Toonflow 一站式 AI 短剧创作工具](entries/design-creative/toonflow/SKILL.md) | 14622 | 2026-08-26T10:49:08Z |
| 7 | [ViMax 智能体视频生成框架](entries/design-creative/vimax/SKILL.md) | 12103 | 2026-07-29T08:56:47Z |
| 8 | [Seedance 2.0 Skill OS 视频执导技能包](entries/design-creative/seedance-20/SKILL.md) | 6923 | 2026-08-06T11:00:29Z |
| 9 | [Video Shotcraft 产品视频动态设计技能](entries/design-creative/video-shotcraft/SKILL.md) | 6400 | 2026-08-26 |
| 10 | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 6086 | 2026-08-26T05:28:29Z |
| 11 | [Codex Taskboard 本地任务看板](entries/agent-infra/codex-taskboard/SKILL.md) | 2611 | 2026-08-26T08:54:06Z |
| 12 | [shuohao-skills AI 短剧制作技能合集](entries/writing-docs/shuohao-skills/SKILL.md) | 2100 | 2026-08-26 |
| 13 | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 1201 | 2026-08-26T06:48:55Z |
| 14 | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 1113 | 2026-07-25T13:28:39Z |
| 15 | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 287 | 2026-07-19T09:05:19Z |
| 16 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 140 | 2026-07-07T07:47:56Z |
| 17 | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 67 | 2026-08-19T05:20:41Z |
| 18 | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 35 | 2026-08-25T11:21:09Z |
| 19 | [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | — | — |
| 20 | [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) | — | — |
| 21 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | — | — |
| 22 | [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) | — | — |
| 23 | [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) | — | — |
| 24 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | — | — |
| 25 | [ArcReel AI 视频生产工作台](entries/design-creative/arcreel/SKILL.md) | — | — |
| 26 | [GPT Researcher 深度研究框架](entries/research-intel/assafelovic-gpt-researcher/SKILL.md) | — | — |
| 27 | [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) | — | — |
| 28 | [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | — | — |
| 29 | [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | — | — |
| 30 | [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) | — | — |

### 最近加入

| 条目 | 加入日期 | 最后更新 |
|---|---|---|
| [Astronomer 数据工程 Agent](entries/data-analytics/astronomer-agents/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Evidence 数据产品框架](entries/data-analytics/evidence-dev-evidence/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [marimo 响应式 Notebook](entries/data-analytics/marimo-team-marimo/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [数据分析技能集](entries/data-analytics/nimrodfisher-data-analytics-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Python 分析技能](entries/data-analytics/pymc-labs-python-analytics-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [生产级工程技能集](entries/dev-engineering/addyosmani-agent-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Claude 工程技能库](entries/dev-engineering/alirezarezvani-claude-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [GitHub Copilot 社区资源库](entries/dev-engineering/github-awesome-copilot/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Antigravity 综合技能集](entries/dev-engineering/sickn33-antigravity-awesome-skills/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [工程 Agent 与插件集合](entries/dev-engineering/wshobson-agents/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DeepSeek Harness Ultimate](entries/dsh/0xsline-awesome-deepseek-harness/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 插件发现助手](entries/dsh/awesome-dsh-plugin-dsh-find-plugin/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 终端界面](entries/dsh/ccch1mneyyy-dsh-tui/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DeepSeek Harness](entries/dsh/deepseek-ai-deepseek-harness/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [DSH 插件市场](entries/dsh/dsh-market-dsh-market/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Ansible 自动化引擎](entries/ops-automation/ansible-ansible/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Dagu 工作流调度器](entries/ops-automation/dagu-org-dagu/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Kestra 工作流编排](entries/ops-automation/kestra-io-kestra/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Prefect 工作流编排](entries/ops-automation/prefecthq-prefect/SKILL.md) | 2026-08-27 | 2026-08-27 |
| [Pulumi 基础设施即代码](entries/ops-automation/pulumi-pulumi/SKILL.md) | 2026-08-27 | 2026-08-27 |

---

---

由 `scripts/gen_index.py` 生成 · 最后更新 2026-08-27 · 共 47 个条目


