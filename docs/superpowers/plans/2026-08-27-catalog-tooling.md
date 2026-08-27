# 目录契约、自动审核与推荐器实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 建立可机器验证的目录/技能格式边界、可离线测试的上游审核器和确定性推荐初筛器。

**架构：** 解析与领域规则放在无网络副作用的小模块中，CLI 只负责 I/O；实时上游数据序列化成快照，普通测试使用 fixture。现有索引和站点继续消费 `Entry`，但只接受 `entry-record`。

**技术栈：** Python 3.12+、PyYAML、jsonschema、pytest、urllib.request、GitHub REST API、JSON Schema Draft 7。

---

## 文件结构

- 创建 `scripts/catalog_types.py`：格式类型、frontmatter 解析和边界错误。
- 创建 `scripts/upstream_verify.py`：纯函数审核规则、健康分与状态。
- 创建 `scripts/verify_upstreams.py`：GitHub/注册表读取、快照刷新 CLI。
- 创建 `scripts/recommender.py`：画像解析、评分、过滤与稳定排序。
- 创建三个 `scripts/schema/*.schema.json`：目录记录、可安装 Skill、快照契约。
- 修改 `scripts/_common.py`、`scripts/validate.py`：接入格式边界和快照检查。
- 修改 `scripts/gen_index.py`、`scripts/gen_site.py`：只消费目录记录并增加可复现检查模式。
- 创建 `tests/`：领域单元测试、fixture 和集成测试。
- 修改 `scripts/requirements.txt`：加入 pytest。
- 修改根目录及现有 22 个 `SKILL.md`：增加 `record_type`。
- 创建三份格式/审核文档并修改 README、贡献说明和 CI。

### 任务 1：建立测试运行器和格式契约

**文件：**
- 创建：`tests/test_catalog_types.py`
- 创建：`scripts/catalog_types.py`
- 创建：`scripts/schema/entry-record.schema.json`
- 创建：`scripts/schema/installable-skill.schema.json`
- 修改：`scripts/requirements.txt`

- [ ] **步骤 1：编写失败测试**

测试合法 `entry-record`、合法 `installable-skill`、缺失类型、路径/类型混用和条目引用自身安装五种行为；测试直接构造临时 Markdown，不读取真实仓库条目。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_catalog_types.py`

预期：收集失败，提示 `scripts.catalog_types` 不存在。

- [ ] **步骤 3：实现最小契约**

实现 `RecordType`、`CatalogDocument`、`CatalogFormatError(code, path, message)`、`parse_catalog_document(path, repo_root)` 和 `validate_document_boundary(document)`；错误码至少覆盖 `E_RECORD_TYPE_MISSING`、`E_ENTRY_AS_SKILL`、`E_ROOT_AS_ENTRY`、`E_ENTRY_INSTALL_SELF`。

- [ ] **步骤 4：验证绿灯**

运行：`pytest -q tests/test_catalog_types.py`

预期：全部通过。

- [ ] **步骤 5：提交**

```bash
git add scripts/catalog_types.py scripts/schema tests/test_catalog_types.py scripts/requirements.txt
git commit -m "feat: define catalog record boundaries"
```

### 任务 2：迁移现有文档并接入总校验

**文件：**
- 创建：`tests/test_validate.py`
- 修改：`SKILL.md`
- 修改：`entries/*/*/SKILL.md`
- 修改：`scripts/_common.py`
- 修改：`scripts/validate.py`
- 替换：`scripts/schema/meta.schema.json` 为目录记录 Schema 引用或兼容入口

- [ ] **步骤 1：编写失败测试**

断言 `discover_entries()` 只返回 `entry-record`，根目录为唯一 `installable-skill`；在临时目录放入伪装条目时，`validate.py` 返回 `E_ENTRY_AS_SKILL`。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_validate.py`

预期：失败，因为现有 22 个条目和根推荐器均没有 `record_type`。

- [ ] **步骤 3：最小迁移**

给 22 个条目增加 `record_type: entry-record`，根目录增加 `record_type: installable-skill`；让 `_common.py` 的发现逻辑拒绝格式混用，让 `validate.py` 同时检查根技能和条目 Schema。

- [ ] **步骤 4：验证绿灯与旧行为**

运行：`pytest -q tests/test_validate.py && python scripts/validate.py && python scripts/gen_index.py --check`

预期：全部通过，仍发现 22 个条目。

- [ ] **步骤 5：提交**

```bash
git add SKILL.md entries scripts/_common.py scripts/validate.py scripts/schema tests/test_validate.py
git commit -m "refactor: distinguish entries from installable skill"
```

### 任务 3：实现上游审核纯函数

**文件：**
- 创建：`tests/fixtures/github/*.json`
- 创建：`tests/test_upstream_verify.py`
- 创建：`scripts/upstream_verify.py`
- 创建：`scripts/schema/upstream-snapshot.schema.json`

- [ ] **步骤 1：编写失败测试**

覆盖 URL 规范化、归档阻断、API/文本许可证冲突、README 缺失、安装仓库不匹配、危险命令缺少风险说明、分类低置信度、健康分评级上限和稳定错误码。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_upstream_verify.py`

预期：失败，提示 `scripts.upstream_verify` 不存在。

- [ ] **步骤 3：实现纯领域模型**

实现 `UpstreamFacts`、`VerificationIssue`、`VerificationResult`、`normalize_github_repo()`、`extract_install_sources()`、`classify_confidence()`、`calculate_health()` 和 `verify_entry()`。所有函数只接收值对象，不联网。

- [ ] **步骤 4：验证绿灯**

运行：`pytest -q tests/test_upstream_verify.py`

预期：全部通过，fixture 不产生真实网络请求。

- [ ] **步骤 5：提交**

```bash
git add scripts/upstream_verify.py scripts/schema/upstream-snapshot.schema.json tests
git commit -m "feat: add deterministic upstream verification"
```

### 任务 4：实现联网刷新 CLI 与快照

**文件：**
- 创建：`tests/test_verify_upstreams_cli.py`
- 创建：`scripts/verify_upstreams.py`
- 创建：`verification/upstream-snapshot.json`
- 修改：`scripts/validate.py`

- [ ] **步骤 1：编写失败测试**

以注入的 fixture transport 测试 GitHub分页/限流错误、ETag、无 token 公共读取、`--check` 不写盘、`--refresh` 原子更新、`blocked` 退出 1、`needs-review` 输出报告。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_verify_upstreams_cli.py`

预期：失败，CLI 模块不存在。

- [ ] **步骤 3：实现最小 CLI**

使用 `urllib.request` 和可注入 transport；支持 `--refresh`、`--check`、`--entry ID`、`--snapshot PATH`，读取可选 `GITHUB_TOKEN`，但绝不打印 token。快照先写同目录临时文件，再用 `Path.replace()` 原子替换。

- [ ] **步骤 4：验证绿灯与 Schema**

运行：`pytest -q tests/test_verify_upstreams_cli.py && python scripts/validate.py`

预期：全部通过；空初始快照在尚未扩充条目前保持合法。

- [ ] **步骤 5：提交**

```bash
git add scripts/verify_upstreams.py scripts/validate.py verification tests/test_verify_upstreams_cli.py
git commit -m "feat: add reproducible upstream snapshot refresh"
```

### 任务 5：实现确定性推荐器

**文件：**
- 创建：`tests/fixtures/projects/*.json`
- 创建：`tests/fixtures/catalog/recommender-catalog.json`
- 创建：`tests/test_recommender.py`
- 创建：`scripts/recommender.py`
- 修改：`SKILL.md`

- [ ] **步骤 1：编写失败测试**

逐项测试分类、标签、类型、评级、许可证、文档语言和风险分；测试非 verified 排除、前三限制、健康分/ID 并列排序、五类项目画像召回和评分理由。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_recommender.py`

预期：失败，推荐器模块不存在。

- [ ] **步骤 3：实现最小推荐器**

实现 `ProjectProfile`、`ScoredEntry`、`score_entry()`、`recommend()` 和 CLI `python scripts/recommender.py --profile FILE --limit 3`。输出 JSON，理由采用稳定代码而非依赖自然语言断言。

- [ ] **步骤 4：验证绿灯**

运行：`pytest -q tests/test_recommender.py`

预期：全部通过，五个场景的第一名属于目标分类。

- [ ] **步骤 5：更新推荐器文档并提交**

根 `SKILL.md` 先调用脚本初筛，再做语义终审；脚本不可用时保留手工评分回退。

```bash
git add scripts/recommender.py SKILL.md tests
git commit -m "feat: make recommender scoring testable"
```

### 任务 6：生成器可复现检查和 CI

**文件：**
- 创建：`tests/test_generators.py`
- 修改：`scripts/gen_site.py`
- 修改：`.github/workflows/index-check.yml`
- 创建：`.github/workflows/upstream-refresh.yml`

- [ ] **步骤 1：编写失败测试**

测试 `gen_site.py --check` 不写文件且检测内容漂移；生成时间戳不参与漂移判断；生成器拒绝非 `entry-record`。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_generators.py`

预期：失败，因为 `gen_site.py` 尚无 `--check`。

- [ ] **步骤 3：实现并接入 CI**

提取 `render_site_payload(entries, generated_at)`，增加 `--check`；PR 工作流运行 pytest、validate、index check、site check；每周工作流运行联网刷新并上传漂移报告，不直接推送 main。

- [ ] **步骤 4：验证绿灯**

运行：`pytest -q && python scripts/validate.py && python scripts/gen_index.py --check && python scripts/gen_site.py --check`

预期：全部通过且工作树不新增生成差异。

- [ ] **步骤 5：提交**

```bash
git add scripts/gen_site.py .github/workflows tests/test_generators.py
git commit -m "ci: verify catalog and upstream drift offline"
```

### 任务 7：文档边界与全套回归

**文件：**
- 创建：`docs/catalog-format.md`
- 创建：`docs/installable-skill-format.md`
- 创建：`docs/verification-policy.md`
- 修改：`README.md`
- 修改：`docs/CONTRIBUTING.md`
- 修改：`.github/ISSUE_TEMPLATE/*.yml`

- [ ] **步骤 1：编写文档契约测试**

在 `tests/test_docs_contract.py` 断言 README 与贡献文档包含 `entry-record`、`installable-skill`、禁止复制 entries、刷新命令和异常人工通道。

- [ ] **步骤 2：验证红灯**

运行：`pytest -q tests/test_docs_contract.py`

预期：失败，三份新文档不存在。

- [ ] **步骤 3：编写文档并修正旧文案**

删除 Issue 模板中的“vendored 源码”旧表述；明确条目是数据、根技能才可安装、自动审核边界、状态与错误码。

- [ ] **步骤 4：全套验证**

运行：`pytest -q && python scripts/validate.py && python scripts/gen_index.py --check && python scripts/gen_site.py --check && git diff --check`

预期：测试零失败，所有命令退出 0。

- [ ] **步骤 5：提交**

```bash
git add README.md docs .github/ISSUE_TEMPLATE tests/test_docs_contract.py
git commit -m "docs: clarify catalog and installable skill formats"
```

