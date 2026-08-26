---
id: character-casting-studio-skill
name_zh: 人物角色 Casting 工作室 Skill
name_en: Character Casting Studio Skill
summary_zh: 面向 Codex 的素材参考驱动写实人物 casting Skill：为广告、影视、电影与时尚视觉生成原创、真实、可继续开发的人物形象，附蜡像感与网红脸硬规则。
summary_en: "Material-reference-driven photorealistic character casting skill for Codex; generate original, true-to-life people for ads, film, fashion, and casting visuals."
category: design-creative
kind: skill
tags: [character-design, image-generation, photorealistic, casting, codex, fashion-visual]
languages: [markdown]
doc_languages: [zh]
license: UNKNOWN
homepage: https://github.com/dacnay816y62-hub/character-casting-studio-skill
repo: https://github.com/dacnay816y62-hub/character-casting-studio-skill
tier: standard
metrics:
  stars: 67
  pushed_at: "2026-08-19T05:20:41Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [角色 casting, 人物角色生成]
risk_notes: 上游仓库未包含 LICENSE 文件（GitHub 识别为 null），许可证 UNKNOWN，商用/再分发前请确认授权范围；示例图库（examples/）为原创视觉示例，使用人脸/肖像参考素材须确保已获授权。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# 人物角色 Casting 工作室 Skill

> 面向 Codex 的素材参考驱动写实人物角色生成 Skill。上游：[dacnay816y62-hub/character-casting-studio-skill](https://github.com/dacnay816y62-hub/character-casting-studio-skill) · 许可证：UNKNOWN（仓库未声明）

## 这是什么

它是一款面向 **Codex** 的「人物角色 casting」Skill（提示词流程 + 硬规则集合），目标是生成**原创、真实、有身份记忆点、可继续开发**的人物形象，用于广告代言人、影视/电影角色前期设计、时尚视觉与演员 casting 参考。与随机出图不同，它强调从骨相、气质、身份、服装到摄影质感的设计链路，并内置「禁止蜡像感/网红脸」「批量人物必须明显差异化」「原型人物需原创转译」等硬规则。仓库内含示例图库（examples/，均为原创视觉示例，不代表真实人物）。

## 怎么安装

```bash
# 克隆上游仓库到本地
git clone https://github.com/dacnay816y62-hub/character-casting-studio-skill.git
cd character-casting-studio-skill

# 在支持 skills 的 Agent（如 Codex）中，将本目录作为 skill 加载，
# 即可读取其角色设计流程与硬规则。需要参考素材时请在本地运行环境提供，
# 不要把私人照片或未授权素材提交进仓库。
```

## 怎么用

直接在对话中描述人物需求即可，例如：

> 生成 1 个 28 岁中国女性角色。气质：清冷、克制、有距离感。脸部：窄方脸、眼距略宽、鼻梁自然、嘴角轻微不对称。发型：短黑发，侧分。服装：黑色建筑感西装，银色耳饰。用途：影视电影角色设计，头肩肖像。要求：真实摄影，不要油脸，不要蜡像感。

- 普通需求默认出**单人物图**，不自动做三视图；
- 要求「头肩肖像／演员 casting 照片」时走 85–105mm 人像镜头、双肩可见、眼睛精准对焦；
- 仅当明确要求「三视图／白底角色图／character turnaround」时才切多视图流程，且以已确认人物为基准、只换观察角度。

## 注意事项

- **许可证未声明（UNKNOWN）**：上游仓库未包含 LICENSE 文件（GitHub 识别为 null）。本仓库仅作链接与流程参考，商用或再分发前请确认授权范围。
- **肖像权与素材合规**：生成涉及真实风格人物形象，使用人脸/肖像参考素材须确保已获授权；示例图均为原创视觉示例，不代表真实人物。
- **依赖图像生成能力**：Skill 本身提供流程与提示词规则，实际出图依赖 Agent 所接的图像模型。
- 体量轻量、维护活跃（2026-08 创建，未归档），暂无已知重大缺陷。
