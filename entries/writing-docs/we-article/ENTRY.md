---
record_type: entry-record
id: we-article
name_zh: "We-Article 公众号文章生成工作台"
name_en: "We-Article"
summary_zh: "微信公众号文章生成工作台：材料解读 → 选题与方向 → 写作大纲 → 文章正文四阶段 Agent 工作流（当前接入 DeepSeek），带风格学习引擎沉淀个人文风，成稿一键排版推送公众号草稿箱，并支持文章数据统计反哺风格；Node 自托管 Web 工作台，需自备 API Key。"
summary_en: "Four-stage agent workbench for WeChat article writing (material, topic, outline, draft) with style learning and one-click draft-box publishing; self-hosted Node.js app using DeepSeek."
category: writing-docs
mode: deploy
tags: [writing, social-media, ai-agent, multi-agent, wechat]
languages: [typescript]
doc_languages: [zh]
license: UNKNOWN
homepage: https://github.com/hongqun/we-article
repo: https://github.com/hongqun/we-article
tier: watch
metrics:
  stars: 16
  pushed_at: "2026-10-15T01:47:09Z"
  checked_at: "2026-10-29"
  archived: false
aliases: ["We-Article 公众号写作"]
risk_notes: "仓库未附 LICENSE，默认保留所有权利——自用参考风险低，二次分发或商用前需与作者确认授权（评级观察期即源于此）；AI 能力需自备 DeepSeek API Key，推送草稿箱与文章统计需公众号 API 权限；部署须设置 APP_PASSWORD 与随机 SESSION_SECRET，勿直接暴露公网。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# We-Article 公众号文章生成工作台

> 四阶段 Agent 工作流把材料写成公众号文章：风格学习 + 一键排版推草稿箱。上游：[hongqun/we-article](https://github.com/hongqun/we-article) · 许可证：未声明（UNKNOWN）

## 这是什么

微信公众号文章生成工作台（TypeScript / Node.js，★16）：把写作拆成**材料解读 → 选题与方向 → 写作大纲 → 文章正文**四个阶段，每阶段由一个 Agent 负责（当前接入 DeepSeek），选题阶段一次给 5 个标题与写作方向备选。特色是**风格学习引擎**：生成过程中的手工介入会被记录并总结为个人风格偏好，持续回馈给 Agent，逐步减少介入次数、稳定成稿质量；还可拉取公众号后台阅读数据做**文章统计**，与风格学习联动。成稿一键排版并推送公众号草稿箱；专题用 JSON / Markdown 文件配置。作者的定位是「与 AI 协作」而非无脑生成——使用者带着账号定位与判断介入，工具负责加速与沉淀风格。

## 怎么部署运行

前置 Node.js ≥ 22.12（建议 24）：

```bash
git clone https://github.com/hongqun/we-article.git
cd we-article
npm install
cp .env.example .env
# .env 中填写 DEEPSEEK_API_KEY；首次部署另设置 APP_PASSWORD 与随机生成的 SESSION_SECRET
npm run dev
# 浏览器打开 http://127.0.0.1:3200
```

## 怎么用

登录后建专题（JSON / Markdown 配置文件），把话题内容或网址贴进「材料解读」阶段，按四阶段逐级推进；每个阶段都可手工修改，系统持续学习风格偏好；成稿后一键排版推送到公众号草稿箱，发布后用「文章统计」看阅读数据，反哺风格学习。

## 注意事项

- **无 LICENSE**：仓库未附许可证，默认保留所有权利；自用参考风险低，二次分发或商用前先与作者确认授权——评级「观察」即源于此，待上游补协议后再升级。
- **自备 Key 与权限**：当前仅接入 DeepSeek，费用自理；推送草稿箱与文章统计需要公众号 API 权限（AppSecret 等）。
- **部署安全**：务必设置 APP_PASSWORD 与随机 SESSION_SECRET，勿将服务端口直接暴露公网。
- **维护面**：单维护者、★16，2026-10 仍在推送；功能围绕公众号生态，平台规则变化可能影响推送与统计能力。
