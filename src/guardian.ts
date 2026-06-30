import { GuardianRequest, GuardianDecision, AuditEvent } from './types';
import { IdentityGuard } from './IdentityGuard';
import { PrivacyShield } from './PrivacyShield';
import { PolicyEngine } from './PolicyEngine';
import { AuditTrail } from './AuditTrail';

export class Guardian {
  private identityGuard = new IdentityGuard();
  private privacyShield = new PrivacyShield();
  private policyEngine = new PolicyEngine();
  private auditTrail = new AuditTrail();

  evaluate(request: GuardianRequest): GuardianDecision {
    const role = this.identityGuard.classifyRole(request);
    const sanitized = this.privacyShield.sanitize({ ...request, role });
    const minimized = this.privacyShield.minimize(sanitized);

    const decision = this.policyEngine.evaluate(minimized);

    const auditEvent: AuditEvent = {
      timestamp: new Date().toISOString(),
      event: minimized.action,
      severity: decision.allowed ? 'INFO' : 'BLOCK',
      role,
      metadata: { category: minimized.category, redacted: true },
    };

    this.auditTrail.log(auditEvent);

    return decision;
  }

  loadPolicies(policies: Parameters<PolicyEngine['loadPolicies']>[0]): void {
    this.policyEngine.loadPolicies(policies);
  }

  getAuditEvents(): AuditEvent[] {
    return this.auditTrail.getEvents();
  }
}
