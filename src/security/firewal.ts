// Adapter that provides the SecurityLayer API expected by jarvondis-engine.ts.
// Internally uses the existing src/firewall.ts logic for command / emotional checks.
// This keeps original firewall.ts intact while offering the expected methods.

import { Firewall } from "../firewall";

export type ContentCheckResult = { safe: boolean; flags: string[] };

export class SecurityLayer {
  private firewall = new Firewall();

  async validateInput(input: string, mode: "kid" | "adult"): Promise<{ safe: boolean }> {
    // Use emotionalFilter to check text for harmful patterns (best-effort)
    const check = this.firewall.emotionalFilter(input);
    return { safe: check.allowed };
  }

  async validateOutput(output: string, contentRating: string): Promise<ContentCheckResult> {
    // For now, we rely on emotionalFilter as a simple check
    const check = this.firewall.emotionalFilter(output);
    return { safe: check.allowed, flags: check.allowed ? [] : [check.reason || "flagged"] };
  }

  async filterContent(output: string, _contentRating: string): Promise<string> {
    // Basic redaction: replace words on blocked list with "[redacted]"
    const blocked = [/weapon/gi, /violence/gi];
    let filtered = output;
    for (const rx of blocked) {
      filtered = filtered.replace(rx, "[redacted]");
    }
    return filtered;
  }
}

export default SecurityLayer;
