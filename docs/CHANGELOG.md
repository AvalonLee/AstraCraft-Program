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

- **StaffDeck 企业数字员工平台（2026-09-05）**：收录 `agent-infra/staffdeck`（AGPL-3.0）。OpenBMB 开源的企业数字员工平台：把业务经验、SOP、决策标准与知识库沉淀为可持续运行的数字员工，支持状态机流程、文档感知检索、MCP/HTTP 工具执行、长期记忆与审计。评级：常规。目录总数由 47 增至 **48**。
- **Skill Recorder 屏幕工作录制转技能（2026-09-05）**：收录 `meta-skillcraft/skill-recorder`（MIT）。微软开源的桌面应用：录制屏幕工作过程，用 GitHub Copilot CLI 重建为意图与有序步骤，再生成可复用 Skill 或定时 Automation，供 Scout / Copilot Cowork / Copilot Studio 使用。评级：常规。目录总数由 46 增至 **47**。
- **WeKnora 开源 LLM 知识平台（2026-09-05）**：收录 `agent-infra/weknora`（MIT）。腾讯开源的企业级 LLM 知识平台：把文档转成可检索 RAG、自主推理 Agent 与自维护 Wiki，支持多源知识库、MCP Server、DSH 插件、Agent Skills、Web/API/CLI/IM 渠道与私有化部署。评级：常规。目录总数由 45 增至 **46**。
- **Visual Skills AI 影像导演技能集（2026-09-05）**：收录 `design-creative/visual-skills`（CC BY 4.0）。面向 Agent 的电影级 AI 影像导演技能集，`video` 负责先做戏剧结构再生成 Seedance / Kling / Veo 提示词，`image` 负责 Nano Banana / GPT Image 的分镜与关键帧。评级：常规。目录总数由 44 增至 **45**。

---

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
