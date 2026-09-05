---
record_type: entry-record
id: mediacrawler
name_zh: "MediaCrawler 自媒体爬虫"
name_en: "MediaCrawler"
summary_zh: "多平台自媒体数据采集工具：小红书 / 抖音 / 快手 / B 站 / 微博 / 贴吧 / 知乎的关键词搜索、帖子详情、二级评论、创作者主页全支持；基于 Playwright 浏览器自动化保留登录态（无需 JS 逆向），CDP 模式复用已有 Chrome 降低风控风险；支持 IP 代理池、登录态缓存、评论词云图。"
summary_en: "Multi-platform social media crawler: keyword search, post detail, nested comments, and creator pages across Xiaohongshu, Douyin, Kuaishou, Bilibili, Weibo, Tieba, and Zhihu via Playwright automation."
category: research-intel
kind: cli-tool
tags: [social-media, web-crawler, ai-agent]
languages: [python, javascript]
doc_languages: [zh, en, es]
license: LicenseRef-NC-Learning
homepage: https://github.com/NanmiCoder/MediaCrawler
repo: https://github.com/NanmiCoder/MediaCrawler
tier: standard
metrics:
  stars: 64464
  pushed_at: "2026-08-14T08:19:00Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [MediaCrawler, media-crawler]
risk_notes: "NON-COMMERCIAL LEARNING LICENSE 1.1：仅限学习研究，禁止商用和大规模爬取；使用前需阅读上游免责声明和中国爬虫违法案例库；CDP 模式连接已有 Chrome 可复用登录态降低风控风险，但平台风控策略持续变化；MediaCrawlerPro 为付费闭源版本，本条目只覆盖开源版。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# MediaCrawler 自媒体爬虫

> 多平台自媒体数据采集工具。上游：[NanmiCoder/MediaCrawler](https://github.com/NanmiCoder/MediaCrawler) · 许可证：NON-COMMERCIAL LEARNING LICENSE 1.1（仅限学习） · 64.5k stars

## 这是什么

MediaCrawler 是一个功能强大的多平台自媒体数据采集工具，支持 7 大平台（小红书、抖音、快手、B 站、微博、贴吧、知乎）的关键词搜索、帖子详情、二级评论和创作者主页爬取。核心思路：**用 Playwright 浏览器自动化保留登录态，通过 JS 表达式获取签名参数**——无需逆向复杂加密算法，大幅降低技术门槛。

**平台 × 能力矩阵**（全平台支持）：

| 能力 | 小红书 | 抖音 | 快手 | B 站 | 微博 | 贴吧 | 知乎 |
|------|--------|------|------|------|------|------|------|
| 关键词搜索 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 指定帖子 ID 爬取 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 二级评论 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 指定创作者主页 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 登录态缓存 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| IP 代理池 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 评论词云图 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**两种浏览器模式**：

| 模式 | 说明 |
|------|------|
| **CDP 模式（推荐）** | 连接已有 Chrome（需开启远程调试），复用已有登录态 / Cookie / 扩展，大幅降低风控检测风险 |
| **Playwright 标准模式** | 启动新浏览器实例 + 扫码登录；需安装浏览器驱动 |

## 怎么安装

前置依赖：uv（Python 包管理）、Node.js >= 16、Chrome >= 144（CDP 模式）。

```bash
cd MediaCrawler
uv sync

# 仅 Playwright 标准模式需要
uv run playwright install
```

Chrome 开启远程调试：地址栏输入 `chrome://inspect/#remote-debugging` → 勾选 Allow remote debugging → 看到 `Server running at: 127.0.0.1:9222` 即就绪。

## 怎么用

```bash
# 关键词搜索爬取帖子 + 评论（小红书）
uv run main.py --platform xhs --lt qrcode --type search

# 指定帖子 ID 爬取
uv run main.py --platform xhs --lt qrcode --type detail

# 打开对应 APP 扫二维码登录

# 换平台
uv run main.py --platform dy --lt qrcode --type search   # 抖音
uv run main.py --platform bili --lt qrcode --type search  # B 站
uv run main.py --platform wb --lt qrcode --type search    # 微博
uv run main.py --platform tieba --lt qrcode --type search # 贴吧
uv run main.py --platform zhihu --lt qrcode --type search # 知乎

# 查看帮助
uv run main.py --help
```

配置项在 `config/base_config.py`（中文注释齐全）：关键词列表、爬取数量、评论层级、IP 代理池、输出格式（CSV / JSON / DB）。

## 注意事项

- **许可证 NON-COMMERCIAL LEARNING LICENSE 1.1**：仅限学习研究，**禁止商用**；使用前阅读上游免责声明和[中国爬虫违法案例库](https://github.com/HiddenStrawberry/Crawler_Illegal_Cases_In_China)。
- **法律合规**：不得用于对平台进行大规模爬虫或其他非法行为；遵守 robots.txt 和平台服务条款。
- **MediaCrawlerPro**：付费闭源版本（断点续爬 / 多账号 / 去除 Playwright / Linux 完整支持 / AI Agent Skill 一键安装），本条目只覆盖开源版。
- **维护活跃**（2026-08 更新，64.5k stars），提供中 / 英 / 西三语 README 和 WebUI 可视化操作界面。
