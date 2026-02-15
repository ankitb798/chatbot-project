import { useState } from "react";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
export function ChatInput({
  chatMessages,
  setChatMessages,
  setIsLoading,
  isLoading,
}) {
  const [inputText, setInputText] = useState("");
  function saveInputText(event) {
    setInputText(event.target.value);
  }
  function PressKey(event) {
    if (event.key == "Enter") sendMessage();
    if (event.key == "Escape") setInputText("");
  }

  async function sendMessage() {
    setInputText("");
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            width="100"
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(true);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
    setInputText("");
  }

  return (
    <div className="chat-input-container">
      <input
        className="input"
        placeholder="Send a message to the chatbot"
        size="30"
        value={inputText}
        onChange={saveInputText}
        onKeyDown={PressKey}
        disabled={isLoading}
      />
      <button
        className="send-button"
        onClick={sendMessage}
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  );
}
