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
| `tags` | ✅ | 3-6 个交叉检索标签（详见下文「标签治理规范」） |
| `languages` | ✅ | 实现语言（小写），纯文档填 `[markdown]` |
| `license` | ✅ | SPDX 或 UNKNOWN（见 [license-policy.md](license-policy.md)） |
| `homepage` / `repo` | ✅ | 有效 https URL |
| `tier` | ✅ | core（主推）/ standard（常规）/ watch（观察），判定标准见下文「评级判定标准」 |
| `featured` | ○ | 是否入选首页「精选推荐」区（布尔）。与 `tier` **相互独立**：由维护者手工标注的少量高价值技能，观察期新条目也可被精选。详见下文「首页精选（featured）」 |
| `added_at` / `updated_at` | ✅ | `YYYY-MM-DD` |
| `metrics` | ○ | `stars` / `pushed_at` / `checked_at` / `archived` |
| `related` / `aliases` / `risk_notes` | ○ | 关联、别名（去重用）、风险备注 |

## 安装指令怎么写

- **一条命令能跑通最好**：优先 `git clone` / `npm i` / `pip install` / `cp -r` 到 skills 目录。
- **写清执行位置**：在哪个目录跑、需要什么环境（如 Node ≥ 22）。
- **放代码块里**：`validate.py` 会检查「怎么安装」小节是否包含 ``` 代码块。
- **不要搬运上游源码**：只给获取/安装指令和链接，正文内容原创。

## 评级（tier）判定标准

`tier` 表示条目的**策展成熟度**，用于排序与筛选，三档职责分明：

| 档位 | 中文 | 判定标准 | 数量预期 |
|---|---|---|---|
| `core` | 主推 | 经本人/团队亲自验证：① 实测可安装可运行；② stars 较高且近期活跃；③ 跨场景通用价值明确；④ 协议清晰可商用（非 UNKNOWN） | 少而精，宁缺毋滥 |
| `standard` | 常规 | 达到收录门槛、信息完整、可正常安装使用，但未做深度验证或不具普适标杆性 | 绝大多数条目归此档 |
| `watch` | 观察 | 新收录 / 待审 / 小众实验性 / 维护状态不明 / 协议未声明（UNKNOWN）的条目，先归入观察，评估后再升级 | 过渡态，不应长期滞留 |

**约定**：新收录且协议未声明（UNKNOWN）的条目，默认先标 `watch`；经评估确认质量与可用性后再升 `standard` 或 `core`。

## 首页精选（featured）

`featured: true` 让该条目出现在首页顶部「精选推荐」区，作为编辑性强的入口。

- **与 `tier` 解耦**：`tier` 描述策展成熟度（批量判定），`featured` 是手工精选（少量、高信号）。两者可任意组合——一个 `watch` 期的新星也能被精选，一个 `core` 条目也可不进精选区。
- **数量克制**：精选区是"先从这里挑起"的引导位，建议控制在 4-6 个，宁缺毋滥；过多会稀释"精选"语义。
- **维护动作**：在条目 `SKILL.md` 的 frontmatter 写 `featured: true` 即可，无需改代码；`gen_site.py` 会把它写进 `skills.json`，首页前端自动渲染。移除精选只需删掉该字段或置 `false`。

## 标签治理规范

标签是分类之外的交叉检索维度，但**自由填写会迅速膨胀且绝大多数无复用价值**。
收录时遵循以下四条，从源头遏制膨胀（Phase 2）：

1. **数量上限 ≤ 8**：每个条目最多 8 个标签，强制挑最有代表性的。超出时 `validate.py` 会告警。
2. **受控主标签白名单（复用优先）**：`scripts/schema/tag_vocabulary.json` 的 `primary` 是一份
   受控词表。写标签时**优先从白名单里挑可复用的**；确有新概念时，先把它加入 `primary` 再使用，
   避免发明一次性同义词把筛选打散。`validate.py` 在「未命中任何主标签」时给出复用建议。
3. **别名归一化（自动）**：词表 `aliases` 定义了同义归并（当前 `claude → claude-code`、
   `agent → ai-agent`）。源文件请直接写规范形态；若误写别名，`validate.py` 会提示，且
   `gen_index.py` / `gen_site.py` 在生成时会**自动归并**，保证计数与展示统一。
4. **收录时自动提示**：运行 `python scripts/suggest_tags.py "标签A,标签B,..."` 可即时看到
   归一化结果、检测到的别名、可复用的既有标签，以及是否超限——提交前用它对一遍。

> 词表是"活文件"：随收录增长，把稳定复用、跨条目有价值的概念持续沉淀进 `primary`，
> 把发现的同义词补进 `aliases`。

## 示例

可安装 Skill 的格式要求见 [可安装技能格式](installable-skill-format.md)。
