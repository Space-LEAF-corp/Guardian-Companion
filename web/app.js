const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("message-input");
const roleSelect = document.getElementById("role-select");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const role = roleSelect.value;

  try {
    const res = await fetch("/api/quantum/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, role })
    });

    const data = await res.json();
    addMessage(data.reply, "guardian");
  } catch (err) {
    addMessage("Quantum Guardian: Connection error. A guardian should inspect the server.", "guardian");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
