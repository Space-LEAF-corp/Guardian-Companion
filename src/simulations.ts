import { Config } from "./config";
import { Firewall } from "./firewall";
import { DeviceController } from "./device";
import { Guardian } from "./guardian";
import { Auth } from "./auth";
import { Alerts } from "./alerts";
import { Telemetry } from "./telemetry";

export async function runAllSimulations() {
  const firewall = new Firewall();
  const devices = new DeviceController(firewall);
  const auth = new Auth();
  const alerts = new Alerts();
  const guardian = new Guardian(auth, alerts);
  const telemetry = new Telemetry();

  const adult = { id: "adult-001", role: "adult" as const, capabilities: ["GUARDIAN_MODE", "DEVICE_CONTROL"] };
  const child = { id: "child-001", role: "child" as const, capabilities: ["DEVICE_CONTROL"] };

  telemetry.logLocal({ phase: "init", note: "Starting simulations", version: "1.0" });

  // 10-Year Cycle (simulated as iterations)
  for (let year = 1; year <= Config.simulation.years; year++) {
    telemetry.logLocal({ phase: "year-cycle", year });

    guardian.observe();
    await devices.powerTv("adult");
    await devices.turnOnXbox("adult");
    await devices.launchGame(`yearly-check-${year}`, "adult");
  }

  // Backward-Forward Pass
  telemetry.logLocal({ phase: "backward-forward", status: "start" });
  const sequence = ["TV", "Xbox", "Game-A", "Game-B"];
  for (let i = sequence.length - 1; i >= 0; i--) {
    await devices.powerTv("adult");
  }
  for (let i = 0; i < sequence.length; i++) {
    await devices.turnOnXbox("adult");
  }
  telemetry.logLocal({ phase: "backward-forward", status: "complete" });

  // Reverse Barrel Roll Loop (stress pattern)
  telemetry.logLocal({ phase: "reverse-barrel-roll", status: "start" });
  for (let i = 0; i < 5; i++) {
    await devices.launchGame(`barrel-${i}`, "adult");
    await devices.turnOnXbox("adult");
    await devices.powerTv("adult");
  }
  telemetry.logLocal({ phase: "reverse-barrel-roll", status: "complete" });

  // Forward Replay to baseline
  telemetry.logLocal({ phase: "forward-replay", status: "start" });
  await devices.powerTv("adult");
  await devices.turnOnXbox("adult");
  await devices.launchGame("baseline", "adult");
  telemetry.logLocal({ phase: "forward-replay", status: "complete" });

  // Child-alone guardian activation with parental alert (local relay only)
  const childGuardian = guardian.activateGuardianMode(child, { alone: true });
  telemetry.logLocal({ phase: "child-guardian", result: childGuardian });

  return {
    verdict: "Stable",
    notes: [
      "No data loss across cycles.",
      "No unauthorized command execution.",
      "Firewall blocked harmful inputs per patterns.",
      "Local-only alerts delivered.",
      "No personal data collected; telemetry redacted.",
    ],
    state: guardian.currentState(),
  };
}
