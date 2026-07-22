import { useState } from "react";
import ReactMarkdown from "react-markdown";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";

export function ChatMessage({ message, sender }) {

  const [copied, setCopied] = useState(false);

  function copyMessage() {
    if (typeof message !== "string") return;

    navigator.clipboard.writeText(message);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div
      className={
        sender === "user"
          ? "chat-message-user"
          : "chat-message-robot"
      }
    >
      {sender === "robot" && (
        <img
          src={RobotProfileImage}
          className="chat-message-profile"
          alt="Robot"
        />
      )}

      <div className="message">

        {sender === "robot" && typeof message === "string" && (
          <button
            className="copy-button"
            onClick={copyMessage}
          >
            {copied ? "✓" : "📋"}
          </button>
        )}

        {typeof message === "string" ? (
          <ReactMarkdown>{message}</ReactMarkdown>
        ) : (
          message
        )}

      </div>

      {sender === "user" && (
        <img
          src={UserProfileImage}
          className="chat-message-profile"
          alt="User"
        />
      )}
    </div>
  );
}