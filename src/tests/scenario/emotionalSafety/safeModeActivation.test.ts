import { EmotionalSafetyEngine } from "../../../src/EmotionalSafetyEngine";
import { SafeMode } from "../../../src/SafeMode";
import { AuditTrail } from "../../../src/AuditTrail";
import { GuardianRequest } from "../../../src/types";

describe("Guardian Safe Mode — Emotional Safety Activation", () => {
  const audit = new AuditTrail();
  const safeMode = new SafeMode(audit);

  const config = {
    enabled: true,
    riskLevels: { HIGH: 0.85, MEDIUM: 0.45, LOW: 0.15 },
    defaultGuidance: {
      HIGH: "High risk guidance",
      MEDIUM: "Medium risk guidance",
      LOW: "Low risk guidance"
    }
  };

  const context = {
    fearTriggers: ["dark imagery"],
    violenceTriggers: ["blood"],
    isolationTriggers: [],
    overstimulationTriggers: []
  };

  const engine = new EmotionalSafetyEngine(config, context);

  it("activates Safe Mode when HIGH risk emotional content is detected", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "FEAR",
      action: "view-content"
    };

    const evaluation = engine.evaluate(request);

    if (evaluation.risk === "HIGH") {
      safeMode.activate("Emotional destabilization detected");
    }

    expect(safeMode.isActive()).toBe(true);
  });

  it("blocks all decisions once Safe Mode is active", () => {
    const decision = { allowed: true, reason: "Original decision" };
    const enforced = safeMode.enforce(decision);

    expect(enforced.allowed).toBe(false);
    expect(enforced.reason).toContain("Safe Mode");
  });
});
