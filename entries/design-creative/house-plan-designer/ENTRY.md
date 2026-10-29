---
record_type: entry-record
id: house-plan-designer
name_zh: "House Plan Designer 户型图设计器技能"
name_en: "House Plan Designer"
summary_zh: "把一张户型图（图片 / 截图 / PDF / CAD 的 DXF）交给 Agent，自动量墙识图、补全门窗房间与家具水电，生成一个双击即开的单文件 HTML 装修设计器：2D 布置、3D 漫游、五类管线自动排布、光线追踪出图，还能导出国标 DXF 施工图，全程离线可用。"
summary_en: "An agent skill that turns a floor-plan photo, PDF or CAD DXF into a single-file offline HTML interior designer with 2D editing, 3D walkthrough, auto MEP routing and DXF export."
category: design-creative
mode: install
tags: [ai-agent, claude-code, skill]
languages: [html]
doc_languages: [zh]
license: MIT
homepage: https://github.com/ZWD11/house-plan-designer
repo: https://github.com/ZWD11/house-plan-designer
tier: standard
metrics:
  stars: 217
  pushed_at: "2026-10-28T11:31:34Z"
  checked_at: "2026-10-29"
  archived: false
related: [ai-agent, skill]
aliases: ["户型图设计器", "house-plan-designer"]
risk_notes: "识别与布置质量依赖上游对图纸的解析，复杂图纸可能误读，上游明确建议不要用豆包等弱工具型模型跑满血流程；算量报价仅供参考，正式施工以专业设计与现场复核为准。"
added_at: "2026-10-29"
updated_at: "2026-10-29"
---

# House Plan Designer 户型图设计器技能

> 一张户型图，一句话，Agent 把它还原成可 2D / 3D 直接设计的装修设计器网页。上游：[ZWD11/house-plan-designer](https://github.com/ZWD11/house-plan-designer) · 许可证：MIT

## 这是什么

一个装进 Agent 技能目录的 skill（MIT，中文文档）：Agent 按 `SKILL.md` 的流程自动量墙、看懂图纸、补全门窗和房间、布置家具与水电，最后产出一个**双击就能打开的单文件 HTML** 设计器，离线可用。

生成的设计器覆盖装修全流程：2D 布置与拖拽改尺寸、3D 漫游与夜景开灯、19 个空间的家具库与一键换风格、插座 / 照明 / 网线 / 冷热水 / 排水五类管线自动排布且可分开导出、算量报价、整套施工图，以及**导出符合国标的 CAD 图纸（DXF）**；还有写实建模与光线追踪出图。除住宅外，也支持办公 / 培训 / 商业楼层——装修公司给的整套 CAD 布置图 DXF 能按图块逐件还原并与原图对账。

## 怎么安装

把仓库克隆进 Agent 的技能目录并装依赖（Claude Code 示例）：

```bash
git clone https://github.com/ZWD11/house-plan-designer ~/.claude/skills/house-plan-designer
pip install numpy pillow opencv-python pymupdf ezdxf   # 后两个用于 CAD 图纸（PDF / DXF）
cd ~/.claude/skills/house-plan-designer/scripts && npm install   # puppeteer-core，自查截图用
```

其他支持 Skill 的 Agent 放到各自约定的 skills 目录即可。本机需要有 Chrome 或 Edge（自查截图用），找不到时设置环境变量 `CHROME_PATH` 指向浏览器程序。

## 怎么用

对 Agent 说「把这张户型图做成装修设计器网页」，附上户型图（图片、截图、PDF、DXF 都行）；可以顺带提要求，Agent 会写进方案，例如：

```text
客厅铺 800×800 灰色大板，主卧人字拼木地板；风格要奶油风；城市是杭州
```

产出 `<户型名>-装修设计器.html`，并附 2D / 3D 截图与识别说明（哪些尺寸按标注、哪些按图形量、图纸哪里前后矛盾），双击 HTML 即可进入设计器继续编辑。

## 注意事项

- **模型有要求**：识别与布置质量依赖模型能力，上游明确建议不要用豆包等弱工具型模型跑满血流程，推荐 Claude Code 等支持 Skill 的编码 Agent。
- **结果是参考**：复杂图纸可能误读，算量报价仅供参考；正式施工以专业设计与现场复核为准，CAD 对账结果建议人工抽查。
- MIT 许可，可商用；纯前端单文件产物，不依赖云端服务。
