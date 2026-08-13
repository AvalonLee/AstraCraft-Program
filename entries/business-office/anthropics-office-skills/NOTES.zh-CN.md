<!--
实测笔记 —— link-only 存根条目。

本条目为 🔴 C 级存根（source-available，禁止再分发），不收录源码。
这里记录的是「对上游许可与定位的核查结论」，而非代码实测。
-->

# 笔记：Anthropic Office 文档技能

**记录日期**：2026-08-10
**记录环境**：Windows 11 / Git Bash / 研读 anthropics/skills README 与社区资料
**对应版本**：仓库默认分支最新（未克隆源码，仅核查许可与结构）

## 核查了什么

- 上游 `anthropics/skills` README 的许可证声明：示例技能多 Apache-2.0；
  **docx / pdf / pptx / xlsx 四个文档技能明示为 "source-available, not open source"**
- 多方社区资料交叉印证：这四个技能是 Claude 文档能力的生产级参考实现，
  源码可见但限制再分发

## 关键结论

- **协议红线成立**：LicenseRef-Anthropic-Source-Available 属 source-available，非 OSI 开源，
  再分发违反其许可 → 必须 link-only 存根，不能 vendoring。
- **能力很强但受限使用**：与 Claude.ai 文档功能同源，质量高；商业使用需走 Anthropic 授权。
- **同仓库可拆分收录**：`skill-creator`、`algorithmic-art`、各类示例技能多为 Apache-2.0，
  若日后要收录，应单独建 vendored 条目，仅针对那些绿灯技能，不要把红灯四件套混进来。

## 和同类的对比

| 维度 | anthropics Office 技能 | 社区开源文档 skill（如 obra/superpowers 的 writing-skills） |
|---|---|---|
| 质量 | 生产级、与 Claude.ai 同源 | 视作者而定，通常偏教学/轻量 |
| 协议 | source-available（不可再分发） | 多为 MIT/Apache-2.0（可再分发） |
| 适用 | 个人/合规自用、研读范式 | 可自由集成进自己的项目 |

一句话：**要最高质量的官方文档生成且能合规自用 → 用上游；要可再分发集成 → 找开源替代。**

## 我的判断

值得在「链接导航 + 研读范式」层面收录，但**绝不能 vendoring**。它最适合作为
"如何写好生产级文档 skill"的权威参考样本被读者发现。本仓库以 link-only 存根承担这一角色。

## 上游补充说明

未留存任何上游文件。若日后上游调整许可（例如把某文档技能改为 Apache-2.0），
应重新评估是否转为 vendored 条目。
