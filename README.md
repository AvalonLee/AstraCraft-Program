# SkillMall · Agent Skill 索引与导航集市

> 一个**轻量**的 Agent Skill 与关联项目中文索引库：每个条目只保留一份 `SKILL.md`
> （介绍 + 安装指令），Agent 读完即可快速定位并安装对应的 skill 项目。
> 不收录上游源码快照。

[![license](https://img.shields.io/badge/docs-CC%20BY%204.0-blue.svg)](LICENSE)
[![code license](https://img.shields.io/badge/code-MIT-green.svg)](LICENSE-CODE)
[![entries](https://img.shields.io/badge/entries-4-blue.svg)](INDEX.md)
[![CI: index-check](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml)
[![CI: link-check](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml)

---

## 一、这是什么

SkillMall 是一个用于**收集、整理和索引优质开源 Skill 及关联项目**的公开仓库。

它既不是"一个收藏夹链接列表"，也不再拷贝源码快照——本仓库**只存一个给 Agent 读的 md 文件**：
`SKILL.md`，内含项目介绍与**一键可执行的安装指令**。任何 Agent（Claude Code / Codex / Cursor /
OpenClaw 等）读到这个文件，就能快速定位并安装对应的 skill 项目。

**三个核心特征：**

- **轻量**：每个条目只维护一个 `SKILL.md`，不拷源码、不冻结快照、无体积上限；
- **可执行**：`SKILL.md` 的「怎么安装」小节是给 Agent 的即用指令（git clone / npm / pip / 复制到 skills 目录）；
- **中文为主**：中文导读 + `INDEX.md` 六视图交叉索引，附英文摘要照顾更广读者。

---

## 二、解决什么问题

| 痛点 | SkillMall 的做法 |
|---|---|
| 优质 skill 散落各处、收藏夹一堆会失效的外链 | 统一收录入口，每个条目一个 `SKILL.md`，附官方 `repo` 链接 |
| 不知道装哪个、怎么装 | 每条目含「怎么安装」指令，Agent 读完即可照着执行 |
| 担心来源 / 协议 / 能不能商用 | frontmatter 标注 `license`（SPDX）与 `repo`，便于判断 |
| 仓库越大越乱，检索靠翻目录 | `scripts/gen_index.py` 生成六视图交叉索引（见 [INDEX.md](INDEX.md)） |
| 链接失效失联 | CI `link-check` 定期扫死链，失效即报 |

---

## 三、收录标准（摘要）

完整门槛见 [docs/admission-criteria.md](docs/admission-criteria.md)，这里给速览：

- **A1 可获取** —— 项目公开可达，`repo` / `homepage` 是有效链接
- **A2 文档可用** —— 有能让人上手的说明（README 或 `SKILL.md`）
- **A3 安装可循** —— 条目里能写出一条明确的安装/获取指令
- **A4 协议标注** —— frontmatter 填 `license`（SPDX 或 UNKNOWN），供判断是否可商用

**评级三档：** `core`（主推，公认优质或已实测）/ `standard`（常规） / `watch`（观察期）。

> 本仓库**不收录源码**，因此协议只作为参考标注，不再承担再分发义务；具体能否商用，
> 一律以上游 LICENSE 全文为准。

---

## 四、目录结构

```
SkillMall/
├── README.md              # 你正在看的文件（核心入口）
├── INDEX.md               # 自动生成的交叉检索索引（六视图）
├── LICENSE                # 原创文档：CC BY 4.0
├── LICENSE-CODE           # 脚本代码：MIT
├── entries/               # ★ 九大用途分类统一收纳
│   └── <分类>/            # 九大分类之一，见下表
│       └── <id>/
│           └── SKILL.md   # ★ 唯一的条目文件：frontmatter 元数据 + 介绍 + 安装指令
├── docs/                  # ★ 全部文档统一收纳
│   ├── CONTRIBUTING.md        # 如何贡献新条目
│   ├── CODE_OF_CONDUCT.md     # 行为准则
│   ├── CHANGELOG.md           # 条目增减与结构变更
│   ├── THIRD_PARTY_NOTICES.md # 第三方内容归属声明
│   ├── admission-criteria.md  # 收录标准
│   ├── license-policy.md      # 协议标注政策
│   ├── writing-skill-md.md    # 如何编写 SKILL.md
│   └── skill-spec-cheatsheet.md # Agent Skills 规范速查
├── scripts/               # 工具链（Python）
│   ├── validate.py        # 条目校验（CI 用）
│   └── gen_index.py       # 生成 INDEX.md
├── _template/SKILL.md     # 新增条目脚手架（复制即用）
└── .github/               # CI 与 Issue/PR 模板
```

### 九大分类

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

---

## 五、如何使用本仓库

**Agent 视角（推荐）：** 读 [INDEX.md](INDEX.md) 或直接翻 `entries/`，找到目标条目后读取其
`SKILL.md`，按「怎么安装」小节执行即可。SKILL.md 的 frontmatter 已含 `repo`、`license`、`tier`，
Agent 可直接据此判断装不装、能不能商用。

**人工浏览：** [INDEX.md](INDEX.md) 提供按分类 / 标签 / 语言 / 协议 / 排行 五种检索方式。

**写自己的 skill：** 参考 [docs/skill-spec-cheatsheet.md](docs/skill-spec-cheatsheet.md)
（对齐 Agent Skills 规范）与 `_template/SKILL.md` 脚手架。

---

## 六、贡献新条目

欢迎 PR！完整流程见 [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)。要点（三步）：

1. 从 `_template/SKILL.md` 复制到 `entries/<分类>/<id>/SKILL.md`；
2. 填 frontmatter（id 必须等于目录名），正文写「是什么 / 怎么安装 / 怎么用 / 注意事项」；
3. 跑 `python scripts/validate.py && python scripts/gen_index.py`，提交 PR（记得把生成的
   `INDEX.md` 一起提交）。

---

## 七、协议与合规

本仓库**不收录上游源码**，因此不存在源码再分发问题。条目 `SKILL.md` 的 frontmatter 标注
`license`（SPDX 标识符或 UNKNOWN）仅作参考，帮助判断该项目能否商用；**是否可商用，一律以
对应上游 LICENSE 全文为准**。source-available / 无 LICENSE 的项目照常收录（仅导航与安装指引）。

---

## 八、自动化与 CI

| Workflow | 作用 |
|---|---|
| `index-check.yml` | PR 上跑 `validate.py` 校验 frontmatter 与安装指令完整性，并重新渲染 `INDEX.md` 比对防脱节 |
| `link-check.yml` | PR 增量检查 Markdown 死链 + 每周全量扫描（基于 lychee） |

---

## 九、版权与许可证

- **本仓库的原创内容**（分类体系、导读、脚本、文档）：
  - 文档类 → **CC BY 4.0**（见 [LICENSE](LICENSE)）
  - 代码类（`scripts/`、`*.yml` 工作流）→ **MIT**（见 [LICENSE-CODE](LICENSE-CODE)）
- **收录条目的内容**：著作权归各自作者，本仓库仅提供导航与说明，不含上游源码。

---

## 十、下架与联系

如果你是某项内容的著作权人，希望本仓库移除相关收录：

- 开 Issue：https://github.com/AvalonLee/SkillMall/issues
- 或发邮件至：avalonli@qq.com

**承诺 7 日内处理，无需提供任何法律文书**，一句话说明身份和诉求即可。
我们会删除相关内容并在 docs/CHANGELOG.md 中记录。

---

<p align="center">
  <sub>SkillMall · 轻量索引 · 只存 SKILL.md · 中文为主 · 可溯源</sub>
</p>
