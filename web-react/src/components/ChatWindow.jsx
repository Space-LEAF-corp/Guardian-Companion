function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`message ${msg.sender === "user" ? "user" : "guardian"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
