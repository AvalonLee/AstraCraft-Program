---
record_type: entry-record
id: gsap
name_zh: "GSAP 动画平台"
name_en: "GSAP — GreenSock Animation Platform"
summary_zh: "高性能 JavaScript 动画库：统一驱动 CSS、SVG、Canvas、WebGL 与通用对象的时间轴动画，内置 ScrollTrigger、Flip、MotionPath 等插件，适合交互页面、数据可视化和产品演示的动效实现。"
summary_en: "A high-performance JavaScript animation library for CSS, SVG, Canvas, WebGL and generic objects, with a timeline API and plugins such as ScrollTrigger, Flip and MotionPath."
category: design-creative
kind: framework
tags: [gsap, motion-design, animation, web-animation, frontend, framework]
languages: [javascript, typescript]
doc_languages: [en]
license: LicenseRef-GSAP-Standard-No-Charge
homepage: https://gsap.com
repo: https://github.com/greensock/GSAP
docs_url: https://gsap.com/docs/v3/
tier: core
metrics:
  stars: 28252
  pushed_at: "2026-04-13T13:08:58Z"
  checked_at: "2026-09-05"
  archived: false
related: [remotion-skills]
aliases: [GreenSock Animation Platform, GreenSock]
risk_notes: 上游仓库无根 LICENSE 文件，package.json 标注 Standard 'no charge' license（https://gsap.com/standard-license），非 OSI 开源协议；使用或商用前需复核许可全文。安装会引入第三方运行时代码；官方文档以英文为主。
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# GSAP 动画平台

> 高性能 JavaScript 动画库，也是 Web 动效领域的事实标准之一。上游：[greensock/GSAP](https://github.com/greensock/GSAP) · 许可证：[Standard “no charge” license](https://gsap.com/standard-license)

## 这是什么

GSAP（GreenSock Animation Platform）是 GreenSock / Webflow 维护的 JavaScript 动画框架。它用统一的时间轴、缓动和补间系统驱动 CSS、SVG、Canvas、WebGL、React/Vue 状态或任意 JavaScript 对象，核心库覆盖补间动画与序列控制，插件覆盖滚动触发、布局翻转、运动路径、拖拽和文本动画等场景。

## 怎么安装

在项目根目录执行：

```bash
npm install gsap
```

然后在入口文件或组件中导入：

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

## 怎么用

最小补间示例如下：

```js
gsap.to(".card", {
  y: 0,
  opacity: 1,
  duration: 0.6,
  ease: "power3.out",
});
```

复杂序列用 `gsap.timeline()` 管理；滚动动画先把 `ScrollTrigger` 注册到 GSAP，再在 `scrollTrigger` 配置中声明触发位置和 scrub 行为。

## 注意事项

- **许可证特殊**：上游没有仓库根 `LICENSE` 文件，`package.json` 标注 Standard “no charge” license；这不是 OSI 开源协议，商用前请复核 [GSAP Standard License](https://gsap.com/standard-license) 全文。
- **运行时依赖**：GSAP 是浏览器/运行时库，安装后仍需结合目标项目的前端工具链使用。
- **文档语言**：官方文档与 API 参考以英文为主。
