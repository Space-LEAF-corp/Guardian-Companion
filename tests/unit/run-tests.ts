import { runPolicyEngineTests } from "./policyEngine.test";
import { runFirewallTests } from "./firewall.test";

async function runAll() {
  try {
    runPolicyEngineTests();
    await runFirewallTests();
    console.log("All unit tests passed");
    process.exit(0);
  } catch (err) {
    console.error("Unit tests failed:", err);
    process.exit(1);
  }
}

runAll();
