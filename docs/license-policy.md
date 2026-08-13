# 协议标注政策

本仓库**不收录上游源码**，只收录"介绍 + 安装指令"的 `SKILL.md`，因此**不存在源码再分发
问题**。frontmatter 里的 `license` 字段仅作**参考标注**，帮助读者/Agent 判断该项目能否商用。

**是否可商用，一律以对应上游 LICENSE 全文为准。** 本文档不构成法律建议。

---

## 填写规则

- 能从上游读出的协议 → 填 SPDX 标识符，如 `MIT`、`Apache-2.0`、`CC-BY-4.0`、`GPL-3.0`。
- 上游**无 LICENSE 文件**或协议不明 → 填 `UNKNOWN`。
- 自定义 / 非开源协议（如 Anthropic 的 source-available）→ 填 `LicenseRef-<名称>`，如
  `LicenseRef-Anthropic-Source-Available`。

---

## 常见协议速查（供参考，不构成法律意见）

| 类型 | 典型 SPDX | 说明 |
|---|---|---|
| 宽松，通常可商用可再分发 | `MIT` / `BSD-2-Clause` / `BSD-3-Clause` / `ISC` / `0BSD` / `Unlicense` / `CC0-1.0` | 商用友好 |
| 需署名 / 需保留声明 | `Apache-2.0` / `MPL-2.0` / `CC-BY-4.0` | 商用通常可以，须遵守署名等条款 |
| 限制再分发 / 禁商用 | `GPL` 系 / `AGPL-3.0` / `SSPL-1.0` / `BUSL-1.1` / `CC-BY-NC-*` / `CC-BY-ND-*` / 各类 source-available | 使用前务必读上游 LICENSE |
| 无 LICENSE | `UNKNOWN` | 默认"保留所有权利"，谨慎使用 |

> 由于本仓库只给"链接 + 安装指令"，即使是限制再分发的项目也可以照常收录
> （导航本身不构成分发）。但**不要在 SKILL.md 里搬运上游源码**。

---

## 下架请求

任何著作权人都可以要求本仓库移除相关内容：

- Issue：https://github.com/AvalonLee/SkillMall/issues
- 邮件：avalonli@qq.com

**7 日内处理，不要求提供任何法律文书。** 一句话说明身份和诉求即可。
