# @tencentdb-agent-memory/memory-sdk-ts-v2

TypeScript SDK for **TencentDB Agent Memory** — v3 strict-isolation data-plane
API + `/v3/skill/*` + `/v3/meta/*` metadata management.

- 默认 `MemoryClient` 就是 v3 严格 isolation 版本（构造时必须传 `teamId` /
  `agentId` / `userId`）。
- 老代码若之前从 `.../v2/v3` 子路径导入，可继续用 —— 子路径保留为向后兼容
  别名，与顶级 export 是同一个类。

## Install

```bash
npm install @tencentdb-agent-memory/memory-sdk-ts-v2
```

## Quick Start

```typescript
import { MemoryClient } from "@tencentdb-agent-memory/memory-sdk-ts-v2";

const client = new MemoryClient({
  endpoint: "http://127.0.0.1:8420",
  apiKey: "your-user-key",           // 从面板拿的 sk-mem-…
  serviceId: "your-memory-instance-id",
  teamId: "team-xxx",
  agentId: "agt-xxx",
  userId: "usr-xxx",
  sessionId: "sess-1",                // 可选：省略/清空后 L0/L1 跨 session 聚合
});

// L0：写对话
await client.addConversation({
  messages: [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi!" },
  ],
});

// L0：查
const l0 = await client.queryConversation({ limit: 20, offset: 0 });
const allSessions = await client.withIsolation({ sessionId: null }).queryConversation({ limit: 20 });

// L1 / L2 / L3
const l1 = await client.searchAtomic({ query: "user preferences", limit: 5 });
const scene = await client.readScenario({ path: "work.md" });
const core = await client.readCore();
```

v3 数据面差异要点：

- 路径统一走 `/v3/*`
- 构造时 `teamId` / `agentId` / `userId` 都是必填（严格 isolation）
- `sessionId` 可选：
  - 传：L0/L1 限定在单个 session
  - 不传或 `withIsolation({ sessionId: null })`：L0/L1 跨 session 聚合到 team+agent+user
  - L2/L3 是 team+agent profile，不消费 `sessionId`

## API Methods

### v3 data plane

| Layer | Method | Endpoint |
|-------|--------|----------|
| L0 | `addConversation()` | `POST /v3/conversation/add` |
| L0 | `queryConversation()` | `POST /v3/conversation/query` |
| L0 | `searchConversation()` | `POST /v3/conversation/search` |
| L0 | `deleteConversation()` | `POST /v3/conversation/delete` |
| L0 | `countConversation()` | `POST /v3/conversation/count` |
| L1 | `updateAtomic()` | `POST /v3/atomic/update` |
| L1 | `queryAtomic()` | `POST /v3/atomic/query` |
| L1 | `searchAtomic()` | `POST /v3/atomic/search` |
| L1 | `deleteAtomic()` | `POST /v3/atomic/delete` |
| L1 | `countAtomic()` | `POST /v3/atomic/count` |
| L2 | `listScenarios()` | `POST /v3/scenario/ls` |
| L2 | `readScenario()` | `POST /v3/scenario/read` |
| L2 | `writeScenario()` | `POST /v3/scenario/write` |
| L2 | `rmScenario()` | `POST /v3/scenario/rm` |
| L2 | `countScenario()` | `POST /v3/scenario/count` |
| L3 | `readCore()` | `POST /v3/core/read` |
| L3 | `writeCore()` | `POST /v3/core/write` |
| L3 | `countCore()` | `POST /v3/core/count` |

## MetadataClient (v3 management plane)

`MetadataClient` wraps the gateway's v3 metadata management endpoints
(`/v3/meta/*` — 54 routes aligned with Panel `META_ACTIONS`, including
`user-key/*`) plus `/v3/knowledge/*` Knowledge CRUD (5 routes). Auth:
Bearer + `x-tdai-service-id`, optional `x-tdai-user-key`.

```typescript
import { MetadataClient } from "@tencentdb-agent-memory/memory-sdk-ts-v2";

const meta = new MetadataClient({
  endpoint: "http://127.0.0.1:8420",
  apiKey: "verify-token",        // gateway Bearer (KERNEL_AUTH_TOKEN)
  serviceId: "knowledge-debug",  // x-tdai-service-id
  // userKey: "...",             // optional; needed by system_admin endpoints (user/create, user/delete)
});
```

### Knowledge management (/v3/knowledge/*)

Manage Knowledge entity metadata (types: `wiki` | `code-graph`). These are
**management-plane CRUD** — metadata only. Actually searching wiki content,
reading pages, or syncing repos is the Knowledge Service data-plane's job,
not this client.

| Method | Endpoint | Notes |
|--------|----------|-------|
| `createKnowledge()` | `POST /v3/knowledge/create` | upsert metadata (idempotent; re-post overwrites) |
| `getKnowledge(id, teamId?)` | `POST /v3/knowledge/get` | get one by id |
| `updateKnowledge()` | `POST /v3/knowledge/update` | partial update (name/summary/service_url/repo_url/branch) |
| `deleteKnowledge(ids, teamId?)` | `POST /v3/knowledge/delete` | batch delete (≤100) |
| `listKnowledge()` | `POST /v3/knowledge/list` | list by team_id, optional type filter / batch id lookup |

```typescript
// Register a wiki knowledge source
const k = await meta.createKnowledge({
  knowledge_id: "wiki-docs",
  type: "wiki",
  service_url: "http://127.0.0.1:8421/v3",  // Knowledge Service data-plane URL
  name: "Team Docs Wiki",
  summary: "Internal tech docs",
  team_id: "team-1",
  user_id: "usr-1",
});
console.log(k.knowledge_id, k.type, k.created_at);

// List all code-graphs under a team
const list = await meta.listKnowledge({ team_id: "team-1", type: "code-graph" });
console.log(list.items, list.total);

// Rename / change service_url
await meta.updateKnowledge({ knowledge_id: "wiki-docs", name: "Renamed Wiki" });

// Batch delete
await meta.deleteKnowledge(["wiki-docs", "cg-repo-1"], "team-1");
```

Return types: `KnowledgeEntity` / `KnowledgeListResult { items, total }` /
`BatchDeleteResult { deleted_ids, failed }`.

## Error Handling

All non-zero `code` responses throw `TDAMError`:

```typescript
import { TDAMError } from "@tencentdb-agent-memory/memory-sdk-ts-v2";

try {
  await client.readCore();
} catch (e) {
  if (e instanceof TDAMError) {
    console.error(`code=${e.code} message=${e.message} request_id=${e.requestId}`);
  }
}
```

## Build & Pack

```bash
npm run build
npm test
npm pack
```

## License

MIT
