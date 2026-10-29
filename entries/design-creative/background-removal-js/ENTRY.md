---
record_type: entry-record
id: background-removal-js
name_zh: "Background Removal JS 浏览器端抠图库"
name_en: "@imgly/background-removal"
summary_zh: "IMG.LY 开源的浏览器 / Node.js 图片背景移除库：ONNX Runtime + ISNet 分割模型全部在本地设备推理，图片不上传、无按张计费；npm 一行接入，支持输出前景 / 背景 / 蒙版、GPU（WebGPU）加速、量化小模型与模型资产自托管。"
summary_en: "IMG.LY's open-source library that removes image backgrounds in the browser or Node.js via ONNX Runtime and ISNet models — no uploads, no per-image cost, with WebGPU support."
category: design-creative
mode: connect
tags: [image-editing, image-matting, background-removal, onnx, browser]
languages: [typescript]
doc_languages: [en]
license: AGPL-3.0
homepage: https://img.ly/showcases/cesdk/web/background-removal/web
repo: https://github.com/imgly/background-removal-js
docs_url: https://www.npmjs.com/package/@imgly/background-removal
tier: standard
metrics:
  stars: 7360
  pushed_at: "2025-07-18T12:56:39Z"
  checked_at: "2026-10-29"
  archived: false
aliases: ["imgly/background-removal-js", "@imgly/background-removal", "@imgly/background-removal-node"]
risk_notes: "AGPL-3.0：闭源商业产品集成需按协议开源或向 IMG.LY 购买商业授权；默认从 IMG.LY 静态 CDN（staticimgly.com）拉取模型与 WASM（约 40–80MB），隐私敏感场景应自托管资产并配置 publicPath；浏览器端推理在低端设备上较慢。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# Background Removal JS 浏览器端抠图库

> 在浏览器 / Node.js 里本地完成图片抠图：图片不上传、无按张计费。上游：[imgly/background-removal-js](https://github.com/imgly/background-removal-js) · 许可证：AGPL-3.0

## 这是什么

IMG.LY（商用创意 SDK 厂商）开源的图像背景移除库（★7.4k），提供两个 npm 包：`@imgly/background-removal`（浏览器端）与 `@imgly/background-removal-node`（Node.js）。推理基于 ONNX Runtime（WASM / WebGPU）与 ISNet 图像分割模型，全程在本地设备完成，不需要部署后端，也没有云 API 的按张计费。模型与 WASM 资产默认由 IMG.LY 静态 CDN 托管，支持切换成自托管；库本体亦可与 IMG.LY 的 CreativeEditor SDK 配合，但无强制依赖。

## 怎么接入

浏览器包需一并安装 peer 依赖 `onnxruntime-web`（要求 1.21.0）：

```bash
npm install @imgly/background-removal onnxruntime-web@1.21.0
```

Node.js 环境改用独立包，无需 peer 依赖：

```bash
npm install @imgly/background-removal-node
```

一行调用（浏览器端为默认导出，Node 端为命名导出）：

```typescript
import imglyRemoveBackground from "@imgly/background-removal";

const blob = await imglyRemoveBackground(imageSrc);
// imageSrc 支持 URL / string / Blob / File / ImageData / ArrayBuffer / Uint8Array
// 返回 PNG Blob，可 URL.createObjectURL(blob) 后赋给 <img>.src
```

## 怎么用

传入图片源即可拿到抠图结果，可选配置项控制模型、设备与输出：

```typescript
const blob = await imglyRemoveBackground(imageSrc, {
  device: "gpu", // "cpu" | "gpu"（gpu 走 WebGPU，可用时更快）
  model: "isnet_fp16", // "isnet" | "isnet_fp16"（默认，~80MB）| "isnet_quint8"（~40MB，更小但有瑕疵）
  output: {
    format: "image/png", // 或 image/jpeg / image/webp
    type: "foreground", // "foreground" 前景 | "background" 背景 | "mask" 蒙版
    quality: 0.8,
  },
});
```

首次运行会按需下载模型与 WASM 文件（几十 MB），浏览器与模型缓存会让后续调用明显变快；典型用途是电商商品图实时去背、在线设计工具的内嵌抠图。

## 注意事项

- **协议**：AGPL-3.0——闭源商业产品集成需向 IMG.LY 购买商业授权（上游 README 注明联系 support@img.ly），或按协议履行开源义务。
- **模型资产外链**：默认从 IMG.LY CDN（staticimgly.com）下载模型与 WASM，约 40–80MB；面向隐私敏感场景请自托管资产并通过 `publicPath` 指向自有地址。
- **框架兼容**：Web 包上游 README 说明目前仅支持 NextJS 15；低端设备上纯浏览器推理速度有限，可改用量化小模型 `isnet_quint8`。
- **维护节奏**：上游最后推送为 2025-07，更新放缓但未归档，API 已稳定。
