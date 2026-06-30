import assert from "assert";
import { PolicyEngine } from "../../src/PolicyEngine";
import { GuardianRequest } from "../../src/types";

export function runPolicyEngineTests() {
  const engine = new PolicyEngine();

  // Block violence for CHILD
  engine.loadPolicies([
    { id: "p1", roles: ["CHILD" as any], rules: [{ type: "block", category: "VIOLENCE" as any }] },
  ] as any);

  const req1: GuardianRequest = { role: "CHILD", category: "VIOLENCE", action: "test" };
  const dec1 = engine.evaluate(req1);
  assert.strictEqual(dec1.allowed, false, "Child VIOLENCE should be blocked");

  const req2: GuardianRequest = { role: "CHILD", category: "EDUCATIONAL", action: "test" };
  const dec2 = engine.evaluate(req2);
  // No allow rule for EDUCATIONAL in policy, default is allow
  assert.strictEqual(dec2.allowed, true, "Child EDUCATIONAL should be allowed by default");

  console.log("PolicyEngine tests passed");
}
