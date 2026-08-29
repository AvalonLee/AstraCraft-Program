---
record_type: entry-record
id: huashu-skills
name_zh: "花叔开源 Skills 总目录"
name_en: "huashu-skills — Huashu's Open-Source Agent Skills Master Index"
summary_zh: "花叔全部开源 Agent Skills 的总目录：16 个旗舰 + 14 个人物视角 + 22 个内置共 52 个标准 SKILL.md 技能，覆盖公众号/短视频/小红书从选题、写作、审校、配图到分发的创作流水线，附 AI Agent 安装协议与机器可读 skills.json。"
summary_en: "Master index of Huashu's 52 Agent Skills in three tiers: 16 flagship repos, 14 persona skills, and 22 built-in content-creation skills for topic generation, writing, proofreading and publishing."
category: writing-docs
kind: skill-collection
tags: [writing, social-media, short-video, image-generation, agent-skills, claude-code, skill-collection, cn-localization]
languages: [python, markdown]
doc_languages: [zh, en]
license: UNKNOWN
homepage: https://github.com/alchaincyf/huashu-skills
repo: https://github.com/alchaincyf/huashu-skills
tier: standard
metrics:
  stars: 1425
  pushed_at: "2026-08-25"
  checked_at: "2026-08-29"
  archived: false
related: [shuohao-skills]
aliases: [花叔技能, 花叔 Skills 总目录, huashu]
risk_notes: 仓库未提供 LICENSE 文件，协议不明，商用前需与作者确认；内置 22 个 skill 需克隆后复制子目录安装；huashu-design 有独立仓库完整版与内置轻量版同名冲突，两者不能装进同一目录；部分 skill 依赖豆包/Codex 环境内置 image_gen 或外部 AI 服务，费用与可用性随平台变化。
added_at: "2026-08-29"
updated_at: "2026-08-29"
---

# 花叔开源 Skills 总目录

> 花叔（alchaincyf）全部开源 Agent Skills 的总目录，52 个标准 `SKILL.md` 技能分三层收录。上游：[alchaincyf/huashu-skills](https://github.com/alchaincyf/huashu-skills) · 许可证：未标注（UNKNOWN）

## 这是什么

花叔（AI Native Coder · 独立开发者，代表作「小猫补光灯」）在 GitHub 上全部开源 Skill 的总目录，全部采用标准 Agent Skills 格式，Claude Code / Codex / Kimi Code 等支持该格式的 Agent 通用。三层结构：

- **旗舰 Skills（16 个，独立仓库）**：各深耕一个领域的完整系统，如 `huashu-design`（HTML 原生设计系统：原型/幻灯片/动画）、`huashu-gpt-image`（AI 生图 prompt 方法论）、`huashu-excel`（数据分析全流程）、`huashu-md-html`（万物转 Markdown、Markdown 出出版级 HTML/DOCX）、`nuwa-skill`（把人的思维方式蒸馏成 skill）、`darwin-skill`（让 skill 迭代进化）等。
- **人物视角 Skills（14 个，独立仓库）**：由女娲 skill 蒸馏生成的可运行思维框架（心智模型 + 决策启发式 + 表达 DNA），如乔布斯、芒格、费曼、Karpathy、Paul Graham 等视角。
- **内置 Skills（22 个，本仓库子目录）**：轻量内容创作技能，覆盖公众号/视频/小红书工作流——选题（`huashu-topic-gen`）、调研（`huashu-research`）、三遍审校降 AI 味（`huashu-proofreading`）、文章编辑、长文转社交媒体、抖音脚本、视频大纲、封面检查、公众号/小红书配图、Markdown 转 PDF、演讲教练、多 Agent 蜂群模式，以及跨仓库更新检查器 `huashu-skill-updater`。

仓库根目录提供机器可读的 `skills.json` 与一份「给 AI Agent 的协议」，Agent 可据此精确定位、安装并留痕。

## 怎么安装

方式一：最省事——把这句话发给你的 AI Agent：

```
读 https://github.com/alchaincyf/huashu-skills 的 README 和 skills.json，帮我按需求推荐并安装对应 skill
```

方式二：安装独立仓库的旗舰/人物 skill（一条命令）：

```bash
git clone https://github.com/alchaincyf/huashu-design.git ~/.claude/skills/huashu-design
```

方式三：安装本仓库内置的轻量 skill（克隆后复制子目录）：

```bash
mkdir -p ~/.claude/skills
git clone --depth 1 https://github.com/alchaincyf/huashu-skills.git /tmp/huashu-skills
cp -r /tmp/huashu-skills/huashu-slides ~/.claude/skills/
```

装完重启 Agent 会话即生效；只给某个项目用的话，把 `~/.claude/skills/` 换成项目内的 `.claude/skills/`。Codex、Kimi Code 等其他 Agent 把 skill 文件夹放进各自的 skills 目录即可。

## 怎么用

1. 需求明确时直接装对应 skill；需求模糊时先查 README 的「按需求找 Skill」路由表，或读 `skills.json` 按关键词定位。
2. 内置 skill 复制安装后按各自 `SKILL.md` 的说明使用，例如 `huashu-topic-gen` 给出 3-4 个选题方案（标题、大纲、优劣分析、工作量评估），`huashu-proofreading` 按「内容 → 6 大类 AI 腔改写 → 节奏打磨」三遍审校。
3. 装上 `huashu-skill-updater` 后可一键扫描全部已装花叔系 skill 是否落后于远程仓库：每个 skill 目录留有 `.huashu-skill-meta.json` 安装留痕，30 天内检查过则静默跳过。
4. 注意上游协议中的两个坑：`huashu-design` 有独立仓库完整版与内置轻量版同名冲突，都要装时需把内置版目录改名；人物 skill 只装独立仓库那份，不要从 `nuwa-skill/examples/` 重复安装。

## 注意事项

- **协议不明**：仓库未附 LICENSE 文件，frontmatter 标注 `UNKNOWN`；个人使用一般无碍，商用或再分发前建议向作者确认授权。
- **同名冲突**：`huashu-design` 独立仓库（完整设计系统）与本仓库内置版（轻量设计哲学顾问）目录名相同，不能同时装在 `~/.claude/skills/huashu-design/`。
- **平台依赖**：部分 skill（如 `huashu-icon-set`、`huashu-slide-doubao`）依赖豆包/Codex 环境内置的 image_gen，部分需调用外部 AI 服务，可能产生费用。
- **非 Skill 仓库**：上游生态里 `huashu-doubao-search` 是 MCP server、`fanbox` 是桌面 App、橙皮书系列是电子书，按上游说明区分，不要装进 skills 目录。
- **同域条目**：`writing-docs/shuohao-skills`（eternityspring）同样面向 AI 短剧/内容创作管线，两者定位互补：花叔目录胜在覆盖面广（设计、数据、文档、人物视角），shuohao 胜在短剧管线的深度质量门。
