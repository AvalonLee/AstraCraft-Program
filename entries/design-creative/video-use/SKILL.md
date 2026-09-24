---
record_type: entry-record
id: video-use
name_zh: "video-use 用编码 Agent 剪视频"
name_en: "video-use — Edit Videos with Coding Agents"
summary_zh: "把原始素材丢进文件夹、跟 Claude Code 说一句话就拿到 final.mp4 的 Agent 技能：自动去掉口水词与废片段、逐段调色、切点处 30ms 音频淡变防爆音、按自定义样式烧字幕、并行子 Agent 生成动画叠加层，并在展示预览前对每个切点做渲染自检。"
summary_en: "Drop raw footage in a folder, chat with a coding agent, get final.mp4 back: cuts filler words and dead takes, grades segments, fades audio, burns subtitles, self-evaluates every cut boundary."
category: design-creative
kind: skill
tags: [video-production, short-video, ai-agent, subagent, skill-md, social-media]
languages: [python]
doc_languages: [en]
license: MIT
homepage: https://github.com/browser-use/video-use
repo: https://github.com/browser-use/video-use
tier: standard
metrics:
  stars: 26778
  pushed_at: "2026-09-24T04:50:14Z"
  checked_at: "2026-09-24"
  archived: false
related: [hyperframes, remotion-skills, video-shotcraft]
aliases: []
risk_notes: "必需依赖 ffmpeg；转录层每次调用 ElevenLabs Scribe（需 ELEVENLABS_API_KEY，按量计费），这是它 word 级切点精度的来源。yt-dlp 为可选（下载在线素材）。README 的手动安装命令用 brew 装依赖，Windows 需自备 ffmpeg 并手动配 .env。所有产物写在 <videos_dir>/edit/ 下，技能目录保持干净。与 browser-use 同源，MIT 可商用。"
added_at: "2026-09-19"
updated_at: "2026-09-19"
---

# video-use 用编码 Agent 剪视频

> 让 Claude Code 当剪辑师。上游：[browser-use/video-use](https://github.com/browser-use/video-use) · 许可证：MIT

## 这是什么

video-use（25.1k star，browser-use 团队出品）是一个真正的 Agent 技能包：仓库根目录有 `SKILL.md`、`install.md`，剪辑脚本都在 `helpers/` 里。用法是「素材丢进文件夹 → 跟 Agent 说一句话 → 拿回 `edit/final.mp4`」，适用于口播、混剪、教程、旅行、采访等任意内容，无需预设或菜单。

它解决的核心问题是 **LLM 看不了视频**。做法是给 Agent 两层结构化输入，而不是抽帧：

- **Layer 1 音频转录（始终加载）**：每个素材一次 ElevenLabs Scribe 调用，得到 word 级时间戳、说话人分离与音频事件（`(laughter)`、`(applause)`、`(sigh)`）；所有素材打包成约 12KB 的 `takes_packed.md`，作为 Agent 的主阅读视图。
- **Layer 2 视觉合成（按需调用）**：`timeline_view` 对任意时间区间产出「胶片条 + 波形 + 词标签」PNG，只在决策点（歧义停顿、retake 比较、切点复核）调用。

README 给的对比：朴素抽帧是 30,000 帧 × 1,500 token = 4500 万 token 的噪声；video-use 是 12KB 文本 + 少量 PNG。这与 browser-use 给 LLM 结构化 DOM 而非截图是同一个思路。

流水线：`Transcribe → Pack → LLM Reasons → EDL → Render → Self-Eval`，自检不通过则修复重渲染（最多 3 轮），通过后才给你看预览。

## 怎么安装

官方推荐直接把下面这段 setup prompt 粘给 Agent（Claude Code、Codex、Hermes、Openclaw 等任意有 shell 的 Agent），它会读 `install.md` 完成 clone、ffmpeg 接线、技能注册，并一次性向你要 ElevenLabs API Key：

```text
Set up https://github.com/browser-use/video-use for me.

Read install.md first to install this repo, wire up ffmpeg, register the skill with whichever agent you're running under, and set up the ElevenLabs API key — ask me to paste it when you need it. Then read SKILL.md for daily usage, and always read helpers/ because that's where the editing scripts live. After install, don't transcribe anything on your own — just tell me it's ready and wait for me to drop footage into a folder.
```

手动安装（macOS 示例）：

```bash
git clone https://github.com/browser-use/video-use ~/Developer/video-use
ln -sfn ~/Developer/video-use ~/.claude/skills/video-use     # Claude Code
# ln -sfn ~/Developer/video-use ~/.codex/skills/video-use    # Codex

cd ~/Developer/video-use
uv sync                          # 或 pip install -e .
brew install ffmpeg              # 必需
brew install yt-dlp              # 可选，用于下载在线素材

cp .env.example .env             # 填入 ELEVENLABS_API_KEY
```

## 怎么用

```bash
cd /path/to/your/videos
claude        # 或 codex、hermes 等
```

然后在会话里说：`edit these into a launch video`。Agent 会先清点素材、提出剪辑策略、等你确认后才动手，产物落在素材同级的 `edit/final.mp4`。

- 字幕默认 2 词大写分块，样式完全可自定义；
- 调色默认 warm cinematic 或 neutral punch，也可换成任意自定义 ffmpeg 链；
- 动画叠加层通过 HyperFrames / Remotion / Manim / PIL 生成，每个动画一个并行子 Agent；
- `project.md` 保存会话记忆，下周接着剪不用重来。

## 注意事项

- **成本与依赖**：ElevenLabs Scribe 转录按量计费，是主要外部开销；ffmpeg 为硬依赖。
- **纪律**：设计原则写明「Ask → confirm → execute → self-eval → persist」，未确认策略不要让它动刀；安装后也别让它自作主张先转录。
- **不做内容类型假设**：它先看素材、再问、最后剪，没有内置模板套路。
- 想常驻剪辑（VPS / Telegram）可走官方 Browser Use Box；在线试用入口为 Browser Use Cloud。
- 详细生产规则与剪辑手法见仓库 [`SKILL.md`](https://github.com/browser-use/video-use/blob/main/SKILL.md)。
