---
record_type: entry-record
id: huobao-canvas
name_zh: "AI Canvas 可视化创作画布"
name_en: "AI Canvas"
summary_zh: "基于 Vue Flow 的节点式 AI 创作画布：在无限画布中连接文本、文生图、图片、视频生成与视频节点，支持 AI 提示词润色、分镜自动编排、图生视频、撤销重做和本地多项目存储。"
summary_en: "A Vue Flow based visual AI canvas for text-to-image, image-to-video and storyboard workflows, with prompt polish, automatic orchestration, undo/redo, and local projects."
category: design-creative
kind: framework
tags: [canvas, image-generation, video-production, prompt-engineering, ai-agent]
languages: [vue, typescript]
doc_languages: [zh]
license: MIT
homepage: https://marketing.chatfire.site/huobao-canvas/
repo: https://github.com/chatfire-AI/huobao-canvas
tier: standard
metrics:
  stars: 809
  pushed_at: "2026-09-10T14:51:41Z"
  checked_at: "2026-09-10"
  archived: false
related: []
aliases: ["AI Canvas"]
risk_notes: "需要自备 OpenAI 兼容 API Base URL、Key 与模型；自动执行质量取决于模型能力；本地项目数据持久化在浏览器/本地存储中，生产使用请自行备份。"
added_at: "2026-09-10"
updated_at: "2026-09-10"
---

# AI Canvas 可视化创作画布

> 基于 Vue Flow 的可视化 AI 创作画布。上游：[chatfire-AI/huobao-canvas](https://github.com/chatfire-AI/huobao-canvas) · 许可证：MIT · 约 0.8k stars

## 这是什么

AI Canvas 把 AI 图像与视频生成拆成可拖拽的节点，用无限画布承载从提示词到成片的工作流：

- **节点编排**：文本节点、文生图配置、图片节点、视频生成配置和视频节点可自由拖拽、缩放、连接。
- **图像与视频**：支持配置模型、尺寸、数量生成图片；图生视频可设置首帧/尾帧。
- **自动执行**：AI 分析用户意图后自动编排并串行执行 `text_to_image`、`text_to_image_to_video` 或 `storyboard` 工作流。
- **分镜一致性**：分镜模式下先生成角色参考图，再依次生成各分镜并连接角色参考以保持外观一致。
- **创作辅助**：AI 提示词润色、深/浅主题、撤销/重做、项目本地持久化与多项目管理。

## 怎么安装

```bash
git clone https://github.com/chatfire-AI/huobao-canvas.git
cd huobao-canvas
npm install
npm run dev
```

如使用 pnpm，可替换为 `pnpm install && pnpm dev`；生产构建用 `npm run build` 或 `pnpm build`。

## 怎么用

1. 启动后打开 Web 界面，进入画布。
2. 点击右上角设置图标，配置 OpenAI 兼容 API 的 Base URL、API Key 和模型。
3. 在画布中添加文本节点与文生图配置节点，连接并生成图片。
4. 需要视频时添加视频生成配置节点，设置首帧/尾帧并连接到视频节点。
5. 也可以开启「自动执行」，直接输入需求或分镜描述，让系统自动创建并执行工作流。

## 注意事项

- API 必须兼容 OpenAI 接口；实际可用模型、速率与费用取决于你配置的服务。
- 自动分镜依赖模型对中文意图、角色与场景的解析能力，复杂提示建议手动检查节点参数。
- 项目数据支持本地持久化，但浏览器清理存储或换设备前请导出/备份项目。
- README 声明 MIT 许可；如需商用仍应自行核验最新 LICENSE 与第三方依赖条款。
