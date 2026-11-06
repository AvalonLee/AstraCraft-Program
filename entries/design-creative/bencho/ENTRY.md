---
record_type: entry-record
id: bencho
name_zh: "Bencho 交互动效块与界面音效"
name_en: "Bencho"
summary_zh: "46 个可直接拷进项目的 React 交互动效块（悬停、拖拽、滑动、按压、输入、选择六类）配 24 个零素材合成的界面音效，一个单文件播放；无 npm 包，复制目录即用。"
summary_en: "46 interactive React blocks (hover, drag, swipe, press, type, select) plus 24 synthesized UI sounds in one zero-asset file: copy a folder, ship it."
category: design-creative
mode: install
tags: [motion-design, react, micro-interactions, web-audio, ui-animation]
languages: [typescript]
doc_languages: [en]
license: MIT
homepage: https://bencho.dev
repo: https://github.com/cabralorenzo/bencho
tier: watch
metrics:
  stars: 87
  pushed_at: "2026-11-03T20:28:07Z"
  checked_at: "2026-11-06"
  archived: false
aliases: ["Bencho", "bencho.dev"]
related: [shadcn-ui, animate-ui]
risk_notes: "单人维护、创建约三周、无 release 与版本 tag、无 CI 与测试，升级需手动重拷目录；PR 实际不合并（仓库由 bencho.dev 生成，真源在站点），只能靠 Issue 反馈；免费 46 块属完整 MIT，站点上的 Pro 块另按 Bencho Pro 许可，Bencho 名称与 goat 商标、站点照片不在授权范围；beacon / plop 两个音效重建自第三方素材，依赖 framer-motion、lucide-react 等各自协议。"
added_at: "2026-11-06"
updated_at: "2026-11-06"
---

# Bencho 交互动效块与界面音效

> 一个文件夹一个微交互，外加 24 个不用素材文件的界面音效。上游：[cabralorenzo/bencho](https://github.com/cabralorenzo/bencho) · 许可证：MIT

## 这是什么

一组**复制目录即用**的 React 交互动效块（★87，新项目）：46 个免费块按悬停、拖拽、滑动、按压、输入、选择六种手势分类，每块是一个 `.tsx` + `.css` + props 说明的独立目录，不依赖 Tailwind，用原生 CSS 变量做明暗配色。附带 24 个**合成音效**：全部写在一个 7.8KB 的 `sounds/sounds.ts` 里（Web Audio 现场合成，零音频文件、零依赖），`play("tick", { volume: 0.8 })` 一行调用。没有 npm 包，走的是「把文件夹拷进你的项目」路线。

## 怎么安装

把要的块目录拷进项目，再按块的说明装依赖（约 12 块零依赖，其余需 framer-motion / lucide-react，个别要 three）：

```bash
cp -r blocks/like src/components/like
npm install framer-motion lucide-react   # 按 blocks/README.md 的依赖表逐块选装
```

主题令牌在项目样式入口引一次：`import "./tokens.css"`（提供明暗两套 CSS 变量）。想先本地看全部效果：仓库根目录 `npm install && npm run dev`（Vite playground）。

## 怎么用

组件直接 import 使用，props 说明在每个块目录自己的 README 里；音效引 `sounds/sounds.ts` 后按名字播放，音量与速率可调。动效与声音配合时用在按钮按压、状态切换、消息送达这类短反馈上，别给每个交互都配音。

## 注意事项

- **协议分层**：仓库内 46 个免费块是完整 MIT；站点上的 Pro 块另属 Bencho Pro 许可；**Bencho 名称与 goat 商标、bencho.dev 上的照片不在授权范围**，做品牌时不要沿用。
- **成熟度**：单人维护、无 release / tag、无 CI 与测试，Issue 有人响应但 PR 不合并（仓库由站点生成），升级靠手动重拷。
- **第三方素材**：beacon、plop 两个音效重建自 cuelume 素材，依赖库（framer-motion、lucide-react、liquid-gooey）各自协议需一并遵守。
