---
record_type: entry-record
id: novel-to-game
name_zh: "NovelToGame 小说改编游戏技能集"
name_en: "NovelToGame"
summary_zh: "把小说改编成可玩游戏的 AI 技能合集（5 个 skill）：整本阅读并做带章节引用的设定考据，比较并淘汰游戏方向，产出概念、世界、美术与玩法设计文档，按本机工具链适配构建，最后以首次玩家盲测 + 一次完整验收记录收尾；适配 Claude Code / Codex / Kimi Code。"
summary_en: "Five skills that adapt a whole novel into a playable game: cited source bible, concept vetoes, design and art direction, environment-aware builds, blind first-player QA and one verified run."
category: design-creative
mode: install
tags: [skill-pack, ai-agent, claude-code, game-design, interactive-fiction]
languages: [markdown]
doc_languages: [zh, en]
license: MIT
homepage: https://zenstory.ai/zh/novel-to-game
repo: https://github.com/zenstory-ai/novel-to-game
tier: standard
metrics:
  stars: 1094
  pushed_at: "2026-11-15T05:09:55Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [novel-to-game, NovelToGame]
risk_notes: "只提供技能与流程，运行依赖你自己的编码 Agent（Claude Code / Codex / Kimi Code）与模型额度，没有托管服务；npx skills add -g 会全局写入各 Agent 的技能目录（去掉 -g 才是项目内），执行前清楚装了什么；改编对象必须是自有或已获授权的小说，示例《金瓶梅》路线含 18+ 内容，示例游戏与生成素材的版权、形象与配音授权由使用者负责；整书分析、构建与盲测 QA 会消耗大量 token 与时间，QA 只覆盖实际测过的环境，未测环境列为限制；语音为可选项，启用后会把相关文本交给所选 TTS 服务并可能产生费用。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# NovelToGame 小说改编游戏技能集

> 把一整本小说变成可玩的游戏。上游：[zenstory-ai/novel-to-game](https://github.com/zenstory-ai/novel-to-game) · 许可证：MIT · 项目页：[zenstory.ai/novel-to-game](https://zenstory.ai/zh/novel-to-game)

## 这是什么

NovelToGame 是 5 个开源的 Agent 技能，装进你已经在用的编码 Agent（Claude Code、Codex 或 Kimi Code）后，把「给一本小说做个游戏」拆成有文档、有检查的流水线：整本阅读 → 带引用的设定考据 → 方向筛选 → 概念 / 世界 / 美术 / 玩法设计 → 按本机环境适配构建 → 首次玩家盲测与完整验收。最后交付一个指定完成度的可玩版本 + 背后的设计文档。

它的几个关键做法：

- **事实与设计分离**：`SOURCE_BIBLE` 覆盖主线、冲突场景、人物关系与动机、秘密与信息差、世界规则、标志性场景道具与改编边界，每条都标章节或文件出处；事实分 `immutable` / `adaptable` / `open` / `conflicted`，小说没写的部分标记为设计发明，不能冒充原著事实
- **方向要经得起淘汰**：概念阶段比较多个真实候选方向，并列出「一击否决」理由（核心循环无视小说核心矛盾、去掉专有名词只剩通用模板、玩家只能花资源释放固定剧情等），概念、世界、美术分阶段写成不同文档，构建时不得偷偷重设计
- **按你的机器决定怎么建**：先写一页产品需求锁定平台、引擎与可测试运行时，再探测本机实际可用的栈（Three.js、Hunyuan3D 等图 / 文生 3D、Blender CLI/Python/MCP、2D Canvas/WebGL、原生 Godot/Unity），缺原生工具链不会静默降级成网页
- **盲测 QA**：先不看源码与设计文档，以第一次玩的玩家身份从标题页开始跑，记录引导、交互、节奏与移动端问题（`qa/playtest-report.md`），再对照设计文档核对，并留下一次覆盖 `launch` / `render` / `input` / `coreLoop` / `outcome` / `restart` 的完整验收记录（`qa/verification.json`）
- **互动小说 / 互动影游是一等路线**：连续场景、对话、证词与关键选择可以撑起整个游戏；重要选择后用短过场演给你看，每个选项都有自己的过场，视频不可用时仍以静帧完整可玩

仓库自带两个可玩示例：《西游记·三借芭蕉扇》（回合制 RPG，浏览器在线玩）与《金瓶梅·欲海账簿》（互动影游，18+）。技能正文与示例文档以中文为主，README 提供中英双语。

## 怎么安装

前置：已在使用 Claude Code、Codex 或 Kimi Code，终端里能跑 `npx`（Node.js）。按你的 Agent 选一条：

```bash
# Claude Code（调用：/novel-to-game）
npx skills add zenstory-ai/novel-to-game -g -y -a claude-code -s '*'

# Codex（调用：$novel-to-game）
npx skills add zenstory-ai/novel-to-game -g -y -a codex -s '*'

# Kimi Code（调用：/skill:novel-to-game）
npx skills add zenstory-ai/novel-to-game -g -y -a kimi-code-cli -s '*'

# 三个 CLI 一次装齐
npx skills add zenstory-ai/novel-to-game -g -y -s '*' \
  -a claude-code -a codex -a kimi-code-cli
```

`-g` 表示全局安装（任意目录可用），去掉则只装到当前目录。更新时重跑同一命令，或 `npx skills update`。也支持原生插件安装：Claude Code 用 `/plugin marketplace add zenstory-ai/novel-to-game` 后 `/plugin install novel-to-game@novel-to-game-skills`；Codex / Kimi Code 的命令见上游 README。

## 怎么用

1. 在 Agent 里调用 `/novel-to-game`（或对应值），给出小说全文 / 文件与想要的目标平台或引擎；没有偏好就让技能帮你选。
2. 它会先通读整本、写 `analysis/SOURCE_BIBLE.md`，再在 `concepts/CONCEPT.md` 里列出候选方向与否决理由，供你拍板。
3. 方向确定后依次产出 `design/GAME_DESIGN.md`、`ART_DIRECTION.md`、产品需求与构建方案，并按本机可用工具链实现可玩版本。
4. 构建完成后做首次玩家盲测 QA，留下报告与验收 JSON；未测到的环境会明确列为限制。
5. 想快速试水可用 `quick` 档（例如 `/novel-to-game quick`），完整跑则给出更高完成度与更全文档。

## 注意事项

- **依赖你的 Agent 与模型额度**：技能本身不含模型与托管服务，长流程（整书分析 + 构建 + 盲测）会消耗较多 token 与时间，先用短篇或 `quick` 档试。
- **安装范围**：`-g` 会全局写进各 Agent 的技能目录；只给某个项目用就去掉 `-g`，安装前确认目标目录。
- **版权与内容边界**：只能改编自有或已获授权的小说；示例含 18+ 路线，生成游戏的素材、字体、配音与角色形象授权由使用者负责。语音生成默认不启用，启用后相关文本会交给所选 TTS 服务并可能产生费用。
- **构建环境**：`game-build` 按本机实际工具链选路线，环境缺什么会影响完成度；设计文档是引擎无关的 Markdown，但可玩版本依赖真实可用的运行时。
- **QA 有边界**：验收只证明测过的路径与环境，未测平台、移动端与极端数据量会标为限制，不等于全面质量保证。
- **许可证**：技能代码 MIT；小说原文、改编设定与生成内容的权利归各自权利人，商用发布前自行清算。
