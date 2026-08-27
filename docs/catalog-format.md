# 目录条目格式（entry-record）

`entries/<category>/<id>/SKILL.md` 是供索引、站点和推荐器读取的目录数据，必须声明：

```yaml
record_type: entry-record
```

它可以描述 Skill、技能集、MCP 服务、CLI、框架或规范，但它本身不是可安装 Skill。正文中的安装命令必须指向 `repo` 声明的上游项目；禁止把本仓库 `entries/` 下的文件复制到 Agent 技能目录。

目录条目可使用 `tier`、`metrics`、`risk_notes`、`category` 等市场元数据。完整字段由 `scripts/schema/meta.schema.json` 和 `scripts/schema/entry-record.schema.json` 约束。

与之相对，仓库根目录 `SKILL.md` 是 `installable-skill`。两种格式不能混用，`scripts/validate.py` 会以 `E_ENTRY_AS_SKILL` 等稳定错误码拒绝混用。

