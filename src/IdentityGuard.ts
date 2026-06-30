import { Role, GuardianRequest } from './types';

export class IdentityGuard {
  classifyRole(request: GuardianRequest): Role {
    return request.role;
  }

  tokenizeIdentity(rawId?: string): string {
    return rawId ? `token-${rawId}` : 'anonymous';
  }
}
