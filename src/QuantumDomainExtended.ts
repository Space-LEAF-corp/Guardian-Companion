/**
 * QuantumDomainExtended 1.1
 * Space LEAF Corp — Expanded Quantum Guardian Layer
 *
 * Adds more concepts, gates, and algorithms on top of QuantumDomain.
 */

import { QuantumDomain } from "./QuantumDomain";

export class QuantumDomainExtended extends QuantumDomain {
  explainConcept(topic: string): string {
    const base = super.explainConcept(topic);
    const normalized = topic.toLowerCase().trim();

    if (normalized.includes("shor")) {
      return (
        "Shor's algorithm is a quantum algorithm for factoring integers efficiently, " +
        "using period finding via the Quantum Fourier Transform. It is important for " +
        "theoretical discussions about cryptography, but current hardware cannot run it " +
        "at scales that threaten real-world encryption."
      );
    }

    if (normalized.includes("phase estimation")) {
      return (
        "Quantum phase estimation is an algorithm that estimates the eigenphase of a unitary operator. " +
        "It is a building block for many algorithms, including Shor's and certain simulation methods."
      );
    }

    if (normalized.includes("surface code")) {
      return (
        "The surface code is a leading quantum error-correcting code that arranges qubits on a 2D lattice. " +
        "It is designed to tolerate local noise and is a major candidate for scalable fault-tolerant quantum computing."
      );
    }

    return base;
  }
}
