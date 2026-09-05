---
record_type: entry-record
id: crawl4ai
name_zh: "Crawl4AI LLM 友好爬虫"
name_en: "Crawl4AI"
summary_zh: "GitHub 最多 star 的开源 LLM 友好爬虫：网页 → 干净的 LLM-ready Markdown（Fit Markdown 启发式去噪）；异步浏览器池、深度爬取 + 崩溃恢复 + prefetch 加速；CLI + Docker 部署、爬取零 API Key。"
summary_en: "The most-starred open-source LLM-friendly web crawler: pages to clean LLM-ready Markdown with fit-markdown filtering, deep crawl with crash recovery, prefetch discovery, and CLI + Docker deployment."
category: research-intel
kind: framework
tags: [web-crawler, ai-agent, rag, docker, self-hosted, mcp]
languages: [python]
doc_languages: [en]
license: Apache-2.0
homepage: https://crawl4ai.com
repo: https://github.com/unclecode/crawl4ai
tier: core
metrics:
  stars: 81396
  pushed_at: "2026-09-01T07:58:26Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [crawl4ai, Crawl4AI]
risk_notes: "v0.9.3 为安全修复版（关闭任意文件写入 / SSRF / DoS / XSS 等协调披露公告 + 33 个 bug 修复），建议始终使用最新版；Docker API server 从 v0.9.0 起默认开启认证并绑定 loopback，公网部署需配置 token 和反向代理；LLM 提取功能需配置 API Key（爬取本身零 Key）。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# Crawl4AI LLM 友好爬虫

> 🚀🤖 Open-source LLM Friendly Web Crawler & Scraper。上游：[unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) · 许可证：Apache 2.0 · 81.4k stars

## 这是什么

Crawl4AI 是 GitHub 上最多 star 的开源 LLM 友好爬虫：把网页变成干净的、LLM-ready 的 Markdown——结构化标题、表格、代码块、引用提示，供 RAG、Agent 和数据管道直接消费。Fit Markdown 启发式过滤去掉广告、导航、弹窗等噪声，只留正文。

**为什么开发者选 Crawl4AI**：

- **LLM-ready 输出**：智能 Markdown（标题 / 表格 / 代码 / 引用提示 / 链接编号引用列表）
- **快**：异步浏览器池 + 缓存 + 最少跳转
- **全控制**：会话 / 代理 / Cookie / 用户脚本 / hooks
- **自适应智能**：学习网站模式，只探索有价值的内容
- **部署自由**：零 API Key（爬取本身）、CLI + Docker、云友好

**关键版本**：

| 版本 | 亮点 |
|------|------|
| v0.9.3（当前） | 安全修复：关闭任意文件写入 / SSRF / DoS / XSS + 33 个 bug |
| v0.9.0 | Docker API server 安全加固：默认认证 + loopback + untrusted trust boundary |
| v0.8.0 | 深度爬取崩溃恢复（`resume_state`）+ prefetch 模式（URL 发现提速 5-10 倍） |

## 怎么安装

```bash
pip install -U crawl4ai

# 运行安装后设置（浏览器配置）
crawl4ai-setup

# 验证安装
crawl4ai-doctor

# 浏览器问题手动安装
python -m playwright install --with-deps chromium
```

## 怎么用

### Python

```python
import asyncio
from crawl4ai import *

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://www.nbcnews.com/business")
        print(result.markdown)

asyncio.run(main())
```

### CLI

```bash
# 基础爬取 Markdown 输出
crwl https://www.nbcnews.com/business -o markdown

# 深度爬取（BFS 最多 10 页）
crwl https://docs.crawl4ai.com --deep-crawl bfs --max-pages 10

# LLM 提取（需要配置 API Key）
crwl https://www.example.com/products -q "Extract all product prices"
```

### Docker 部署

```bash
docker pull unclecode/crawl4ai:latest
docker run -d -p 11235:11235 unclecode/crawl4ai:latest
```

v0.9.0 起 Docker API server 默认开启认证并绑定 loopback，公网部署需配置 token + 反向代理。

## 注意事项

- **许可证 Apache 2.0**：可自由商用。
- **安全版本**：始终使用最新版（v0.9.3 关闭了多个协调披露安全公告）；Docker 部署不要裸露公网。
- **爬取零 Key / 提取需 Key**：爬取和 Markdown 生成完全本地免费；LLM 提取（`-q` 参数）需要配置 LLM API Key。
- **合规**：遵守目标网站 robots.txt 和服务条款；大规模爬取建议配置代理池和速率限制。
- **维护极其活跃**（2026-09 更新，81.4k stars，GitHub 最受关注的爬虫项目），提供 Discord 社区和详细文档。
