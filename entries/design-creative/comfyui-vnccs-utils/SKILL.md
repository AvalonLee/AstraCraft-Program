---
record_type: entry-record
id: comfyui-vnccs-utils
name_zh: "VNCCS Utils ComfyUI 创作工具箱"
name_en: "ComfyUI VNCCS Utils"
summary_zh: "为 ComfyUI 提供图生 3D 高斯场景、无限画布图像编辑、3D 姿态与关键帧生成、视觉相机控制和模型管理等节点，把图像生成、局部编辑、姿态控制与模型管理收进同一套工作流。"
summary_en: "A ComfyUI utility collection for image-to-3D Gaussian scenes, infinite-canvas editing, 3D pose and keyframe generation, visual camera control, and model management."
category: design-creative
kind: framework
tags: [comfyui, image-generation, canvas, video-production, model-manager]
languages: [javascript, python]
doc_languages: [en]
license: MIT
homepage: https://github.com/AHEKOT/ComfyUI_VNCCS_Utils
repo: https://github.com/AHEKOT/ComfyUI_VNCCS_Utils
tier: standard
metrics:
  stars: 1062
  pushed_at: "2026-09-11T05:26:35Z"
  checked_at: "2026-09-24"
  archived: false
related: []
aliases: []
risk_notes: "VNCCS 3D Factory 依赖本地 TripoSplat 推理与模型权重下载，实际效果受 GPU/显存和模型选择影响；新增节点或依赖后需重启 ComfyUI。"
added_at: "2026-09-10"
updated_at: "2026-09-10"
---

# VNCCS Utils ComfyUI 创作工具箱

> ComfyUI 里的 VNCCS 通用节点集合。上游：[AHEKOT/ComfyUI_VNCCS_Utils](https://github.com/AHEKOT/ComfyUI_VNCCS_Utils) · 许可证：MIT · 约 1.1k stars

## 这是什么

VNCCS Utils 是从 VNCCS 项目中抽出的 ComfyUI 工具节点集，核心包含四个方向：

- **VNCCS 3D Factory**：把参考图送入本地 TripoSplat 管线，生成可编辑的 3D Gaussian 场景，支持场景持久化、Gaussian PLY 导入导出、视口变换、多相机渲染和 `.vnccs3d` 资产包。
- **VNCCS UniCanvas**：在 ComfyUI 内提供无限画布与图层式图像编辑，支持选区生成、局部重绘、外扩、掩膜、对象选择、生成结果回写图层。
- **VNCCS Pose Studio**：用交互式 3D 视口摆姿和生成姿态序列，支持人体形态调节、多姿态标签页、关键帧时间线、Mixamo FBX 动画导入与批量导出。
- **辅助节点**：视觉相机控制、QWEN Detailer、模型管理器与选择器、BBox Extractor 等，覆盖多角度提示、局部增强、模型下载与模型选择。

## 怎么安装

```bash
cd /path/to/ComfyUI/custom_nodes
git clone https://github.com/AHEKOT/ComfyUI_VNCCS_Utils.git
cd ComfyUI_VNCCS_Utils
pip install -r requirements.txt
```

也可以用 **ComfyUI Manager → Custom Nodes Manager** 搜索 `VNCCS Utils` 安装。安装后重启 ComfyUI。

## 怎么用

- 图像生成与编辑：在工作流中调用 **VNCCS UniCanvas**，把画布图层、选区或掩膜接到生成/编辑节点。
- 3D 场景：打开 **VNCCS 3D Factory**，先在模型设置中检测或下载 TripoSplat 权重，再加载参考图生成、编辑和导出 Gaussian PLY。
- 姿态与动画：使用 **VNCCS Pose Studio** 调整骨骼、导入 Mixamo 动画、设置关键帧或批量导出姿态列表/网格。
- 模型管理：把 HuggingFace 模型仓库 ID 填给 **VNCCS Model Manager**，用 **Model Selector** 搜索、下载或切换模型。
- 多角度提示：用 **Visual Camera Control** 调整方位角、距离与仰角，生成适配多角度 LoRA 的提示。

## 注意事项

- 3D Factory 使用本地 TripoSplat 推理，权重默认落在 `ComfyUI/models/{diffusion_models,vae,clip_vision,background_removal}`；也支持 ComfyUI `extra_model_paths`。
- 模型管理器的受限 Civitai 下载需要自行配置 API Key。
- 新装依赖或节点后必须重启 ComfyUI；3D 生成请预留足够 GPU/显存。
- 上游为 MIT 许可，功能示例工作流见仓库 `workflows/` 与 `docs/`。
