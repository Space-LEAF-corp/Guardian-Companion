import { Config } from "./config";

export class Telemetry {
  logLocal(event: Record<string, unknown>) {
    if (!Config.telemetry.enableLocalLogs) return;
    const redacted = Config.telemetry.redactSensitive ? this.redact(event) : event;
    console.log("[LOCAL TELEMETRY]", redacted);
  }

  private redact(event: Record<string, unknown>) {
    const clone = { ...event };
    delete (clone as any)["id"];
    delete (clone as any)["name"];
    delete (clone as any)["email"];
    return clone;
  }
}
