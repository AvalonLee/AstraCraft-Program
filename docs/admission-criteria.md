# 收录标准

一句话概括：**来源可溯、文档能读、安装可循、协议标清。**

本仓库是**轻量索引库**，不收录源码快照，因此没有复杂的法律门槛，四条准入项即可。

---

## 准入项（A）

### A1 可获取

- 项目公开可达，`repo` / `homepage` 是有效 URL（https）。
- 不接受：私有仓库、需要付费才能看的内容。

### A2 文档可用

- 有能让人上手的说明：上游有 README，或 skill 类有合规的 `SKILL.md`。
- 没有说明的项目不收——收进来 Agent 也没法装。

### A3 安装可循

- 条目里能写出一条**明确的安装/获取指令**（git clone / npm / pip / 复制到 skills 目录等）。
- 写不清"怎么装"的条目不合格，这是本仓库给 Agent 的核心价值。

### A4 协议标注

- frontmatter 填 `license`：SPDX 标识符，或 `UNKNOWN`（协议不明 / 无 LICENSE 文件）。
- 仅作参考标注，帮助判断能否商用；**本仓库不转载源码，不承担再分发义务**。

---

## 评级（tier）

| 评级 | 含义 |
|---|---|
| `core` | 主推。公认优质（如高 star、事实标准）或维护者已实测，明确推荐 |
| `standard` | 常规收录。可用，但可能未实测或不够突出 |
| `watch` | 观察期。存疑、待验证、或上游已归档但有史料价值 |

---

## 移除机制

触发条件（任一即触发）：

| 条件 | 判定 |
|---|---|
| 链接失效 | 每周 lychee 全量检查**连续两次**失败 |
| 上游删库 | 目标 URL 404 |
| 发现安全问题 | 上游被注入恶意代码、存在未修复的高危漏洞 |
| 长期无法使用 | 依赖的上游服务下线、API 废弃导致完全不可用 |

处理流程：

1. 删除 `entries/<分类>/<id>/` 目录
2. `docs/CHANGELOG.md` 记入「移除」，写明 id、原上游地址、日期、原因
3. 更新 `INDEX.md`（`python scripts/gen_index.py`）

**为什么保留移除记录**：避免同一个已被排除的项目被反复提交收录。
`validate.py` 会检查新增条目的 `repo` 是否出现在 CHANGELOG 的已移除名单中。

---

## 收录 Checklist（PR 用）

```markdown
### 条目前提
- [ ] A1 项目公开可达，repo/homepage 为有效 URL
- [ ] A2 上游有可上手的文档（README 或 SKILL.md）
- [ ] A3 条目里写了一条明确的安装/获取指令
- [ ] A4 frontmatter 已填 license（SPDX 或 UNKNOWN）

### 文件完整性
- [ ] SKILL.md 的 id 等于目录名，category 等于一级分类目录名
- [ ] 正文包含「怎么安装」小节，且指令在 ``` 代码块内
- [ ] frontmatter 必填字段齐全（见 _template/SKILL.md）

### 本地校验
- [ ] python scripts/validate.py 通过
- [ ] python scripts/gen_index.py 已重新生成，INDEX.md 已一并提交
```
