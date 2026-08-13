<!--
实测笔记 —— 本仓库的核心资产。

这份文件的价值在于「你真的用过」。它是 SkillMall 区别于书签列表的唯一理由。
admission.tier 为 core 的条目，CI 会检查本文件非空且不等于模板原文。

写作要求：
  · 第一人称，写你实际遇到的情况
  · 允许有主观判断，但要给出依据
  · 就事论事评价项目本身，不对作者作价值判断（见 CODE_OF_CONDUCT.md）
  · 所有关于上游的补充说明都写在这里，不要去改 src/ 里的任何文件
-->

# 实测笔记

**实测日期**：2026-08-10
**实测环境**：Windows 11 / Git Bash / Python 3.13.12 / Claude Code
**实测版本**：见 `upstream.lock` 的 `commit`（44c9b2d6e889，2026-07-28）

## 跑通了什么

- **Vendoring 跑通**：用 `scripts/vendor.py --add https://github.com/obra/superpowers.git --into meta-skillcraft/superpowers` 浅克隆并剔除 `.git/`、`.github/workflows/`、`.DS_Store` 等，成功拷入 **180 个文件 / 1554 KB**，远低于 20MB 条目上限与 5MB 单文件上限，零超限。
- **结构核验**：`src/skills/` 下确为 **14 个 skill 目录且每个都含 SKILL.md**，与上游 README 声称一致——brainstorming、dispatching-parallel-agents、executing-plans、finishing-a-development-branch、receiving-code-review、requesting-code-review、subagent-driven-development、systematic-debugging、test-driven-development、using-git-worktrees、using-superpowers、verification-before-completion、writing-plans、writing-skills。
- **协议核验**：`src/LICENSE` 为 **MIT**，首行 `Copyright (c) 2025 Jesse Vincent`，与 meta.yml 中 `copyright_holder` 一致，绿灯 A 级判定成立。
- **指标核验**：API 取到的 `full_name=obra/superpowers` 与克隆对象同源；`pushed_at` 2026-08-08、`archived=false`，活跃度门槛 H4 通过。

## 踩到的坑

- **入口文件按 harness 分身**：仓库根同时有 AGENTS.md / CLAUDE.md / GEMINI.md / gemini-extension.json，分别对应不同智能体。Windows 下 Claude Code 默认读 AGENTS.md 与 CLAUDE.md，拷贝整仓即可；若只拆 `skills/*` 到全局目录，会丢掉入口指令，方法论不会自动触发——这点 README 没强调，容易踩。
- **`upstream.lock` 占位会被覆盖**：条目目录从 `_template` 复制而来时自带占位 lock，运行 vendor.py 后会被真实锁文件覆盖，无需手改。
- **`.gitignore` 必须白名单**：仓库默认忽略 `**/src/`，`meta-skillcraft/superpowers/src/` 若不显式放行不会入库，否则 vendoring 形同虚设。已补 `!meta-skillcraft/superpowers/src/` 与 `!meta-skillcraft/superpowers/src/**`。

## 和同类的对比

| 维度 | Superpowers | 单点 skill 集（如零散 TDD skill） |
|---|---|---|
| 上手成本 | 中（需 harness 配合读 AGENTS.md） | 低（拷一个 skill 即用） |
| 覆盖范围 | 完整工程闭环（14 子技能） | 通常只覆盖单一环节 |
| 流程强制力 | 强（入口指令插需求澄清/计划/评审） | 弱（靠触发词，易跳过） |
| 维护活跃度 | 高（2026-08-08 仍有 push） | 参差不齐 |

一句话：**要的是"智能体按规矩干活"选 Superpowers；只要某一个现成技巧、不想被流程束缚，挑单点 skill 更轻。**

## 我的判断

值得收。它把"怎么用智能体做工程"这件事做成了一套可 vendoring、零修改、MIT 再分发的成熟范式，特别适合作为本仓库 **vendoring 范式的样板**（full 模式 + upstream.lock + link-only 对照）。推荐给：想规范编码智能体行为、或想学习 skill 集合怎么组织的人。不推荐给：只需要某个孤立小技巧、嫌流程重的用户。

对应加分项：① 文档完整（README/AGENTS.md/skills 均有说明）；② 协议干净零歧义（MIT，无 NOTICE 负担）；③ 多 harness 适配，复用面宽。

## 上游补充说明

- `src/` 内已含 `.github/workflows/` 剔除痕迹——vendoring 时我们显式删掉了上游 CI，避免被 GitHub 当成**本仓库** CI 跑。若日后 `--force` 重同步，该剔除会默认生效，无需额外处理。
- 14 个 skill 的**完整运行行为**（如 subagent-driven-development 实际如何派发子代理）本仓库仅做了结构校验，未逐一试跑，建议使用者按需在真实 harness 内验证。
