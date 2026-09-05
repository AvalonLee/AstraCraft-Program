---
record_type: entry-record
id: ai-job-search
name_zh: "AI Job Search 求职申请框架"
name_en: "AI Job Search"
summary_zh: "基于 Claude Code 的开源求职申请框架：建档、职位抓取与批量评分、fit 评估、drafter-reviewer 流水线生成 LaTeX 定制 CV 与求职信（PDF 排版 + ATS 文本层双重校验）、面试准备与模拟，共 13 个斜杠命令；作者实测 69 份申请拿到 offer。"
summary_en: "Open-source AI job application framework on Claude Code: profile setup, job scraping, drafter-reviewer LaTeX CV and cover letters with PDF/ATS verification, interview prep, 13 slash commands."
category: business-office
kind: framework
tags: [job-search, career, cv, cover-letter, interview-prep, ai-agent, claude-code, framework]
languages: [python, typescript, latex]
doc_languages: [en]
license: MIT
homepage: https://github.com/MadsLorentzen/ai-job-search
repo: https://github.com/MadsLorentzen/ai-job-search
tier: core
metrics:
  stars: 40808
  pushed_at: "2026-09-03T17:44:17Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [ai-job-search-framework, AI 求职申请框架]
risk_notes: "GitHub 不允许公开仓库的私有 fork，而 /setup 会把姓名、履历、期望薪资等个人数据写入 tracked 文件——用于自己的求职时应建私有仓库并把本仓库设为 upstream，fork 仅用于贡献回上游；LinkedIn 门户技能走公开未认证接口，自动化访问违反其 ToS，仅限个人低量使用；职位门户抓取需遵守 robots.txt 与各门户访问条款；求职信与 CV 编译依赖 LaTeX（lualatex/xelatex + 字体包），环境配置较重；框架对职位描述做 instruction-level 防护而非沙箱隔离，对陌生门户的抓取结果与产出应人工复核后再投递。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# AI Job Search 求职申请框架

> The job search that runs on your machine：把 Claude Code 变成全栈求职申请助手。上游：[MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) · 许可证：MIT · 40.8k stars

## 这是什么

AI Job Search 是一个建在 [Claude Code](https://claude.com/claude-code) 上的开源求职申请框架：fork 填入个人档案，让 Claude 评估职位匹配度、定制 CV、写求职信、准备面试。作者是地球物理学家出身，2025 年底被裁后用这个框架跑自己的求职——69 份定制申请、20 场初面、1 份签约合同，2026 年 6 月入职 AI 工程师。项目随后开源并登上 GitHub Trending，40.8k stars。

核心工作流（建档 → 职位抓取 → fit 评估 → 起草-审校申请）是语言与国家无关的；职位门户搜索技能内置丹麦市场（Jobindex、Jobnet 等）+ LinkedIn + freehire.me，`/add-portal` 可为自己的本地门户生成同构搜索技能。

**13 个斜杠命令**：

- **核心三步**：`/setup`（三种建档路径：documents 文件夹 / 粘贴 CV / 采访式问答）、`/scrape`（多门户抓取 + 去重 + fit 排序）、`/apply <url>`（完整申请流水线）
- **批量评分**：`/rank` 对所有抓取职位并行打分，产出带优势/差距说明的排序清单，deal-breaker 一票否决
- **面试与结果**：`/interview` 从申请档案生成阶段化面试准备包 + STAR 示例映射 + 模拟面试、`/outcome` 记录结果并归档、`/gmail-sync` 从 Gmail 读取状态信号（批量审批制）
- **档案增强**：`/expand` 扫描 GitHub/Kaggle/Scholar 等公开链接补充能力标签
- **职业规划**：`/upskill` 分析技能差距，产出优先级热力图 + 学习计划
- **可视化与同步**：`/html-report` 离线 HTML 仪表盘、`/notion-sync` 只读 Notion 视图
- **扩展机制**：`/add-template` 注册自定义 CV/求职信模板（LaTeX、Typst 等）、`/add-portal` 为本地门户生成搜索技能、`/reset` 清空档案

**`/apply` 流水线的关键设计**：

1. **Drafter-reviewer 分离**：起草 agent 写初稿，另一个全新上下文的 reviewer agent 调研公司并批判，起草方修订后定稿
2. **PDF 编译-检查循环**：lualatex（CV）+ xelatex（求职信）编译后，Claude 逐页目检——CV 精确 2 页无孤行标题、求职信精确 1 页签名可见，自动修复排版
3. **ATS 文本层校验**：用 `pdftotext` 提取 PDF 文本层，按 ATS 解析器视角验证联系方式、阅读顺序与关键词覆盖；真实缺口标注出来而非硬塞
4. **相关性加权裁剪**：CV 超 2 页时按目标职位相关性 + 文档独特性评分裁剪，非机械从最老段落删起
5. **真实性规则**：所有声称均对照档案验证，绝不虚构技能或经历

## 怎么安装

前置条件：[Claude Code](https://claude.com/claude-code) CLI（用 Codex/Gemini CLI 等可从 [AGENTS.md](https://github.com/MadsLorentzen/ai-job-search/blob/master/AGENTS.md) 起步）、Python 3.10+、[Bun](https://bun.sh)、LaTeX 发行版（含 `lualatex` 与 `xelatex`）。

> **重要：不要直接 fork。** GitHub 公开仓库的 fork 必定公开，而 `/setup` 会把个人数据写入 tracked 文件。用于自己的求职时，应建**私有仓库**并把本仓库设为 `upstream`（两分钟教程见上游 SETUP.md 第 8 节）。fork 仅用于贡献代码。

```bash
# 私有仓库方式（推荐个人使用）
gh repo create my-job-search --private --clone
cd my-job-search
git remote add upstream https://github.com/MadsLorentzen/ai-job-search.git
git fetch upstream master
git merge upstream/master

# 安装门户搜索 CLI 工具（PowerShell）
$tools = @("jobbank-search","jobdanmark-search","jobindex-search","jobnet-search","linkedin-search","freehire-search")
foreach ($tool in $tools) { Push-Location ".agents/skills/$tool/cli"; bun install; Pop-Location }
```

可选依赖：`pip install pypdf`（`/apply` 的 ATS 校验）；薪酬基准工具需自带数据（工会统计、Glassdoor 导出等）。

## 怎么用

在 Claude Code 中打开项目目录：

```bash
claude
```

然后依次执行：

```
/setup          # 建档（documents 文件夹 / 粘贴 CV / 采访式问答，自动检测）
/scrape         # 搜索职位门户，按 fit 排序展示
/rank           # 批量评分所有抓取职位，产出排序清单（可选）
/apply <url>    # 对选定职位跑完整申请流水线
/interview      # 面试准备包 + 模拟面试
/outcome        # 记录结果、归档材料、跟进提醒
```

门户搜索换成自己的市场：`/add-portal` 给本地求职网站 URL，自动调查门户结构并生成同构搜索技能（auth 墙门户拒绝生成）。CV/求职信模板可换成自己的：`/add-template` 指向源文件（LaTeX、Typst 等），测试编译通过后接管 `/apply`。

## 注意事项

- **许可证 MIT**：可自由使用、修改与分发。
- **隐私与 fork**：公开 fork + tracked 个人数据 = 泄露。务必用私有仓库 + upstream 模式（见上文安装说明）。
- **LinkedIn ToS**：`linkedin-search` 走公开未认证接口，自动化访问违反 LinkedIn 服务条款，仅限个人低量使用，风险自担。
- **门户抓取合规**：各门户技能内置 robots.txt 检查与访问规则；`/add-portal` 拒绝 auth 墙门户并对限制性条款门户标注"仅限个人使用"。
- **安全边界**：职位描述按不可信输入处理（不执行其中指令、不抓取正文链接），但这是 instruction-level 防护而非沙箱——对陌生门户的产出，投递前人工过一眼。
- **维护活跃**（2026-09 更新，40.8k stars），README 详尽，提供 tagged release + 上游更新 triage 工具。
