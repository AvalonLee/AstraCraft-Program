---
record_type: entry-record
id: openmontage
name_zh: "OpenMontage 开源智能体视频制作系统"
name_en: "OpenMontage — Agentic Video Production System"
summary_zh: "首个开源智能体视频制作系统：把你的 AI 编程助手变成完整视频制作工作室；12 条生产流水线、100+ 注册工具与 700+ 个 skill 知识文件，覆盖真实素材剪辑、AI 生成、Remotion/HyperFrames 合成、预算治理与质量门禁。"
summary_en: "The first open-source agentic video production system: 12 pipelines, 100+ tools, 700+ skill files, real-footage editing, quality gates, and budget governance."
category: design-creative
kind: framework
tags: [video-production, ai-agent, remotion, motion-design, screenwriting, storyboard, self-hosted]
languages: [python, typescript]
doc_languages: [en, zh]
license: AGPL-3.0
homepage: https://www.openmontage.video/
repo: https://github.com/calesthio/OpenMontage
tier: standard
metrics:
  stars: 50726
  pushed_at: "2026-08-22T18:22:24Z"
  checked_at: "2026-08-26"
  archived: false
aliases: [open-montage]
risk_notes: "AGPL-3.0 为强 Copyleft：本地自用无额外义务，对外提供网络服务时需以 AGPL 开源衍生，具体以上游 LICENSE 为准；零 API key 可通过 Piper 本地 TTS、开放档案素材与 Remotion/HyperFrames 出片，云生成能力随 FAL/Kling/Veo/OpenAI/ElevenLabs 等密钥增加且费用自担；默认总预算上限 $10、单笔超 $0.50 需审批。"
added_at: "2026-08-26"
updated_at: "2026-08-26"
---

# OpenMontage 开源智能体视频制作系统

> 首个开源智能体视频制作系统。上游：[calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) · 许可证：AGPL-3.0 · 官网：[openmontage.video](https://www.openmontage.video/)

## 这是什么

OpenMontage 是首个开源、agent-first 的视频制作系统：没有代码编排器，你的 AI 编程助手（Claude Code、Cursor、Copilot、Windsurf、Codex）就是编排器。仓库提供 12 条生产流水线（动画、电影感、解说片、纪实蒙太奇、数字人口播、屏幕演示等）、100+ 个注册工具（视频/图像/语音/音乐/字幕/后期）与 700+ 个 skill 与生产知识文件，把「调研 → 剧本 → 分镜 → 素材 → 合成 → 渲染 → 自查」串成有质量门禁和预算治理的完整工作流。它既可以调用 Kling、Veo、Seedance 等生成视频，也能从 Archive.org、NASA、Wikimedia Commons 检索真实动态素材剪辑成片。

## 怎么安装

前置条件：Python 3.10+、FFmpeg、Node.js 18+。先克隆并初始化：

```bash
git clone https://github.com/calesthio/OpenMontage.git
cd OpenMontage
make setup
```

没有 `make` 的 Windows PowerShell 备选：

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cd remotion-composer
npm install
cd ..
python -m pip install piper-tts
Copy-Item .env.example .env
```

若 `npm install` 报 `ERR_INVALID_ARG_TYPE`，改用 `npx --yes npm install`。所有 API key 均可选，在 `.env` 中按需填入。

## 怎么用

在 AI 编程助手中打开项目目录，直接描述需求，例如：

```text
Make a 60-second animated explainer about how neural networks learn
```

需要真实素材时可明确要求：`"Make a 75-second documentary montage about city life in the rain. Use real footage only."` Agent 会按 `AGENT_GUIDE.md` 先选流水线、读 pipeline manifest 与对应 stage director skill，逐阶段执行并等待你的审批；可用 `python -m backlot open` 打开 Backlot 可视化制作台查看进度、分镜与成本。常用测试入口还可运行 `make test-contracts`。

## 注意事项

- **许可证 AGPL-3.0**：可免费使用、修改与自托管；强 Copyleft，向网络用户提供服务时需开源衍生，具体以上游 LICENSE 为准。
- **零 key 可用**：Piper 本地 TTS、开放档案素材、Remotion/HyperFrames 本地合成与 FFmpeg 后期即可出片；配置 FAL、Kling、Veo、Seedance、Runway、OpenAI、ElevenLabs、Suno 等密钥后能力增强，费用自担。
- **预算与门禁**：默认总预算上限 $10，单笔超过 $0.50 暂停审批；渲染前有 slideshow 风险评估，渲染后自动跑 ffprobe/抽帧/音频检查，失败不会交付。
- **本地 GPU 可选**：`make install-gpu` 可启用 WAN 2.1/2.2、Hunyuan、CogVideo、LTX-Video 等本地视频生成。
- 维护活跃（2026-08 更新，5 万+ star），提供中英文 README，并为各主流 AI 编程助手内置了适配指令文件。
