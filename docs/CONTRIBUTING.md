# 贡献指南

SkillMall 是**轻量索引库**：每个条目只保存一个 `SKILL.md`（介绍 + 安装指令），
不收录源码快照。因此贡献流程很简单，三条路径任选。

先读这两份文档，能少走弯路：

- [收录标准](admission-criteria.md) —— 什么能收，什么不能收
- [如何编写 SKILL.md](writing-skill-md.md) —— 条目文件的写法与 frontmatter

---

## 三条参与路径

### 路径一：推荐一个项目（最轻量）

不确定它能不能收？先开 Issue，用
[「推荐收录」模板](../../issues/new?template=submit-entry.yml)。
填仓库地址、你觉得它好在哪、大致属于哪个分类。维护者会做初筛。

**适合**：你发现了好东西但没精力走完整流程。

### 路径二：直接提 PR 新增条目（推荐）

走完下面的「新增条目三步」，PR 里会自动带上 checklist，逐条勾选即可。

**适合**：你已经用过这个项目，能写清"是什么 + 怎么安装"。

### 路径三：报告问题

链接失效、内容有误、上游删库——开 Issue 用
[「报告问题」模板](../../issues/new?template=report-issue.yml)。

**权利人下架请求**：如果你是某个被收录项目的著作权人，希望本仓库移除相关内容，
请开 Issue 或发邮件至 avalonli@qq.com。我们承诺 **7 日内处理**，无需法律文书，一句话说明即可。

---

## 新增条目三步

### 第 1 步：拷贝模板

```bash
# 在仓库根目录执行
mkdir -p entries/<分类>/<你的id>
cp _template/SKILL.md entries/<分类>/<你的id>/SKILL.md
```

`id` 规则：小写字母、数字、连字符；**必须等于目录名**；全局唯一。

九个一级分类见 [README 目录导航](../README.md#四目录结构)。

### 第 2 步：填内容

- **frontmatter**：必填字段见 `_template/SKILL.md` 与 [writing-skill-md.md](writing-skill-md.md)。
  最容易错的三处：`id` ≠ 目录名、`category` ≠ 一级目录名、`license` 留空。
- **正文**：固定四节「是什么 / 怎么安装 / 怎么用 / 注意事项」。
  「怎么安装」必须给 Agent 可执行的代码块指令——这是本仓库的核心价值，别糊弄。
- 不要搬运上游源码，只给链接和安装指令。

### 第 3 步：本地校验

```bash
python scripts/validate.py          # frontmatter + 安装指令 + 去重
python scripts/gen_index.py         # 重新生成 INDEX.md
```

两条都过了再提 PR。CI 会跑同样的检查，本地先过能省一轮往返。

**记得把生成后的 `INDEX.md` 一起提交**——CI 会重新渲染并 diff，不一致直接失败。

---

## PR 会被拒绝的常见原因

| 原因 | 说明 |
|---|---|
| `id` 与目录名不一致 | frontmatter 的 id 必须等于所在目录名 |
| `category` 与一级目录名不一致 | 分类必须与物理路径对应 |
| frontmatter 缺必填字段 | 用 `validate.py` 检查 |
| 没有「怎么安装」小节 / 没有代码块 | Agent 没法装，等于没收录 |
| 正文搬运了上游源码 | 本仓库只给链接与指令，不转载源码 |
| 忘了更新 INDEX.md | 跑一下 `gen_index.py` 就行 |
| 重复收录 | 同一个 `repo` 已存在，或该项目在 CHANGELOG「已移除」名单里 |

---

## 环境

脚本用 Python 3.9+，依赖只有两个：

```bash
pip install -r scripts/requirements.txt   # pyyaml, jsonschema
```

Windows 用户建议在 Git Bash 下操作，`.gitattributes` 已强制 LF，不用改 `core.autocrlf`。
