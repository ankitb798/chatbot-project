import { useState } from "react";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log(import.meta.env.VITE_GEMINI_API_KEY);
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
  if (!inputText.trim()) return;

  const userMessage = inputText;

  setInputText("");

  const newChatMessages = [
    ...chatMessages,
    {
      message: userMessage,
      sender: "user",
      id: crypto.randomUUID(),
    },
  ];

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

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
console.log(data);
    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    setChatMessages([
      ...newChatMessages,
      {
        message: aiReply,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
  } catch (error) {
    setChatMessages([
      ...newChatMessages,
      {
        message: "Error connecting to Gemini API.",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
  }

  setIsLoading(false);
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
