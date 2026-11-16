---
record_type: entry-record
id: creatorhub
name_zh: "CreatorHub 多平台内容管理工作台"
name_en: "CreatorHub"
summary_zh: "本地运行的多平台内容管理工作台：一个 Web 面板管起抖音 / 小红书 / 快手 / 视频号 / TikTok 的账号登录、作品与评论监控、采集下载、发布与私信管理；Python + FastAPI + SQLite + 浏览器自动化，数据与登录态全部留在本机，提供 Windows 安装包与源码启动两种方式。"
summary_en: "Local workbench for Douyin, Xiaohongshu, Kuaishou, WeChat Channels and TikTok: account login, content/comment monitoring, collection, downloads, publishing and DM management, all data local."
category: research-intel
mode: deploy
tags: [social-media, web-crawler, self-hosted, short-video]
languages: [python, javascript]
doc_languages: [zh]
license: UNKNOWN
homepage: https://3441293738.github.io/creatorhub/
repo: https://github.com/3441293738/creatorhub
tier: watch
metrics:
  stars: 3405
  pushed_at: "2026-11-16T00:56:15Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [creatorhub, CreatorHub]
risk_notes: "仓库未附 LICENSE 文件（UNKNOWN，默认保留所有权利），商用或二次分发前先与作者确认；各平台能力依赖浏览器自动化与登录态，平台风控或接口变动可能导致采集 / 发布失效，账号风险自担；视频号仅限本账号内容，TikTok 仅支持单视频发布、不支持图文与直播；正式安装包只覆盖 Windows 10/11 x64，Releases 中的 macOS 包被上游标注 UNTESTED，macOS / Linux 建议源码运行。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# CreatorHub 多平台内容管理工作台

> 本地运行的多平台内容管理工作台。上游：[3441293738/creatorhub](https://github.com/3441293738/creatorhub) · 许可证：未声明（UNKNOWN） · 使用指南：[guide](https://3441293738.github.io/creatorhub/guide/)

## 这是什么

CreatorHub 是一个本地运行的多平台内容管理与运营工作台，用一套 Web 面板统一处理 **抖音 / 小红书 / 快手 / 视频号 / TikTok** 五个平台：账号登录态管理、作品与评论监控、关键词采集、素材下载、内容发布、私信与互动管理。账号 Cookie、SQLite 数据库与下载的媒体文件全部保存在本机，不经过第三方服务器。

| 平台 | 主要能力 |
|---|---|
| 抖音 | 作品 / 评论 / 弹幕监控，批量采集、下载、发布与私信管理 |
| 小红书 | 笔记 / 评论监控，关键词与收藏采集，下载、发布与私信管理 |
| 快手 | 作品 / 评论监控，批量采集、下载与发布 |
| 视频号 | 本账号作品、数据与评论管理，批量采集与发布 |
| TikTok | 关键词视频采集，作品 / 评论监控，下载、视频发布与用户互动 |

技术栈为 Python + FastAPI + SQLite，浏览器侧使用系统 Chrome/CDP 或 Patchright 做自动化。官网的在线预览只展示脱敏示例数据，真实登录、采集、下载与发布必须在本地运行。

## 怎么部署运行

有两种方式：Windows 用户直接装安装包；macOS / Linux 或开发者从源码启动（需 Python 3.10+ 与桌面环境）。

```bash
# 方式一：Windows 10/11 x64 安装包（推荐）
# 1) 从 Releases 下载 CreatorHub-Setup-<版本>-windows-x64.exe
#    https://github.com/3441293738/creatorhub/releases/latest
# 2) 双击安装，通过桌面快捷方式启动，点「启动本地服务」，等待浏览器组件就绪

# 方式二：源码运行（macOS / Linux / 开发者）
git clone https://github.com/3441293738/creatorhub.git
cd creatorhub

# macOS / Linux
chmod +x start.sh && ./start.sh

# Windows（PowerShell / cmd）
.\start.cmd
```

首次运行会自动创建虚拟环境、安装 Python 依赖、下载浏览器组件并生成 `config.yaml`，随后打开 `http://127.0.0.1:8000` 进入工作台。安装与首次启动需保持联网。

## 怎么用

1. 在工作台里按平台添加账号，用对应 App 扫码登录（登录态保存在本地）。
2. 建监控任务：填作品链接或关键词，选择监控作品 / 评论 / 弹幕，按平台能力采集与下载。
3. 需要发布或互动时，在对应平台的发布 / 私信面板操作；小红书发布需单独登录创作者账号。

配置项见仓库 `config.example.yaml`，各平台的功能差异、操作步骤与限制以官方[使用指南](https://3441293738.github.io/creatorhub/guide/)为准。

## 注意事项

- **许可证未声明**：仓库没有 LICENSE 文件，GitHub 识别为空，默认保留所有权利；商用、二次分发或改造前先与作者确认。按收录规范先归入观察期（`watch`）。
- **平台风控与合规**：采集与发布依赖浏览器自动化与真实登录态，平台风控或页面改版可能导致功能失效，账号受限风险自担；使用时遵守各平台服务条款与所在地法律，尊重内容版权与个人隐私。
- **平台能力边界**：视频号只处理本账号内容；TikTok 仅支持单视频发布，不支持图文发布、直播与短视频弹幕。
- **数据与备份**：默认数据在 `data/`（`creatorhub.db`、`media/`、`profiles/`），Windows 安装版的用户数据在 `%LOCALAPPDATA%/CreatorHub/user-data/`；升级前备份 `config.yaml` 与 `data/`。
- **安装包状态**：Windows 安装包为正式支持路径；Releases 中的 macOS 安装包被上游标注为 UNTESTED，macOS / Linux 更稳妥的方式是从源码运行。
- **维护状态**：2026-11 仍在高频更新（最新 v0.2.7，2026-11-10 发布），功能与界面变动较快。
