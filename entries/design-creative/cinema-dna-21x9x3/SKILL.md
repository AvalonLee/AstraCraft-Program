---
id: cinema-dna-21x9x3
name_zh: "Cinema DNA 21:9×3 电影画面生成 Skill"
name_en: "Cinema DNA 21:9x3"
summary_zh: "面向 Codex 的电影感画面生成 Skill：把题材或一句剧情转译为真实电影镜头的 21:9 三联叙事画面，支持片名与主题海报。"
summary_en: "A Codex skill that turns a subject or one-line plot into cinematic 21:9 triptych frames with real film-language logic; optional title and theme poster."
category: design-creative
kind: skill
tags: [cinematic, image-generation, film-language, triptych, codex, storyboard]
languages: [markdown]
doc_languages: [zh]
license: UNKNOWN
homepage: https://github.com/dacnay816y62-hub/cinema-dna-21x9x3
repo: https://github.com/dacnay816y62-hub/cinema-dna-21x9x3
tier: standard
featured: true
metrics:
  stars: 1113
  pushed_at: "2026-07-25T13:28:39Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [电影感三联图, 电影画面生成]
risk_notes: 上游仓库未包含 LICENSE 文件（GitHub 识别为 null），许可证 UNKNOWN，商用/再分发前请确认授权范围；示例图库为原创视觉示例，复制现成 IP 需注意。
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Cinema DNA 21:9×3 电影画面生成 Skill

> 面向 Codex 的电影感画面生成 Skill。上游：[dacnay816y62-hub/cinema-dna-21x9x3](https://github.com/dacnay816y62-hub/cinema-dna-21x9x3) · 许可证：UNKNOWN（仓库未声明）

## 这是什么

它是一款面向 **Codex** 的电影画面生成 Skill，核心理念是「先判断，再生成」——把人物、空间、题材或一句简单剧情，转译成更像真实电影镜头的 **21:9 三联叙事画面**（三张独立 21:9 镜头纵向拼接），并可按需继续生成片名、带文字主题海报与完整视觉体系封面。

与「给图片套电影滤镜」不同，它走一套可执行的镜头判断链路：关系压力 → 视线流量 → 受控随机构图 → 色彩命题 → 真实摄影方案 → 三联剪辑节奏 → 反 CG/反 AI/反模板化检查。仓库含 `SKILL.md`、`references/`（电影语法补丁）、`agents/`（Codex UI 元数据）、`examples/`（示例图库）。

## 怎么安装

```bash
# 克隆上游仓库到本地
git clone https://github.com/dacnay816y62-hub/cinema-dna-21x9x3.git
cd cinema-dna-21x9x3

# 复制到 Codex skills 目录（PowerShell 示例；CODEX_HOME 可自定义）
Copy-Item -Recurse . "$env:USERPROFILE\.codex\skills\cinema-dna-21x9x3"
```

## 怎么用

在 Codex 对话中直接描述题材或剧情即可，例如：

> 用 cinema-dna 生成一组：科幻足球，球场在水下穹顶里。

- 默认输出 3 张独立 21:9 镜头，纵向拼接成三联图；
- 仅当你明确要求「片名 / 命名 / 海报 / 封面 / 视觉体系」时才追加主题海报阶段（主海报固定 3:4 竖版，并给出 16:9 / 1:1 / 9:16 扩展规则）；
- 第三张刻意避免「空场物件残留」套路，改为人物、群体、身体压力或公共现场继续运行。

## 注意事项

- **许可证未声明（UNKNOWN）**：上游仓库未包含 LICENSE 文件（GitHub 识别为 null）。本仓库仅作链接与流程参考，商用或再分发前请确认授权范围。
- **IP 与风格安全**：可做动画感 / 童话 / 科幻等方向，但不要复刻现成 IP；参考图仅用于抽象方法分析，不复制具体构图、片名或人物姿态。
- **依赖图像生成能力**：Skill 提供流程与提示词规则，实际出图依赖 Agent 所接的图像模型。
- 维护活跃（2026-07 更新），暂无已知重大缺陷。
