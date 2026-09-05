---
record_type: entry-record
id: openscreen
name_zh: "OpenScreen 开源录屏演示工具"
name_en: "OpenScreen"
summary_zh: "Screen Studio 的免费开源替代：录屏 + 自动缩放跟随光标 + 自定义光标主题 + 本地离线字幕 + 运动模糊 + 时间线标注，导出 MP4 / GIF 多比例多分辨率；100% 免费（个人和商用）、无订阅、无水印、无付费墙。已官宣即将归档，社区 fork 由核心贡献者继续维护。"
summary_en: "Open-source alternative to Screen Studio: screen recording with auto-zoom, cursor themes, offline captions, motion blur, timeline annotations, and MP4/GIF export."
category: design-creative
kind: framework
tags: [video-production, product-video, short-video, social-media]
languages: [typescript]
doc_languages: [en, zh, ja, ko, ar, es, fr, it, pt, ru, tr, vi]
license: MIT
homepage: https://github.com/siddharthvaddem/openscreen
repo: https://github.com/siddharthvaddem/openscreen
tier: standard
metrics:
  stars: 39904
  pushed_at: "2026-06-17T02:34:20Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [openscreen, Open Screen, Screen Studio alternative]
risk_notes: "原作者已官宣即将归档（README 顶部 WARNING），社区 fork 由核心贡献者在 [EtienneLescot/openscreen](https://github.com/EtienneLescot/openscreen) 继续维护——长期使用建议关注 fork；不是 Screen Studio 1:1 克隆，覆盖核心功能但有 bug；macOS 需要 Screen Recording + Accessibility 权限，升级后需重置隐私权限。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# OpenScreen 开源录屏演示工具

> Free, open-source alternative to Screen Studio。上游：[siddharthvaddem/openscreen](https://github.com/siddharthvaddem/openscreen) · 许可证：MIT · 39.9k stars · 已官宣即将归档

## 这是什么

OpenScreen 是 Screen Studio（$29/月）的免费开源替代：录屏 → 自动缩放跟随光标 → 精致光标动画 → 本地离线字幕 → 导出 MP4 / GIF。适合做产品 demo、walkthrough，发 X / Reddit / YouTube。100% 免费（个人 + 商用），无订阅、无水印、无付费墙。

**核心特性**：

- **录制**：指定窗口或全屏；麦克风 + 系统音频；webcam 画中画（拖拽定位 / 镜像 / 形状选项）
- **缩放**：自动缩放跟随光标（可调深度 / 时长 / easing / 像素级位置）或手动缩放
- **光标**：自定义大小 / 平滑 / 点击效果 / 光标主题 / 后期路径平滑
- **字幕**：本地离线自动生成（不上传）
- **背景**：壁纸 / 纯色 / 渐变 / 自定义背景图
- **运动模糊**：转场模糊效果
- **时间线**：裁剪 / 修剪 / 逐段变速 / 吸附参考线 / 音频波形
- **标注**：文字 / 箭头 / 图片，带文字动画预设
- **导出**：MP4 / GIF，多比例（16:9 / 9:16 / 1:1）多分辨率
- **12 种语言**：阿拉伯语 / 英语 / 西语 / 法语 / 意语 / 日语 / 韩语 / 葡语 / 俄语 / 土耳其语 / 越南语 / 简中 / 繁中

## 怎么安装

**macOS（Homebrew）：**

```bash
brew install --cask siddharthvaddem/openscreen/openscreen
```

**Windows（winget）：**

```bash
winget install SiddharthVaddem.OpenScreen
```

**Linux**：从 [Releases](https://github.com/siddharthvaddem/openscreen/releases) 下载 `.deb` / `.pacman` / `.rpm`。

## 怎么用

1. 打开 OpenScreen → 选择录制窗口或全屏
2. 录制（可选 webcam 画中画 + 麦克风 + 系统音频）
3. 停止后进入编辑器：自动缩放已按光标位置生成，可调深度和 easing
4. 时间线裁剪 / 修剪 / 加标注 / 加背景
5. 导出 MP4（多比例多分辨率）或 GIF

## 注意事项

- **许可证 MIT**：100% 免费商用，无水印。
- **项目即将归档**：原作者已官宣（README 顶部 WARNING），社区 fork 由核心贡献者在 [EtienneLescot/openscreen](https://github.com/EtienneLescot/openscreen) 继续维护；长期使用建议关注 fork 或自行维护。
- **macOS 权限**：需要 Screen Recording + Accessibility 权限；升级后权限失效需在系统设置删除旧条目重装。
- **bug 预期**：side project 起家非生产级，核心功能覆盖但可能有 bug。
