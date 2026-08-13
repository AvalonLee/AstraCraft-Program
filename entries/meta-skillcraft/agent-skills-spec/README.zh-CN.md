<!--
条目说明文档 —— 固定七段式，段落顺序和标题请勿改动，脚本与 CI 依赖此结构。

写作要求：
  · 面向"没用过这个项目的人"，让他读完能判断要不要用
  · link-only 存根请把这份写得比 vendored 更厚：读者拿不到代码，用文字补上信息差
  · 不要复制粘贴上游 README 的营销话术，用自己的话说清楚
-->

# Agent Skills 规范

> 一份让 AI 智能体"即插即用"新能力的开放格式标准。官方规范：[agentskills.io/specification](https://agentskills.io/specification) · 许可证：CC-BY-4.0 · 🟢 A（本条目刻意 link-only，始终指向最新版）

## 是什么

Agent Skills 是由 Anthropic 发起、社区共建的**开放标准**，定义了一种轻量、可移植的
"技能"格式：一个文件夹里放一份 `SKILL.md`（含 name/description 元数据 + 指令），
智能体在运行时按需加载它来获得某项专门能力。它回答的核心问题是：
**怎么把"给智能体的专业知识与工作流"打包成可版本化、可跨产品复用的资产。**

## 解决什么问题

在 Skills 之前，想让智能体稳定地做好某类事，往往依赖写在提示词或系统设定里的隐性知识，
难以复用、难以审计、换一个客户端就失效。Agent Skills 把这类知识固化成文件夹：

- **渐进式披露**：启动时智能体只加载每个技能的 name+description（小上下文占用），
  任务匹配时才读完整 `SKILL.md` 指令——可同时挂很多技能而不撑爆上下文；
- **可移植**：一次写好，任意兼容 Agent Skills 的客户端（Claude Code、Cursor、
  Gemini CLI、Codex 等）都能发现并使用；
- **可审计**：技能是普通目录，内含指令、脚本、参考文档、资源，版本可控。

## 怎么装

本条目是 **link-only 存根**，不收录规范副本。阅读与引用规范请直接访问：

- 规范正文：https://agentskills.io/specification
- 官方仓库（含规范目录与参考实现）：https://github.com/anthropics/skills

如果你要在本地留一份离线快照用于阅读，见同目录 `GET-IT.md`（**仅供个人阅读，勿回提本仓库**）。

## 怎么用

这份规范**不是要给终端用户直接"运行"的东西**，而是你**编写自己 skill 时遵循的格式**。
最小可运行的 skill 结构（来自规范）：

```
my-skill/
├── SKILL.md        # 必需：name + description 元数据 + 指令
├── scripts/        # 可选：可执行代码
├── references/     # 可选：参考文档
├── assets/         # 可选：模板、资源
└── ...
```

`SKILL.md` 的 frontmatter 至少要有 `name` 和 `description` 两个字段——
后者直接决定智能体"何时会想起用它"，是整份规范里最值得花心思的地方。
本仓库的 `docs/skill-spec-cheatsheet.md` 把字段映射整理成了速查表，配合阅读更佳。

## 亮点

- **开放标准、跨客户端**：由 Anthropic 维护并开放贡献，已被大量智能体产品采纳
- **格式极简**：一个 `SKILL.md` 即可成技能，上手门槛低
- **渐进式加载**：大上下文友好，可挂很多技能而不爆 token
- **文档 CC-BY-4.0**：规范文本可自由引用与再分发（须注明出处）
- **本仓库的元数据 schema 即对齐此规范**：`scripts/schema/meta.schema.json` 的
  `kind` 枚举（skill / skill-collection / spec …）与字段设计都参考了 Agent Skills 的理念

## 局限

- **规范本身不是"功能"**：它定义格式，真正的能力来自你或社区写的各个 skill
- **生态仍在演进**：字段约束、客户端支持度会随版本变动，务必以官网最新规范为准
  （这正是本条目选择 link-only 而非冻结副本的原因）
- **中文资料相对少**：官方文档以英文为主，本仓库的 `docs/` 与 `skill-spec-cheatsheet.md`
  是为补这块信息差而写

## 协议与来源

- **上游规范（实时）**：https://agentskills.io/specification
- **上游仓库**：https://github.com/anthropics/skills（规范位于 `spec/` 目录）
- **著作权人**：Anthropic PBC（规范维护方）
- **许可证**：CC-BY-4.0（🟢 A 级）
- **本仓库为何 link-only**：规范是活的标准，刻意不冻结副本，始终指向官方最新版本。
  因此 CI 可能出现「A 级可 vendoring 但 mode=link-only」的告警——属预期，不影响通过。
- **如何获取源码**：见同目录 `GET-IT.md`
