/**
 * QuantumGuardianChat 1.0
 * Space LEAF Corp — Quantum Guardian Conversation Layer
 *
 * Orchestrates chat between the user, Guardian core, and QuantumDomain.
 */

import { Guardian } from "./Guardian";
import { QuantumDomain } from "./QuantumDomain";

export type QuantumRole = "CHILD" | "STUDENT" | "ADULT" | "RESEARCHER";

export class QuantumGuardianChat {
  private guardian: Guardian;
  private quantum: QuantumDomain;

  constructor(guardian: Guardian, quantum: QuantumDomain) {
    this.guardian = guardian;
    this.quantum = quantum;
  }

  /**
   * Handle a single chat message.
   * 1. Build a GuardianRequest.
   * 2. Ask Guardian if this interaction is allowed.
   * 3. If allowed, route to QuantumDomain.
   * 4. Return a safe, educational response.
   */
  async handleMessage(input: string, role: QuantumRole): Promise<string> {
    const request = {
      role,
      category: "EDUCATIONAL",
      action: "chat"
    };

    const decision = this.guardian.decide(request);

    if (!decision.allowed) {
      return (
        decision.guidance ??
        "Quantum Guardian: This interaction is currently restricted for safety reasons."
      );
    }

    // Simple routing: decide whether user wants explanation, circuit, or review
    const lower = input.toLowerCase();

    if (lower.includes("explain") || lower.includes("what is")) {
      return this.quantum.explainConcept(input);
    }

    if (lower.includes("circuit") || lower.includes("build") || lower.includes("prepare")) {
      return this.quantum.suggestCircuit(input);
    }

    if (lower.includes("code") || lower.includes("qiskit") || lower.includes("snippet")) {
      const review = this.quantum.reviewCode(input);
      return [
        "Quantum Guardian — Code Review:",
        "",
        review.summary,
        "",
        review.issues.length
          ? "Issues:\n- " + review.issues.join("\n- ")
          : "Issues: none detected at this static level.",
        "",
        review.suggestions.length
          ? "Suggestions:\n- " + review.suggestions.join("\n- ")
          : "Suggestions: none beyond structural clarity."
      ].join("\n");
    }

    return (
      "Quantum Guardian: I can explain quantum concepts, suggest simple circuits, " +
      "or give an educational review of your quantum code. Try:\n" +
      "- 'Explain qubits'\n" +
      "- 'Suggest a circuit for a 3-qubit GHZ state'\n" +
      "- 'Review this Qiskit code snippet: ...'"
    );
  }
}
