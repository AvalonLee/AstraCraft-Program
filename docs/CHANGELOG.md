# 变更日志

本文件记录 AstraCraft Program（天工计划）的条目增减与结构变更，按月倒序排列。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

变更类型：

- **新增** —— 新收录的条目
- **更新** —— 上游同步、协议重判、评级变化
- **移除** —— 因链接失效、上游删库、协议变更、安全问题而下架的条目
- **结构** —— 分类体系、模板、脚本、CI 的变更

---

## 2026-08

### 结构

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
  https://avalonlee.github.io/AstraCraft-Program/）；README 改写为 awesome-list 风格（徽章、什么是
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
- `meta-skillcraft/skill-recommender` —— 天工精选（AstraCraft Recommender）：本计划配套推荐技能，Agent 安装后依据项目描述与运行情况在本库做语义匹配并给出安装指引；每轮推荐 3 个标准化格式、本地数据超 7 天主动提示更新、推荐新项目仅限 GitHub 公开开源（CC-BY-4.0，standard 评级，2026-08-27 收录）。配套地，README 与在线预览站首页同步增加「一句话装到你的 Agent」快捷安装指令（复制引导句发给 AI Agent 即可完成安装）。

---

## 已移除条目存档

尚无。

条目被移除时，此处保留：条目 id、原上游地址、移除日期、移除原因。
保留记录是为了避免同一个已排除的项目被重复提交收录。
