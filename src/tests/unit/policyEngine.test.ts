import { PolicyEngine, Policy } from '../../src/PolicyEngine';
import { GuardianRequest } from '../../src/types';

describe('PolicyEngine', () => {
  it('blocks violence for child role', () => {
    const engine = new PolicyEngine();

    const policies: Policy[] = [
      {
        id: 'child-violence-block',
        roles: ['CHILD'],
        rules: [{ type: 'block', category: 'VIOLENCE' }],
      },
    ];

    engine.loadPolicies(policies);

    const request: GuardianRequest = {
      role: 'CHILD',
      category: 'VIOLENCE',
      action: 'view-content',
    };

    const decision = engine.evaluate(request);

    expect(decision.allowed).toBe(false);
  });
});
