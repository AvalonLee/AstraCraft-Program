# 许可证政策

SkillMall 采用**全量 vendoring**——把收录项目的源码真正放进仓库。这带来一个后果：
本仓库的每一次收录都构成**法律意义上的再分发**，责任等级远高于 awesome-list
那种"贴个链接"。

因此协议判定不是可选项，而是收录流程的第一道闸门，且是**唯一不可破例**的门槛。

---

## 三色分级

### 🟢 A 级 —— 绿灯，直接 vendoring

| SPDX | 说明 |
|---|---|
| `MIT` | 最常见 |
| `BSD-2-Clause` / `BSD-3-Clause` | |
| `ISC` | |
| `0BSD` | |
| `Unlicense` | |
| `CC0-1.0` | 公有领域奉献 |
| `CC-BY-4.0` | 需署名，文档类常见 |

**必做动作**：

1. 原样保留上游 `LICENSE` 文件在 `src/` 内
2. 在 `THIRD_PARTY_NOTICES.md` 登记：项目名、URL、著作权人、SPDX、本仓库路径
3. `meta.yml` 填 `license_tier: A`

### 🟡 B 级 —— 黄灯，可 vendoring 但有附加义务

| SPDX | 附加义务 |
|---|---|
| `Apache-2.0` | ①附许可证副本 ②保留所有归属声明 ③**标注被修改的文件** ④携带上游 `NOTICE` |
| `MPL-2.0` | 文件级 copyleft，修改过的文件须以 MPL 开源 |
| `OFL-1.1` | 字体专用，不得单独售卖，衍生字体须同协议 |

**必做动作**：A 级的全部，加上：

4. 上游若有 `NOTICE` 文件，一并拷贝
5. **零修改 vendoring**

> **关于「零修改」**：这不是洁癖，是成本考量。Apache-2.0 第 4(b) 条要求你在每个
> 修改过的文件里标注改动。只要一个字符都不改，这项义务自动不成立。所有补充说明、
> 修正建议、踩坑记录一律写进 `NOTES.zh-CN.md`——那是本仓库的原创内容，与上游文件
> 物理隔离。
>
> `upstream.lock` 的 `content_hash` 就是为了强制这一点：`vendor.py --verify`
> 会重算 `src/` 的哈希，对不上就报错。

### 🔴 C 级 —— 红灯，禁止拷贝源码

| 类别 | 具体 | 原因 |
|---|---|---|
| Copyleft | `GPL-2.0` / `GPL-3.0` / `AGPL-3.0` / `LGPL-*` | 传染性。vendoring 后整个仓库可能被要求以同协议开源；AGPL 甚至网络访问即触发 |
| 源码可见但非开源 | `SSPL` / `BUSL-1.1` / Anthropic 的 `docx`/`pdf`/`pptx`/`xlsx` | 明确限制再分发 |
| 限制性 CC | `CC-BY-NC-*` / `CC-BY-ND-*` | 禁商用或禁演绎 |
| **无 LICENSE 文件** | —— | 著作权法默认「保留所有权利」，没有授权就是不许复制 |
| **声明自相矛盾** | frontmatter 写 A，LICENSE 文件写 B | 权利状态不清，不替上游做判断 |
| 自定义协议未审阅 | —— | 逐条读完并确认允许再分发之前，一律按红灯处理 |

**处理方式**：做 **link-only 存根**（见下文）。

---

## 五步判定流程

```
┌─ 1. 上游根目录有 LICENSE / COPYING / LICENCE 文件吗？
│      否 ──────────────────────────────────────────────► 🔴 红灯，终止
│      是 ↓
├─ 2. 能归一化成已知的 SPDX 标识符吗？
│      （"Apache License, Version 2.0" → Apache-2.0）
│      否，或落不进 A/B 列表 ─────────────────────────────► 🔴 红灯
│      是 ↓
├─ 3. SKILL.md frontmatter 的 license 字段与 LICENSE 文件一致吗？
│      不一致 ──────────────────────────────────────────► 🔴 红灯（需人工裁决）
│      一致，或 frontmatter 无该字段 ↓
├─ 4. 子目录里有独立协议的资源吗？（字体 / 图标 / 数据集 / 第三方依赖）
│      有 → 逐个复判，取最严的那个作为整体分级
│      无 ↓
└─ 5. 定级：A 或 B → vendoring.mode = full
              C     → vendoring.mode = link-only
```

**第 3 步是实践中最常触发的一条。** 真实案例：某 skill 的 `SKILL.md` 写
`license: MIT`，但目录内 `LICENSE.txt` 是 Apache-2.0（可能只覆盖某个字体子资源，
也可能是作者填错）。这种情况下权利状态不明，本仓库不替上游做解释，直接按红灯处理，
并在 `meta.yml` 的 `risk_notes` 记录冲突详情。

---

## link-only 存根规范

红灯条目不是"不收"，而是换一种收法。

### 设计原则：平权

存根与 vendored 条目在**目录层级、README 导航、INDEX 索引中完全平权**。
不设"只有链接的二等区"，因为分类的依据应该是用途，而不是"我们能不能拷它的代码"。

唯一的差别是：**没有 `src/`**。

### 目录形态

```
<分类>/<id>/
├─ meta.yml            # vendoring.mode: link-only, license_tier: C
├─ upstream.lock       # 仅记录 source_url / ref / 观测到的最新 commit
├─ README.zh-CN.md     # 内容要写得更厚
├─ NOTES.zh-CN.md
└─ GET-IT.md           # 本地补齐命令 + 不可转载原因
```

### 存根的 README 要写得更厚

读者拿不到代码，你得用文字补上这个信息差。相比 vendored 条目，存根的
`README.zh-CN.md` 应额外包含：

- 上游的目录结构说明（让人不用 clone 就知道里面有什么）
- 核心用法摘录（**合理引用**篇幅，不是整篇搬运）
- 安装/获取的完整步骤
- 为什么值得看——既然不能给代码，就得把"值得你自己去拿"这件事讲明白

### `src/` 的安全网

根 `.gitignore` 里有 `**/src/` 这条兜底规则。用户执行 `GET-IT.md` 的 clone 命令后
产生的 `src/` 会被自动忽略，不可能误提交。

vendored 条目需要在 `.gitignore` 里显式加白名单例外才能入库：

```gitignore
!<分类>/<id>/src/
!<分类>/<id>/src/**
```

**这是刻意设计的**：默认拒绝、显式放行。忘记加白名单的后果是源码没进版本库
（容易发现），而不是违规内容被提交（很难发现）。

---

## CI 红线

`scripts/validate.py` 执行以下强制检查，任何一条不过直接构建失败：

| 检查 | 规则 |
|---|---|
| **协议-模式一致性** | `license_tier: C` 的条目目录下**不得存在 `src/`** |
| **模式-路径一致性** | `vendoring.mode: full` 必须填 `vendoring.path` 且该目录实际存在 |
| **许可证文件存在** | A/B 级且 `mode: full` 时，`license_file` 指向的文件必须存在 |
| **著作权人非空** | 所有条目必须填 `copyright_holder` |
| **SPDX 白名单** | `license_tier` 与 `license` 的对应关系必须符合上表 |
| **归属登记** | 每个条目必须在 `THIRD_PARTY_NOTICES.md` 中有对应记录 |

---

## 上游改协议怎么办

真实风险，不是假设。近年从 MIT/Apache 改到 BUSL/SSPL 的项目不在少数。

**执行同步时必须重新走一遍五步判定**：

```bash
python scripts/vendor.py --add <url> --into <条目目录> --force
git diff --stat src/LICENSE      # 重点看 LICENSE 有没有变
```

一旦上游变为红灯：

1. `git rm -r <条目>/src/`
2. `meta.yml` 改 `license_tier: C`、`vendoring.mode: link-only`
3. 补 `GET-IT.md`，改写 `README.zh-CN.md` 的协议段
4. 从 `.gitignore` 移除该条目的白名单例外
5. 更新 `THIRD_PARTY_NOTICES.md`，把条目从 vendored 区移到 link-only 区
6. `CHANGELOG.md` 记一笔「更新：上游协议变更，降级为存根」

---

## 下架请求

任何著作权人都可以要求本仓库移除相关内容：

- Issue：https://github.com/AvalonLee/SkillMall/issues
- 邮件：avalonli@qq.com

**7 日内处理，不要求提供任何法律文书。** 一句话说明身份和诉求即可。
我们的立场是：本仓库的价值在于筛选和评测，不在于占有代码。有争议就先撤。

---

## 免责声明

本文档是仓库维护规范，**不构成法律建议**。协议解释以官方文本为准。
若你的使用场景涉及商业分发或合规审计，请咨询专业人士。
