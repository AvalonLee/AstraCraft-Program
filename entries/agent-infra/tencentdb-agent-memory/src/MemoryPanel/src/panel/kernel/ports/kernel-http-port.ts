import type { MetaEnvelope } from '../envelope.js';
import type { KernelCredentials } from '../types.js';

export interface KernelHttpPort {
  postEnvelope<T>(path: string, body: unknown, cred: KernelCredentials): Promise<MetaEnvelope<T>>;
}
