---
record_type: entry-record
id: fantasy-life-force-portrait-photography
name_zh: "Fantasy 生命感人像摄影 Skill"
name_en: "Fantasy Life-Force Portrait Photography"
summary_zh: "面向 Codex 的生命感人像摄影 Skill：把普通照片/废片升级为鲜活高级人像，或从零生成原创生命感样片与摄影提示词，强调人物—事件—镜头—光色—质感的层级判断。"
summary_en: "A Codex portrait photography skill that upgrades casual snapshots into vivid life-force portraits, or generates original samples and prompts from scratch."
category: design-creative
kind: skill
tags: [portrait, image-generation, photography, life-force, codex, social-media]
languages: [markdown]
doc_languages: [zh]
license: UNKNOWN
homepage: https://github.com/dacnay816y62-hub/fantasy-life-force-portrait-photography
repo: https://github.com/dacnay816y62-hub/fantasy-life-force-portrait-photography
tier: standard
metrics:
  stars: 287
  pushed_at: "2026-07-19T09:05:19Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [生命感人像, 人像摄影]
risk_notes: 上游仓库未包含 LICENSE 文件（GitHub 识别为 null），许可证 UNKNOWN，商用/再分发前请确认授权范围；含示例图（assets/），涉及人像美化需注意肖像权与油腻审美边界。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Fantasy 生命感人像摄影 Skill

> 面向 Codex 的生命感人像摄影 Skill。上游：[dacnay816y62-hub/fantasy-life-force-portrait-photography](https://github.com/dacnay816y62-hub/fantasy-life-force-portrait-photography) · 许可证：UNKNOWN（仓库未声明）

## 这是什么

它是一款面向 **Codex** 的人像摄影 Skill，把普通游客照、生活随拍、手机废片或参考人像，转化为色彩鲜明、镜头亲密、真实鲜活、适合社交媒体发布的高级「生命感」人像；也可从零生成原创生命感人像样片、摄影提示词、风格方案与图像编辑指令。

核心是四层判断：**人物层 → 事件层 → 镜头层 → 质感层**（「生命感不是一种风格，而是一种正在发生的状态」）。提供两种模式：MODE A 普通照片升级（保留原人物身份与场景关系，重做光线/景深/氛围）、MODE B 最高标准原创样片（从零设计人物、事件、镜头、光线、色彩）。

## 怎么安装

```bash
# 克隆上游仓库到本地
git clone https://github.com/dacnay816y62-hub/fantasy-life-force-portrait-photography.git
cd fantasy-life-force-portrait-photography

# 将仓库目录放入你的 Codex skills 目录后，即可在对话中触发，例如：
# 使用 Fantasy 生命感人像摄影 Skill，把这张普通生活照升级成更有生命感的人像。
```

## 怎么用

- **MODE A 普通照片升级**：给一张普通照片，要求「保留人物身份和原场景，把这张普通照片改成有光影、景深和电影感的氛围感大片」。
- **MODE B 原创样片**：给一个主题/人物设定，要求「生成一组夏日、儿童、逆光、近距离镜头的原创生命感人像提示词」。

## 注意事项

- **许可证未声明（UNKNOWN）**：上游仓库未包含 LICENSE 文件（GitHub 识别为 null）。本仓库仅作链接与流程参考，商用或再分发前请确认授权范围。
- **边界与合规**：不换脸、不明星化、不复制真实人物长相；避免油亮皮肤、脏脸、廉价网红/影楼感；面部需清透自然。使用人像素材须确保授权。
- **依赖图像生成能力**：Skill 提供流程与提示词规则，实际出图依赖 Agent 所接的图像模型。
- 维护活跃（2026-07 更新），暂无已知重大缺陷。
