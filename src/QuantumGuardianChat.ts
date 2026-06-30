/**
 * QuantumGuardianChat 1.1
 * Space LEAF Corp — Quantum Guardian Conversation Layer
 *
 * Now includes Quantum Safety Policy routing via evaluateQuantumPolicy().
 */

import { Guardian } from "./Guardian";
import { QuantumDomain } from "./QuantumDomain";
import { evaluateQuantumPolicy } from "./policies/quantumPolicy";

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
   * Safety flow:
   * 1. Guardian emotional + policy safety
   * 2. Quantum Safety Policy (evaluateQuantumPolicy)
   * 3. QuantumDomain reasoning
   */
  async handleMessage(input: string, role: QuantumRole): Promise<string> {
    // Step 1 — Guardian safety
    const guardianRequest = {
      role,
      category: "EDUCATIONAL",
      action: "chat"
    };

    const guardianDecision = this.guardian.decide(guardianRequest);

    if (!guardianDecision.allowed) {
      return (
        guardianDecision.guidance ??
        "Quantum Guardian: This interaction is restricted for safety reasons."
      );
    }

    // Step 2 — Quantum Safety Policy routing
    const quantumCategory = this.detectQuantumCategory(input);
    const quantumDecision = evaluateQuantumPolicy(quantumCategory);

    if (!quantumDecision.allowed) {
      return (
        quantumDecision.guidance ??
        "Quantum Guardian: This quantum interaction type is not allowed."
      );
    }

    // Step 3 — QuantumDomain reasoning
    const lower = input.toLowerCase();

    if (lower.includes("explain") || lower.includes("what is")) {
      return quantumDecision.guidance + "\n\n" + this.quantum.explainConcept(input);
    }

    if (lower.includes("circuit") || lower.includes("build") || lower.includes("prepare")) {
      return quantumDecision.guidance + "\n\n" + this.quantum.suggestCircuit(input);
    }

    if (lower.includes("code") || lower.includes("qiskit") || lower.includes("snippet")) {
      const review = this.quantum.reviewCode(input);
      return (
        quantumDecision.guidance +
        "\n\nQuantum Guardian — Code Review:\n\n" +
        review.summary +
        "\n\nIssues:\n" +
        (review.issues.length ? "- " + review.issues.join("\n- ") : "None detected.") +
        "\n\nSuggestions:\n" +
        (review.suggestions.length ? "- " + review.suggestions.join("\n- ") : "None.")
      );
    }

    return (
      quantumDecision.guidance +
      "\n\nQuantum Guardian: I can explain quantum concepts, suggest circuits, " +
      "or review quantum code. Try:\n" +
      "- 'Explain qubits'\n" +
      "- 'Suggest a circuit for a 3-qubit GHZ state'\n" +
      "- 'Review this Qiskit code snippet: ...'"
    );
  }

  /**
   * Detect the quantum category based on user intent.
   */
  private detectQuantumCategory(input: string) {
    const lower = input.toLowerCase();

    if (
      lower.includes("explain") ||
      lower.includes("what is") ||
      lower.includes("how does")
    ) {
      return "QUANTUM_EDUCATIONAL";
    }

    if (
      lower.includes("simulate") ||
      lower.includes("experiment") ||
      lower.includes("prepare") ||
      lower.includes("circuit")
    ) {
      return "QUANTUM_EXPERIMENTAL";
    }

    if (
      lower.includes("future") ||
      lower.includes("could quantum") ||
      lower.includes("break encryption") ||
      lower.includes("hypothetical")
    ) {
      return "QUANTUM_SPECULATIVE";
    }

    return "QUANTUM_EDUCATIONAL";
  }
}
