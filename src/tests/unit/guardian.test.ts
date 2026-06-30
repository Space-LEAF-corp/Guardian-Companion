import { Guardian } from '../../src/guardian';
import { GuardianRequest } from '../../src/types';

describe('Guardian', () => {
  it('allows neutral content by default', () => {
    const guardian = new Guardian();

    const request: GuardianRequest = {
      role: 'CHILD',
      category: 'NEUTRAL',
      action: 'view-content',
    };

    const decision = guardian.evaluate(request);

    expect(decision.allowed).toBe(true);
  });
});
