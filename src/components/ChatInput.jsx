import { useState } from "react";
import "./ChatInput.css";

console.log(import.meta.env);
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

export function ChatInput({
  chatMessages,
  setChatMessages,
  setIsLoading,
  isLoading,
  inputText, setInputText
}) {
  

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function PressKey(event) {
    if (event.key === "Enter") sendMessage();
    if (event.key === "Escape") setInputText("");
  }

  async function getGeminiResponse(message) {
    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Gemini API error:", errorData);
        return "Sorry, something went wrong talking to Gemini.";
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || "Sorry, I didn't get a response.";
    } catch (err) {
      console.error("Network error calling Gemini:", err);
      return "Sorry, I couldn't reach the chatbot service.";
    }
  }

  async function sendMessage() {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: trimmed,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: (
  <div className="typing-indicator">
    <span></span>
    <span></span>
    <span></span>
  </div>
),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(true);

    const response = await getGeminiResponse(trimmed);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
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
  ➤
</button>
    </div>
  );
}