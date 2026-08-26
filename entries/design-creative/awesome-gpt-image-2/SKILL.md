---
id: awesome-gpt-image-2
name_zh: GPT-Image2 工业级提示词引擎与模板库
name_en: GPT-Image2 Prompt System (Prompt as Code)
summary_zh: "面向 GPT-Image2 的工业级提示词引擎与模板库：530+ 逆向工程案例、20+ 套结构化模板，把散文提示词压缩为可复用的 Prompt-as-Code 协议，便于 Agent 批量生图。"
summary_en: "Industrial prompt engine & template library for GPT-Image2: 530+ reverse-engineered cases and 20+ structured templates turning prose prompts into reusable Prompt-as-Code."
category: design-creative
kind: skill-collection
tags: [image-generation, prompt-engineering, awesome-list, claude-code]
languages: [markdown]
doc_languages: [en, zh]
license: MIT
homepage: https://gpt-image2.canghe.ai
repo: https://github.com/freestylefly/awesome-gpt-image-2
tier: standard
metrics:
  stars: 19916
  pushed_at: "2026-08-26T08:54:32Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [gpt-image2, prompt-as-code, gpt-image-2]
risk_notes: MIT 可商用；本质是 Markdown 提示词/模板库（clone 即"安装"，无需构建）；自带的 GPT-Image2 Style Library Agent Skill 可直接装入 Claude Code / Cursor。案例与模板持续更新，生产生图依赖外部 GPT-Image-2 API（按量计费）。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# GPT-Image2 工业级提示词引擎与模板库

> 面向 GPT-Image2 的工业级提示词引擎与模板库。上游：[freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) · 许可证：MIT

## 这是什么

一份把社区散落的 GPT-Image2 生图案例，压缩成**结构化、可复用提示词**的资源库。核心理念是 **Prompt as Code**：把主体、光照、材质、构图、视觉细节拆成可组合原子，再用 20+ 套工业级模板串成可批量、可控、可复用的生图协议。

仓库包含 530+ 个逆向工程案例、工业提示词模板与避坑指南，并自带一个可直接装入 Claude Code / Cursor 的 **GPT-Image2 Style Library Agent Skill**。它本质是 Markdown 资源库——你 clone 下来阅读、复制提示词即可，无需构建。

## 怎么安装

无需构建，克隆即可阅读与使用提示词；如需使用自带的 Agent Skill，把它链接进你的 Agent skills 目录：

```bash
# 1) 克隆仓库（含全部案例、模板与 Agent Skill）
git clone --depth 1 https://github.com/freestylefly/awesome-gpt-image-2.git /tmp/gpt-image2

# 2) 直接使用：复制 docs/ 下的模板与案例提示词到你的生图工作流
#    浏览式体验见在线站 https://gpt-image2.canghe.ai

# 3) （可选）装入自带的 Agent Skill 到 Claude Code
mkdir -p "$HOME/.claude/skills"
ln -s /tmp/gpt-image2/agents/skills/gpt-image-2-style-library "$HOME/.claude/skills/gpt-image-2-style-library"
```

## 怎么用

在对话中让 AI 编码 / Agent 读取对应模板，按"主体 + 光照 + 材质 + 构图 + 细节"的原子结构组织提示词，即可稳定、可控地批量生成风格一致的图片；需要模板系统、批量生图或生产工作流时，这种结构化协议比一堆孤立示例更有价值。

## 注意事项

- **许可证 MIT**：可商用；案例与模板持续更新中。
- 本仓库是**只读参考资源**（提示词/模板库），不转载上游源码；生产生图依赖外部 GPT-Image-2 API（按量计费，非免费）。
- 自带 Agent Skill 支持 Claude Code / Cursor；其他 Agent 可参考其 `SKILL.md` 结构自行接入。
- 在线站 gpt-image2.canghe.ai 提供画廊浏览与登录后试生成，是快速找方向的入口。
