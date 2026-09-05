---
record_type: entry-record
id: cowart
name_zh: "Cowart Codex 无限画布"
name_en: "Cowart"
summary_zh: "面向 Codex 的原生无限画布 widget 插件（基于 tldraw）：在 Codex 内直接打开可视化画布用于构思、标注、AI 图片生成与迭代；AI 图片框按框位置和比例生成并替换、标注截图自动去痕生成修订图、AI HTML 框生成可运行单文件页面、AI Slides 组合为 16:9 演示文稿；画布数据持久化到项目目录。"
summary_en: "A native infinite-canvas widget plugin for Codex built on tldraw: brainstorm, annotate, generate AI images and HTML blocks, and slide decks directly inside Codex."
category: design-creative
kind: skill
tags: [canvas, ai-agent, codex, image-generation, mcp, skill]
languages: [typescript]
doc_languages: [zh, en]
license: MIT
homepage: https://cowart.jiqiren.ai
repo: https://github.com/zhongerxin/Cowart
tier: standard
metrics:
  stars: 5826
  pushed_at: "2026-08-29T16:14:37Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [cowart, Codex Canvas]
risk_notes: "需要 Codex 桌面端（非 CLI），安装后必须完全退出并重启 Codex 才能加载 skill 和 MCP 工具；画布数据保存到当前项目的 canvas/ 目录而非插件仓库；遵循 Agent Plugins v1.0.0 规范，MCP bundle 自包含（无需 npm install）；网页版 cowart.jiqiren.ai 无需安装但功能与桌面插件有差异。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Cowart Codex 无限画布

> 面向 Codex 的原生无限画布 widget 插件。上游：[zhongerxin/Cowart](https://github.com/zhongerxin/Cowart) · 许可证：MIT · 5.8k stars · 画布基于 [tldraw](https://github.com/tldraw/tldraw)

## 这是什么

Cowart 是一个 Codex 原生无限画布 widget 插件：不需要打开浏览器或 in-app browser，Codex 内直接弹出一个 tldraw 无限画布。构思、标注、生成图片、迭代图片——人和 Codex 在同一块画布上协作，画布数据保存到当前项目目录。

**核心能力**：

| 能力 | 说明 |
|------|------|
| **AI 图片框** | 在画布中创建框 → 输入 prompt + 选参考图 → Codex 按框的位置和比例生成图片替换它 |
| **标注修改** | 对图片做标注（箭头 / 文字）→ 选中 → 按标注修改 → 导出含标注的截图发给 Codex → 生成去掉标注的干净新图，放原图旁边 |
| **AI HTML 框** | 创建 16:9 的 HTML 框 → prompt + 参考图 → Codex 生成可运行的单文件 HTML 嵌入画布，继续编辑或迭代 |
| **AI Slides** | 把画布中的图片和 HTML 组织成演示文稿，或让 Codex 按指定页数生成一组 16:9 HTML 页面；支持缩略图预览 + 全屏播放 + 交互保留 |
| **MCP 工具** | `render_cowart_canvas_widget` 打开画布；读取选择状态、保存画布、插入图片或 HTML |

**3 个内置 Skill**：`cowart-open-canvas`（打开画布）、`cowart-image-gen`（prompt → 生成图片替换框）、`cowart-image-edit`（标注截图 → 修订图）。

**插件规范**：遵循 [Agent Plugins v1.0.0](https://agent-plugins.org/specification)；根目录 `plugin.json` / `skills/` / `mcp.json` 提供可移植入口，`.codex-plugin/` 提供 Codex 专用界面。MCP bundle 自包含 + 预构建 Widget，安装后不在插件缓存里跑 npm install。

## 怎么安装

**让 Codex 自动安装（推荐）：**

把下面这段发给 Codex：

```text
请通过 Cowart 仓库自带的 Git marketplace 安装 Cowart Codex 插件。
先运行 codex plugin marketplace add zhongerxin/Cowart --ref main，
再运行 codex plugin add cowart@cowart-github，并用 codex plugin list 确认插件已启用。
安装完成后请提醒我完全退出并重新启动一次 Codex。
```

**手动安装：**

```bash
codex plugin marketplace add zhongerxin/Cowart --ref main
codex plugin add cowart@cowart-github
codex plugin list
```

安装后必须完全退出并重启 Codex。

**网页版（无需安装）：** 在 Codex 内置浏览器中打开 [cowart.jiqiren.ai](https://cowart.jiqiren.ai/)。

## 怎么用

```text
Open the Cowart canvas for this project.
```

画布数据保存到：

```text
canvas/pages/<page-id>/cowart-canvas.json
canvas/pages/<page-id>/assets/
```

**生成新图**：创建 AI 图片框 → 输入 prompt / 选参考图 → Codex 按框的位置和比例生成 → 框被替换成普通图片形状。

**标注修改**：在图片上画箭头 / 加文字 → 选中 → 按标注修改 → Codex 读取标注 → 生成干净新图放原图旁。

**AI Slides 演示**：创建 Slides 框 → 拖入图片或 HTML → 或让 Codex 按页数生成 → 演示 Slides 全屏播放（方向键翻页，HTML 交互保留）。

## 注意事项

- **许可证 MIT**：可自由商用。
- **Codex 专属**：需要 Codex 桌面端（widget 原生嵌入），不适用于 Claude Code / Cursor 等其他 agent。
- **安装后重启**：MCP 工具和 skill 需要重启后加载；更新后同样需要重启。
- **画布持久化**：数据在项目 `canvas/` 目录，跟随项目走，不在插件仓库里。
