<!--
  ⚠️ 本文件由 scripts/gen_index.py 自动生成，请勿手动编辑。

  修改条目信息请编辑对应的 entries/<分类>/<id>/SKILL.md（frontmatter），然后执行：
      python scripts/gen_index.py

  CI 会重新渲染并与本文件比对，不一致将导致构建失败。
-->

# 索引

SkillMall 全部收录条目的交叉检索表。六个视图对应六种找东西的方式：
知道大概用途就看[分类](#二按分类)，有明确关键词就看[标签](#三按标签)，
关心技术栈就看[语言](#四按语言)，在意合规就看[协议](#五按协议)。

图例：★ 主推 · ⚠️ 有风险备注

> 每个条目只有一个 `SKILL.md`（介绍 + 安装指令）。Agent 点链接读取该文件，
> 即可快速定位并安装对应的 skill 项目；本仓库**不收录上游源码快照**。

---

## 一、全量总表

共 11 个条目，按分类与名称排序。

| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |
|---|---|---|---|---|---|---|
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | Agent 基础设施 | 框架 | MIT | 常规 | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 商业与办公 | 技能集 | LicenseRef-Anthropic-Source-Available | 常规 | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 设计与创意 | 技能集 | UNKNOWN | 常规 | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 设计与创意 | 技能包 | UNKNOWN | 常规 | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 技能工程 | 规范 | CC-BY-4.0 | 常规 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ★ | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 技能工程 | 技能集 | MIT | 主推 | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
| ⚠️ | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 写作与文档 | 技能集 | MIT | 常规 | 面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。 |
| ⚠️ | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 写作与文档 | 框架 | MIT | 常规 | AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。 |

---

## 二、按分类

| 分类 | 定位 | 条目数 |
|---|---|---|
| [写作与文档](#写作与文档) | 文案、报告、技术写作、文档生成 | 3 |
| 研发与代码 | 编码、重构、测试、代码审查 | 0 |
| [设计与创意](#设计与创意) | UI/UX、视觉、品牌、素材生成 | 4 |
| 数据与分析 | 数据处理、可视化、表格、BI | 0 |
| 研究与信息获取 | 检索、调研、信息聚合、竞品分析 | 0 |
| 运维与自动化 | 部署、CI/CD、脚本、系统维护 | 0 |
| [商业与办公](#商业与办公) | 办公文档、协作、流程、商务 | 1 |
| [Agent 基础设施](#Agent 基础设施) | MCP server、框架、CLI 工具 | 1 |
| DSH 插件 | DeepSeek Harness 插件——「一切皆插件」，模型适配器、工具、界面、技能、Agent 均可插拔扩展 | 0 |
| [技能工程](#技能工程) | 写 skill 的 skill、规范、模板、元技能 | 2 |

### 写作与文档

`entries/writing-docs/` —— 文案、报告、技术写作、文档生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 技能集 | MIT | 面向 Claude Code 与 Codex 的 AI 短剧/漫剧创作 skill 合集：覆盖剧本、资产、分镜、图片/视频提示词到独立审查全链路，10 个技能协作，适配编剧与漫剧工作室。 |
| ⚠️ | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 技能集 | MIT | 面向 Claude Code 的网文/小说写作 skill 包：覆盖长篇与短篇网络小说的扫榜、拆文、写作、去AI味、封面图全流程，内置 13 个 skill，适配多 Agent 环境。 |
| ⚠️ | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 框架 | MIT | AI Agent 驱动的商业级小说写作工作台（React 前端 + FastAPI 后端 Monorepo）：对话即创作，多 Agent 协作、素材库拆解、13 个内置写作技能与 Agent API，支持长篇/短篇/短剧。 |

### 设计与创意

`entries/design-creative/` —— UI/UX、视觉、品牌、素材生成

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 技能集 | UNKNOWN | 面向中文用户的 DESIGN.md 资源集合：整理 70+ 个真实网站的设计系统文档（Google Stitch 提出的纯文本设计语言），复制一份到项目即可让 AI Agent 生成风格一致的 UI。 |
| ⚠️ | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。 |
| ⚠️ | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。 |
| ⚠️ | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 技能包 | UNKNOWN | 面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。 |

### 商业与办公

`entries/business-office/` —— 办公文档、协作、流程、商务

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 技能集 | LicenseRef-Anthropic-Source-Available | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |

### Agent 基础设施

`entries/agent-infra/` —— MCP server、框架、CLI 工具

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 框架 | MIT | 腾讯云出品的 Agent 团队级记忆中心（Memory Hub）：把对话、文档与代码沉淀为 Chat Memory / Skill / LLM-Wiki / CodeGraph 四类可复用资产，支持治理、共享并跨 Agent 与框架装备。 |

### 技能工程

`entries/meta-skillcraft/` —— 写 skill 的 skill、规范、模板、元技能

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| ⚠️ | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 规范 | CC-BY-4.0 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。作为活的标准，本仓库始终指向官方最新版。 |
| ★ | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 技能集 | MIT | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |

---

## 三、按标签

共 59 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，但可以有多个标签。

| 标签 | 条目 |
|---|---|
| `agent` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `agent-methodology` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `agent-skills` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `ai-agent` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `awesome-list` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `casting` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `character-design` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `cinematic` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `claude` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `claude-code` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `cn-localization` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `code-graph` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `code-review` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `codex` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `cover-generation` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `de-slop` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `design-md` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `design-system` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `document-generation` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `docx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `fashion-visual` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `film-language` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `git-worktree` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `google-stitch` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `image-generation` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `interoperability` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `life-force` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `llm-wiki` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `long-term-memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `memory` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `multi-agent` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `novel-writing` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `office` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `openclaw` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `pdf` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `photography` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `photorealistic` | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) |
| `portrait` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `pptx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `prompt-engineering` | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `screenwriting` | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `short-drama` | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `skill` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `skill-md` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `skill-pack` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `social-media` | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |
| `software-engineering` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `spec` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `standard` | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `storyboard` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) |
| `subagent` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `tdd` | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `tencent` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `triptych` | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) |
| `ui-generation` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `vector-search` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) |
| `web-fiction` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `writing-workbench` | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `xlsx` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |

---

## 四、按语言

实现语言。纯文档/提示词类条目标记为 `markdown`。

| 语言 | 条目 |
|---|---|
| `html` | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) |
| `javascript` | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) |
| `markdown` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) · [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) |
| `python` | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `typescript` | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |

---

## 五、按协议

协议仅作为判断能否商用的参考（本仓库不转载源码，因此不承担再分发义务）。

| 协议 | 条目数 | 条目 |
|---|---|---|
| `CC-BY-4.0` | 1 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) |
| `LicenseRef-Anthropic-Source-Available` | 1 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) |
| `MIT` | 5 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) · [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) · [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) · [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) · [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) |
| `UNKNOWN` | 4 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) · [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) · [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) · [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) |

---

## 六、排行

star 数不参与收录判断，仅作为排序维度。`—` 表示尚未采集。

### 按 star

| # | 条目 | star | 最近提交 |
|---|---|---|---|
| 1 | [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 270037 | 2026-08-08T01:45:49Z |
| 2 | [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 21060 | 2026-08-11T12:12:06Z |
| 3 | [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 6086 | 2026-08-26T05:28:29Z |
| 4 | [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 1201 | 2026-08-26T06:48:55Z |
| 5 | [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 1113 | 2026-07-25T13:28:39Z |
| 6 | [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 287 | 2026-07-19T09:05:19Z |
| 7 | [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 140 | 2026-07-07T07:47:56Z |
| 8 | [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 67 | 2026-08-19T05:20:41Z |
| 9 | [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 35 | 2026-08-25T11:21:09Z |
| 10 | [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | — | — |
| 11 | [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | — | — |

### 最近加入

| 条目 | 加入日期 | 最后更新 |
|---|---|---|
| [中文 DESIGN.md 设计资源集](entries/design-creative/awesome-design-md-cn/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [人物角色 Casting 工作室 Skill](entries/design-creative/character-casting-studio-skill/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [Cinema DNA 21:9×3 电影画面生成 Skill](entries/design-creative/cinema-dna-21x9x3/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [Fantasy 生命感人像摄影 Skill](entries/design-creative/fantasy-life-force-portrait-photography/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [Drama Skills AI 短剧创作技能合集](entries/writing-docs/drama-skills/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [OH-Story 网文/小说写作 Skill 包](entries/writing-docs/oh-story-claudecode/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [ZenStory AI 小说写作工作台](entries/writing-docs/zenstory/SKILL.md) | 2026-08-26 | 2026-08-26 |
| [TencentDB Agent Memory](entries/agent-infra/tencentdb-agent-memory/SKILL.md) | 2026-08-13 | 2026-08-13 |
| [Anthropic Office 文档技能](entries/business-office/anthropics-office-skills/SKILL.md) | 2026-08-10 | 2026-08-13 |
| [Agent Skills 规范](entries/meta-skillcraft/agent-skills-spec/SKILL.md) | 2026-08-10 | 2026-08-13 |
| [Superpowers 开发方法论](entries/meta-skillcraft/superpowers/SKILL.md) | 2026-08-10 | 2026-08-13 |

---

---

由 `scripts/gen_index.py` 生成 · 最后更新 2026-08-26 · 共 11 个条目
