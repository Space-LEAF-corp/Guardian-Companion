export async function sendQuantumMessage(message, role) {
  try {
    const res = await fetch("http://localhost:3000/api/quantum/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, role })
    });

    const data = await res.json();
    return data.reply || "Quantum Guardian: No reply received.";
  } catch (err) {
    return (
      "Quantum Guardian: Connection error. A guardian should inspect the server for safety and integrity."
    );
  }
}
