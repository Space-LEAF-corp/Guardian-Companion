import { GuardianRequest, GuardianDecision } from './types';

export interface PolicyRule {
  type: 'allow' | 'block' | 'flag' | 'transform';
  category?: string;
}

export interface Policy {
  id: string;
  roles: string[];
  rules: PolicyRule[];
}

export class PolicyEngine {
  private policies: Policy[] = [];

  loadPolicies(policies: Policy[]): void {
    this.policies = policies;
  }

  evaluate(request: GuardianRequest): GuardianDecision {
    const applicable = this.policies.filter(p =>
      p.roles.includes(request.role)
    );

    for (const policy of applicable) {
      for (const rule of policy.rules) {
        if (!rule.category || rule.category === request.category) {
          if (rule.type === 'block') {
            return {
              allowed: false,
              reason: `PolicyEngine: blocked by policy ${policy.id}`,
            };
          }
          if (rule.type === 'allow') {
            return {
              allowed: true,
              reason: `PolicyEngine: allowed by policy ${policy.id}`,
            };
          }
        }
      }
    }

    return {
      allowed: true,
      reason: 'PolicyEngine: no blocking rules matched',
    };
  }
}
