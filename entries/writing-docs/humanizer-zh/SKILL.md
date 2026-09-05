---
record_type: entry-record
id: humanizer-zh
name_zh: "Humanizer-zh AI 写作去痕"
name_en: "Humanizer-zh"
summary_zh: "Humanizer 的中文汉化版 Claude Code Skill：识别并修复 24 种 AI 写作痕迹（内容 / 语言语法 / 风格 / 交流填充词四大类），把 AI 生成文本改写得更自然、更像人写的；附 AI 高频词汇警示列表和改写前后对比示例。"
summary_en: "Chinese localization of Humanizer, a Claude Code skill that identifies and fixes 24 AI writing patterns across content, grammar, style, and filler-word categories to make AI text read more naturally."
category: writing-docs
kind: skill
tags: [writing, de-slop, cn-localization, claude-code, skill]
languages: [markdown]
doc_languages: [zh]
license: MIT
homepage: https://github.com/op7418/Humanizer-zh
repo: https://github.com/op7418/Humanizer-zh
tier: standard
metrics:
  stars: 16695
  pushed_at: "2026-01-19T07:46:35Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [humanizer, AI 去痕, writing-dehumanizer]
risk_notes: "基于 blader/humanizer 英文原版的中文汉化 + 中文语境适配；24 种模式主要来自维基百科 Signs of AI writing 指南，中文特有 AI 痕迹（如「格局」「织锦」等抽象名词）已补充但覆盖面仍在扩展；不是为欺骗 AI 检测器设计。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Humanizer-zh AI 写作去痕

> 把 AI 味文本改写成"人味"文本。上游：[op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) · 许可证：MIT · 16.7k stars · 基于 [blader/humanizer](https://github.com/blader/humanizer) 汉化

## 这是什么

Humanizer-zh 是 [blader/humanizer](https://github.com/blader/humanizer) 的中文汉化版，帮 AI Agent 识别并修复中文文本中的 AI 生成痕迹。原项目基于维基百科 [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) 指南；本版本翻译核心规则 + 补充中文语境特有模式（如「格局」「织锦」等抽象名词、「此外」「至关重要」等 AI 高频词）。

**24 种 AI 写作模式（四大类）**：

| 类别 | 模式 |
|------|------|
| **内容模式（6）** | 过度强调意义 / 遗产 / 趋势；过度强调知名度；-ing 式肤浅分析；宣传广告语；模糊归因；"挑战与未来展望"提纲 |
| **语言语法（6）** | AI 高频词汇；系动词回避；否定式排比；三段式法则；同义词循环；虚假范围 |
| **风格（6）** | 破折号 / 粗体过度；内联标题垂直列表；标题大写；表情符号；弯引号 |
| **交流填充（6）** | 协作交流痕迹；知识截止免责；谄媚语气；填充短语；过度限定；通用积极结论 |

**改写原则**：不仅要"干净"，更要"鲜活"——有观点、变化节奏、承认复杂性、适当用"我"、允许一些混乱、对感受具体。

## 怎么安装

```bash
npx skills add https://github.com/op7418/Humanizer-zh.git
```

或手动克隆到 `~/.claude/skills/humanizer-zh/`。

## 怎么用

安装后在 Claude Code 中：

```text
/humanizer-zh 请帮我人性化以下文本：

这个项目作为我们团队致力于创新的证明。此外，它展示了我们在不断演变的技术格局中的关键作用。
```

Agent 会对照 24 种模式扫描 → 重写问题片段 → 保留核心含义 → 匹配语调 → 注入真实个性。

**改写示例**：

> 改写前：本研究深入探讨了机器学习在医疗诊断中的关键作用，突出了其在不断演变的医疗格局中的重要性。
>
> 改写后：本研究分析了机器学习在医疗诊断中的应用，重点是肺癌早期筛查。研究使用了 2019-2023 年间 5000 例病历数据。

## 注意事项

- **许可证 MIT**。
- **中文语境适配**：英文模式在中文中表现不同（如标题大小写在中文不存在），已按中文习惯调整；中文 AI 高频词（「此外」「至关重要」「深入探讨」「格局」「织锦」「充满活力的」等）在 SKILL.md 中有警示列表。
- **不是检测器对抗**：工具目标是提升写作质量，不是为了"欺骗"AI 检测器。
