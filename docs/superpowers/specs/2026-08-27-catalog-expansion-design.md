# 天工计划目录扩充与自动审核设计

## 目标

将 AstraCraft Program 从偏重设计与写作的早期目录扩充为分类覆盖更完整、上游状态可自动核验、推荐结果可回归测试，且能机器判定“目录条目”与“可安装 Skill”边界的中文 Agent Skill 索引库。

本次交付包含两部分：先建设格式契约、自动审核和推荐测试工具链，再使用该工具链为五个空分类各收录五个真实 GitHub 开源项目。完成后目录从 22 个条目增至 47 个条目。

## 范围

### 包含

- 为 `dev-engineering`、`data-analytics`、`research-intel`、`ops-automation`、`dsh` 各新增五个真实项目条目。
- 将所有目录条目标记为 `entry-record`，将根目录推荐器标记为 `installable-skill`。
- 增加彼此独立的格式 Schema 和混用检测。
- 自动核验 GitHub 仓库身份、许可证、安装来源、分类一致性与维护健康度。
- 保存可追溯的上游核验快照。
- 将推荐器的结构化初筛实现为确定性 Python 模块并增加回归测试。
- 增加离线 PR 检查、主动联网刷新和定时漂移检查。
- 更新贡献、安装和格式说明文档。

### 不包含

- 不复制或再分发任何上游源码。
- 不自动安装第三方项目。
- 不把目录迁移为全新的 JSON/YAML 数据树。
- 不构建向量数据库、在线推荐服务或账户系统。
- 不让普通 PR 的通过与否依赖实时 GitHub 网络状态。

## 架构与文件边界

保留现有 `entries/<category>/<id>/SKILL.md` URL，避免破坏索引和站点链接。新增文件职责如下：

```text
entries/<category>/<id>/SKILL.md        entry-record：推荐数据
SKILL.md                                installable-skill：唯一可安装技能
scripts/catalog_types.py                类型解析与格式边界
scripts/upstream_verify.py              上游审核领域逻辑
scripts/verify_upstreams.py             联网刷新命令行入口
scripts/recommender.py                  确定性推荐初筛
scripts/schema/entry-record.schema.json 目录条目 Schema
scripts/schema/installable-skill.schema.json
scripts/schema/upstream-snapshot.schema.json
verification/upstream-snapshot.json     已审核状态快照
tests/fixtures/projects/*.json          推荐场景
tests/fixtures/github/*.json            GitHub 固定响应
tests/test_catalog_types.py
tests/test_upstream_verify.py
tests/test_recommender.py
tests/test_validate.py
docs/catalog-format.md
docs/installable-skill-format.md
docs/verification-policy.md
```

`entry-record` 可以描述 `skill`、`skill-collection`、`mcp-server`、`cli-tool`、`framework` 或 `spec`，但自身只是市场目录记录。`installable-skill` 描述自身能力，不能携带市场评级、上游 star 等目录字段。

索引、站点和推荐器只消费 `entry-record`。安装文档只允许安装根目录推荐器或条目指向的上游项目，禁止复制 `entries/**/SKILL.md` 到 Agent 技能目录。

## 格式契约

所有 `entries/**/SKILL.md` 增加：

```yaml
record_type: entry-record
```

根目录 `SKILL.md` 增加：

```yaml
record_type: installable-skill
```

校验器根据文件位置选择对应 Schema，并拒绝以下情况：

- 条目缺少或伪装成 `installable-skill`；
- 根目录推荐器声明为 `entry-record`；
- 目录条目使用安装包专属字段；
- 推荐器使用目录评级、健康分或上游快照字段；
- 条目安装代码块把本仓库的 `entries/` 文件作为安装目标。

## 新增条目策略

五个空分类各新增五个真实项目：

| 分类 | 数量 | 覆盖方向 |
|---|---:|---|
| `dev-engineering` | 5 | 测试、代码审查、调试、性能、安全工程 |
| `data-analytics` | 5 | 数据分析、统计建模、Notebook、数据工程、可视化 |
| `research-intel` | 5 | 深度研究、文献检索、科学研究、网页调研、竞品情报 |
| `ops-automation` | 5 | CI/CD、部署、云基础设施、浏览器自动化、运维诊断 |
| `dsh` | 5 | DSH 核心、界面、插件发现、研究插件、工具扩展 |

每个条目仍包含中英文名称、摘要、分类、标签、实现和文档语言、许可证、上游链接、评级、风险说明、安装命令与使用说明。不得为了达到数量目标拆分同一仓库中的近似能力，也不得把文档不足、来源不可追溯的项目提升为常规推荐。

## 自动上游审核

### 仓库身份

- 仅接受规范化后的 `https://github.com/<owner>/<repo>` 公开仓库地址。
- 获取默认分支、HEAD SHA、创建/更新时间、归档状态、star、topics。
- 检查 README、LICENSE、release 和包清单是否存在。
- 拒绝不可访问、归档或重定向到无法确认身份的仓库。

### 许可证

- 优先读取 GitHub License API。
- 再使用 LICENSE 文本与 SPDX 规则交叉识别。
- 两者冲突时标记 `needs-review`。
- 缺少许可证时写入 `UNKNOWN`，状态最高为 `watch`，不得进入 `core`。

### 安装可行性

- 从“怎么安装”小节首个代码块抽取 GitHub URL、npm/PyPI/uv/cargo 包名和路径。
- 条目中的 GitHub 安装来源必须与 `repo` 一致。
- 声明注册表包时，核对注册表的 repository 或 homepage。
- 识别远程脚本直接执行、全局安装、用户配置写入、凭据和高权限操作，并要求相应 `risk_notes`。
- 目录条目自身不得成为安装来源。

### 分类一致性

- 使用仓库 topics、README 标题及摘要、包描述和条目标签计算分类置信度。
- 置信度低于阈值时标记 `needs-review`。
- 自动检测重复仓库、同项目不当拆分、ID 和 aliases 冲突。

### 维护健康度

健康分由最近提交、归档状态、release、README、许可证、安装入口和元数据一致性组成。star 只作为弱信号，不能独立提升评级。

| 健康分 | 允许的最高评级 |
|---:|---|
| 85–100 | `core` |
| 60–84 | `standard` |
| 40–59 | `watch` |
| 0–39 | `blocked` |

最终核验状态：

- `verified`：所有自动强制检查通过；
- `needs-review`：许可证、分类或安装来源存在机器无法可靠判断的冲突；
- `blocked`：不可访问、归档、许可证声明冲突未解决或安装入口无效。

人工审核只处理 `needs-review` 的异常情况及贡献者申诉。自动结果明确的条目无需逐条人工复核。

## 快照与漂移

`verification/upstream-snapshot.json` 保存每个条目的仓库标识、核验时间、HEAD SHA、许可证、归档状态、文档状态、安装来源、健康分、状态和结构化理由。

普通 PR 使用固定 fixture 测试审核算法，不访问实时网络。维护者通过以下命令主动刷新：

```bash
python scripts/verify_upstreams.py --refresh
```

定时工作流每周重新核验。许可证变化、仓库归档、README或安装入口消失产生结构化漂移报告；结果明确时允许生成更新 PR，异常项进入人工处理通道。

## 推荐算法

`scripts/recommender.py` 接受结构化项目画像，输出稳定排序、总分和逐项评分理由。

| 信号 | 分数 |
|---|---:|
| 分类匹配 | +3 |
| 每个规范化标签 | +2 |
| 类型匹配 | +1 |
| `core` / `standard` | +2 / +1 |
| 许可证契合 | +1 |
| 商用项目遇到未知或限制性许可证 | -2 |
| 文档语言匹配 | +1 |
| 明确风险冲突 | -3 |

非 `verified` 条目不得进入前三。同分时依次按健康分和条目 ID 排序，确保结果可复现。Agent 在确定性初筛后进行语义终审；脚本不可运行时才回退到 `SKILL.md` 中记录的手工评分流程。

## 测试策略

采用测试驱动开发，先观察测试因缺少行为而失败，再写最小实现。

- 类型测试：两种格式的合法、缺失和混用情况。
- 审核单元测试：许可证一致与冲突、归档仓库、安装来源不匹配、分类低置信度、危险命令风险覆盖。
- 推荐单元测试：每条计分规则、标签别名、许可证降权、状态过滤和稳定排序。
- 场景测试：研发、数据、研究、运维和 DSH 项目画像分别召回目标分类。
- 负向测试：`blocked`、许可证冲突和安装来源不可信的条目不能进入推荐。
- 回归测试：固定目录 fixture 的前三名变化必须显示评分差异。
- 集成测试：47 个条目通过 Schema、索引、站点与快照完整性检查。

## CI 与错误处理

每个 PR 离线运行格式校验、审核 fixture 测试、推荐测试、快照完整性、索引漂移和站点生成检查。主动刷新和每周任务才使用网络。

错误采用稳定代码，至少包括：

```text
E_ENTRY_AS_SKILL
E_REPO_ARCHIVED
E_LICENSE_CONFLICT
E_INSTALL_SOURCE_MISMATCH
E_CATEGORY_LOW_CONFIDENCE
E_RECOMMENDER_BLOCKED_ENTRY
```

CLI 对每个问题输出条目 ID、错误代码、实际值和修复方向。`blocked` 使刷新命令以非零状态退出；`needs-review` 输出报告，但允许维护者针对异常继续处理。

## 实施顺序

实施分为两个独立计划：

1. 格式契约、自动审核、推荐算法、测试基础设施和文档；
2. 使用已验证工具链选择并收录 25 个项目，生成快照、索引和站点。

工具链必须先通过测试，再用于新增条目，避免先写内容后反向调整审核规则。

## 完成标准

- 原有 22 个条目全部成为合法 `entry-record`。
- 五个空分类各新增五个真实项目，总条目数为 47。
- 根目录推荐器是唯一合法的 `installable-skill`。
- 25 个新增项目都有可追溯的上游核验快照且不是 `blocked`。
- 推荐算法的单元、场景、负向与回归测试通过。
- 本地校验、索引检查和站点生成检查通过。
- 文档明确目录条目不可直接安装。
- 仓库不包含上游源码，也不自动安装第三方项目。
