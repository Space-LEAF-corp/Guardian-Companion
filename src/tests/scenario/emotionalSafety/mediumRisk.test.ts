import { EmotionalSafetyEngine } from "../../../src/EmotionalSafetyEngine";
import { GuardianRequest } from "../../../src/types";

describe("EmotionalSafetyEngine — MEDIUM RISK scenarios", () => {
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
    fearTriggers: [],
    violenceTriggers: [],
    isolationTriggers: [],
    overstimulationTriggers: []
  };

  const engine = new EmotionalSafetyEngine(config, context);

  it("scores SENSITIVE content as MEDIUM risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "SENSITIVE",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("MEDIUM");
  });

  it("scores EXPLOITATION content as MEDIUM risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "EXPLOITATION",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("MEDIUM");
  });
});
