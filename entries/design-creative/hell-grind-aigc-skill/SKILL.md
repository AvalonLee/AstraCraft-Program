---
record_type: entry-record
id: hell-grind-aigc-skill
name_zh: "Hell Grind AIGC Skill"
name_en: "Hell Grind AIGC Skill"
summary_zh: "模型无关的 AIGC 视频生产管理器（受 Higgsfield《Hell Grind》95 分钟 AI 故事片生产结构启发）：七层提示词架构、22 个按需加载方法模块、14 张 schema v2 项目表（资产 / 场次 / 镜头契约 / 提示词 / 生成 / 迭代 / 选片 / 豁免）、六大失败分类稳定错误码、本地确定性提示词审计器和只读项目校验器（0 网络请求 0 数据库操作）。"
summary_en: "A model-agnostic AIGC video production manager: seven-layer prompt architecture, 22 on-demand method modules, a 14-table schema v2 project database, failure triage, and local prompt auditor."
category: design-creative
kind: skill
tags: [video-production, ai-agent, storyboard, film-language, prompt-engineering, skill]
languages: [markdown, python]
doc_languages: [zh]
license: MIT
homepage: https://github.com/renmu2017/Hell-Grind-AIGC-Skill
repo: https://github.com/renmu2017/Hell-Grind-AIGC-Skill
tier: standard
metrics:
  stars: 146
  pushed_at: "2026-08-07T13:21:37Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [hell-grind, AIGC production skill]
risk_notes: "方法论受 Higgsfield 公开项目 Hell Grind 启发但不包含原视频、原始资产或全量提示词（公开可访问不代表再分发许可）；默认不调用生成模型、不扣费、不下载媒体、不上传、不发布；本地工具（init / validate / audit）全部只读 + 0 网络请求；仅支持 macOS / Linux 安装（install.sh），Windows 需手动适配；项目规模较小（146 stars）。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Hell Grind AIGC Skill

> 将项目搭建、资产与镜头管理、图片/视频提示词生成与润色、生成记录、连续性检查和交付验收整合到一个 Skill。上游：[renmu2017/Hell-Grind-AIGC-Skill](https://github.com/renmu2017/Hell-Grind-AIGC-Skill) · 许可证：MIT（署名 renmu2017）

## 这是什么

Hell Grind AIGC Skill 是一套模型无关的 AIGC 视频生产管理器：把 Higgsfield 公开项目《Hell Grind》（95 分钟 AI 故事片）的生产结构提炼为可执行规则——不调用生成模型、不扣费、不下载媒体、不上传、不发布，只管"怎么把 AIGC 视频做成一部片子"这件事本身。

**v2 核心方法**：

### 七层提示词架构

| 层 | 解决的问题 |
|----|-----------|
| L1 意图与验收 | 本图/本镜为什么存在，观众要读到什么 |
| L2 资产与引用 | 同一个谁、当前什么状态、参考继承什么 |
| L3 空间与数量 | 人数、前中后景、屏幕方向、唯一物体 |
| L4 表演与物理 | 触发、重心、接触、反作用和落定 |
| L5 摄影与剪辑 | 起始构图、一个主运动、结束构图和切点 |
| L6 视听质感 | 光源、曝光、颜色、材质、对白和环境声 |
| L7 连续性与风险 | 必须保持、本镜变化、禁止出现、交付规格 |

### 迭代不是盲目抽卡

把 `prompt version → batch → generation → selection → iteration` 分开管理。每次修复记录**失败码 / 责任层 / changed_variables / hypothesis / next_action**——连续两个批次在同一错误上无改善时，回到资产或镜头契约层做最小修复，而不是继续复制提示词。

### 22 个按需加载方法模块

不把所有知识塞进主入口——按需加载图片 11 类信息模块、视频 12 段镜头契约模块、选片连续性、失败诊断等。

### schema v2 的 14 张项目表

连接资产、场次、镜头、提示词、生成、迭代、选择和豁免；从 `00_brief` 到 `09_delivery` 的十级目录结构覆盖完整生产链路。

### 本地工具（0 网络请求 0 数据库操作）

- **`init_project.py`**：初始化 schema v2 项目（拒绝覆盖非空目录、原子移动）
- **`validate_project.py`**：只读校验（表头 / ID / 状态 / 引用 / 时间线 / 成本 / 豁免），兼容 v1 / 严格 v2 模式
- **`audit_prompt.py`**：确定性提示词审计（检查缺失模块、静止/运动冲突、多主运镜、时间线越界等），支持 image / video 两种 medium

## 怎么安装

前置条件：macOS / Linux、Git、Python 3.10+（无第三方 Python 依赖）。

```bash
git clone https://github.com/renmu2017/Hell-Grind-AIGC-Skill.git
cd Hell-Grind-AIGC-Skill
./scripts/install.sh
```

默认安装到 `${CODEX_HOME}/skills/hell-grind-aigc-skill`（未设置时为 `~/.codex/skills/`）。更新用 `git pull --ff-only && ./scripts/install.sh --update`（自动备份旧版本到 `.backups/`）。

## 怎么用

在 Codex 中对 Agent 说：

```text
使用 $hell-grind-aigc-skill，把这份短片 brief 搭成 schema v2 项目；先建立资产、场次、空间和镜头契约，不调用生成模型。

使用 $hell-grind-aigc-skill，为"雨夜维修站门口的疲惫女维修员"写标准版图片提示词，模型未知，保持平台无关。

使用 $hell-grind-aigc-skill 诊断这个镜头的身份漂移、左右反转和运镜失控；先定位责任层，只给最小修复和复测变量。

使用 $hell-grind-aigc-skill 只读审核这个项目的资产版本、镜头表、生成记录、选片和连续性，不生成、不上传。
```

## 注意事项

- **许可证 MIT**：可自由商用和闭源集成，但复制 / 分发时必须保留 `Copyright (c) 2026 renmu2017` 和完整 MIT 许可声明。
- **内容边界**：只包含自行整理的方法论、模板、脚本和原创短例；不包含原视频、原始资产、全量提示词或数据集（公开可访问 ≠ 再分发许可）。
- **零副作用**：Skill 默认不调用生成模型、不扣费、不下载媒体、不上传、不发布；本地工具全部 0 网络请求 0 数据库操作。
- **v1 兼容**：旧项目迁移必须显式执行，Skill 不自动改写。
- **平台**：安装脚本仅支持 macOS / Linux，Windows 需手动适配。
- **早期项目**（146 stars），v2.0.0（2026-08），方法论深度高但社区规模小。
