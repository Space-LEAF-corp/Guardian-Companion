import { evaluateQuantumPolicy } from "../../src/policies/quantumPolicy";

describe("Quantum Safety Policy", () => {
  it("allows educational quantum interactions", () => {
    const decision = evaluateQuantumPolicy("QUANTUM_EDUCATIONAL");
    expect(decision.allowed).toBe(true);
  });

  it("allows experimental discussions with constraints", () => {
    const decision = evaluateQuantumPolicy("QUANTUM_EXPERIMENTAL");
    expect(decision.allowed).toBe(true);
    expect(decision.guidance).toContain("simulations");
  });

  it("allows speculative discussions with grounding", () => {
    const decision = evaluateQuantumPolicy("QUANTUM_SPECULATIVE");
    expect(decision.allowed).toBe(true);
    expect(decision.guidance).toContain("Speculation is allowed");
  });
});
