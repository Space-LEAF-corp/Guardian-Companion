import { runAllSimulations } from "./simulations";

(async () => {
  try {
    const results = await runAllSimulations();
    console.log("Simulation Results:", results);
    // exit 0 on success for CI smoke test
    process.exit(0);
  } catch (err) {
    console.error("Simulation Error:", err);
    process.exit(1);
  }
})();
