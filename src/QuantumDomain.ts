/**
 * QuantumDomain 1.0
 * Space LEAF Corp — Quantum Guardian Layer
 *
 * Provides quantum computing explanations, circuit suggestions,
 * and code review scaffolding in a safe, educational way.
 */

export type QuantumConcept =
  | "qubit"
  | "superposition"
  | "entanglement"
  | "measurement"
  | "hadamard"
  | "pauli-x"
  | "pauli-z"
  | "cnot"
  | "ghz"
  | "grover"
  | "qft"
  | "noise"
  | "error-correction";

export interface QuantumReviewResult {
  issues: string[];
  suggestions: string[];
  summary: string;
}

export class QuantumDomain {
  /**
   * Explain a quantum concept in simple, educational language.
   */
  explainConcept(topic: string): string {
    const normalized = topic.toLowerCase().trim();

    if (normalized.includes("qubit")) return this.explainQubit();
    if (normalized.includes("superposition")) return this.explainSuperposition();
    if (normalized.includes("entanglement")) return this.explainEntanglement();
    if (normalized.includes("measurement")) return this.explainMeasurement();
    if (normalized.includes("hadamard")) return this.explainHadamard();
    if (normalized.includes("cnot")) return this.explainCNOT();
    if (normalized.includes("ghz")) return this.explainGHZ();
    if (normalized.includes("grover")) return this.explainGrover();
    if (normalized.includes("qft")) return this.explainQFT();
    if (normalized.includes("noise")) return this.explainNoise();
    if (normalized.includes("error")) return this.explainErrorCorrection();

    return (
      "Quantum Guardian: I don’t recognize that topic as a core quantum concept yet. " +
      "Try asking about qubits, superposition, entanglement, measurement, GHZ states, Grover’s algorithm, or QFT."
    );
  }

  /**
   * Suggest a simple circuit description for a given problem.
   * This returns a high-level description, not executable code.
   */
  suggestCircuit(problem: string): string {
    const normalized = problem.toLowerCase().trim();

    if (normalized.includes("ghz")) {
      return (
        "Suggested GHZ circuit (3 qubits):\n" +
        "1. Start with |000>.\n" +
        "2. Apply Hadamard (H) to qubit 0.\n" +
        "3. Apply CNOT from qubit 0 to qubit 1.\n" +
        "4. Apply CNOT from qubit 0 to qubit 2.\n" +
        "5. Measure all qubits.\n" +
        "This prepares (|000> + |111>)/√2, a 3-qubit GHZ state."
      );
    }

    if (normalized.includes("bell") || normalized.includes("entangled pair")) {
      return (
        "Suggested Bell pair circuit (2 qubits):\n" +
        "1. Start with |00>.\n" +
        "2. Apply Hadamard (H) to qubit 0.\n" +
        "3. Apply CNOT from qubit 0 to qubit 1.\n" +
        "4. Measure both qubits.\n" +
        "This prepares (|00> + |11>)/√2, a maximally entangled Bell state."
      );
    }

    if (normalized.includes("superposition")) {
      return (
        "Suggested superposition circuit (1 qubit):\n" +
        "1. Start with |0>.\n" +
        "2. Apply Hadamard (H) to the qubit.\n" +
        "3. Measure the qubit.\n" +
        "This prepares (|0> + |1>)/√2, a simple superposition."
      );
    }

    return (
      "Quantum Guardian: I can suggest circuits for GHZ states, Bell pairs, and simple superposition. " +
      "Describe your goal (e.g., 'create a 3-qubit GHZ state' or 'make a Bell pair')."
    );
  }

  /**
   * Review a quantum code snippet (e.g., Qiskit-like) at a high level.
   * This is static, educational review—not execution.
   */
  reviewCode(code: string): QuantumReviewResult {
    const issues: string[] = [];
    const suggestions: string[] = [];

    const lower = code.toLowerCase();

    // Very simple heuristics for educational feedback
    if (!lower.includes("measure")) {
      issues.push("No measurement operations found.");
      suggestions.push(
        "Add measurement operations to observe the state, e.g., measure all qubits into classical bits."
      );
    }

    if (lower.includes("h(") || lower.includes("hadamard")) {
      suggestions.push(
        "You are using Hadamard gates—good for creating superposition. Make sure you understand the resulting state."
      );
    }

    if (lower.includes("cx(") || lower.includes("cnot")) {
      suggestions.push(
        "You are using CNOT gates—these are key for entanglement. Check which qubit is control and which is target."
      );
    }

    if (!lower.includes("qc") && !lower.includes("quantumcircuit")) {
      suggestions.push(
        "Consider structuring your code around a QuantumCircuit object for clarity and reuse."
      );
    }

    if (issues.length === 0 && suggestions.length === 0) {
      suggestions.push(
        "The snippet looks structurally reasonable at a glance. For deeper review, annotate your intent (e.g., 'prepare GHZ state')."
      );
    }

    const summary =
      "Quantum Guardian: This review is educational and static. It does not execute the circuit, " +
      "but highlights missing measurements, common gate patterns, and structural clarity.";

    return { issues, suggestions, summary };
  }

  // ─────────────────────────────────────────────
  // Internal concept explanations
  // ─────────────────────────────────────────────

  private explainQubit(): string {
    return (
      "A qubit is the basic unit of quantum information. Unlike a classical bit, which is either 0 or 1, " +
      "a qubit can be in a superposition of 0 and 1 at the same time. Mathematically, it's a vector in a 2D complex space, " +
      "often written as α|0> + β|1>, where |α|² + |β|² = 1."
    );
  }

  private explainSuperposition(): string {
    return (
      "Superposition is the ability of a quantum system to be in multiple states at once. " +
      "For a single qubit, superposition means it can be in a combination of |0> and |1>. " +
      "When you measure the qubit, the superposition 'collapses' to one outcome, with probabilities determined by the amplitudes."
    );
  }

  private explainEntanglement(): string {
    return (
      "Entanglement is a quantum correlation between particles that cannot be explained classically. " +
      "When two qubits are entangled, measuring one instantly affects the state description of the other, " +
      "even if they are far apart. Bell states and GHZ states are classic examples of entangled states."
    );
  }

  private explainMeasurement(): string {
    return (
      "Measurement in quantum computing is the process of reading out the state of qubits. " +
      "Before measurement, qubits can be in superposition or entangled states. Measurement collapses the state " +
      "into classical outcomes (0 or 1 for each qubit), according to the probabilities encoded in the quantum state."
    );
  }

  private explainHadamard(): string {
    return (
      "The Hadamard gate (H) is a single-qubit gate that creates superposition. " +
      "Applied to |0>, it produces (|0> + |1>)/√2; applied to |1>, it produces (|0> - |1>)/√2. " +
      "It is often the first gate used in algorithms that rely on interference, like Grover's algorithm."
    );
  }

  private explainCNOT(): string {
    return (
      "The CNOT (controlled-NOT) gate is a two-qubit gate. It flips the target qubit if the control qubit is |1>. " +
      "CNOT is essential for creating entanglement. For example, applying H to qubit 0 and then CNOT(0→1) creates a Bell state."
    );
  }

  private explainGHZ(): string {
    return (
      "A GHZ state is a multi-qubit entangled state, often written as (|000...0> + |111...1>)/√2. " +
      "For 3 qubits, GHZ is (|000> + |111>)/√2. It generalizes Bell states to more qubits and is used in tests of nonlocality and " +
      "multi-party quantum protocols."
    );
  }

  private explainGrover(): string {
    return (
      "Grover's algorithm is a quantum search algorithm that can find a marked item in an unsorted database in O(√N) steps, " +
      "compared to O(N) classically. It uses superposition, an oracle that marks the solution, and an amplification step " +
      "to increase the probability of measuring the correct answer."
    );
  }

  private explainQFT(): string {
    return (
      "The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform. " +
      "It transforms computational basis states into superpositions with phase factors. QFT is a key component " +
      "in algorithms like Shor's factoring algorithm."
    );
  }

  private explainNoise(): string {
    return (
      "Noise in quantum computing refers to unwanted interactions and imperfections that disturb qubit states. " +
      "Common types include decoherence (loss of quantum information) and gate errors. Noise limits the depth and reliability " +
      "of quantum circuits on real hardware."
    );
  }

  private explainErrorCorrection(): string {
    return (
      "Quantum error correction uses multiple physical qubits to encode a single logical qubit, " +
      "allowing detection and correction of certain errors without measuring the encoded information directly. " +
      "Examples include the three-qubit bit-flip code and the surface code."
    );
  }
}
