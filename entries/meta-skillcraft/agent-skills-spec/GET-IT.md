<!--
本文件**仅供 link-only 存根条目使用**。
vendored（🟢 A / 🟡 B 级）条目请删除此文件。

存在意义：本仓库刻意不冻结规范副本，始终指向其权威最新版本。
-->

# 如何获取 / 阅读规范

本条目为 **🔗 链接存根**：出于「规范是活的标准，应指向权威最新版本」的刻意选择，
本仓库**不包含**该规范的源码或副本，仅提供导航与中文导读。

**不收录原因**：Agent Skills 规范（文档部分 CC-BY-4.0）虽属绿灯协议，但作为开放标准，
冻结一份副本反而可能误导读者使用过时版本。因此本条目刻意采用 link-only，
始终链接到官方实时规范 `https://agentskills.io/specification`。

## 阅读入口

- 规范正文（最新权威版）：https://agentskills.io/specification
- 规范所在的官方仓库目录：`https://github.com/anthropics/skills` 的 `spec/` 子目录
- 参考实现 SDK：`https://github.com/anthropics/skills`（含 `skills-ref` 等）

## 想在本地存一份怎么办

如果你需要在本地保留一份规范快照用于离线参考（**仅供个人阅读，不要回提进本仓库**）：

```bash
# 仅抽检规范目录（体积很小）
git clone --depth 1 --filter=blob:none --sparse https://github.com/anthropics/skills src
cd src
git sparse-checkout set spec
```

拉下来的 `src/` 已被根目录 `.gitignore` 的 `**/src/` 规则忽略，
**不会**被误提交进本仓库——这是刻意设计的安全网，请不要为它添加白名单例外。

## 使用前请注意

规范文本为 CC-BY-4.0，你可自由阅读、引用并注明出处。本仓库的说明不构成法律建议。
