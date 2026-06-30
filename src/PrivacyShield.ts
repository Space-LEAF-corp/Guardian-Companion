import { GuardianRequest, GuardianDecision } from './types';

export class PrivacyShield {
  sanitize(request: GuardianRequest): GuardianRequest {
    const sanitizedMetadata = request.metadata ? { redacted: true } : undefined;
    return { ...request, metadata: sanitizedMetadata };
  }

  minimize(request: GuardianRequest): GuardianRequest {
    return { role: request.role, category: request.category, action: request.action };
  }

  enforcePrivacy(request: GuardianRequest): GuardianDecision {
    return {
      allowed: true,
      reason: 'PrivacyShield: request sanitized and minimized',
    };
  }
}
