---
record_type: entry-record
id: mythpen
name_zh: "Mythpen AI 小说写作台"
name_en: "Mythpen"
summary_zh: "本地优先的 AI 辅助小说写作桌面应用（Tauri 2）：角色 / 关系 / 伏笔 / 爽点 / 世界观 / 时间线一体管理；AI 写作分六步引导与协作共写两种模式，TXT/EPUB 导书自动拆卷章并反向构建设定，爽点看板规划打脸反转节奏；8 语言界面，数据存本机 SQLite，需自备 OpenAI / Claude API Key。"
summary_en: "Local-first AI novel-writing desktop app (Tauri 2): characters, foreshadowing, payoff beats and timelines; guided and co-writer AI modes, TXT/EPUB import, 8-language UI, local SQLite storage."
category: writing-docs
mode: deploy
tags: [novel-writing, web-fiction, writing, ai-agent, tauri, local-first]
languages: [typescript, rust]
doc_languages: [en, zh]
license: GPL-3.0
homepage: https://mythpen.looplooptech.com/
repo: https://github.com/niyongsheng/mythpen
docs_url: https://mythpen.looplooptech.com/
tier: standard
metrics:
  stars: 74
  pushed_at: "2026-10-28T01:26:30Z"
  checked_at: "2026-10-29"
  archived: false
aliases: [Mythpen]
risk_notes: "GPL-3.0 强 copyleft：自用无碍，修改后分发需按协议开源；AI 能力需自备 OpenAI / Claude 兼容 API Key，「AI 导书」会上传书籍文本至所配服务商；源码桌面构建需 Rust 工具链（README 前置仅列 Node / pnpm）；项目尚处 v0.0.x 早期，迭代快，注意备份 ~/.mythpen/ 书稿数据。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# Mythpen AI 小说写作台

> 本地优先的 AI 辅助小说写作桌面应用：设定管理与 AI 共写一体。上游：[niyongsheng/mythpen](https://github.com/niyongsheng/mythpen) · 许可证：GPL-3.0

## 这是什么

面向长篇（尤其网文向）创作者的本地优先 AI 写作桌面应用（Tauri 2 + React 19 + Express，★74）：以「书」为单位管理角色、关系、伏笔、爽点、世界观与时间线。AI 写作分两种模式——「引导」按六步工作流推进、「协作」由 AI 共写续笔，支持 OpenAI 与 Claude；「AI 导书」导入 TXT/EPUB 后由模型识别卷章结构，并反向构建人物、世界观、时间线、伏笔与叙事记忆；「爽点看板」用看板规划打脸 / 反转 / 翻身节拍，可让 AI 生成爽点排期。界面提供简繁中文、英日韩法西俄 8 种语言；数据存于本机 `~/.mythpen/`（SQLite），不依赖云端，另有浏览器开发模式。

## 怎么部署运行

普通用户直接下载安装包（macOS / Windows / Linux 全平台）：

```bash
# 官网下载页：https://mythpen.looplooptech.com/#download
# GitHub Releases（v0.0.17 起）：.dmg / .exe / .AppImage / .deb / .rpm
#   https://github.com/niyongsheng/mythpen/releases
```

从源码运行 / 构建（前置 Node ≥ 20、pnpm ≥ 9；桌面模式另需 Rust 工具链）：

```bash
git clone https://github.com/niyongsheng/mythpen.git
cd mythpen
pnpm install
pnpm dev:all        # 浏览器模式（前端 + 后端 + 种子数据）
pnpm tauri dev      # 桌面开发模式
pnpm tauri build    # 构建安装包（.dmg / .msi / .AppImage）
```

## 怎么用

首次启动在设置里填 OpenAI / Claude 兼容接口的地址与 API Key；新建书籍后在设定区补角色 / 世界观 / 时间线，或直接用「AI 导书」丢一本 TXT/EPUB 让模型自动建卡；写作区按需选「引导」六步或「协作」共写推进章节；网文项目用「爽点看板」规划节拍与排期。章节自动保存本地。

## 注意事项

- **协议**：GPL-3.0——自用无碍；修改后对外分发需按协议开源。
- **自备 Key 与数据出境**：AI 调用 OpenAI / Claude 兼容接口，费用与隐私按所配服务商评估；「AI 导书」会把书籍文本发送给该服务商。
- **早期版本**：尚处 v0.0.x，迭代快；书稿数据在本机 `~/.mythpen/`，重要项目自行备份。
- **选型对比**：与 zenstory（Agent 工作台、Docker 自托管、多 Agent 流水线）相比，mythpen 更轻——单机桌面应用、无 Docker 依赖，适合个人写作而非流程定制。
