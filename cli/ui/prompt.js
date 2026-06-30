import readline from "readline";
import { sendQuantumMessage } from "../api/quantum.js";

export async function promptLoop() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let role = "STUDENT";

  const ask = () => {
    rl.question("\nYou: ", async (input) => {
      if (input.trim().toLowerCase() === "exit") {
        console.log("Quantum Guardian: Safe travels, traveler.");
        rl.close();
        return;
      }

      if (input.startsWith("/role ")) {
        const newRole = input.replace("/role ", "").trim().toUpperCase();
        if (["CHILD", "STUDENT", "ADULT", "RESEARCHER"].includes(newRole)) {
          role = newRole;
          console.log(`Quantum Guardian: Role updated to ${role}.`);
        } else {
          console.log("Quantum Guardian: Unknown role. Valid roles: CHILD, STUDENT, ADULT, RESEARCHER.");
        }
        ask();
        return;
      }

      const reply = await sendQuantumMessage(input, role);
      console.log(`\nQuantum Guardian: ${reply}`);

      ask();
    });
  };

  ask();
}
