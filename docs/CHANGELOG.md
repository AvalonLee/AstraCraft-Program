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

---

## 已移除条目存档

尚无。

条目被移除时，此处保留：条目 id、原上游地址、移除日期、移除原因。
保留记录是为了避免同一个已排除的项目被重复提交收录。
