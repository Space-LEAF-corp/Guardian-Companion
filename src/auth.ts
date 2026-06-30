import crypto from "crypto";
import { Config } from "./config";

export type Capability = "GUARDIAN_MODE" | "DEVICE_CONTROL" | "PARENTAL_ALERT";
export type Actor = { id: string; role: "adult" | "child"; capabilities: Capability[] };

export class Auth {
  // Local-only hashed capability tokens (no PII)
  issueToken(actorId: string, caps: Capability[]) {
    const payload = `${actorId}:${caps.sort().join(",")}:${Date.now()}`;
    const hash = crypto.pbkdf2Sync(payload, "local-salt", Config.auth.tokenSaltRounds, 32, "sha256").toString("hex");
    return { token: hash, caps };
  }

  // Simulated QR DNA handshake: local capability token check
  verifyQrDna(token: string, required: Capability[]) {
    // Placeholder: token format check and capability match (no remote calls)
    return required.every((cap) => token.includes(cap.replace("_", "").toLowerCase().slice(0, 6)));
  }

  // Simulated retinal scan: local consent flag + liveness placeholder
  verifyRetinalScan(actor: Actor) {
    // No biometrics stored. Placeholder: actor must be present and consenting.
    return actor.role === "adult" || actor.capabilities.includes("GUARDIAN_MODE");
  }
}
