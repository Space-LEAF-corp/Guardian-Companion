import assert from "assert";
import { Firewall } from "../../src/firewall";

export async function runFirewallTests() {
  const fw = new Firewall();

  // Child trying to launch a mature game should be blocked
  const blocked = fw.validateCommand({ type: "device.game.launch", payload: { gameId: "MATURE_GAME" }, actorRole: "child" });
  assert.strictEqual(blocked.allowed, false, "Child launching MATURE_GAME should be blocked");

  // Child launching an educational game should be allowed
  const allowed = fw.validateCommand({ type: "device.game.launch", payload: { gameId: "EDU_GAME" }, actorRole: "child" });
  assert.strictEqual(allowed.allowed, true, "Child launching EDU_GAME should be allowed");

  console.log("Firewall tests passed");
}
