# 贡献指南

感谢你想为 SkillMall 出一份力。这个仓库和常见的 awesome-list 有个根本区别：
**它真的把代码收进来**。这意味着每一次收录都是一次分发行为，法律责任比放个
链接高得多。所以流程会比你习惯的"提个 PR 加一行链接"要严格一些。

先读这两份文档，能省下很多来回：

- [收录标准](docs/admission-criteria.md) —— 什么能收，什么不能收
- [许可证政策](docs/license-policy.md) —— 三色分级与判定流程

---

## 三条参与路径

### 路径一：推荐一个项目（最轻量）

不确定它能不能收？先开 Issue，用
[「推荐收录」模板](../../issues/new?template=submit-entry.yml)。
填仓库地址、你觉得它好在哪、大致属于哪个分类。维护者会做协议核查和初筛。

**适合**：你发现了好东西但没精力走完整流程。

### 路径二：直接提 PR 新增条目（推荐）

走完下面的「新增条目七步」，PR 里会自动带上 checklist，逐条勾选即可。

**适合**：你已经实际用过这个项目，愿意写一份评测笔记。

### 路径三：报告问题

链接失效、协议标错、内容有误、上游删库——开 Issue 用
[「报告问题」模板](../../issues/new?template=report-issue.yml)。

**权利人下架请求**：如果你是某个被收录项目的著作权人，希望本仓库移除相关内容，
请开 Issue 或发邮件至 avalonli@qq.com。我们承诺 **7 日内处理**，无需你提供任何
法律文书，一句话说明即可。

---

## 新增条目七步

### 第 1 步：先判协议（不通过就别往下走了）

按 [许可证政策](docs/license-policy.md) 的五步流程判定分级：

| 分级 | 典型协议 | 能否拷代码 |
|---|---|---|
| 🟢 A | MIT / BSD / ISC / 0BSD / Unlicense / CC0 / CC-BY-4.0 | ✅ 可以 |
| 🟡 B | Apache-2.0 / MPL-2.0 / OFL-1.1 | ✅ 可以，但要带 NOTICE 且**零修改** |
| 🔴 C | GPL / AGPL / LGPL / SSPL / BUSL / NC / ND / source-available / **无 LICENSE** | ❌ 只能做链接存根 |

**最常见的踩坑**：上游 `SKILL.md` 的 frontmatter 写 `license: MIT`，但目录里的
LICENSE 文件是 Apache-2.0。**两者不一致一律按红灯处理**，不要自己替上游做判断。

### 第 2 步：确认硬门槛

五条硬门槛全过才能收，PR 模板里要逐条勾：

- **H1 可获取** —— 公开仓库/主页，非私有、非仅镜像
- **H2 协议明确** —— 有 LICENSE，SPDX 可识别，与 frontmatter 声明不冲突
- **H3 文档可用** —— skill 类要有合规 `SKILL.md`；项目类要有 README + 最小可运行示例
- **H4 活跃度** —— 最近提交 ≤ 12 个月且未 archived（**仅此条可破例**）
- **H5 真实可用** —— 你本人跑通过

注意：**star 数不是硬门槛**。好东西刚发布时 star 都很低，用 star 卡门这仓库就变成
第二个 awesome-list 了。star 只作加分项和排序维度。

### 第 3 步：选分类，定 id

九个一级分类见 [README 目录导航](README.md#目录导航)。选**最主要的用途**那一个，
其余维度写进 `tags` 由 INDEX 做交叉检索——不要为了多露出而纠结分类。

`id` 规则：小写字母、数字、连字符；**必须等于目录名**；全局唯一。
建议格式 `<上游owner>-<项目名>` 或直接用项目名，如 `superpowers`、
`anthropics-office-skills`。

### 第 4 步：拷贝模板

```bash
cp -r _template/ <分类目录>/<你的id>/
cd <分类目录>/<你的id>/
```

link-only 存根请保留 `GET-IT.md`；vendored 条目请删掉它。

### 第 5 步：取源码（仅 vendored 条目）

用脚本，别手动 clone——脚本会顺便生成 `upstream.lock`：

```bash
python scripts/vendor.py --add https://github.com/owner/repo \
    --into <分类目录>/<你的id>
# 只取上游某个子目录：
python scripts/vendor.py --add https://github.com/owner/repo \
    --subpath skills/foo --into <分类目录>/<你的id>
```

拿到源码后：

- **零修改**。一个字符都不要改。需要说明的写进 `NOTES.zh-CN.md`。
  （这不只是洁癖——Apache-2.0 要求你标注每一个改动过的文件，不改就没这个义务）
- 确认 `src/LICENSE` 存在
- 体积：单条目 ≤ 20 MB、单文件 ≤ 5 MB。超了就别拷二进制资源，改在
  `src/assets/FETCH.md` 里记下载地址 + SHA256
- **在根 `.gitignore` 里加一条白名单**，否则 `**/src/` 规则会把它忽略掉：
  ```
  !<分类目录>/<你的id>/src/
  !<分类目录>/<你的id>/src/**
  ```

### 第 6 步：填元数据与文档

**`meta.yml`** —— 字段说明见模板内注释，也可参考
[schema](scripts/schema/meta.schema.json)。几个容易填错的：

- `license_tier` 必须与 `vendoring.mode` 匹配：C 级只能是 `link-only`，
  且目录下**不能有 `src/`**（CI 会拦）
- `copyright_holder` 从上游 LICENSE 文件里抄，不要猜
- `admission.checked` 只填你真正验证过的门槛编号
- `aliases` 填上游曾用名——这是去重检测的关键字段

**`README.zh-CN.md`** —— 固定七段式：是什么 / 解决什么问题 / 怎么装 / 怎么用 /
亮点 / 局限 / 协议与来源。link-only 存根的这份要写得**更厚**，因为读者拿不到代码，
你得用文字补上这个信息差。

**`NOTES.zh-CN.md`** —— 你的实测笔记。`admission.tier: core` 的条目**必须**写，
CI 会检查非空。这是本仓库区别于书签列表的核心资产，别糊弄：写你踩了什么坑、
和同类比强在哪、什么场景下不该用它。

### 第 7 步：本地校验

```bash
python scripts/validate.py          # 元数据校验 + 协议红线 + 去重
python scripts/gen_index.py         # 重新生成 INDEX.md
```

两条都过了再提 PR。CI 会跑同样的检查，本地先过能省一轮往返。

**记得把生成后的 `INDEX.md` 一起提交**——CI 会重新渲染并 diff，不一致直接失败。

---

## PR 会被拒绝的常见原因

| 原因 | 说明 |
|---|---|
| 协议判错 | 尤其是把 Apache-2.0 当 MIT、把无 LICENSE 的当 MIT |
| 红灯条目带了 `src/` | CI 硬拦，这是法律红线 |
| 改动了 vendored 源码 | 必须零修改 |
| 忘了更新 INDEX.md | 跑一下 `gen_index.py` 就行 |
| `NOTES.zh-CN.md` 是空模板 | core 级条目必须有真实评测 |
| 忘了加 `.gitignore` 白名单 | 结果 `src/` 根本没进版本库 |
| 重复收录 | 同一个 `repo` + `subpath` 已存在，或该项目在 CHANGELOG「已移除」名单里 |

---

## 上游同步

vendored 条目是死快照。想更新到上游最新版：

```bash
python scripts/vendor.py --add <原url> --into <条目目录> --force
git diff        # 仔细看 diff，确认上游没有偷偷改协议
```

**同步时必须重新核查协议**。上游改 license 是真实存在的情况（比如从 MIT 改成
BUSL），一旦变红灯就要删 `src/` 降级为存根，并记入 CHANGELOG。

校验本地有没有误改：

```bash
python scripts/vendor.py --verify
```

---

## 环境

脚本用 Python 3.9+，依赖只有两个：

```bash
pip install -r scripts/requirements.txt   # pyyaml, jsonschema
```

Windows 用户建议在 Git Bash 下操作，`.gitattributes` 已强制 LF，不用改
`core.autocrlf`。
