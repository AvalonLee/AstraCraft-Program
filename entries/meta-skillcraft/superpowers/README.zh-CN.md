<!--
条目说明文档 —— 固定七段式，段落顺序和标题请勿改动，脚本与 CI 依赖此结构。

写作要求：
  · 面向"没用过这个项目的人"，让他读完能判断要不要用
  · link-only 存根的这份要写得更厚：读者拿不到代码，你得用文字补上信息差
  · 不要复制粘贴上游 README 的营销话术，用自己的话说清楚
-->

# Superpowers 开发方法论

> 一套让编码智能体先想清楚、再做计划、最后自驱执行的开发方法论。上游：[obra/superpowers](https://github.com/obra/superpowers) · 许可证：MIT · 🟢 A

## 是什么

Superpowers 是一套面向编码智能体（Claude Code、Cursor、Gemini CLI、Codex 等）的完整软件开发方法论，由一个**入口指令文件**（AGENTS.md / CLAUDE.md / GEMINI.md，按不同 harness 适配）和 **14 个可组合 skill** 组成。它不是某个单一功能插件，而是一套"智能体该怎么干活"的行为规范。

## 解决什么问题

**这一段最重要。** 默认情况下，编码智能体一上来就写代码，容易跳需求、跑偏、不做测试、不收尾。Superpowers 在动手前插入几个强制环节：

- **先在想清楚**：智能体不急着写代码，而是追问"你到底要做啥"，把需求拆成能读的规格 chunks 让你确认；
- **再做计划**：产出清晰到"一个没判断力、不懂项目、不爱测试的初级工程师也能照着做"的实现计划，强调真·红绿 TDD、YAGNI、DRY；
- **最后自驱执行**：用 subagent-driven-development 让子代理逐个啃任务、互相评审，可连续自主工作数小时不偏离计划。

没有它，你得自己盯流程；有了它，流程自动触发，你只需在关键节点点头。

## 怎么装

```bash
# 方式一：作为项目级能力（推荐，最贴近上游设计）
# 把整个 src/ 拷到你的项目目录，智能体会自动读取 AGENTS.md / CLAUDE.md 并加载 skills/
cp -r src/ ./superpowers/
# 然后在你的 agent 配置里确保它会读 AGENTS.md（Claude Code 默认读）

# 方式二：拆成全局 skill（适合只想用其中几个子技能）
mkdir -p "$USERPROFILE/.claude/skills/"
cp -r src/skills/* "$USERPROFILE/.claude/skills/"

# Windows Git Bash
cp -r src/ "$USERPROFILE/superpowers/"
```

无第三方依赖、无需 API Key、无需联网。纯 Markdown + 约定结构，任何支持 skill/AGENTS.md 的 harness 都能吃。

## 怎么用

装上后**无需手动触发**——当你开始一个开发任务，入口指令会接管流程：

```
你：帮我在项目里加一个用户导出的 CSV 功能
（智能体不会立刻写代码，而是先反问需求细节，确认规格，
 再给出实现计划等你签核，然后启动子代理分头实现并以 TDD 推进）
```

常用子技能可直接点名加载：`brainstorming`（需求澄清）、`writing-plans`（写计划）、`test-driven-development`（红绿 TDD）、`systematic-debugging`（系统化调试）、`requesting-code-review`（请求评审）、`using-git-worktrees`（工作树隔离）。

## 亮点

- **14 个 skill 覆盖完整链路**：从 brainstorming → writing-plans → TDD → 子代理开发 → 代码评审 → finishing-a-development-branch → verification-before-completion，工程闭环完整
- **真 TDD 导向**：明确强调红/绿 TDD 与 YAGNI，不是"写完再补测试"的伪测试
- **subagent-driven-development**：多代理并行、互相评审，长任务不易跑偏
- **多 harness 适配**：内置 AGENTS.md / CLAUDE.md / GEMINI.md / gemini-extension.json，跨工具可用
- **MIT 绿灯**：可整仓 vendoring、零修改再分发，附 `upstream.lock` 记录快照 commit

## 局限

- **偏重工程开发场景**：核心是软件工程方法论，纯文档/设计/数据分析类任务收益有限
- **强流程可能"重"**：对很小的改动也会走需求澄清+计划+评审全流程，轻量任务略显啰嗦
- **依赖 harness 配合**：必须你的 agent 真正会读 AGENTS.md / skills 目录，否则只是堆 Markdown 没用
- **实测未覆盖全部子技能**：本仓库仅做了 vendoring 与结构验证，14 个 skill 的完整行为需自行试跑（见 NOTES.zh-CN.md）

## 协议与来源

- **上游仓库**：https://github.com/obra/superpowers
- **著作权人**：Jesse Vincent
- **许可证**：MIT（🟢 A 级，可 vendoring）
- **本仓库快照版本**：见同目录 `upstream.lock` 的 `commit` 字段（44c9b2d6e889，2026-07-28）
- **本地修改**：无（零修改 vendoring）
