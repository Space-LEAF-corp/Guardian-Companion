import { EmotionalSafetyEngine } from "../../../src/EmotionalSafetyEngine";
import { GuardianRequest } from "../../../src/types";

describe("EmotionalSafetyEngine — HIGH RISK scenarios", () => {
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
    fearTriggers: ["dark imagery", "predatory behavior"],
    violenceTriggers: ["weapons", "blood"],
    isolationTriggers: ["abandonment"],
    overstimulationTriggers: ["flashing lights"]
  };

  const engine = new EmotionalSafetyEngine(config, context);

  it("scores FEAR content as HIGH risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "FEAR",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("HIGH");
    expect(result.score).toBeGreaterThanOrEqual(0.85);
  });

  it("scores VIOLENCE content as HIGH risk", () => {
    const request: GuardianRequest = {
      role: "CHILD",
      category: "VIOLENCE",
      action: "view-content"
    };

    const result = engine.evaluate(request);

    expect(result.risk).toBe("HIGH");
  });
});
