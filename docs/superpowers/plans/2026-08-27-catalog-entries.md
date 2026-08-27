# 五分类真实项目收录实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 使用已经过测试的自动审核工具，为五个空分类各收录五个真实 GitHub 开源项目，并生成可追溯快照、索引和站点。

**架构：** 先以明确候选清单联网采集事实，再让自动审核器决定 verified、needs-review 或 blocked；只有通过项目才生成条目。若候选失败，使用同分类后备清单按顺序替换，数量和审核标准不降低。

**技术栈：** Python 3.12+、GitHub REST API、现有 SKILL.md/YAML 数据模型、pytest、静态站生成器。

---

## 候选清单

首选 25 个仓库如下；任何首选被自动标记 `blocked` 时，只能从同分类后备清单顺序替换，不能手工绕过规则。

| 分类 | 首选仓库 |
|---|---|
| dev-engineering | `addyosmani/agent-skills`、`wshobson/agents`、`alirezarezvani/claude-skills`、`github/awesome-copilot`、`sickn33/antigravity-awesome-skills` |
| data-analytics | `pymc-labs/python-analytics-skills`、`nimrodfisher/data-analytics-skills`、`astronomer/agents`、`marimo-team/marimo`、`evidence-dev/evidence` |
| research-intel | `K-Dense-AI/scientific-agent-skills`、`assafelovic/gpt-researcher`、`langchain-ai/open_deep_research`、`Future-House/paper-qa`、`stanford-oval/storm` |
| ops-automation | `ansible/ansible`、`pulumi/pulumi`、`localstack/localstack`、`dagu-org/dagu`、`kestra-io/kestra` |
| dsh | `deepseek-ai/deepseek-harness`、`dsh-market/dsh-market`、`awesome-dsh-plugin/dsh-find-plugin`、`ccch1mneyyy/dsh-TUI`、`0xsline/awesome-deepseek-harness` |

后备清单：

- dev-engineering：`VoltAgent/awesome-agent-skills`、`heilcheng/awesome-agent-skills`。
- data-analytics：`duckdb/duckdb`、`dbt-labs/dbt-core`。
- research-intel：`microsoft/RD-Agent`、`microsoft/graphrag`。
- ops-automation：`prefecthq/prefect`、`windmill-labs/windmill`。
- dsh：`awesome-dsh-plugin/awesome-dsh-plugin`、`dataelement/dsh-desktop`。

## 文件结构

- 创建：`verification/candidates.json`，保存首选、后备与选择理由代码。
- 创建：`tests/test_catalog_expansion.py`，断言分类数量、唯一仓库、状态与格式。
- 创建：`entries/<五分类>/<id>/SKILL.md` 共 25 份。
- 更新：`verification/upstream-snapshot.json`、`INDEX.md`、`site/data/skills.json`、`site/skills/*.html`、`data-version.json`、README 计数、CHANGELOG。

### 任务 1：固化候选与自动选择规则

**文件：**
- 创建：`verification/candidates.json`
- 创建：`tests/test_catalog_expansion.py`

- [ ] **步骤 1：编写失败测试**

断言五个目标分类均有五个首选和至少两个后备；URL 唯一且为 GitHub；任何已收录 repo 不得再次出现；选择器只能用同分类后备替换 blocked 首选。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_catalog_expansion.py`

预期：失败，因为候选清单不存在。

- [ ] **步骤 3：写入上述固定清单和选择器**

候选项包含 `category`、`repo`、`priority`、`coverage_code`；选择器读取核验结果，保留前五个非 blocked 项，若不足五个则退出 1 并列出缺口。

- [ ] **步骤 4：验证绿灯**

运行：`pytest -q tests/test_catalog_expansion.py -k candidates`

预期：候选结构和替换规则通过。

- [ ] **步骤 5：提交**

```bash
git add verification/candidates.json tests/test_catalog_expansion.py
git commit -m "chore: define catalog expansion candidates"
```

### 任务 2：联网采集并锁定 25 个通过项目

**文件：**
- 修改：`verification/upstream-snapshot.json`
- 创建：`verification/selection-report.json`

- [ ] **步骤 1：运行候选刷新**

运行：`python scripts/verify_upstreams.py --refresh --candidates verification/candidates.json`

预期：生成每个候选的状态、健康分和理由，不打印凭据。

- [ ] **步骤 2：验证选择失败保护**

将 fixture 中一个分类的首选和后备全部设为 blocked，运行对应测试。

预期：失败并输出 `E_CATEGORY_CAPACITY`，不会用其他分类项目填充。

- [ ] **步骤 3：恢复 fixture 并生成选择报告**

运行：`python scripts/verify_upstreams.py --select 5 --candidates verification/candidates.json --report verification/selection-report.json`

预期：每类恰好五个，全部非 blocked；needs-review 只能以 `watch` 入选。

- [ ] **步骤 4：提交事实快照**

```bash
git add verification/upstream-snapshot.json verification/selection-report.json
git commit -m "chore: verify catalog expansion upstreams"
```

### 任务 3：生成研发、数据与研究条目

**文件：**
- 创建：`entries/dev-engineering/*/SKILL.md` 五份
- 创建：`entries/data-analytics/*/SKILL.md` 五份
- 创建：`entries/research-intel/*/SKILL.md` 五份

- [ ] **步骤 1：扩展失败测试**

断言这三个分类各五条、`record_type=entry-record`、repo 与选择报告一致、许可证与快照一致、安装来源一致、摘要非空、风险检查覆盖。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_catalog_expansion.py -k 'dev or data or research'`

预期：失败并列出缺失条目。

- [ ] **步骤 3：生成条目草稿**

使用快照和上游 README 事实生成 frontmatter 与“是什么/怎么安装/怎么用/注意事项”；安装代码只能来自上游 README 或包元数据，不猜测命令。

- [ ] **步骤 4：运行自动审核并修正异常**

运行：`python scripts/verify_upstreams.py --check --entry-category dev-engineering --entry-category data-analytics --entry-category research-intel`

预期：无 blocked；needs-review 自动降为 watch 并带结构化原因。

- [ ] **步骤 5：验证绿灯并提交**

```bash
pytest -q tests/test_catalog_expansion.py -k 'dev or data or research'
python scripts/validate.py
git add entries/dev-engineering entries/data-analytics entries/research-intel
git commit -m "feat: add engineering data and research entries"
```

### 任务 4：生成运维与 DSH 条目

**文件：**
- 创建：`entries/ops-automation/*/SKILL.md` 五份
- 创建：`entries/dsh/*/SKILL.md` 五份

- [ ] **步骤 1：扩展失败测试**

断言两个分类各五条；DSH 条目必须具备 `dsh` 标签和核心/界面/发现/研究/工具之一的覆盖代码；运维条目必须具备部署、基础设施、工作流或诊断标签。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_catalog_expansion.py -k 'ops or dsh'`

预期：失败并列出缺失条目。

- [ ] **步骤 3：生成并审核条目**

按任务 3 的相同事实来源生成，DSH 安装命令必须符合官方 profile/plugin 机制；系统级工具必须在风险说明中列出权限和服务影响。

- [ ] **步骤 4：验证绿灯并提交**

```bash
python scripts/verify_upstreams.py --check --entry-category ops-automation --entry-category dsh
pytest -q tests/test_catalog_expansion.py -k 'ops or dsh'
python scripts/validate.py
git add entries/ops-automation entries/dsh
git commit -m "feat: add operations and dsh entries"
```

### 任务 5：推荐回归与目录覆盖

**文件：**
- 修改：`tests/fixtures/projects/*.json`
- 修改：`tests/test_recommender.py`
- 修改：`tests/test_catalog_expansion.py`

- [ ] **步骤 1：增加失败场景测试**

为五个新分类各定义一个真实画像和期望能力代码；断言前三至少两个来自目标分类，blocked 永不出现，同分输出稳定。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_recommender.py tests/test_catalog_expansion.py`

预期：至少一个场景因标签或分类映射不足而失败。

- [ ] **步骤 3：只调整元数据与受控词表**

根据失败理由修正条目分类标签或 `tag_vocabulary.json`；不为固定某个具体项目而加入硬编码加分。

- [ ] **步骤 4：验证绿灯并提交**

```bash
pytest -q tests/test_recommender.py tests/test_catalog_expansion.py
git add entries scripts/schema/tag_vocabulary.json tests
git commit -m "test: cover recommendations across all categories"
```

### 任务 6：生成产物、版本与最终验证

**文件：**
- 修改：`INDEX.md`
- 修改：`site/data/skills.json`
- 创建/修改：`site/skills/*.html`
- 修改：`README.md`
- 修改：`data-version.json`
- 修改：`docs/CHANGELOG.md`

- [ ] **步骤 1：生成索引和网站**

运行：`python scripts/gen_index.py && python scripts/gen_site.py`

- [ ] **步骤 2：更新版本与计数**

README 写 47 个条目；`data-version.json` 使用执行日的 `YYMMDD` 版本和 ISO 日期；CHANGELOG 记录五类各五条及自动审核工具链。

- [ ] **步骤 3：完整验证**

运行：

```bash
pytest -q
python scripts/validate.py
python scripts/verify_upstreams.py --check
python scripts/gen_index.py --check
python scripts/gen_site.py --check
git diff --check
```

预期：零失败；目录恰好 47 条；五个目标分类各五条；所有新增条目有快照且无 blocked。

- [ ] **步骤 4：检查变更边界**

运行：`git status --short && git diff --stat`

预期：不含任何上游源码、缓存、token、临时 fixture 输出或未追踪依赖目录。

- [ ] **步骤 5：提交**

```bash
git add INDEX.md site README.md data-version.json docs/CHANGELOG.md verification tests
git commit -m "feat: complete five catalog categories"
```
