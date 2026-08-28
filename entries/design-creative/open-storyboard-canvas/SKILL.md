---
record_type: entry-record
id: open-storyboard-canvas
name_zh: "Open Storyboard Canvas 开源画布"
name_en: "Open Storyboard Canvas"
summary_zh: "面向 AI 图片、视频与分镜创作的本地节点画布：把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台与全景环境放进同一块可无限扩展的画布，支持画布 Agent 协作与多供应商统一管理。"
summary_en: "A local node canvas for AI image, video and storyboard creation: references, prompts, generation, storyboard, director desk and panoramas in one canvas with agent collaboration."
category: design-creative
kind: framework
tags: [storyboard, image-generation, video-production, ai-agent, cinematic, prompt-engineering]
languages: [typescript, rust]
doc_languages: [zh, en]
license: MIT
homepage: https://github.com/ganbo-gab/open-storyboard-canvas
repo: https://github.com/ganbo-gab/open-storyboard-canvas
tier: standard
aliases: [Open Storyboard Canvas, 开源画布]
risk_notes: 使用付费 AI 供应商或本地 Dreamina CLI，生成时提示词与参考素材会发送给所选供应商并可能产生费用；macOS 安装包未签名公证；基于 Storyboard-Copilot 二次开发，新增代码按 MIT 发布。
added_at: "2026-08-27"
updated_at: "2026-08-27"
---

# Open Storyboard Canvas 开源画布

> 面向 AI 图片、视频与分镜创作的本地节点画布。上游：[ganbo-gab/open-storyboard-canvas](https://github.com/ganbo-gab/open-storyboard-canvas) · 许可证：MIT

## 这是什么

Open Storyboard Canvas 把参考素材、提示词、AI 生图/生视频、分镜拆解、导演台、全景环境和结果管理放进一块可无限扩展的本地画布中。不是"输入提示词—下载图片"的单次生成器，而是可连接、可追踪、可继续编辑的创作工作流。应用基于 Tauri 2、React、TypeScript 与 Rust 构建，支持 macOS 与 Windows。

核心能力：节点画布与标签组收纳素材；可直接在画布右侧对话的画布 Agent（测试版）；从零生图、参考图编辑、图生视频与分镜派生；3D 导演台与全景搭景；支持 Agnes、OpenAI 兼容及本地 Dreamina（即梦）CLI 等供应商；提示词库与批量导入、多语言界面与本地持久化。

## 怎么安装

桌面应用建议从 [GitHub Releases](https://github.com/ganbo-gab/open-storyboard-canvas/releases/latest) 下载安装包：

- Windows：`open-storyboard-canvas_<版本>_x64-setup.exe`
- macOS：`open-storyboard-canvas_<版本>_universal.dmg`

源码本地开发：

```bash
git clone https://github.com/ganbo-gab/open-storyboard-canvas.git
cd open-storyboard-canvas
npm install

# 前端开发
npm run dev

# 源码桌面应用
npm run tauri dev
```

## 怎么用

1. 新建或打开一个画布项目
2. 在"设置 → 我的配置"中添加文本/图片/视频供应商，或配置 Dreamina CLI
3. 从左侧创建上传、AI 图片、AI 视频、导演台或标签组节点
4. 在节点上手动生成，或点击画布右上角 Agent 协助完成任务
5. 生成失败时从左侧"日志"查看可读原因，有安全任务句柄时可重新获取结果

## 注意事项

- **供应商与费用**：API Key 与自定义供应商配置保存在本地设置；生成时提示词、参考素材会发送给所选供应商，计费以其服务条款为准。
- **画布 Agent 为测试版**：不同文本模型的工具调用质量存在差异，涉及付费生成、配置修改或删除操作时请留意执行模式。
- **macOS 安装包**未签名和公证，首次打开被拦截时需在"系统设置 → 隐私与安全性"中允许打开。
- **上游归属**：基于 Storyboard-Copilot 二次开发并获原作者（henjicc/痕继痕迹）授权，新增代码按 MIT 发布。
- 项目文件、节点与媒体默认保存在本机应用数据目录，无云同步账号系统。