---
record_type: entry-record
id: aimangastudio
name_zh: "AIMangaStudio 漫画创作"
name_en: "AIMangaStudio"
summary_zh: "利用 AI 制作漫画的工具，覆盖脚本创作、分镜设计与角色风格控制，集成剧情生成、分镜布局、角色设定与页间连续性分析，支持多页漫画导出为 PNG/PDF。"
summary_en: "An AI-powered comic creation tool covering script writing, storyboard design, and character/style control, with multi-page export to PNG/PDF."
category: design-creative
kind: framework
tags: [storyboard, image-generation, character-design, cn-localization]
languages: [typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/morsoli/aimangastudio
repo: https://github.com/morsoli/aimangastudio
tier: watch
aliases: [AIMangaStudio]
risk_notes: 早期项目，仅少量提交且长期未更新，无正式 release，功能以雏形为主；依赖 Google GenAI（@google/genai）服务，生成需相应 API 凭据与用量。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# AIMangaStudio

> 利用 AI 制作漫画的工具，支持脚本创作、分镜设计与角色风格控制。上游：[morsoli/aimangastudio](https://github.com/morsoli/aimangastudio) · 许可证：MIT

## 这是什么

AIMangaStudio 旨在为独立创作者与工作室提供一条端到端的漫画创作流水线，简化从脚本到漫画页面的制作流程。技术栈为 React + Vite + TypeScript，AI 能力通过 Google GenAI（`@google/genai`）接入。

主要功能：自然语言生成漫画脚本（剧情、对白、旁白）；角色与风格设定（支持多种绘画风格）；AI 分镜自动排版（对话框、镜头切换）；多页漫画导出（PNG、PDF）。

## 怎么安装

```bash
git clone https://github.com/morsoli/aimangastudio.git
cd aimangastudio
npm install
```

## 怎么用

```bash
# 本地开发
npm run dev

# 构建与预览
npm run build
npm run preview
```

## 注意事项

- **早期形态**：项目仅有少量提交、无正式 release，功能以雏形为主，需自行评估是否满足制作需求。
- **依赖外部 AI**：AI 生成经 Google GenAI 服务，需要相应 API 凭据，并注意数据与用量。
- 目标用户为独立创作者、漫画爱好者与内容工作室。