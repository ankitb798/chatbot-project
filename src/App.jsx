import { useState } from "react";
import { ChatInput } from "./components/ChatInput.jsx";
import ChatMessages from "./components/ChatMessages.jsx";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      message:
        "👋 Hello! I'm your AI Assistant.\n\nAsk me anything—from coding and debugging to writing, learning, or brainstorming ideas.",
      sender: "robot",
      id: crypto.randomUUID(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="chat-title">

  <div className="header-left">

    <div className="logo-circle">
      <img src="https://cdn-icons-png.flaticon.com/128/8943/8943377.png" width={40} height={40}></img>
    </div>

    <div>

      <h2>Atlas AI</h2>

      <p>Your intelligent assistant</p>

    </div>

  </div>

  
</header>

      {/* Quick Suggestions */}
      {chatMessages.length === 1 && (
        <div className="welcome-section">
          <h2>What can I help you with today?</h2>

          <div className="suggestion-grid">
            <div
  className="suggestion-card"
  onClick={() => setInputText("Explain React Hooks")}
>
              💻
              <span>Explain React Hooks</span>
            </div>

            <div
  className="suggestion-card"
  onClick={() => setInputText("Write a professional email")}
>
              ✍️
              <span>Write a professional email</span>
            </div>

            <div
  className="suggestion-card"
  onClick={() => setInputText("Create a JavaScript project")}
>
              🚀
              <span>Create a JavaScript project</span>
            </div>

           <div
  className="suggestion-card"
  onClick={() => setInputText("Summarize an article")}
>
              📚
              <span>Summarize an article</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      <ChatMessages chatMessages={chatMessages} />

      {/* Footer */}
      <div className="chat-footer">
        <span>{chatMessages.length} Messages</span>

        <span className="status">
          {isLoading ? "AI is thinking..." : "Ready"}
        </span>
      </div>

      {/* Input */}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        inputText={inputText}
  setInputText={setInputText}
      />
    </div>
  );
}

export default App;