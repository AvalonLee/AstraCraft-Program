import { META_LIST_ACTIONS } from '../../api/meta-actions.js';
import type { KernelHttpPort } from '../ports/kernel-http-port.js';
import type { MetaKernelPort } from '../ports/meta-kernel-port.js';
import { toKernelCredentials, type MetaCallContext } from '../types.js';

export class FetchMetaKernelAdapter implements MetaKernelPort {
  constructor(
    private readonly http: KernelHttpPort,
    private readonly timeoutMs: number,
  ) {}

  invoke(action: string, body: Record<string, unknown>, ctx: MetaCallContext) {
    const payload = sanitizeBody(action, body);
    const omitUserKey = action === 'auth/verify';
    const cred = toKernelCredentials(ctx, { timeoutMs: this.timeoutMs }, { omitUserKey });
    return this.http.postEnvelope(`/v3/meta/${action}`, payload, cred);
  }
}

function sanitizeBody(action: string, body: Record<string, unknown>): Record<string, unknown> {
  if (META_LIST_ACTIONS.has(action)) return body;
  if (body.limit === undefined && body.offset === undefined) return body;
  const { limit: _l, offset: _o, ...rest } = body;
  return rest;
}
