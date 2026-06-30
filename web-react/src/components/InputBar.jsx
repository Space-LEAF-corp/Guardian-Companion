import { useState } from "react";
import { sendQuantumMessage } from "../api/quantum";

function InputBar({ addMessage }) {
  const [text, setText] = useState("");
  const [role, setRole] = useState("STUDENT");

  const handleSend = async () => {
    if (!text.trim()) return;

    addMessage(text, "user");
    const reply = await sendQuantumMessage(text, role);
    addMessage(reply, "guardian");

    setText("");
  };

  return (
    <div className="input-bar">
      <input
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about qubits, circuits, GHZ states..."
      />

      <select
        className="role-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="CHILD">Child</option>
        <option value="STUDENT">Student</option>
        <option value="ADULT">Adult</option>
        <option value="RESEARCHER">Researcher</option>
      </select>

      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default InputBar;
