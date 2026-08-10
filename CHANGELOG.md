# 变更日志

本文件记录 SkillMall 的条目增减与结构变更，按月倒序排列。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

变更类型：

- **新增** —— 新收录的条目
- **更新** —— 上游同步、协议重判、评级变化
- **移除** —— 因链接失效、上游删库、协议变更、安全问题而下架的条目
- **结构** —— 分类体系、模板、脚本、CI 的变更

---

## 2026-08

### 结构

- 仓库初始化：确立九大用途分类、三色协议分级、快照式 vendoring 机制
- 建立 `_template/` 条目脚手架（`meta.yml` / `upstream.lock` / `README.zh-CN.md` /
  `NOTES.zh-CN.md` / `GET-IT.md`）
- 建立 `scripts/` 工具链：`validate.py`（校验）、`gen_index.py`（索引生成）、
  `vendor.py`（快照拷贝）
- 建立 CI：`index-check.yml`（元数据校验 + INDEX 防脱节）、
  `link-check.yml`（PR 增量 + 每周全量死链检查）
- 确立双许可：原创文档 CC BY 4.0，`scripts/` 代码 MIT

### 新增

- `meta-skillcraft/agent-skills-spec` —— Agent Skills 开放规范（🔗 存根）
- `meta-skillcraft/superpowers` —— obra/superpowers 技能集（📦 vendored，MIT）
- `business-office/anthropics-office-skills` —— Anthropic Office 文档技能
  （🔗 存根，source-available 不可转载）

---

## 已移除条目存档

尚无。

条目被移除时，此处保留：条目 id、原上游地址、移除日期、移除原因。
保留记录是为了避免同一个已排除的项目被重复提交收录。
