import { EmotionalSafetyEngine } from "../../../src/EmotionalSafetyEngine";
import { GuardianRequest } from "../../../src/types";

describe("EmotionalSafetyEngine — LOW RISK scenarios", () => {
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

  it("scores EDUCATIONAL content as LOW risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "EDUCATIONAL",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("LOW");
  });

  it("scores PUBLIC content as LOW risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "PUBLIC",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("LOW");
  });
});
