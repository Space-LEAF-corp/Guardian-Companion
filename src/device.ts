import { Firewall } from "./firewall";

export class DeviceController {
  constructor(private firewall: Firewall) {}

  async turnOnXbox(actorRole: "adult" | "child") {
    const check = this.firewall.validateCommand({ type: "device.xbox.on", actorRole, timestamp: Date.now() });
    if (!check.allowed) throw new Error(`Blocked: ${check.reason}`);
    console.log("Xbox: ON (stub)");
    return true;
  }

  async launchGame(gameId: string, actorRole: "adult" | "child") {
    const check = this.firewall.validateCommand({ type: "device.game.launch", payload: { gameId }, actorRole, timestamp: Date.now() });
    if (!check.allowed) throw new Error(`Blocked: ${check.reason}`);
    console.log(`Game launched: ${gameId} (stub)`);
    return true;
  }

  async powerTv(actorRole: "adult" | "child") {
    const check = this.firewall.validateCommand({ type: "device.tv.power", actorRole, timestamp: Date.now() });
    if (!check.allowed) throw new Error(`Blocked: ${check.reason}`);
    console.log("TV: POWER TOGGLED (stub)");
    return true;
  }
}
