<div align="center">

# Awesome SkillMall

**面向中文用户的 Agent Skill 资源集合与在线预览版本。**

一个轻量、中文为主的 Agent Skill 索引库：每个条目只存一份 `SKILL.md`（介绍 + 安装指令），
Agent 读完即可快速定位并安装对应的 skill 项目。不收录上游源码快照。

[![entries](https://img.shields.io/badge/entries-4-blue.svg)](site/index.html)
[![license](https://img.shields.io/badge/docs-CC%20BY%204.0-blue.svg)](LICENSE)
[![code license](https://img.shields.io/badge/code-MIT-green.svg)](LICENSE-CODE)
[![CI: index-check](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml)
[![CI: link-check](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml)

</div>

---

## 快速入口

- **在线预览**：[avalonlee.github.io/SkillMall](https://avalonlee.github.io/SkillMall/) —— 搜索 / 分类筛选 / 点开看每个 skill 的安装方式
- **推荐收录**：[建议收录新条目](https://github.com/AvalonLee/SkillMall/issues/new?template=new-entry.yml) —— 发现优质 Skill？一键提交收录建议
- 更新日志：[docs/CHANGELOG.md](docs/CHANGELOG.md)

## 什么是 SKILL.md？

[SKILL.md](https://agentskills.io/specification) 是 Anthropic 发起、社区共建的开放智能体技能格式：
一份给 AI Agent 读取的纯文本文件，用来告诉 Agent "怎么干活"。

它本质上只是一个 Markdown 文件：

- 不需要源码快照
- 不需要复杂工具链
- 放进 Agent 的 skills 目录，Agent 就能加载它获得某项专门能力

| 文件 | 谁来读取 | 定义什么 |
|------|----------|----------|
| `AGENTS.md` | Coding agents | 项目应该怎么做 |
| `SKILL.md` | Design / 技能 Agent | 一个技能是什么、怎么装、怎么用 |

**这个仓库提供的是可直接使用的 `SKILL.md` 索引与导航**——每个条目来自对真实优质 skill 项目的整理，
并附上「怎么安装」的可执行指令。

## 每个 SKILL.md 里有什么？

每份文件都遵循 Agent Skills 规范，并包含这些常用部分：

| # | 部分 | 说明 |
|---|------|------|
| 1 | frontmatter 元数据 | id / 名称 / 摘要 / 分类 / 标签 / 协议 / 评级 |
| 2 | 这是什么 | 它是什么类型的东西、由谁维护、处于什么生态位 |
| 3 | 怎么安装 | 给 Agent 看的一键可执行指令（git clone / npm / pip / 复制目录） |
| 4 | 怎么用 | 装完就能上手的起步用法 |
| 5 | 注意事项 | 已知限制、依赖、维护状态、许可证是否可商用 |

frontmatter 关键字段含义：

| 字段 | 含义 |
|------|------|
| `id` | 全局唯一标识，必须等于所在目录名 |
| `name_zh` / `name_en` | 中文 / 英文名称 |
| `summary_zh` | 它解决什么问题、适合谁用（≤200 字） |
| `category` | 九大一级分类之一 |
| `tags` | 便于检索的标签 |
| `license` | SPDX 标识符或 UNKNOWN，供判断是否可商用 |
| `repo` / `homepage` | 上游仓库与主页链接 |
| `tier` | 评级：`core` 主推 / `standard` 常规 / `watch` 观察 |

## 如何使用

**Agent 视角（推荐）：** 读 [INDEX.md](INDEX.md) 或直接翻 `entries/`，找到目标条目后读取其
`SKILL.md`，按「怎么安装」小节执行即可。SKILL.md 的 frontmatter 已含 `repo`、`license`、`tier`，
Agent 可直接据此判断装不装、能不能商用。

**人工浏览：** 打开 [在线预览站](https://avalonlee.github.io/SkillMall/)，用搜索框与分类 / 标签 /
评级 / 协议筛选，找到需要的技能后点开查看安装指令。

**写自己的 skill：** 参考 [docs/skill-spec-cheatsheet.md](docs/skill-spec-cheatsheet.md)
（对齐 Agent Skills 规范）与 `_template/SKILL.md` 脚手架。

## 这个中文版本额外做了什么？

在保留原始 `SKILL.md` 与索引资源的基础上，这个仓库增加了：

- **在线预览站**：首页搜索 + 分类 / 标签 / 评级 / 协议筛选 + 卡片网格，点开即看每个 skill 的安装方式
- **中文导读与索引**：`INDEX.md` 六视图交叉索引，附英文摘要照顾更广读者
- **CI 保障**：`index-check` 校验条目完整性，`link-check` 定期扫死链
- **更友好的浏览与理解入口**：从"收藏夹外链列表"升级为"可检索、可溯源的技能集市"

## 收录内容

当前收录 **4** 个技能，按九大分类组织（目录名 → 定位）：

| 目录 | 定位 |
|---|---|
| `entries/writing-docs/` | 文案、报告、技术写作、文档生成 |
| `entries/dev-engineering/` | 编码、重构、测试、代码审查 |
| `entries/design-creative/` | UI/UX、视觉、品牌、素材生成 |
| `entries/data-analytics/` | 数据处理、可视化、表格、BI |
| `entries/research-intel/` | 检索、调研、信息聚合、竞品分析 |
| `entries/ops-automation/` | 部署、CI/CD、脚本、系统维护 |
| `entries/business-office/` | 办公文档、协作、流程、商务 |
| `entries/agent-infra/` | MCP server、框架、CLI 工具 |
| `entries/meta-skillcraft/` | 写 skill 的 skill、规范、模板、元技能 |

完整条目列表与交叉检索见 **[INDEX.md](INDEX.md)**。

## 收录标准（摘要）

完整门槛见 [docs/admission-criteria.md](docs/admission-criteria.md)：

- **A1 可获取** —— 项目公开可达，`repo` / `homepage` 是有效链接
- **A2 文档可用** —— 有能让人上手的说明（README 或 `SKILL.md`）
- **A3 安装可循** —— 条目里能写出一条明确的安装/获取指令
- **A4 协议标注** —— frontmatter 填 `license`（SPDX 或 UNKNOWN），供判断是否可商用

**评级三档：** `core`（主推）/ `standard`（常规）/ `watch`（观察期）。

> 本仓库**不收录源码**，因此协议只作为参考标注，不再承担再分发义务；具体能否商用，
> 一律以上游 LICENSE 全文为准。

## 贡献新条目

欢迎 PR！完整流程见 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)。要点（三步）：

1. 从 `_template/SKILL.md` 复制到 `entries/<分类>/<id>/SKILL.md`；
2. 填 frontmatter（id 必须等于目录名），正文写「是什么 / 怎么安装 / 怎么用 / 注意事项」；
3. 跑 `python scripts/validate.py && python scripts/gen_site.py`，提交 PR
   （`gen_site.py` 会重新生成在线预览站数据，记得一并提交 `site/`）。

## 协议与合规

- **本仓库的原创内容**（分类体系、导读、脚本、文档）：
  - 文档类 → **CC BY 4.0**（见 [LICENSE](LICENSE)）
  - 代码类（`scripts/`、`*.yml` 工作流）→ **MIT**（见 [LICENSE-CODE](LICENSE-CODE)）
- **收录条目的内容**：著作权归各自作者，本仓库仅提供导航与说明，不含上游源码。

## 下架与联系

如果你是某项内容的著作权人，希望本仓库移除相关收录：

- 开 Issue：https://github.com/AvalonLee/SkillMall/issues
- 或发邮件至：avalonli@qq.com

**承诺 7 日内处理，无需提供任何法律文书**，一句话说明身份和诉求即可。
我们会删除相关内容并在 docs/CHANGELOG.md 中记录。

---

<p align="center">
  <sub>SkillMall · 轻量索引 · 只存 SKILL.md · 中文为主 · 可溯源</sub>
</p>
