# 目录条目格式（entry-record）

`entries/<category>/<id>/ENTRY.md` 是供索引、站点和推荐器读取的目录数据，必须声明：

```yaml
record_type: entry-record
```

它可以描述技能、技能集、MCP 服务、CLI、应用、框架或规范，但它本身不是可安装技能。正文中的命令必须指向上游项目；禁止把条目文件复制进 Agent 技能目录。

## 必填字段

```yaml
record_type: entry-record
id: <等于目录名>
name_zh: ...
name_en: ...
summary_zh: ...   # ≤200 字
summary_en: ...
category: <一级目录名>
mode: install | connect | deploy | read
tags: [...]
languages: [...]
license: <SPDX 或 UNKNOWN>
homepage: https://...
repo: https://github.com/<owner>/<repo>
tier: core | standard | watch
added_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
```

## 消费方式（`mode`）

一个项目只填一个主模式，判定顺序 **install > deploy > connect > read**：

| 值 | 含义 | 正文小节 |
|---|---|---|
| `install` | 装进 Agent 的技能目录 | `## 怎么安装` |
| `connect` | 作为 MCP / CLI / API / SDK 被调用 | `## 怎么接入` |
| `deploy` | 自己跑起来（桌面端、服务、工作台） | `## 怎么部署运行` |
| `read` | 阅读规范、提示词库、资源集 | `## 怎么阅读` |

## 正文结构

```markdown
## 这是什么
## 怎么安装 / 怎么接入 / 怎么部署运行 / 怎么阅读   ← 按 mode 四选一，必须含代码块
## 怎么用
## 注意事项
```

完整字段与写作建议见 [如何编写 ENTRY.md](writing-skill-md.md)。字段由 `scripts/schema/meta.schema.json` 和 `scripts/schema/entry-record.schema.json` 约束；`scripts/validate.py` 会以 `E_ENTRY_AS_SKILL` 等稳定错误码拒绝混用。

## 与根 SKILL.md 的边界

- `entries/**/ENTRY.md`：`record_type: entry-record`，数据。
- 根 `SKILL.md`：`record_type: installable-skill`，全库唯一可安装技能。

两者不能互换：条目若声明成 `installable-skill` 会被拒绝，根文件若声明成 `entry-record` 也会被拒绝。
