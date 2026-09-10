---
record_type: entry-record
id: bigbanana-ai-director
name_zh: "BigBanana AI 漫剧导演工场"
name_en: "BigBanana AI Director"
summary_zh: "面向短剧与漫剧的一站式 AI 导演平台：导入小说或创意后生成结构化剧本，沉淀角色/场景/道具一致性资产，再用首尾帧或九宫格分镜驱动镜头生成，最后完成预览、粗剪与成片交付。"
summary_en: "An AI short drama and motion comic platform that turns scripts into consistent assets, keyframes and shots, then delivers edited video through a project-level production workflow."
category: design-creative
kind: framework
tags: [short-drama, storyboard, image-generation, video-production, character-design, cinematic, ai-agent, docker]
languages: [docker]
doc_languages: [zh, en, ja]
license: CC-BY-NC-SA-4.0
homepage: https://director.tree456.com/
repo: https://github.com/shuyu-labs/BigBanana-AI-Director
tier: standard
metrics:
  stars: 2115
  pushed_at: "2026-09-07T03:44:33Z"
  checked_at: "2026-09-10"
  archived: false
related: []
aliases: ["BigBanana AI Director", "AI 漫剧工场"]
risk_notes: "官方声明采用 CC BY-NC-SA 4.0，仅限非商业用途；后续版本只通过官方 Docker 镜像发布，商业源码需授权；部署后需配置 AntSK API Key，并使用外部 LLM、图像与视频模型，费用自担。"
added_at: "2026-09-10"
updated_at: "2026-09-10"
---

# BigBanana AI 漫剧导演工场

> AI 一站式短剧/漫剧生成平台。上游：[shuyu-labs/BigBanana-AI-Director](https://github.com/shuyu-labs/BigBanana-AI-Director) · 许可证：CC BY-NC-SA 4.0 · 约 2.1k stars

## 这是什么

BigBanana 用“Script → Asset → Keyframe → Shot → Cut”的工业化流程替代纯抽卡式生成：

- **项目级工作区**：按“项目 → 季 → 集”组织内容，支持导入整篇小说自动拆分多集草稿、世界观锚点、资产库和整库备份。
- **叙事规划**：从大纲、小说片段或创意生成角色、场景、道具、镜头等结构化剧本，可配置语言、时长、视觉风格与模型组合。
- **一致性资产**：为角色生成标准定妆照并维护衣橱系统，为场景、道具建立参考图与提示词，支持跨项目资产复用和批量补齐。
- **镜头制作**：在网格化镜头工作台中管理上下文，使用首帧/尾帧、九宫格分镜和视频插值生成镜头。
- **成片交付**：提供预览、粗剪、导出与备份；提示词集中管理便于统一修正生成质量。

## 怎么安装

```bash
git clone https://github.com/shuyu-labs/BigBanana-AI-Director.git
cd BigBanana-AI-Director
docker-compose up -d
```

首次启动会拉取并启动官方镜像；浏览器打开 `http://localhost:3005`。查看日志用 `docker-compose logs -f`，停止用 `docker-compose down`。

## 怎么用

1. 首次进入时在新手引导、账号中心或模型配置中填入 AntSK API Key / Token。
2. 在项目中心新建项目，或在项目概览中导入整篇小说。
3. 先补充角色、场景、道具与世界观资源。
4. 进入 Phase 01 生成结构化剧本，并校对角色、动作、台词与提示词。
5. 进入 Phase 02/03 补齐一致性资产，生成首尾帧、九宫格分镜和视频片段。
6. 进入 Phase 04/05 预览、粗剪、导出与备份。

## 注意事项

- 上游声明 **CC BY-NC-SA 4.0**：允许个人学习与非商业二次创作，禁止商业用途；商业源码与授权需联系作者。
- 因抄袭/搬运问题，后续版本仅通过官方 Docker 镜像发布，仓库保留说明与历史参考。
- 生成依赖外部模型能力，例如 LLM、图像模型与视频模型；官方镜像预置工作流仍需配置对应 API/模型，费用自担。
- 若不满足“长期免费”预期，上游明确提示可选官方大模型产品或商业版适配。
