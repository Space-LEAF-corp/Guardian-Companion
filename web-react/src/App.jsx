import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  return (
    <div className="app">
      <header>
        <h1>Quantum Guardian</h1>
        <p className="subtitle">Governed, emotionally-safe quantum assistant</p>
      </header>

      <ChatWindow messages={messages} />

      <InputBar addMessage={addMessage} />
    </div>
  );
}

export default App;
