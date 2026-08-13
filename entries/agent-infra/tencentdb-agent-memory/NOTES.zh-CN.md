# 实测笔记：TencentDB Agent Memory

## 收录快照

- 类型：`framework`（Agent 记忆基础设施 / Memory Hub），分类 `agent-infra`
- 协议：MIT（A 级绿灯，可 vendoring），copyright_holder = Tencent
- 快照：默认分支 `feat/server_team` @ commit `4dca55c`（2026-08-11），829 文件 / 12.4 MB
- 体积裁剪：剔除 2 个演示视频（.mov，各 8.6–9.4 MB）与 6 张 >1MB 流程图大图，
  以控制条目 ≤20MB、单文件 ≤5MB 上限；详见 `src/assets/FETCH.md`（含 SHA-256）

## 实测状态：未实测（standard 级，资料性收录）

本条目按 H5 规则**未标记实测**（admission.checked 不含 H5）。原因：该项目是
"可部署服务平台"而非即插即用 skill——需要 Docker 拉起 memory-core / memory-hub /
memory-proxy 三件套并配置两组 LLM 参数，属于需要较长环境搭建的评测，本次仅做
文档与结构级理解。因此评级 **standard**（建议跑通，笔记可后补），而非 core。

## 结构与组件理解

从 `src/` 与 README 归纳：

| 组件 | 职责 |
|---|---|
| `MemoryCore/` | 核心记忆服务（npm：`@tencentdb-agent-memory/memory-tencentdb-v2`，含 `openclaw-plugin/`） |
| `MemoryHub` | 团队记忆控制台（Panel 前端 `MemoryPanel/` + 服务） |
| `MemoryProxy/` | 接入代理（为 Claude Code 等提供上下文 proxy） |
| `MemoryKnowledge/` | 知识服务（OpenAPI：`MemoryKnowledge/openapi.yaml`） |
| `sdk/` | 客户端 SDK |
| `deploy/` | Docker 一键部署（`global-images/start-all.sh`） |

设计主线：**"已有信息 → 可复用记忆资产 → 更少 Turns → 更少返工 → 更稳定结果"**。
四类资产对应四个模块，L0→L3 分层记忆模型是 Chat Memory 的核心亮点。

## 值得注意的坑与事实

1. **默认分支是 `feat/server_team`**，不是 `main`/`master`。clone 时直接 clone 默认分支
   即得到该迭代版；若需要稳定版，请核对上游是否有 release/tag。
2. **README 里的 clone URL 有笔误**：安装段写 `github.com/Tencent/TencentDB-Agent-Memory`
   （无 Cloud），实际仓库是 `TencentCloud/TencentDB-Agent-Memory`。用前者 clone 会 404。
3. **体积大头在 `assets/`**：演示视频（~18MB）与 6 张流程图大图（~8.5MB）占全仓 70%+，
   这也是本条目裁剪这些资源的原因。
4. **运行环境**：Node ≥ 22.16；以 Docker 一键部署为主，数据迁移工具面向 v1.x/v0.x 存量。
5. **异步资产**：Wiki / CodeGraph 需要异步构建，接入后要等 ready，不是即时可用。

## 什么场景值得用

- 你在组建"一个人的 Agent 公司 / Agent 团队"，希望团队级记忆共享、避免重复劳动；
- 你已用 Claude Code / OpenClaw / Hermes 等，想要一套可自我积累的长期记忆层；
- 你需要把文档库与代码库变成 Agent 可查询的知识/代码图谱。

## 什么场景不要用

- 只想"记住几句对话"的轻量场景——杀鸡用牛刀，三件套部署成本不小；
- 需要稳定主干版本的用户——当前默认分支还是迭代中的 feat 分支；
- 对私有代码库 CodeGraph 有强需求者——私有仓库/SSH 接入尚未完善。
