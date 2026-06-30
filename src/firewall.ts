import { PolicyEngine } from "./PolicyEngine";
import { GuardianRequest, Role, DataCategory } from "./types";

export type Command = {
  type: string;
  actorRole?: "adult" | "child";
  payload?: Record<string, unknown>;
  timestamp?: number;
};

export class Firewall {
  private engine: PolicyEngine;

  constructor() {
    this.engine = new PolicyEngine();

    // Load a minimal default policy set suitable for simulations.
    const defaults = [
      {
        id: "allow-parent-default",
        roles: ["PARENT" as Role],
        rules: [{ type: "allow", category: "NEUTRAL" as DataCategory }],
      },
      {
        id: "restrict-child-mature-games",
        roles: ["CHILD" as Role],
        rules: [{ type: "block", category: "VIOLENCE" as DataCategory }],
      },
    ];

    // PolicyEngine expects Policy objects; load them.
    this.engine.loadPolicies(defaults as any);
  }

  validateCommand(cmd: Command): { allowed: boolean; reason?: string } {
    // Map actor roles from device-level to Guardian Role types
    const role: Role = cmd.actorRole === "child" ? "CHILD" : "PARENT";

    // Map command type to a data category heuristic used by PolicyEngine
    let category: DataCategory = "NEUTRAL";
    if (cmd.type.includes("game") && typeof cmd.payload?.["gameId"] === "string") {
      const gid = String(cmd.payload?.["gameId"]);
      if (/MATURE|ADULT_ONLY/i.test(gid)) {
        category = "VIOLENCE";
      } else {
        category = "EDUCATIONAL";
      }
    }

    const request: GuardianRequest = {
      role,
      category,
      action: cmd.type,
      metadata: { payload: cmd.payload, timestamp: cmd.timestamp },
    };

    const decision = this.engine.evaluate(request);
    return { allowed: decision.allowed, reason: decision.reason };
  }
}

export default Firewall;
