<!--
条目说明文档 —— 固定七段式，段落顺序和标题请勿改动，脚本与 CI 依赖此结构。

写作要求：
  · 面向"没用过这个项目的人"，让他读完能判断要不要用
  · link-only 存根请把这份写得比 vendored 更厚：读者拿不到代码，用文字补上信息差
  · 不要复制粘贴上游 README 的营销话术，用自己的话说清楚
-->

# Anthropic Office 文档技能

> Anthropic 官方维护的文档处理技能集合（docx / pdf / pptx / xlsx）。上游：[anthropics/skills](https://github.com/anthropics/skills) · 许可证：LicenseRef-Anthropic-Source-Available（source-available，非开源）· 🔴 C

## 是什么

`anthropics/skills` 是 Anthropic 官方的公开技能仓库，其中 `docx` / `pdf` / `pptx` / `xlsx`
四个技能（统称 Office / 文档技能）是 **Claude 文档生成能力的生产级底层实现**。
它们让智能体能够：生成与编辑 Word 文档（标题、表格、页码、排版）、读取/填表/合并/新建 PDF、
制作带版式与图表的 PowerPoint、生成带公式与结构化数据的 Excel。

## 解决什么问题

**这一段最重要。** 文档生成是智能体落地的高频刚需，但"从零手写 docx/py 脚本"门槛高、
易出错、格式难调。这四个技能把经过生产环境打磨的文档处理逻辑封装好：

- **没有它之前**：你要自己调 python-docx / openpyxl / PDF 库，写一堆样板代码，还得反复调试排版；
- **它介入之后**：用自然语言描述需求（"做一份带图表的产品周报 PPT"），技能内部调用封装好的
  脚本与参考文档完成生成，质量对齐 Claude.ai 内置文档功能。

注意：这四个技能是**参考实现（source-available）**，源码可见但**不允许再分发**——
所以本仓库只做链接存根，不收录其代码。

## 怎么装

本条目是 **🔴 红灯 link-only 存根**，本仓库不含源码。请按上游许可在本地自用：

```bash
# 仅克隆文档技能子目录（推荐，体积小）
git clone --depth 1 --filter=blob:none --sparse https://github.com/anthropics/skills src
cd src
git sparse-checkout set skills/document-skills
```

详细步骤与"为什么不能提交进本仓库"见同目录 `GET-IT.md`。

## 怎么用

装上（或经 Claude Code 插件市场安装 `anthropics/skills` 的 document-skills 集合）后直接提需求：

```
你：用 PDF 技能提取这份合同里的所有表单字段
你：做一份 12 页的产品发布会 PPT，含封面、目录、3 个数据图表页
你：把这份销售明细生成带公式和汇总行的 xlsx
```

技能会自动加载对应 `SKILL.md` 与脚本执行。若你的智能体支持 plugin 市场，也可：

```bash
/plugin marketplace add anthropics/skills
# 浏览安装 document-skills 集合
```

## 亮点

- **生产级质量**：与 Claude.ai 文档功能同源，不是玩具示例
- **覆盖四件套**：docx / pdf / pptx / xlsx 主流办公格式齐全
- **官方维护**：Anthropic 背书，随产品迭代
- **学习价值高**：作为"如何写好一个生产级 skill"的权威参考，非常值得研读

## 局限

- **🔴 协议限制再分发**：source-available，禁止把代码提交进本仓库或转载到其他公开仓库
  （这是它被收为 link-only 存根、而非 vendored 的根本原因）
- **仅限个人/合规自用**：商业使用需走 Anthropic 的授权，不能直接基于其代码做再分发产品
- **不是万能文档方案**：复杂排版、特殊模板仍可能需人工校对
- **同仓库其他技能多为 Apache-2.0**：若只需 `skill-creator`、`algorithmic-art` 等，
  它们属可收录范围，可另行建 vendored 条目

## 协议与来源

- **上游仓库**：https://github.com/anthropics/skills
- **著作权人**：Anthropic PBC
- **许可证**：LicenseRef-Anthropic-Source-Available（source-available，非 OSI 开源）
- **本仓库收录形式**：🔴 C 级 link-only 存根（禁止再分发，故不收录源码）
- **为什么不收录源码**：上游 README 明示这四个技能 "source-available, not open source"，
  再分发违反其许可
- **如何获取**：见同目录 `GET-IT.md`
