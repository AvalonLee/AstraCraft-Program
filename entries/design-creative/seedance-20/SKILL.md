---
record_type: entry-record
id: seedance-20
name_zh: "Seedance 2.0 Skill OS 视频执导技能包"
name_en: "Seedance 2.0 Skill OS"
summary_zh: "面向 Seedance 2.0 的模块化智能体技能包：先读场景、再写提示词，把抽象创意转成有镜头、光线、声音与参考素材的视频提示词，支持文生视频、图生视频、首尾帧、连续剧情与六语言流程，内置 33 个完整范例与安装器。"
summary_en: "Modular skill package for Seedance 2.0 video: reads the scene first, then prompts camera, light, sound, and references; supports T2V/I2V/V2V/R2V, first/last frames, sequences, and six languages."
category: design-creative
kind: skill-collection
tags: [video-production, cinematic, prompt-engineering, ai-agent, seedance, multilingual]
languages: [python]
doc_languages: [zh, en, ja, ko, es, ru]
license: MIT
homepage: https://github.com/Emily2040/seedance-2.0
repo: https://github.com/Emily2040/seedance-2.0
tier: standard
metrics:
  stars: 6923
  pushed_at: "2026-08-06T11:00:29Z"
  checked_at: "2026-08-26"
  archived: false
related: []
aliases: [seedance-2, seedance-prompt-os]
risk_notes: "MIT 可商用；安装脚本需 Python 3；实际出片依赖 ByteDance Seedance 2.0 供应商账号与额度；参考标签需原样保留，受保护 IP 应改写为原创内容而非换语言隐藏。"
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# Seedance 2.0 Skill OS 视频执导技能包

> 面向 Seedance 2.0 的模块化 Agent 技能包（v6.7.0）。上游：[Emily2040/seedance-2.0](https://github.com/Emily2040/seedance-2.0) · 许可证：MIT · 中文指南：[docs/README.zh.md](https://github.com/Emily2040/seedance-2.0/blob/main/docs/README.zh.md)

## 这是什么

Seedance 2.0 Skill OS 是一套为 ByteDance Seedance 2.0 准备的智能体技能包，核心理念是「指挥场景，而不是堆形容词」。收到需求后它先做导演式阅读（镜头功能、观点、目标、障碍、可见动作），再生成让镜头、光线、表演和声音服务同一意图的紧凑提示词；内置 `seedance-prompt`、`seedance-sequence`、`seedance-continuation` 及中/日/韩词汇与范例技能，含 33 个完整推导范例，覆盖 T2V、I2V、V2V、R2V、FLF2V、编辑/延展、首尾帧、音频感知等 Seedance 2.0 工作流。

## 怎么安装

```bash
git clone https://github.com/Emily2040/seedance-2.0.git
cd seedance-2.0

# Codex（默认写入 ~/.codex/skills）
python scripts/install_codex_skill.py

# Claude Code 或其他 Agent
python scripts/install_codex_skill.py --dest ~/.claude/skills
```

## 怎么用

让 Agent 安装后打开 `skills/seedance-prompt/SKILL.md`；中文用户从 `skills/seedance-vocab-zh` 和中文快速入门开始。连续剧情用 `seedance-sequence`，接着上一段生成时用 `seedance-continuation` 并更新已接受的结尾状态。提示词里保留 `@Image1`、`@Video1`、`@Audio1` 等参考标签，不翻译；字幕和广告文案放在剪辑阶段添加。

## 注意事项

- **许可证 MIT**：可商用；实际出片依赖 ByteDance Seedance 2.0 供应商（火山引擎、豆包、即梦、fal、Runway Seedance 2 等）的账号与额度。
- **安装环境**：需要 Python 3 运行安装脚本；客户端需支持 skills 目录扫描。
- **参考标签**：`@Image1` 等标签必须原样保留；受保护 IP、明星、品牌、歌曲或真实人脸/声音应改写为原创角色与原创世界，而不是换语言隐藏。
- **多语言**：提供中/英/日/韩/西/俄六语言路径，素材质量评审遵循独立人工复核协议。
- 维护活跃（v6.7.0，2026-08 更新），仓库含 CHANGELOG 与平台能力矩阵。
