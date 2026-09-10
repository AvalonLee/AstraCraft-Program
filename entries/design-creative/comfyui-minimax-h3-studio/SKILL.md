---
record_type: entry-record
id: comfyui-minimax-h3-studio
name_zh: "MiniMax H3 Studio ComfyUI 图像工作流"
name_en: "ComfyUI MiniMax H3 Studio"
summary_zh: "把 MiniMax H3 封装成 ComfyUI 图像生产工作流：支持文生图、图生图、最多 9 张参考图、角色化提示词、LightX/PDD 加速路径、TAEH3 预览、Face Refine 与基准矩阵测试，免去手工搭建复杂图。"
summary_en: "A ComfyUI custom node suite that turns MiniMax H3 into image workflows with text-to-image, editing, up to nine references, fast paths, previews, face refinement, and benchmarking."
category: design-creative
kind: framework
tags: [comfyui, image-generation, prompt-engineering, character-design, framework]
languages: [python]
doc_languages: [en]
license: MIT
homepage: https://github.com/thaakeno/ComfyUI-MiniMax-H3-Studio
repo: https://github.com/thaakeno/ComfyUI-MiniMax-H3-Studio
tier: watch
metrics:
  stars: 98
  pushed_at: "2026-08-20T13:58:21Z"
  checked_at: "2026-09-10"
  archived: false
related: []
aliases: ["H3 Studio", "MiniMax H3 Studio"]
risk_notes: "项目仍为 alpha，把音频-视频模型 H3 改用于图像生成，高分辨率/加速/后处理路径实验性强；暂不支持 ComfyUI Nodes 2.0；不自动下载核心 H3 模型，模型与显存要求较高。"
added_at: "2026-09-10"
updated_at: "2026-09-10"
---

# MiniMax H3 Studio ComfyUI 图像工作流

> Turn MiniMax H3 into an actual image workflow for ComfyUI。上游：[thaakeno/ComfyUI-MiniMax-H3-Studio](https://github.com/thaakeno/ComfyUI-MiniMax-H3-Studio) · 许可证：MIT · 约 0.1k stars

## 这是什么

H3 Studio 把 MiniMax H3 图像工作流所需的模型路由、参考条件、采样配置、帧选择、VAE 处理和提示词工具收进一个维护型节点套件：

- **One Image Director**：文生图、图生图和参考编辑共用一个界面，可选择比例/精确尺寸、采样配置、种子、运行时行为与帧策略。
- **多参考控制**：最多加入 9 张有序参考图，用 `@Image1`～`@Image9` 分别指定身份、姿态、服装、风格、构图、光线或环境等责任。
- **快速路径**：提供 Base 采样与 LightX/PDD 加速配置；主要快速 FL2VA 路径为 LightX v1.0 8-step，另有 4-step 与 REF2VA PDD 路径。
- **Face Refine**：先选择成品，再检测合格人脸，裁剪真实源区域走 H3 原生图像条件路径重绘，并用羽化/可选 SAM 掩膜融合回原图。
- **提示词分层**：区分像素分析、参考责任、生成指令与提示词编译，能把友好的 `@ImageN` 转成 H3 面向模型的 `<Picture N>`。
- **Benchmark Lab**：用受保护矩阵测试 Profile、分辨率和重复次数，执行前报告生成数量并阻止过大的矩阵。

## 怎么安装

```bash
cd /path/to/ComfyUI/custom_nodes
git clone https://github.com/thaakeno/ComfyUI-MiniMax-H3-Studio.git
cd ComfyUI-MiniMax-H3-Studio
python -m pip install -r requirements.txt
```

重启 ComfyUI、硬刷新前端后，打开 `example_workflows/H3_Studio_Unified_Image.json`。需要锁定当前发布版时可改用：

```bash
git clone --branch v0.1.0-alpha.20 --depth 1 https://github.com/thaakeno/ComfyUI-MiniMax-H3-Studio.git
```

## 怎么用

1. 在工作流中选择 H3 FL2VA / REF2VA 模型、32B 文本编码器和 H3 VAE。
2. 在 **H3 Studio Director** 中写提示词。
3. 需要参考时添加参考卡，并为每张图指定单一职责。
4. 选择采样配置、分辨率模式、帧配置和种子行为。
5. Queue 运行；可选开启 TAEH3 预览，或在 Face Refine 中选择 Auto/Strong。

## 注意事项

- **核心模型不自动下载**：需从上游表格给出的 HuggingFace/官方来源手动放置 diffusion models、text encoders 和 VAE。
- **实验性**：H3 原本是音频-视频模型，这里被社区改用于图像；高分辨率、T=1 VAE、LightX/PDD 与后处理路径可能变化。
- **ComfyUI Nodes 2.0 暂不支持**，当前 Director/Benchmark 界面面向 classic Nodes 1.0。
- PDD 需另行安装 `ComfyUI-MiniMaxH3-PDD-Mamad8`；Face Refine 的 YOLO/SAM 依赖可选。
- 代码为 MIT，但适配文件、外部模型与可选自定义节点保留各自许可证；`H3STUDIO_TELEMETRY=0` 可关闭计数遥测。
