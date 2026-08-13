<!--
本文件**仅供 link-only 存根条目使用**。
vendored（🟢 A / 🟡 B 级）条目请删除此文件。

存在意义：红灯条目不能把源码放进本仓库，但可以告诉你怎么在本地一键补齐。
-->

# 如何获取源码

本条目为 **🔗 链接存根**：出于许可证限制，本仓库**不包含**该项目的任何源码。

**不收录原因**：上游仓库 `anthropics/skills` 的 README 明示——`docx` / `pdf` / `pptx` / `xlsx`
四个文档处理技能属于 **"source-available, not open source"**（源码可见但非开源），
其许可限制再分发。因此这四个技能禁止 vendoring，只能以 link-only 存根形式收录。

> 注：同仓库中的**其他**技能（如 `skill-creator`、`algorithmic-art`、各类示例技能）
> 多为 Apache-2.0，属可收录范围，如需使用请另行建 vendored 条目。

## 本地补齐

在**本条目目录下**执行，会得到一个与 vendored 条目一致的 `src/`（仅用于本地自用）：

```bash
# 仅克隆文档技能子目录（推荐，体积小）
git clone --depth 1 --filter=blob:none --sparse https://github.com/anthropics/skills src
cd src
git sparse-checkout set skills/document-skills
```

拉下来的 `src/` 已被根目录 `.gitignore` 的 `**/src/` 规则忽略，
**不会**被误提交进本仓库——这是刻意设计的安全网，请不要为它添加白名单例外。

## 使用前请注意

该项目的许可证**限制再分发**。你可以：

- ✅ 在本地克隆、阅读、按其许可证条款自用（含 Claude.ai / Claude Code 等官方支持的使用方式）

你不可以：

- ❌ 把它提交进本仓库
- ❌ 转载到其他公开仓库
- ❌ 在未遵守其许可证条款的前提下分发

具体权利边界请以上游 LICENSE 全文为准。本仓库的说明不构成法律建议。
