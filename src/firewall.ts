// src/firewall.ts
import { PolicyEngine, Policy } from "./PolicyEngine";
import { GuardianRequest, GuardianDecision } from "./types";

export type Command = {
  type: string;
  actorRole?: "adult" | "child";
  payload?: Record<string, any>;
  timestamp?: number;
};

export class Firewall {
  private engine: PolicyEngine;

  constructor() {
    this.engine = new PolicyEngine();

    // Load a minimal default policy set suitable for simulations.
    const defaults: Policy[] = [
      {
        id: "allow-parent-default",
        roles: ["PARENT"],
        rules: [{ type: "allow", category: "NEUTRAL" }],
      },
      {
        id: "restrict-child-mature-games",
        roles: ["CHILD"],
        rules: [{ type: "block", category: "VIOLENCE" }],
      },
    ];

    // PolicyEngine expects Policy objects; load them.
    // We cast to any to allow flexible rules in this simulation scaffold.
    this.engine.loadPolicies(defaults as any);
  }

  validateCommand(cmd: Command): { allowed: boolean; reason?: string } {
    // Map actor roles from device-level to Guardian Role types
    const role = cmd.actorRole === "child" ? "CHILD" : "PARENT";

    // Map command type to a data category heuristic used by PolicyEngine
    let category: any = "NEUTRAL";
    if (cmd.type.includes("game") && typeof cmd.payload?.gameId === "string") {
      if (/MATURE|ADULT_ONLY/i.test(cmd.payload?.gameId)) {
        category = "VIOLENCE";
      } else {
        category = "EDUCATIONAL";
      }
    }

    const request: GuardianRequest = {
      role: role as any,
      category: category as any,
      action: cmd.type,
      metadata: { payload: cmd.payload, timestamp: cmd.timestamp },
    };

    const decision = this.engine.evaluate(request);
    return { allowed: decision.allowed, reason: decision.reason };
  }
}

export default Firewall;
