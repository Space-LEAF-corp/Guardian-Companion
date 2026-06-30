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
  const reply = await window.quantumGuardian.sendMessage(message, role);
  addMessage(reply, "guardian");
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
