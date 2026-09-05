---
record_type: entry-record
id: cangjie-skill
name_zh: "Cangjie Skill 内容蒸馏为 Agent Skill"
name_en: "Cangjie Skill"
summary_zh: "把书、长视频、播客、课程等高价值内容蒸馏成可独立调用的 Agent Skills：RIA-TV++ 七阶段流水线（Adler 分析阅读 → 5 专项提取器并行 → 三重验证 + 晋级门 → RIA++ 能力卡 → Zettelkasten 链接 → 压力测试 → 确定性编译），支持 OpenClaw / Claude Code / DeepSeek Harness 三平台，附 20+ 已蒸馏示例。"
summary_en: "Distill methodologies from books, videos, and podcasts into callable, composable, pressure-tested Agent Skills via a seven-stage RIA-TV++ pipeline. Supports OpenClaw, Claude Code, DeepSeek Harness."
category: meta-skillcraft
kind: skill
tags: [skill, skill-pack, agent-skills, agent-methodology, openclaw, claude-code, codex, cn-localization]
languages: [markdown, python]
doc_languages: [zh, en, ja]
license: MIT
homepage: https://cangjie-skill.com
repo: https://github.com/kangarooking/cangjie-skill
tier: core
metrics:
  stars: 9515
  pushed_at: "2026-09-04T11:44:34Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [cangjie, 仓颉 Skill, book-to-skill]
risk_notes: "蒸馏质量取决于源内容的方法论密度——并非所有内容都值得蒸馏，pipeline 内置晋级门筛选但低密度源产出可能偏薄；DeepSeek Harness 插件需校验 SHA256 后从本地 tarball 安装；v2.5.0 的 Capability Bundle 为单一真源，旧版 Registry v1 条目兼容但不完整。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Cangjie Skill 内容蒸馏为 Agent Skill

> Finish reading, watching, or listening—and leave with a methodology you can invoke.上游：[kangarooking/cangjie-skill](https://github.com/kangarooking/cangjie-skill) · 许可证：MIT · 9.5k stars · [官网](https://cangjie-skill.com)

## 这是什么

不只是把书做成摘要——Cangjie Skill（仓颉 Skill）把书籍、长视频（B 站 / YouTube）、播客、访谈、课程、长文里的**可执行方法论**蒸馏成一套独立可调用、可组合、可压力测试的 Agent Skills。与 nuwa-skill（蒸馏人）、darwin-skill（技能进化）互补：nuwa 蒸馏人，cangjie 蒸馏书，darwin 让它们进化。

核心理念：知识不该停留在"看过/听过/收藏过"，应该变成 agent 在真实决策中可以调用的工具。高价值长视频时效性强、内容长、往往不在 AI 训练数据里——蒸馏成 skill 后，agent 在场景中即用即取。

**RIA-TV++ 七阶段流水线**：

| 阶段 | 做什么 |
|------|--------|
| 1. Adler 分析 | 结构 / 解释 / 批判 / 应用四步整书拆解 → `BOOK_OVERVIEW.md` |
| 2. 并行提取 | 5 个专项提取器（框架 / 原则 / 案例 / 反例 / 术语）同时跑 |
| 3. 三重验证 + 晋级门 | 证据检验通过才入围；使用价值足以覆盖路由成本才晋级为独立入口 |
| 4. RIA++ 能力卡 | R（阅读）/ I（解释）/ A1（联系自身）/ A2（行动）/ E（执行）/ B（边界）写入 `.cangjie/capabilities/` |
| 5. Zettelkasten 链接 | 依赖、对比、组合编码进能力图谱和共享术语表 |
| 6. 压力测试 | 每个技能设计诱饵问题和跨技能混淆测试；失败回炉重建 |
| 7. 确定性编译 | 同一 Bundle 编译为 `single`（单路由）或 `pack`（路由 + 晋级独立 skill），附 `DIGEST.md` |

**v2.5.0 亮点**：Capability Bundle 作为单一真源（先出能力卡再编译产物）；统一本地工具链 `scripts/cangjie.py`（诊断 / 编译 / 增量更新 / 修复 / 回滚 / 评测）；内容寻址预处理 + 事务性补丁 + 快照回滚。

**已蒸馏 20+ 示例**：《穷查理宝典》（12 skills）、巴菲特股东信（20 skills）、《影响力》（12 skills）、《1000 True Fans》（13 skills）、《毛选》（25 skills）、《黄帝内经》（22 skills）、Andrew Ng《AI for Everyone》视频课程（25 skills）等，覆盖商业、投资、心理学、写作、组织、中医、数学。

## 怎么安装

**OpenClaw / Claude Code（直接用）：**

对 Agent 说：

```text
请用 cangjie-skill 把这本书蒸馏成一组可执行的 Agent Skills：<文件路径>
```

Agent 会读取仓库根目录的 `SKILL.md`（完整执行规格）并按 RIA-TV++ 流水线执行。

**DeepSeek Harness 插件：**

```bash
mkdir -p ~/.dsh/packages
curl -fL "https://github.com/kangarooking/cangjie-skill/releases/download/v2.5.0/dsh-cangjie-skill-2.5.0.tgz" -o ~/.dsh/packages/dsh-cangjie-skill-2.5.0.tgz
curl -fL "https://github.com/kangarooking/cangjie-skill/releases/download/v2.5.0/dsh-cangjie-skill-2.5.0.tgz.sha256" -o ~/.dsh/packages/dsh-cangjie-skill-2.5.0.tgz.sha256
(cd ~/.dsh/packages && shasum -a 256 -c dsh-cangjie-skill-2.5.0.tgz.sha256)
dsh plugin --profile web add ~/.dsh/packages/dsh-cangjie-skill-2.5.0.tgz
dsh web
```

## 怎么用

1. 准备源材料：PDF / EPUB / 字幕 / 转写文本（视频可先用 [video-downloader](https://github.com/kangarooking/kangarooking-skills/tree/main/video-downloader) skill 提取字幕）
2. 对 Agent 说 `请用 cangjie-skill 蒸馏这份内容：<路径>`
3. Agent 按七阶段执行，产出多 skill 仓库（`INDEX.md` + `DIGEST.md` + `GLOSSARY.md` + 多个独立 `SKILL.md`）
4. 把产出的 skill 装进你的 agent skills 目录，即可在任意场景调用

不适合蒸馏的内容：方法论密度低的叙事性内容、纯娱乐视频——pipeline 的晋级门会筛选，但源太薄产出也会薄。

## 注意事项

- **许可证 MIT**：可自由使用、修改与分发。
- **蒸馏质量取决于源**：methodology 密度低的内容产出可能偏薄，建议先读 `SKILL.md` 的筛选标准。
- **三平台支持**：OpenClaw（原生）、Claude Code（SKILL.md 直接读）、DeepSeek Harness（v2.5.0 Release 插件包 + SHA256 校验）。
- **生态互补**：[nuwa-skill](https://github.com/alchaincyf/nuwa-skill)（蒸馏人）+ cangjie-skill（蒸馏书）+ [darwin-skill](https://github.com/alchaincyf/darwin-skill)（技能进化）三件套。
- **维护活跃**（2026-09-04 更新，9.5k stars），提供中文 / 英文 / 日文三语 README 与官方网站。
