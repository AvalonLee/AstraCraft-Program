---
record_type: entry-record
id: slate
name_zh: "Slate（场记）短片制作与拉片工作台"
name_en: "Slate"
summary_zh: "面向短片制作与拉片分析的本地 Web 工作台：以分镜 JSON 为唯一制作数据，串起剧本工作区、角色与场景资产、分镜与镜头创作、三层视频（转场 / 分镜 / 成集）；拉片线提供影片解构、台词 OCR/ASR、逐帧提取与深度动作。接入本地 ComfyUI 与云端 API 生图生视频，数据全部存本机。"
summary_en: "A local web workbench for short-film production and shot analysis: storyboard JSON drives script, assets, shots and three-layer videos, with film deconstruction, ComfyUI and cloud API integrations."
category: design-creative
mode: deploy
tags: [short-drama, storyboard, video-production, ai-agent]
languages: [python, typescript]
doc_languages: [zh]
license: MIT
homepage: https://github.com/coracoo/Slate
repo: https://github.com/coracoo/Slate
tier: standard
metrics:
  stars: 51
  pushed_at: "2026-10-07T07:42:26Z"
  checked_at: "2026-10-29"
  archived: false
related: [short-drama, video-production]
aliases: ["场记", "Slate"]
risk_notes: "目前主要支持 Windows 本机部署，macOS / Linux 与无桌面服务器的完整链路未验证；Python 必须用 uv 固定 3.12 并安装锁文件（勿用系统 Python 建 venv），前端需 Node 构建并装 FFmpeg；服务监听 0.0.0.0:8775，管理接口面向可信网络，不要直接映射公网；首次启动不启用任何 AI 厂商，需在环境检查中手动配置。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# Slate（场记）短片制作与拉片工作台

> 从剧本、分镜、人物与场景资产，到关键帧、视频片段、角色音色和集视频，在一个本地项目中管理。上游：[coracoo/Slate](https://github.com/coracoo/Slate) · 许可证：MIT

## 这是什么

Slate（场记）是面向短片制作与拉片分析的本地 Web 工作台（MIT，中文）：制作数据以**分镜 JSON** 为依据，生成结果和请求记录都保存在本机。

两条主线：**制作线**——剧本工作区（批量候选、差异对照、批量确认）→ 角色设定（小传、外观、演绎、关系、音色）→ 视觉素材 → 分镜设计 → 镜头创作，三层视频（S 转场 / V 分镜 / E 成集）分别管理参考帧、视频与宫格提示词，支持关键帧采用与尾帧续接；**拉片线**——影片解构、台词 OCR/ASR、逐帧提取、深度动作与镜头讲解。生成入口接本地 ComfyUI、ChatGPT 网页生图（chrome-use）和已适配的云端 API；后台任务异步提交轮询，未知结果不盲目重发。

## 怎么部署运行

目前主要支持 **Windows 本机部署**。前置：Git、uv + Python 3.12、Node.js 22 LTS、FFmpeg（Chrome / ComfyUI / Blender 按需）。PowerShell 中：

```powershell
git clone https://github.com/coracoo/Slate.git; cd Slate
uv python install 3.12
uv venv --python 3.12 --seed .venv
.\.venv\Scripts\python.exe -m pip install --require-hashes -r requirements-win-py312.lock
Push-Location workbench/web; npm ci; npm run build; Pop-Location
.\.venv\Scripts\python.exe workbench/server.py 8775   # 打开 http://127.0.0.1:8775
```

挂机常驻用 `.\.venv\Scripts\python.exe workbench\keepalive.py 8775`（进程退出自动重启）；优雅停止创建 `workbench/STOP` 文件；仓库根有 `安装开机自启.bat` 可选装。

## 怎么用

打开首页新建「制作」项目（无需先上传影片），进入**环境检查**填写 API Key、模型与地址，手动启用需要的厂商（首次启动不启用任何 AI 厂商）。之后按制作线从剧本走到镜头创作，用平面 / 动态白模 / 3D 做空间验证；拉片线导入影片做解构与逐帧分析。

## 注意事项

- **平台限制**：Windows 优先，macOS / Linux 与无桌面服务器完整链路未验证。
- **环境纪律**：必须用 `requirements-win-py312.lock`（含哈希锁版本），不要用系统 Python 或其他版本建环境；更新走 `git pull --ff-only` 后重装依赖并重建前端。
- **网络安全**：服务监听 `0.0.0.0:8775`，管理接口面向可信网络，不要把整个工作台直接映射到公网；GPU 需求是本地模型与深度推理另算，工作台本身不要求。
- MIT 许可，可商用；上游持续活跃开发中，接口与流程可能随版本调整。
