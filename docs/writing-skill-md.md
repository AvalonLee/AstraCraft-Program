# 如何编写 SKILL.md（条目唯一文件）

每个条目只有一个文件：`entries/<分类>/<id>/SKILL.md`。它既是**给 Agent 看的导读**，
也是**安装指令**。写得好，Agent 读完就能装；写得差，条目等于没有。

## 文件结构

```markdown
---
<YAML frontmatter：元数据>
---

# 条目中文名称

> 一句话定位。上游：<URL> · 许可证：<LICENSE>

## 这是什么
两三句话讲清楚：什么类型（skill / MCP server / CLI / 框架 / 规范）、谁维护、生态位。

## 怎么安装
给 Agent 的一键可执行指令，放在 ``` 代码块里，写清执行位置与前提条件。

## 怎么用
一两句起步用法，让 Agent 装完就能上手。

## 注意事项
已知限制、依赖、维护状态、可否商用。没有就写"暂无"。
```

## frontmatter 字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✅ | 小写字母/数字/连字符，**必须等于目录名**，全局唯一 |
| `name_zh` / `name_en` | ✅ | 中英文名称 |
| `summary_zh` / `summary_en` | ✅ | ≤200 字符的一句话简介，直接出现在 INDEX |
| `category` | ✅ | 一级分类之一（含 `dsh`），**必须等于一级目录名** |
| `kind` | ✅ | skill / skill-collection / mcp-server / cli-tool / framework / spec |
| `tags` | ✅ | 3-6 个交叉检索标签 |
| `languages` | ✅ | 实现语言（小写），纯文档填 `[markdown]` |
| `license` | ✅ | SPDX 或 UNKNOWN（见 [license-policy.md](license-policy.md)） |
| `homepage` / `repo` | ✅ | 有效 https URL |
| `tier` | ✅ | core / standard / watch |
| `added_at` / `updated_at` | ✅ | `YYYY-MM-DD` |
| `metrics` | ○ | `stars` / `pushed_at` / `checked_at` / `archived` |
| `related` / `aliases` / `risk_notes` | ○ | 关联、别名（去重用）、风险备注 |

## 安装指令怎么写

- **一条命令能跑通最好**：优先 `git clone` / `npm i` / `pip install` / `cp -r` 到 skills 目录。
- **写清执行位置**：在哪个目录跑、需要什么环境（如 Node ≥ 22）。
- **放代码块里**：`validate.py` 会检查「怎么安装」小节是否包含 ``` 代码块。
- **不要搬运上游源码**：只给获取/安装指令和链接，正文内容原创。

## 示例

完整示例见 [../_template/SKILL.md](../_template/SKILL.md)。
