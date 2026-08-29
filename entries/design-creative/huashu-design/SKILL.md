---
record_type: entry-record
id: huashu-design
name_zh: "花叔设计 HTML 原生设计系统"
name_en: "Huashu Design — HTML-Native Design Skill"
summary_zh: "在 Agent 里一句话拿回可交付设计的 HTML 原生设计技能：高保真原型、演讲幻灯片（导出可编辑 PPTX）、时间轴动画（导出 MP4/GIF）、印刷级信息图，内置三套逻辑设计顾问、60 种风格库、品牌资产协议与 5 维专家评审。"
summary_en: "HTML-native design skill for agents: hi-fi prototypes, editable-PPTX slide decks, MP4/GIF timeline animations, print-grade infographics, 60-style library and 5-dimension expert review."
category: design-creative
kind: skill
tags: [design-system, ui-generation, motion-design, video-production, pptx, pdf, de-slop, agent-skills]
languages: [html, javascript]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/alchaincyf/huashu-design
repo: https://github.com/alchaincyf/huashu-design
tier: core
featured: true
metrics:
  stars: 23662
  pushed_at: "2026-08-25"
  checked_at: "2026-08-29"
  archived: false
related: [huashu-skills]
aliases: [Huashu Design, 花叔设计]
risk_notes: MIT 可商用（2026-05-14 起，此前商用授权条款已作废）；视频/PDF/PPTX 导出依赖本地 Node + Playwright/ffmpeg 工具链；云能力（豆包 TTS 配音、AI 看片评审）隔离在 scripts/cloud/，需自备 key 并 --yes 显式确认；不支持图层级可编辑 PPTX 回灌 Figma、3D/物理/粒子级复杂动画；空白品牌从零设计质量有限，建议提供品牌资产。
added_at: "2026-08-29"
updated_at: "2026-08-29"
---

# 花叔设计 HTML 原生设计系统

> 在 Agent 里打一句话，拿回一份能交付的设计。上游：[alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) · 许可证：MIT

## 这是什么

花叔（alchaincyf）的旗舰设计技能，把「高保真设计」蒸馏成一份 Agent 可执行的 SKILL.md：不用打开 Figma 或 AE，在 Claude Code、Codex、Cursor 等任意支持 skills 的 Agent 里直接说话，3-30 分钟拿到能交付的成品。核心能力：

- **交互原型**：单文件 HTML，真 iPhone 15 Pro 机身（灵动岛/状态栏/Home Indicator），状态驱动多屏切换，Playwright 自动点击测试。
- **演讲幻灯片**：HTML deck 浏览器演讲 + `html2pptx.js` 导出**真文本框可编辑**的 PPTX。
- **时间轴动画**：Stage + Sprite 时间片段模型（`useTime`/`useSprite`/`interpolate`/`Easing` 四 API），导出 MP4（25/60fps 插帧）、GIF、带 BGM 成片。
- **信息图/可视化**：杂志级排版、CSS Grid 分栏、可导 PDF 矢量/PNG 300dpi/SVG。
- **设计方向顾问**：需求模糊时三套逻辑并行各出一版真实视觉（秒数轮盘打破惯性 + 获奖站现实参照 + 顶级工作室哲学），底层是 60 种纯 CSS 原生风格库（网页/PPT/信息图各 20）。
- **品牌资产协议**：涉及具体品牌时强制 5 步（问 → 搜官方品牌页 → 下载资产 → grep 色值 → 固化 `brand-spec.md`），绝不凭记忆猜品牌色；A/B 测试显示稳定性方差比无协议版低 5 倍。
- **5 维专家评审 + 反 AI slop**：哲学一致性/视觉层级/细节执行/功能性/创新性雷达图评分，输出 Keep/Fix/Quick Wins 清单；规则化规避紫渐变、emoji 图标等 AI 视觉最大公约数。

核心设计→渲染→导出链路 100% 本地运行、零网络零 key，无 telemetry；云能力全部隔离在 `scripts/cloud/` 完全可选。

## 怎么安装

```bash
npx skills add alchaincyf/huashu-design
```

跨 Agent 通用（Claude Code、Cursor、Codex、OpenClaw、Hermes 等）。装完先自检：`references/`、`assets/`、`scripts/`、`demos/` 四个子目录必须齐全（99 处被引用的配方、脚本与素材），若只有 SKILL.md 说明 skills CLI 版本过旧（≤1.5.15 有单文件同步 bug，1.5.19 已修复），先 `npm i -g skills@latest` 再重装。

CLI 异常时用 git clone 兜底：

```bash
git clone https://github.com/alchaincyf/huashu-design.git ~/.claude/skills/huashu-design
```

## 怎么用

装完重启 Agent 会话，直接说话即可：

```
「做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选」
「做个 AI 番茄钟 iOS 原型，4 个核心屏幕要真能点击」
「把这段逻辑做成 60 秒动画，导出 MP4 和 GIF」
「帮我对这个设计做一个 5 维度评审」
```

建议用法：涉及具体品牌时主动提供 logo、色板或 UI 截图（skill 会按品牌资产协议抓取并固化色值）；需求模糊时让它跑设计方向顾问，三版真实视觉摆出来看着选，不要盲选风格；上游还提供花叔亲录的[新手教程](https://www.youtube.com/watch?v=m-_BlUdcIvw)。

## 注意事项

- **能力边界**：产出 HTML，可截图/录屏/导出，但不支持图层级可编辑 PPTX 回灌 Figma/Keynote；Framer Motion 级的 3D、物理模拟、粒子动画超出边界；完全空白品牌从零设计质量会降到 60-65 分（上游自评「80 分的 skill」）。
- **本地依赖**：视频/PDF/PPTX 导出依赖本地 Node 工具链（Playwright、ffmpeg 等），缺依赖时对应导出能力不可用。
- **云能力可选**：豆包 TTS 配音、AI 看片评审需自备 API key，首次调用需 `--yes` 显式确认；核心链路完全本地，出站域名穷举声明见上游 SECURITY.md。
- **协议**：MIT，个人与商用均免费（2026-05-14 起取代旧的商用授权条款）。
- **同名辨析**：`huashu-skills` 总目录里的内置轻量版 `huashu-design` 只是设计哲学顾问，与本仓库完整设计系统同名不同物，两者目录名冲突不能同时装在 `~/.claude/skills/huashu-design/`。
