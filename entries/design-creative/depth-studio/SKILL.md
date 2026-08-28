---
record_type: entry-record
id: depth-studio
name_zh: "Depth Studio 深度视频生成"
name_en: "Depth Studio"
summary_zh: "把一段普通参考视频转换成时空一致的灰度深度视频，为 AI 视频工具提供角色姿态、动作、轮廓与相机距离的空间引导，辅助换角色、加角色或保持动作一致。"
summary_en: "Turns a reference clip into a temporally consistent grayscale depth video, giving compatible AI video tools a spatial guide for pose, movement, silhouette and camera distance."
category: design-creative
kind: framework
tags: [video-production, cinematic, ai-agent, prompt-engineering]
languages: [python, javascript]
doc_languages: [en]
license: MIT
homepage: https://github.com/Toolsai/Depth-Studio
repo: https://github.com/Toolsai/Depth-Studio
tier: watch
aliases: [Depth Studio]
risk_notes: 仅约 3 次提交、单维护者、无正式 release，属早期项目；首次运行需联网下载约 116 MB 的 Video-Depth-Anything Small 模型（Apache 2.0）；本项目只生成深度视频，能否增强最终效果取决于后续所用的 AI 视频工具是否支持 depth guide。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# Depth Studio

> 把普通参考视频转换为时空一致的灰度深度视频，作为 AI 视频创作的空间引导。上游：[Toolsai/Depth-Studio](https://github.com/Toolsai/Depth-Studio) · 许可证：MIT

## 这是什么

Depth Studio 把一段参考视频转换为灰度深度视频：近处亮、远处暗，且整段视频共用同一亮度范围，避免逐帧亮度闪烁失真。兼容的 AI 视频工具可用这份深度引导更准确地理解角色姿态、动作、轮廓与镜头距离，从而支撑「换角色」「新增一个跟随相同动作的角色」「保持动作与场景间距贴近参考」等用法。

深度支持与否取决于你后续所用的 AI 视频工具或模型；本项目只负责生成深度视频，并不生成最终的角色视频。

## 怎么安装

方式一：交给 AI agent 安装

```
请帮我安装并启动这个项目：
https://github.com/Toolsai/Depth-Studio
```

方式二：Agent Skills CLI（需 Node.js 与 npx）

```bash
npx skills add Toolsai/Depth-Studio
```

方式三：手动克隆或复制

```bash
git clone https://github.com/Toolsai/Depth-Studio.git
```

方式四：不用 agent——在 GitHub 点 **Code → Download ZIP** 并解压（勿在 ZIP 内直接运行）：

- macOS：双击 `install-and-launch.command`
- Windows：双击 `install-and-launch.bat`

启动器会检查 Python、在项目目录内安装依赖、启动本地应用并打开默认浏览器；缺少 Python 时会提示官方下载地址。

## 怎么用

1. 点 **Browse** 选择一段参考视频
2. **Split** 保持 `0` 输出单个完整 MP4，或设为秒数按片段下载
3. 仅当你的下一个工具期望相反深度方向时才开启 **Invert depth**
4. 点 **Generate depth** 等待进度条完成
5. 并排对比原片与深度片，下载 MP4 或分段 ZIP

默认输出为「近处白、远处黑」。使用完点右上角 **Close app**；再次使用可重新运行启动器或让 agent 启动该 Skill。

## 注意事项

- **首次运行需联网**：会下载官方 Small 模型（约 116 MB）与 Python 依赖；无需 Hugging Face / GitHub / 模型账号登录。推荐配置：Windows 10/11 64 位、16 GB 内存、10 GB 磁盘；Apple Silicon M1+；Python 3.10–3.12；现代 Chrome/Edge。
- **完全本地运行**：本项目不会把视频上传到云服务，临时作业文件在完成或失败后会被清理。
- **仅生成深度视频**：最终角色/画面效果取决于后续所用的 AI 视频工具是否支持 depth guide。
- **模型来源**：使用官方 Video-Depth-Anything Small 相对深度模型，模型与上游源代码保留 Apache 2.0 条款。
- **早期项目**：仅少量提交、单维护者、无正式 release，功能与稳定性以实测为准。
- 简单可用：无需 AI 供应商或 API Key，纯本地 CPU 或 NVIDIA GPU 处理（GPU 显著提速、无 GPU 可回退 CPU）。