<!--
  ⚠️ 本文件由 scripts/gen_index.py 自动生成，请勿手动编辑。

  修改条目信息请编辑对应的 <分类>/<条目>/meta.yml，然后执行：
      python scripts/gen_index.py

  CI 会重新渲染并与本文件比对，不一致将导致构建失败。
-->

# 索引

SkillMall 全部收录条目的交叉检索表。六个视图对应六种找东西的方式：
知道大概用途就看[分类](#二按分类)，有明确关键词就看[标签](#三按标签)，
关心技术栈就看[语言](#四按语言)，在意合规就看[协议](#五按协议)。

图例：📦 源码已收录 · 🔗 仅链接存根 · ★ 破例收录 · ⚠️ 有风险备注

---

## 一、全量总表

共 3 个条目，按分类与名称排序。

| | 名称 | 分类 | 类型 | 协议 | 评级 | 简介 |
|---|---|---|---|---|---|---|
| 🔗 ⚠️ | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) | 商业与办公 | 技能集 | 🔴 LicenseRef-Anthropic-Source-Available | 常规 | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |
| 🔗 | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) | 技能工程 | 规范 | 🟢 CC-BY-4.0 | 常规 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。本仓库仅链接官方规范，不冻结副本。 |
| 📦 | [Superpowers 开发方法论](meta-skillcraft/superpowers/) | 技能工程 | 技能集 | 🟢 MIT | 主推 | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |

---

## 二、按分类

| 分类 | 定位 | 条目数 |
|---|---|---|
| 写作与文档 | 文案、报告、技术写作、文档生成 | 0 |
| 研发与代码 | 编码、重构、测试、代码审查 | 0 |
| 设计与创意 | UI/UX、视觉、品牌、素材生成 | 0 |
| 数据与分析 | 数据处理、可视化、表格、BI | 0 |
| 研究与信息获取 | 检索、调研、信息聚合、竞品分析 | 0 |
| 运维与自动化 | 部署、CI/CD、脚本、系统维护 | 0 |
| [商业与办公](#商业与办公) | 办公文档、协作、流程、商务 | 1 |
| Agent 基础设施 | MCP server、框架、CLI 工具 | 0 |
| [技能工程](#技能工程) | 写 skill 的 skill、规范、模板、元技能 | 2 |

### 商业与办公

`business-office/` —— 办公文档、协作、流程、商务

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| 🔗 ⚠️ | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) | 技能集 | 🔴 LicenseRef-Anthropic-Source-Available | Anthropic 官方维护的文档处理技能集合——docx 生成编辑、pdf 读写合并、pptx 演示稿、xlsx 表格。生产级实现，但 source-available 非开源，本仓库仅链接不转载。 |

### 技能工程

`meta-skillcraft/` —— 写 skill 的 skill、规范、模板、元技能

| | 名称 | 类型 | 协议 | 简介 |
|---|---|---|---|---|
| 🔗 | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) | 规范 | 🟢 CC-BY-4.0 | Anthropic 发起、社区共建的开放智能体技能格式标准，定义 SKILL.md 结构与按需三级加载机制。本仓库仅链接官方规范，不冻结副本。 |
| 📦 | [Superpowers 开发方法论](meta-skillcraft/superpowers/) | 技能集 | 🟢 MIT | 面向编码智能体的完整软件开发方法论，由 14 个可组合 skill 构成（TDD、并行子代理、系统化调试、代码评审等）。智能体在动手前先厘清需求、产出计划，再自驱执行。 |

---

## 三、按标签

共 19 个标签。标签是分类之外的交叉维度——一个条目只能属于一个分类，但可以有多个标签。

| 标签 | 条目 |
|---|---|
| `agent-methodology` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `agent-skills` | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `claude` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `claude-code` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `code-review` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `document-generation` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `docx` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `git-worktree` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `interoperability` | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `office` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `pdf` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `pptx` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `skill-md` | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `software-engineering` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `spec` | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `standard` | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `subagent` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `tdd` | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `xlsx` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |

---

## 四、按语言

实现语言。纯文档/提示词类条目标记为 `markdown`。

| 语言 | 条目 |
|---|---|
| `markdown` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) · [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) · [Superpowers 开发方法论](meta-skillcraft/superpowers/) |
| `python` | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |

---

## 五、按协议

协议分级决定了源码能否收进本仓库。判定规则见 [许可证政策](docs/license-policy.md)。

| 协议 | 分级 | 条目数 | 条目 |
|---|---|---|---|
| `CC-BY-4.0` | 🟢 A | 1 | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) |
| `LicenseRef-Anthropic-Source-Available` | 🔴 C | 1 | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) |
| `MIT` | 🟢 A | 1 | [Superpowers 开发方法论](meta-skillcraft/superpowers/) |

### 🔗 仅链接存根

以下 2 个条目**不包含任何上游源码**——其协议禁止再分发，或协议状态不明。本仓库仅提供导航、说明与评测，获取方式见各条目的 `GET-IT.md`。

| 条目 | 协议 | 不收录源码的原因 |
|---|---|---|
| [Anthropic Office 文档技能](business-office/anthropics-office-skills/) | `LicenseRef-Anthropic-Source-Available` | 仅 docx/pdf/pptx/xlsx 四个技能为 source-available 不可转载；同仓库其他技能（如 skill-creator、algorithmic-art）多为 Apache-2.0，可另行收录。 |
| [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) | `CC-BY-4.0` | 协议限制再分发 |

---

## 六、排行

star 数不参与收录判断（见[收录标准](docs/admission-criteria.md#为什么-star-不是硬门槛)），仅作为排序维度。指标由 `scripts/sync_metrics.py` 定期回写，`—` 表示尚未采集。

### 按 star

| # | 条目 | star | 最近提交 |
|---|---|---|---|
| 1 | [Superpowers 开发方法论](meta-skillcraft/superpowers/) | 270037 | 2026-08-08T01:45:49Z |
| 2 | [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) | — | — |
| 3 | [Anthropic Office 文档技能](business-office/anthropics-office-skills/) | — | — |

### 最近加入

| 条目 | 加入日期 | 最后更新 |
|---|---|---|
| [Anthropic Office 文档技能](business-office/anthropics-office-skills/) | 2026-08-10 | 2026-08-10 |
| [Agent Skills 规范](meta-skillcraft/agent-skills-spec/) | 2026-08-10 | 2026-08-10 |
| [Superpowers 开发方法论](meta-skillcraft/superpowers/) | 2026-08-10 | 2026-08-10 |

---

---

由 `scripts/gen_index.py` 生成 · 最后更新 2026-08-10 · 共 3 个条目
