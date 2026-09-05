---
record_type: entry-record
id: trek
name_zh: "TREK 自托管旅行规划"
name_en: "TREK Travel Planner"
summary_zh: "自托管实时协作旅行规划器：日计划拖拽排线（OSRM 路由 + 2-opt 优化）、Leaflet/Mapbox/MapLibre 地图、16 种预订类型（航班/火车多段 + 4,045 内置机场时区）、费用分摊与多币种、打包清单、旅行日志、GPX/KML 导入导出、PWA 支持、SSO/Passkey/TOTP MFA，内置 AI 解析与 MCP addon。"
summary_en: "Self-hosted collaborative travel planner: day-plan drag with OSRM routing, maps, 16 booking types, cost splitting, packing lists, journal, GPX/ICS export, PWA, SSO, and an MCP addon."
category: ops-automation
kind: framework
tags: [travel, self-hosted, docker, collaboration, mcp]
languages: [typescript]
doc_languages: [en]
license: AGPL-3.0
homepage: https://demo.liketrek.com
repo: https://github.com/liketrek/TREK
tier: standard
metrics:
  stars: 13181
  pushed_at: "2026-09-04T23:10:40Z"
  checked_at: "2026-09-05"
  archived: false
aliases: [TREK Planner, liketrek]
risk_notes: "AGPL-3.0 为强 Copyleft：本地自用无额外义务，对外提供网络服务时需以 AGPL 开源衍生；自托管需自行维护备份、TLS 证书和 WebSocket 反向代理配置；地图服务默认 OpenStreetMap/OpenFreeMap（无 key），配 Google Places / Mapbox key 时费用与条款自担；booking 导入需 Docker 镜像内置的 kitinerary-extractor。"
added_at: "2026-09-05"
updated_at: "2026-09-05"
---

# TREK 自托管旅行规划

> your trip. your plan. 自托管实时协作旅行规划器。上游：[liketrek/TREK](https://github.com/liketrek/TREK) · 许可证：AGPL-3.0 · 13.2k stars · [Demo](https://demo.liketrek.com)

## 这是什么

TREK 是一个功能极其完整的自托管旅行规划器——不只是"存一下行程"，而是一套把计划、预订、地图、费用、协作、日志和 AI 全部打通的实时协作平台。核心卖点是**每一步都自托管**：数据在自己服务器上，地图和天气用免费开放源（OpenStreetMap / Open-Meteo），配 key 就增强、不配也能跑。

**核心模块**（admin 逐项开关）：

| 模块 | 能力 |
|------|------|
| **Planning** | 日计划拖拽排序 + undo、地点/预订/备注跨日拖拽、地图 marker 直落日计划 |
| **Maps** | Leaflet / Mapbox GL / MapLibre GL（OpenFreeMap 无 token），聚类、照片 marker、路线线段、3D 建筑（Mapbox only） |
| **Place** | Google Places（有 key 时含照片/评分/营业时间）或 OpenStreetMap（无 key）；Wikipedia/Wikidata/Wikimedia 补充描述 |
| **Routes** | OSRM 路由（驾车/步行/骑行）、最近邻 + 2-opt 自动排序（锁定酒店锚点不动）、Transitous 公交门到门 |
| **Bookings** | 16 种预订类型（航班/火车多段、酒店、租车……），4,045 内置机场数据免 key 解析时区 |
| **Costs** | 整数分币种、多付款人、均分/自定义分摊、结算建议 + 结算日志、汇率冻结（Frankfurter 免 key） |
| **Packing** | 分类打包清单、模板、多人实时勾选 |
| **Journal** | 旅行日志（markdown），照片集成 |
| **Collab** | WebSocket 实时协作，多人同时编辑无冲突 |
| **AI + MCP** | 内置 AI 解析 addon（识别预订邮件/PDF）、MCP addon（agent 可通过 MCP 工具读写行程） |
| **Vacay / Atlas** | 度假村/目的地灵感板、地图 atlas |

**技术栈**：NestJS 11 + React 19 + Vite + SQLite + WebSocket（ws）+ Zustand + Tailwind；JWT + OAuth 2.1 + OIDC + Passkeys (WebAuthn) + TOTP MFA。

**部署**：Docker / Docker Compose / Helm (Kubernetes) / PWA。

## 怎么安装

**Docker 一行：**

```bash
docker run -d -p 3000:3000 \
  -e ENCRYPTION_KEY=$ENCRYPTION_KEY \
  -v ./data:/app/data -v ./uploads:/app/uploads \
  mauriceboe/trek
```

首次启动自动创建管理员账号：设了 `ADMIN_EMAIL` / `ADMIN_PASSWORD` 就用你设的，否则打印在容器日志里（`docker logs trek`）。

**Docker Compose（生产推荐）：**

```bash
curl -fsSL https://raw.githubusercontent.com/liketrek/TREK/main/docker-compose.yml -o docker-compose.yml
docker compose up -d
```

**Helm (Kubernetes)：**

```bash
helm repo add trek https://chart.liketrek.com
helm repo update
helm install trek trek/trek
```

## 怎么用

打开 `http://localhost:3000`，PWA 安装到手机主屏（iOS Safari 分享 → 添加到主屏）。创建 Trip 后：

1. **加地点**：搜索（Google Places / OSM）或导入 GPX / KML / KMZ / Google Maps 列表
2. **排日计划**：拖拽排序或一键 auto-sort（OSRM 路由 + 2-opt 优化）
3. **录预订**：航班/火车/酒店，自动关联天气和日计划
4. **算费用**：多币种分摊，汇率自动冻结
5. **共享**：邀请协作者实时同步，或导出 GPX / ICS

AI addon 开启后可自动解析预订邮件（EML / PDF / PKPass / HTML / TXT）为预订条目。

## 注意事项

- **许可证 AGPL-3.0**：强 Copyleft——自用和内部部署无额外义务；对外提供网络服务需以 AGPL 开源衍生，具体以上游 LICENSE 为准。
- **反向代理**：生产部署需 TLS 终结的反向代理，WebSocket 升级（`/ws`）必须支持；MCP addon 需透传 `Mcp-Session-Id` 头。
- **免费开放源**：地图 OpenFreeMap / OpenStreetMap / Open-Meteo 均无 key；Google Places / Mapbox / Frankfurter（汇率）配 key 后增强但费用自担。
- **备份**：SQLite 数据库 + uploads 目录需自行备份；encryption key 丢失无法恢复。
- **维护极其活跃**（2026-09-04 仍有提交，13.2k stars），提供 Wiki（安装 / 更新 / 反向代理）、Sonar Quality Gate 和 Discord 社区。
