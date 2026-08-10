# SkillMall · 优质开源 Skill 与关联项目集市

> 一个**只收开源**、**全量快照**、**可溯源**的优质 Agent Skill 与关联项目中文集市。
> A curated, vendored-in, source-traceable collection of high-quality open-source agent skills and related projects — in Chinese-first.

[![license](https://img.shields.io/badge/docs-CC%20BY%204.0-blue.svg)](LICENSE)
[![code license](https://img.shields.io/badge/code-MIT-green.svg)](LICENSE-CODE)
[![entries](https://img.shields.io/badge/entries-3-blue.svg)](INDEX.md)
[![CI: index-check](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/index-check.yml)
[![CI: link-check](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml/badge.svg)](https://github.com/AvalonLee/SkillMall/actions/workflows/link-check.yml)

---

## 一、这是什么

SkillMall 是一个用于**收集、整理和归纳优质开源 Skill 及关联项目**的公开仓库。

我们不满足于"一个收藏夹链接列表"——本仓库把每个收录项目的**真实文件快照**拷进仓库
（vendoring），并配套中文导读、实测笔记与许可证归属，让你**离线可读、可复用、可审计**，
而不是点开一堆可能明天就 404 的外链。

**三个核心特征：**

- **只收开源**：仅收录 GitHub 等平台上的开源项目；协议为 source-available / 无 LICENSE /
  强 copyleft 的项目一律只做「链接存根」，不拷源码（见[协议与合规](#七协议与合规)）。
- **全量快照**：绿灯项目用 `scripts/vendor.py` 把源码**原样**拷入 `src/`，并用
  `upstream.lock` 记录 commit 与内容哈希，保证零修改、可回溯。
- **中文为主**：每个条目配中文 `README.zh-CN.md` 与（主推条目）`NOTES.zh-CN.md` 实测笔记，
  关键字段附英文摘要，照顾更广读者。

---

## 二、解决什么问题

| 痛点 | SkillMall 的做法 |
|---|---|
| 优质 skill 散落各处，收藏夹里一堆会失效的外链 | 把文件**真拷进仓库**，离线可用，链接只作补充 |
| 不知道某个 skill 到底好不好用、协议能不能商用 | 每个条目有**实测笔记 + 协议分级 + 风险备注** |
| 担心收录到 source-available / 无许可的"伪开源" | **三色协议红线**：红灯项目只链接不转载，CI 强制拦截 |
| 仓库越大越乱，检索靠翻目录 | `scripts/gen_index.py` 生成六视图交叉索引（见 [INDEX.md](INDEX.md)） |
| 快照与上游脱节、被偷偷改动 | `upstream.lock` 内容哈希 + CI `index-check` 防脱节 |

---

## 三、收录标准（摘要）

完整门槛见 [docs/admission-criteria.md](docs/admission-criteria.md)，这里给速览：

**硬门槛（底线，不可破例）：**

- **H1 可获取** —— 项目公开可达、可克隆
- **H2 协议明确** —— 许可证清晰，不在红线之外打擦边球
- **H3 文档可用** —— 有能让人上手的说明

**软门槛与加分项：**

- **H4 活跃度** —— 近期有提交、未归档（唯一可破例项，须写明理由）
- **H5 真实可用** —— 本人实测过（主推 `core` 条目强制要求）
- 加分：文档完整、协议干净、跨客户端适配、维护活跃、社区口碑等

**评级三档：** `core`（主推，须有实测笔记） / `standard`（常规） / `watch`（观察期）。

**破例配额：** 破例条目占比不得超过 **15%**，否则 CI 会告警。

---

## 四、目录结构

```
SkillMall/
├── README.md              # 你正在看的文件
├── INDEX.md               # 自动生成的交叉检索索引（六视图）
├── CONTRIBUTING.md        # 如何贡献新条目
├── CODE_OF_CONDUCT.md     # 行为准则
├── CHANGELOG.md           # 条目增减与结构变更
├── THIRD_PARTY_NOTICES.md # 第三方内容归属与许可证声明
├── LICENSE                # 原创文档：CC BY 4.0
├── LICENSE-CODE           # 脚本代码：MIT
├── _template/             # 新增条目脚手架（复制即用）
├── docs/                  # 收录标准 / 协议政策 / vendoring 指南 / 规范速查
│   ├── admission-criteria.md
│   ├── license-policy.md
│   ├── vendoring-guide.md
│   └── skill-spec-cheatsheet.md
├── scripts/               # 工具链（Python）
│   ├── validate.py        # 元数据校验（CI 用）
│   ├── gen_index.py       # 生成 INDEX.md
│   └── vendor.py          # 快照式拷贝上游源码
└── <分类>/                # 九大用途分类，每个分类下含若干条目目录
    └── <条目>/
        ├── meta.yml       # 条目元数据（人工维护）
        ├── upstream.lock  # 同步状态锁（脚本维护）
        ├── README.zh-CN.md
        ├── NOTES.zh-CN.md # 实测笔记（core 必填）
        ├── GET-IT.md      # 仅 link-only 存根有：本地补齐说明
        └── src/           # 仅 vendored 条目有：上游源码快照（白名单放行）
```

### 九大分类

| 目录 | 定位 |
|---|---|
| `writing-docs/` | 文案、报告、技术写作、文档生成 |
| `dev-engineering/` | 编码、重构、测试、代码审查 |
| `design-creative/` | UI/UX、视觉、品牌、素材生成 |
| `data-analytics/` | 数据处理、可视化、表格、BI |
| `research-intel/` | 检索、调研、信息聚合、竞品分析 |
| `ops-automation/` | 部署、CI/CD、脚本、系统维护 |
| `business-office/` | 办公文档、协作、流程、商务 |
| `agent-infra/` | MCP server、框架、CLI 工具 |
| `meta-skillcraft/` | 写 skill 的 skill、规范、模板、元技能 |

完整条目列表与交叉检索见 **[INDEX.md](INDEX.md)**。

---

## 五、如何使用本仓库

**浏览：** 直接看 [INDEX.md](INDEX.md)——按分类、标签、语言、协议四种方式检索。

**用 vendored（📦）条目：** 源码已在 `src/` 内，直接拷走即可，例如：

```bash
# 把 superpowers 的整套技能拷到你的 agent skills 目录
cp -r meta-skillcraft/superpowers/src/ ~/.claude/skills/superpowers/
```

**用 link-only（🔗）存根：** 本仓库**不含源码**，请按条目内 `GET-IT.md` 的指引在本地补齐
（注意：拉下来的 `src/` 已被根 `.gitignore` 忽略，不会误提交回本仓库）。

**写自己的 skill：** 参考 [docs/skill-spec-cheatsheet.md](docs/skill-spec-cheatsheet.md)
（对齐 Agent Skills 规范）与 `_template/` 脚手架。

---

## 六、贡献新条目

欢迎 PR！流程与七步清单见 [CONTRIBUTING.md](CONTRIBUTING.md)。要点：

1. 从 `_template/` 复制出条目目录；
2. 填 `meta.yml`（协议分级最关键，填错会被 CI 拦下）；
3. 绿灯项目用 `scripts/vendor.py --add <url> --into <分类>/<id>` 拉快照；
4. 红灯项目只写 `GET-IT.md`，不拷源码；
5. 写中文 `README.zh-CN.md`，主推条目还须写 `NOTES.zh-CN.md`；
6. 在 `THIRD_PARTY_NOTICES.md` 补归属登记；
7. 跑 `python scripts/validate.py && python scripts/gen_index.py`，提交 PR。

---

## 七、协议与合规

本仓库采用**三色协议分级**（完整判定见 [docs/license-policy.md](docs/license-policy.md)）：

| 级别 | 含义 | 处理方式 |
|---|---|---|
| 🟢 **A 绿灯** | MIT / BSD / ISC / CC0 / CC-BY-4.0 等 | 可直接 vendoring |
| 🟡 **B 黄灯** | Apache-2.0 / MPL-2.0 / OFL-1.1 等 | 可 vendoring，须带 NOTICE 且零修改 |
| 🔴 **C 红灯** | GPL 系 / SSPL / BUSL / source-available / 无 LICENSE | **禁止拷源码**，只做 link-only 存根 |

**CI 红线：** `validate.py` 会拦截"红灯条目却含 `src/`""A/B 级却标成 C""内容哈希失配"
等致命问题，对应 PR 将无法通过。

---

## 八、自动化与 CI

| Workflow | 作用 |
|---|---|
| `index-check.yml` | PR 上跑 `validate.py` 校验元数据，并重新渲染 `INDEX.md` 比对，防止索引脱节 |
| `link-check.yml` | PR 增量检查 Markdown 死链 + 每周全量扫描（基于 lychee） |

本仓库**刻意不用**已废弃的 `gaurav-nelson/github-action-markdown-link-check` 旧版，
PR 增量检查改用 `tcort/github-action-markdown-link-check`，全量死链用
`lycheeverse/lychee-action@v2`。

---

## 九、版权与许可证

- **本仓库的原创内容**（分类体系、评测笔记、脚本、文档）：
  - 文档类 → **CC BY 4.0**（见 [LICENSE](LICENSE)）
  - 代码类（`scripts/`、`*.yml` 工作流）→ **MIT**（见 [LICENSE-CODE](LICENSE-CODE)）
- **收录的第三方内容**：著作权归各自原作者，条目 `src/` 内保留上游原始 LICENSE，
  其条款优先于本仓库声明。第三方归属汇总见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

> ⚠️ 本仓库的说明、评级与实测笔记均为整理者主观判断，**不构成法律建议**。
> 任何再分发或商用，请以对应上游 LICENSE 全文为准。

---

## 十、下架与联系

如果你是某项内容的著作权人，希望本仓库移除相关收录：

- 开 Issue：https://github.com/AvalonLee/SkillMall/issues
- 或发邮件至：avalonli@qq.com

**承诺 7 日内处理，无需提供任何法律文书**，一句话说明身份和诉求即可。
我们会删除相关内容并在 CHANGELOG 中记录。

---

<p align="center">
  <sub>SkillMall · 只收开源 · 全量快照 · 中文为主 · 可溯源</sub>
</p>
