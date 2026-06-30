// src/QuantumGuardianChat.ts
import { Guardian } from "./Guardian";
import { QuantumDomain } from "./QuantumDomain";

export class QuantumGuardianChat {
  constructor(
    private guardian: Guardian,
    private quantum: QuantumDomain
  ) {}

  async handleMessage(input: string, role: "CHILD" | "ADULT" | "RESEARCHER") {
    const request = { role, category: "EDUCATIONAL", action: "chat" };

    const safetyDecision = this.guardian.decide(request);
    if (!safetyDecision.allowed) {
      return safetyDecision.guidance;
    }

    // Route to quantum domain
    const response = this.quantum.explainConcept(input);
    return response;
  }
}
