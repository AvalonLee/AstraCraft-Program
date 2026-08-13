import type { Hono } from 'hono';
import type { PanelDeps } from '../../../panel-deps.js';

export function registerHealthRoutes(app: Hono): void {
  app.get('/health', (c) => c.json({ status: 'ok' }));
}

export function registerMetaInstanceRoutes(api: Hono, deps: PanelDeps): void {
  api.get('/meta/instances', (c) => {
    return c.json({ instances: deps.instanceRegistry.listPublic() });
  });
}
