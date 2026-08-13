<!--
条目说明文档 —— 固定七段式，段落顺序和标题请勿改动，脚本与 CI 依赖此结构。

写作要求：
  · 面向"没用过这个项目的人"，让他读完能判断要不要用
  · link-only 存根请把这份写得比 vendored 更厚：读者拿不到代码，你得用文字补上信息差
  · 不要复制粘贴上游 README 的营销话术，用自己的话说清楚
-->

# TencentDB Agent Memory

> 腾讯云出品的 **Agent 团队级记忆中心（Memory Hub）**：让经验在 Agent 之间沉淀、流动、继承。
> 上游：[TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) · 许可证：MIT · 🟢 A（📦 源码已收录）

## 是什么

一个面向 **Agent 团队**的长期记忆基础设施，由腾讯云开源（MIT）。它把"对话、文档、代码"
三类信息沉淀成 **四类可复用记忆资产**：

- **Chat Memory** —— 保留偏好、事实、决策与交互历史，按 `L0 对话 → L1 原子 → L2 场景 → L3 人格` 逐层沉淀；
- **Skill** —— 从对话和工具调用中提炼可复用技能，带版本、资源、触发边界、执行步骤与验证规则；
- **LLM-Wiki** —— 把文档变成由 LLM 增量维护、可持续复利的知识产物；
- **CodeGraph** —— 把代码变成"预索引的代码图谱"，按需读取相关页面、源码或影响路径。

部署形态是 `memory-core + memory-hub + memory-proxy` 三件套，外加 `sdk` 与各框架接入层
（OpenClaw / Hermes / Claude Code / CodeBuddy / SDK）。当前版本 v2.0.0。

## 解决什么问题

**Agent 换一个 Session 就失忆，团队换一个 Agent 就重来。** 项目从一个很实际的问题出发：
怎样减少使用 Agent 时的重复工作？

- 项目背景讲过了，不该换个 Session 再讲；
- 文档读过了，不该每个 Agent 从第一页重读；
- 一套做法已经跑通，不该下次再摸索一遍。

所以这里的 Memory 不只是"记住对话"：**凡是能让下一个 Agent 少走弯路的信息，都应该被保存、
组织并复用**。经验在团队中流动，新成员（新 Agent）进来直接"读档"。

## 怎么装

```bash
git clone https://github.com/TencentCloud/TencentDB-Agent-Memory.git
cd TencentDB-Agent-Memory/deploy/global-images
cp .env.example .env
# 填入两组 LLM 参数（memory 组 + proxy 组）
./start-all.sh     # 一键起；结束会打印 claude 可直接复制的一行命令
```

打开 Panel：`http://localhost:8125`。完整安装（Memory Hub 单独部署 / Proxy + Claude Code /
CodeBuddy / 停止清理 / 端口说明）见 `INSTALL_CN.md`。

- 环境要求：Node ≥ 22.16；以 Docker 一键部署为主。
- 旧版本（v1.x / v0.x）迁移：提供 `MemoryCore/scripts/migrate-v2-to-v3/` 数据迁移工具。
- 本仓库 `src/` 已含完整源码快照；注意演示视频与 6 张流程图大图因体积上限未收录，
  需要时按 `src/assets/FETCH.md` 取回。

## 怎么用

- **接入方式**：当前提供 OpenClaw、Hermes、Claude Code、CodeBuddy 与 SDK 接入。
- **独立记忆**：每个 Agent 创建时自动获得独立记忆，下次对话不必从自我介绍开始。
- **Skill 流转**：个人 Skill 默认私有 → 审核后分享给团队 → 再配装给其他 Agent。
- **冷启动**：导入已有文档、代码库和 Agent 对话 Session，新团队可从现有经验开始，
  不必先从头学习一遍。

## 亮点

- **四类资产一体化**：Chat Memory / Skill / LLM-Wiki / CodeGraph 覆盖对话、技能、文档、代码；
- **L0→L3 逐层沉淀**：从原始对话到人格画像的分层记忆模型；
- **跨框架可迁移**：记忆资产与 Agent 框架解耦，团队内多 Agent 共享维护；
- **Benchmark**：PersonaMem 从 48% 提升到 76%（相对 +59%）；
- **合规友好**：MIT 协议，社区活跃（2.1 万+ star，24 小时内响应 Issue）。

## 局限

- Wiki 和 CodeGraph **异步构建**，需要等待一定时间才能 `ready`；
- CodeGraph 当前**优先支持公开 HTTPS 仓库**，私有仓库与 SSH 凭证接入仍在完善；
- Hub 已支持人工绑定资产，**全自动记忆路由仍在迭代**；
- 更广泛的跨框架迁移仍在 Roadmap 中；
- 仓库**默认分支为迭代中的 `feat/server_team`**（非常规主干命名），跟随上游该分支收录；
- 未做实测（评级 standard）：需要 Docker + LLM 配置，属可部署服务平台而非即插即用 skill。

## 协议与来源

- **许可证**：MIT（`src/LICENSE`，© Tencent）。根 LICENSE 与 package.json 的
  `license: MIT` 一致，SPDX 可识别，A 级绿灯。
- **上游**：https://github.com/TencentCloud/TencentDB-Agent-Memory （默认分支 `feat/server_team`）
- **快照**：`src/` 零修改快照，commit `4dca55c`（2026-08-11），830 文件 / 12.7 MB；
  剔除的 9 个大体积资源见 `src/assets/FETCH.md`。
- **致谢声明**（上游）：CodeGraph 复用了 colbymchenry/codegraph 的代码；Skill 资产管理
  复用了 Nous Research 的 Hermes Agent 部分代码。再分发时请一并遵守这些上游条款。
