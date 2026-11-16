---
record_type: entry-record
id: jiangshan-map
name_zh: "江山时序 中国历史交互地图"
name_en: "Chronicles of the Realm (jiangshan-map)"
summary_zh: "交互式中国历史地图集：从战国（前 403 年）到当代，18 个历史时期、198 幅疆域快照，拖时间轴看疆域、都城、山川与政区演变；点城市看 2400 年地名沿革，点人物看生平轨迹，支持诗词路线、地图猜城与可嵌入深链；另带 MCP server、Agent Skill 与 GeoJSON 导出。"
summary_en: "Interactive historical atlas of China (403 BCE–today): 18 periods, 198 territory snapshots, place genealogies, person chronicles, poetry routes and deep links, plus MCP and GeoJSON export."
category: research-intel
mode: deploy
tags: [mcp, self-hosted, multilingual, visualization, historical-map]
languages: [javascript, html, css]
doc_languages: [zh, en, ja]
license: GPL-3.0
homepage: https://deanchen.me/jiangshan-map/
repo: https://github.com/DeanChensj/jiangshan-map
tier: standard
metrics:
  stars: 6292
  pushed_at: "2026-11-16T01:20:08Z"
  checked_at: "2026-11-16"
  archived: false
aliases: [jiangshan-map, 江山时序, Jiangshan Atlas]
risk_notes: "历史疆域为教学 / 可视化用途的近似示意，不是权威边界数据，也不代表现代政治边界；研究引用前核对原始出处。代码 GPL-3.0，修改后分发需按协议开源。GeoJSON 导出默认不含 CHGIS 派生的郡 / 州 / 府图层，因为 CHGIS 条款禁止再分发；--with-prefectures 仅限本地学术非商用，导出结果不得公开。地图几何、历史事件与坐标可能有个别错误，古籍原文属公版但现代译文 / 整理文本可能有版权。MCP server 与 Agent Skill 读取本地仓库、截图依赖本机 Chrome / Chromium，不是托管 API；静态站无鉴权，部署即公开全部数据。"
added_at: "2026-11-16"
updated_at: "2026-11-16"
---

# 江山时序 中国历史交互地图

> 从战国到当代的交互式中国历史地图集。上游：[DeanChensj/jiangshan-map](https://github.com/DeanChensj/jiangshan-map) · 许可证：GPL-3.0 · 在线演示：[deanchen.me/jiangshan-map](https://deanchen.me/jiangshan-map/)

## 这是什么

江山时序（Chronicles of the Realm）是一套纯静态的交互式中国历史地图：把 **2,400+ 年**历史压缩成 **18 个时期、198 幅疆域快照**，拖时间轴即可看疆域、都城、君主年号、政区与山川如何一步步演变。它由个人作者开发，支持简体 / 繁体 / 英文 / 日文界面，2026-11 仍在更新。

主要能力：

- **时间轴与疆域**：多政权同屏对照（战国七雄、三国、南北朝、五代十国、宋辽夏金等），悬停图例高亮疆域、点击看政权简介；每次疆域变更可查看上一阶段的虚线「Ghost Boundary」差异；时间轴可缩放，气泡显示在位君主与年号
- **点地溯源**：点任意古城 / 关隘（或双击地图），弹出该地 2,400 年的政区沿革卡片：双语地名典故、历朝隶属、`Capital` 标记与发生在此的重大事件，可一键穿越到事件年份
- **点人溯事**：搜索人物（秦始皇、张骞、诸葛亮、玄奘、李白、苏轼、王阳明等）查看编号足迹与生平；支持多人合并对照、同途相逢标记，以及楚汉相争、安史之乱、靖康之变等事件线
- **诗词与战场**：名关（函谷关、潼关、剑门关、玉门关、山海关等）、战场（赤壁、长平、淝水等）与文学地标，可按诗中的「年份 + 地名」绘制单点、同年多点或跨年时空路线
- **地图猜城**：10 轮古代地名定位小游戏，按大圆距离计分并授予古代舆图官职
- **可分享 / 可嵌入**：`?year=`、`?place=`、`?person=`、`?event=`、`?quiz=locate` 等深链，`&embed=1` 生成 iframe 嵌入视图
- **给 Agent 用**：`llms.txt` 机器说明、零依赖 stdio MCP server（`inspect_place` / `inspect_person` / `search_atlas`）、可安装的 Agent Skill 与 CLI 截图脚本、浏览器 `window.atlasAPI` 与 WebMCP

技术上无需构建：仓库按目录直接作为静态站点运行；同时提供 GeoJSON 导出脚本（RFC 7946，403 BCE–1948），方便在 Leaflet / MapLibre / QGIS 中复用。

## 怎么部署运行

前置只需 Git 与任意静态 HTTP 服务器；本地跑不依赖 Node / Python 构建链。

```bash
# 方式一：直接静态服务（无需安装依赖、无构建步骤）
git clone https://github.com/DeanChensj/jiangshan-map.git
cd jiangshan-map
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000

# 方式二：Docker Compose（nginx:alpine 静态镜像）
docker compose up -d --build
# 浏览器打开 http://localhost:8008（端口映射见 docker-compose.yml）
```

MCP 接入（零依赖 Node 脚本，适合 Claude Desktop / Cursor / Windsurf / Gemini CLI）：

```json
{
  "mcpServers": {
    "jiangshan-atlas": {
      "command": "node",
      "args": ["/absolute/path/to/jiangshan-map/scripts/mcp_server.js"]
    }
  }
}
```

## 怎么用

1. 打开站点后拖时间轴或用 `←` / `→` 逐步、`Shift + ←/→` 十年一跳、`Space` 自动播放；`/` 或 `Ctrl/Cmd + K` 聚焦搜索框。
2. 点城市 / 关隘 / 战场查看「点地溯源」；搜索人物查看「点人溯事」，多人用逗号分隔；事件线路会同步推进时间轴与疆域。
3. 需要分享时直接复制地址栏（已带 `year` / `place` / `person` 参数）；嵌入博客或课程页时在 URL 后加 `&embed=1` 放进 iframe。
4. 让 Agent 用时：装 Agent Skill（`cp -r skills/jiangshan-atlas ~/.claude/skills/`），或让模型只提取 `year` 与 `place` 两个语义参数，调用 MCP 工具 / CLI 生成深链与截图：
   ```bash
   python3 skills/jiangshan-atlas/scripts/jiangshan.py --year 819 --place 蓝关 --out /tmp/languan_819.png
   ```
   截图需要本机有 Chrome / Chromium（或 Playwright 浏览器缓存）；`--inspect` 可只查结构化历史地理信息。
5. 需要矢量图层时在本地跑 `node scripts/export_geojson.js`，输出在 `geojson/`（默认不含 CHGIS 派生图层，原因见注意事项）。

## 注意事项

- **疆域数据是近似示意**：项目面向教学、可视化与探索，不是权威历史地理边界数据集，也不代表现代政治边界；学术引用前核对原始出处与审图要求。
- **CHGIS 图层不可再分发**：郡 / 州 / 府图层由 CHGIS 派生，其条款禁止再分发；`--with-prefectures` 只在本地做学术、非商业用途，导出的 GeoJSON 不要公开发布。
- **许可证**：代码 GPL-3.0，修改后分发需按协议开放源码；公开托管未修改版本不受影响。古籍原文属公版，但现代译文、整理文本与部分素材可能有独立版权。
- **数据准确性**：198 幅快照与事件坐标由人工整理，可能有个别年代、地名消歧或几何错误；同名异地（如不同时期的「江州」）需按时代判断。
- **Agent 集成边界**：MCP server 与 Skill 读取本地仓库文件，不是托管 API；CLI 截图依赖本机 Chrome / Chromium，无浏览器时只有 URL 与 JSON 查询可用。
- **部署即公开**：静态站没有鉴权与后端，部署到公网即公开全部数据；嵌入模式会隐藏站点外壳，但同样暴露数据。
