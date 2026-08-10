# Vendoring 操作手册

如何新增、同步、移除一个条目。

---

## 为什么是快照拷贝

在三种方案里选了快照拷贝，理由如下：

| 方案 | 网页可浏览 | clone 即完整 | 可离线 | 可追溯版本 | 同步成本 |
|---|---|---|---|---|---|
| `git submodule` | ❌ 只显示一个灰色链接 | ❌ 需 `--recursive` | ❌ | ✅ | 中 |
| `git subtree` | ✅ | ✅ | ✅ | ⚠️ squash 后历史混杂 | 高，命令晦涩 |
| **快照拷贝 + lock** | ✅ | ✅ | ✅ | ✅ SHA 记在 lock 里 | 低，脚本化 |

submodule 的致命问题：访客在 GitHub 网页上点进去只看到一个灰色的目录链接，
`git clone` 忘了加 `--recursive` 就是一堆空目录。这直接违背"开箱即用"的初衷。

快照拷贝的代价是**丢失上游 commit 历史**。但对一个精选收录库来说，历史本来就应该
去上游看——本仓库要提供的是"某个可用版本的完整副本 + 一份评测"，不是 git 镜像。

版本追溯靠 `upstream.lock` 里的 40 位 commit SHA，精确到单次提交。

---

## 新增一个 vendored 条目

### 1. 判协议

先走 [五步判定流程](license-policy.md#五步判定流程)。红灯的走
[存根流程](#新增一个-link-only-存根)。

### 2. 建目录

```bash
cp -r _template/ meta-skillcraft/my-entry/
cd meta-skillcraft/my-entry/
rm GET-IT.md          # vendored 条目不需要它
```

### 3. 拉源码

```bash
# 回到仓库根目录执行
python scripts/vendor.py --add https://github.com/owner/repo \
    --into meta-skillcraft/my-entry
```

只要上游的某个子目录：

```bash
python scripts/vendor.py --add https://github.com/owner/repo \
    --subpath skills/brainstorming \
    --into meta-skillcraft/my-entry
```

脚本会做这些事：

1. `git clone --depth 1` 到临时目录
2. 记录 HEAD 的完整 SHA 与提交时间
3. 剔除 `.git/`、`.github/workflows/`、`node_modules/`、`__pycache__/`
4. 拷贝到 `<条目>/src/`
5. 计算 `content_hash`（全部文件按路径排序后的 SHA-256）
6. 写入 `upstream.lock`

**为什么剔除 `.github/workflows/`**：避免上游的 workflow 文件被 GitHub 误识别为本
仓库的 CI 而尝试运行。

### 4. 加 .gitignore 白名单

**这一步最容易忘。** 根 `.gitignore` 里有 `**/src/` 兜底规则，不加白名单源码就进不了
版本库：

```gitignore
!meta-skillcraft/my-entry/src/
!meta-skillcraft/my-entry/src/**
```

验证：

```bash
git check-ignore -v meta-skillcraft/my-entry/src/SKILL.md
# 应该无输出（退出码 1）。有输出说明还在被忽略。
```

> ⚠️ 用 `git check-ignore` 时传**精确文件路径**，不要传带尾斜杠的目录路径——
> 对不在索引中的目录查询会误报命中 `.gitignore` 的空行。判断忽略状态以
> `git status -uall` 为准。

### 5. 体积检查

硬性限制：**单条目 ≤ 20 MB，单文件 ≤ 5 MB**。

```bash
du -sh meta-skillcraft/my-entry/src/
find meta-skillcraft/my-entry/src/ -type f -size +5M
```

超限的处理：不拷大文件，改在 `src/assets/FETCH.md` 里记录下载地址 + SHA-256
校验值。**不启用 Git LFS**——公开仓库的 LFS 带宽有配额，超了会直接锁仓。

### 6. 填元数据、写文档、校验

见 [贡献指南](../CONTRIBUTING.md#第-6-步填元数据与文档)。

```bash
python scripts/validate.py
python scripts/gen_index.py
```

---

## 新增一个 link-only 存根

```bash
cp -r _template/ business-office/my-stub/
cd business-office/my-stub/
# 保留 GET-IT.md，填写不可转载原因与 clone 命令
```

`meta.yml` 关键字段：

```yaml
license_tier: C
vendoring:
  mode: link-only
  # 不要填 path
```

**不要创建 `src/`**。`validate.py` 会检查：`license_tier: C` 且目录下存在 `src/`
→ 直接失败。

`upstream.lock` 仍然要填（记录你观测到的最新 commit），但 `content_hash`、
`file_count`、`total_bytes` 保持为 null / 0。

---

## 同步上游更新

```bash
python scripts/vendor.py --add <原url> --into <条目目录> --force
```

`--force` 会先删掉现有 `src/` 再重拷。然后：

```bash
git diff --stat                      # 看改了哪些文件
git diff src/LICENSE                 # 重点：协议有没有变
```

### 同步时必做的协议复查

**上游改协议是真实风险**，近年从 MIT/Apache 改到 BUSL/SSPL 的项目不在少数。
每次同步都要重走一遍五步判定。一旦变红灯，按
[降级流程](license-policy.md#上游改协议怎么办)处理。

### 同步后更新

- `meta.yml` 的 `updated_at`
- 如果上游有重大变化，补充 `NOTES.zh-CN.md`
- `CHANGELOG.md` 记一笔

---

## 校验本地是否误改

```bash
python scripts/vendor.py --verify
```

重算所有 vendored 条目 `src/` 的 `content_hash`，与 `upstream.lock` 比对。
失配说明有人改了上游文件——这违反零修改原则，会带来 Apache-2.0 的改动标注义务。

**常见误报**：Windows 下换行符被转成 CRLF。`.gitattributes` 已设
`* text=auto eol=lf` 防止这种情况，如果仍然失配，检查是不是编辑器自动改了行尾。

---

## 移除一个条目

```bash
# 1. 删源码
git rm -r --cached <条目>/src/
rm -rf "E:/Download/SkillMall/<条目>/src"

# 2. 从 .gitignore 移除白名单例外

# 3. 决定后续形态
#    协议变红灯 → 保留条目，改为 link-only 存根
#    上游删库/失效 → 条目目录保留一个月后清理
```

然后更新 `THIRD_PARTY_NOTICES.md` 和 `CHANGELOG.md`，最后：

```bash
python scripts/validate.py && python scripts/gen_index.py
```

> Windows 环境删除 vendored 目录时，如果 safe-delete 钩子报
> `SAFE_DELETE_BULK_CONFIRM_REQUIRED`（单次删除 >100 个文件），
> 用 `command rm -rf "E:/绝对路径"` 绕过。删完务必用 `ls` 实测确认。

---

## 目录形态速查

**vendored**：

```
<分类>/<id>/
├─ meta.yml            人工维护
├─ upstream.lock       脚本写入，勿手改
├─ README.zh-CN.md     七段式
├─ NOTES.zh-CN.md      实测笔记
└─ src/                上游快照，零修改
   ├─ LICENSE          必须存在
   └─ ...
```

**link-only**：

```
<分类>/<id>/
├─ meta.yml            license_tier: C, mode: link-only
├─ upstream.lock       仅记录 url/ref/commit
├─ README.zh-CN.md     要写得更厚
├─ NOTES.zh-CN.md
└─ GET-IT.md           本地补齐命令
（没有 src/）
```
