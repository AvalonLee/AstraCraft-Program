# Agent Skills 规范速查

判断一个 skill 是否符合规范，是 [H3 文档可用](admission-criteria.md#h3-文档可用)
门槛的核心依据。这份速查表用于收录时快速核对。

规范来源：[agentskills.io/specification](https://agentskills.io/specification) ·
参考实现：[anthropics/skills](https://github.com/anthropics/skills)

---

## SKILL.md 的 frontmatter

```yaml
---
name: pdf-extractor
description: 从 PDF 提取文本、表格与元数据。当用户上传 PDF 文件、要求解析 PDF 内容、或需要把 PDF 转换为结构化数据时使用。
license: Apache-2.0
compatibility: 需要 Python 3.10+ 与 pdfplumber
metadata:
  author: example-org
  version: "1.2.0"
allowed-tools: Read Write Bash
---
```

| 字段 | 必填 | 约束 | 收录时的检查点 |
|---|---|---|---|
| `name` | ✅ | ≤64 字符；仅小写字母、数字、连字符；不可首尾或连续连字符；**必须与父目录名一致** | 目录名对不上是常见错误，会导致 skill 加载失败 |
| `description` | ✅ | ≤1024 字符 | **最关键**。必须同时写清「做什么」和「何时用」——只写功能不写触发场景的，Agent 不知道什么时候该加载它 |
| `license` | ○ | 许可证名或指向内置许可证文件 | **务必与目录内 LICENSE 交叉核对**，不一致按红灯处理 |
| `compatibility` | ○ | ≤500 字符 | 环境要求，收录时抄进 README 的「怎么装」段 |
| `metadata` | ○ | 任意键值对 | `author` / `version` 嵌在这里，**不是顶层字段**。顶层写 `version:` 是常见错误 |
| `allowed-tools` | ○ | 空格分隔的工具名 | 实验性字段，各实现支持度不一 |

### description 写得好不好，一眼能看出来

❌ 反例：

```yaml
description: 一个强大的 PDF 处理工具
```

只说了是什么，没说什么时候用。Agent 拿到这句话无法判断当前对话该不该加载它。

✅ 正例：

```yaml
description: 从 PDF 提取文本、表格与元数据。当用户上传 PDF 文件、要求解析 PDF 内容、或需要把 PDF 转换为结构化数据时使用。
```

前半句「做什么」，后半句「何时用」并且列出了具体触发场景。

**收录判断**：description 里没有「当…时使用」这类触发语义的，H3 记不通过。

---

## Skill 包的目录结构

```
skill-name/
├─ SKILL.md          必需。frontmatter + 正文指令
├─ scripts/          可选。可执行代码（Python / Shell / Node）
├─ references/       可选。供 Agent 按需读取的参考文档
└─ assets/           可选。模板、图片、字体等静态资源
```

各目录的语义差别值得注意：

- **`references/`** 是给 Agent 读的，不是给人读的。它的存在意义是把大段上下文
  从 SKILL.md 里挪出去，让 Agent 按需加载，节省 token
- **`scripts/`** 是确定性逻辑。凡是能用代码精确完成的（格式转换、校验、批处理），
  就不要让 Agent 用自然语言推理
- **`assets/`** 通常是体积大头，收录时注意 20 MB 上限

---

## 收录 skill 类条目时的核对清单

```
□ SKILL.md 存在于包根目录
□ frontmatter 是合法 YAML（--- 包裹，缩进正确）
□ name 存在，且与所在目录名逐字符一致
□ name 符合命名约束（小写/数字/连字符，无首尾连字符）
□ description 存在，≤1024 字符
□ description 同时包含「做什么」与「何时用」
□ license 字段（若有）与目录内 LICENSE 文件一致
□ version / author 是否被错误地写在了顶层（应在 metadata 下）
□ scripts/ 里的脚本有没有硬编码的绝对路径或个人 API Key
□ assets/ 体积是否超限
```

倒数第二条容易被忽略但很重要：**收录前扫一遍 `scripts/`**，见过上游脚本里残留
测试用的 token 或 `/Users/someone/...` 路径的情况。发现了就在条目
`SKILL.md` 的「注意事项」里记下来提醒使用者。

---

## 常见规范偏差

按收录时遇到的频次排序：

| 偏差 | 后果 | 本仓库处理 |
|---|---|---|
| `name` ≠ 目录名 | skill 加载失败 | 记入「注意事项」，提示手动改名 |
| `description` 只写功能不写触发场景 | Agent 不会主动加载 | 记入「注意事项」 |
| `version` / `author` 写在顶层 | 部分实现解析报错 | 记入「注意事项」，不影响收录 |
| 完全没有 frontmatter | 不是合法 skill | 不收，或改按 `kind: cli-tool` 收录 |
| `license` 与 LICENSE 文件冲突 | 权利状态不明 | 以 LICENSE 为准填 SPDX，并在 `risk_notes` 记录 |
| 无 LICENSE 文件 | 默认保留所有权利 | `license` 填 `UNKNOWN`，提示谨慎使用 |

---

## 与本仓库条目 frontmatter 的字段映射

收录时可以直接从上游 SKILL.md 抄过来的字段（写入本条目 `SKILL.md` 的 frontmatter）：

| 上游 SKILL.md | → | 条目 SKILL.md frontmatter |
|---|---|---|
| `name` | → | `id`（若合法）、`name_en` |
| `description` | → | `summary_en` 的素材（精简到 200 字符内并翻译成 `summary_zh`） |
| `license` | → | `license`（与上游 LICENSE 文件交叉核对后填 SPDX，见 [license-policy.md](license-policy.md)） |
| `metadata.author` | → | 上游归属线索（可选，可记入备注） |
| `compatibility` | → | 「怎么安装」小节 |

> 本仓库不收录上游源码，因此不校验 copyright_holder。若上游 frontmatter 的
> `license` 与目录内 LICENSE 冲突，以 LICENSE 为准，并在 `risk_notes` 记录。
