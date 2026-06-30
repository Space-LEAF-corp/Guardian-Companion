import { AuditTrail } from "./AuditTrail";
import { GuardianDecision } from "./types";

export class SafeMode {
  private active: boolean = false;
  private reason: string | null = null;
  private audit: AuditTrail;

  constructor(audit: AuditTrail) {
    this.audit = audit;
  }

  /**
   * Activate Safe Mode with a ceremonial reason.
   */
  activate(reason: string): void {
    if (!this.active) {
      this.active = true;
      this.reason = reason;

      this.audit.log({
        timestamp: new Date().toISOString(),
        event: "SAFE_MODE_ACTIVATED",
        severity: "CRITICAL",
        role: "SYSTEM",
        metadata: { reason, redacted: true }
      });

      console.warn("⚠️ Guardian Safe Mode ACTIVATED:", reason);
    }
  }

  /**
   * Deactivate Safe Mode once integrity is restored.
   */
  deactivate(): void {
    if (this.active) {
      this.active = false;

      this.audit.log({
        timestamp: new Date().toISOString(),
        event: "SAFE_MODE_DEACTIVATED",
        severity: "INFO",
        role: "SYSTEM",
        metadata: { redacted: true }
      });

      console.info("🛡️ Guardian Safe Mode DEACTIVATED");
    }
  }

  /**
   * Returns whether Safe Mode is currently active.
   */
  isActive(): boolean {
    return this.active;
  }

  /**
   * Wraps a GuardianDecision with Safe Mode restrictions.
   */
  enforce(decision: GuardianDecision): GuardianDecision {
    if (!this.active) return decision;

    return {
      allowed: false,
      reason: `Safe Mode: All operations blocked until integrity is restored. (${this.reason})`,
      guidance:
        "System integrity compromised. Please wait for restoration or contact a guardian."
    };
  }
}
