import { useState } from "react";
import { ChatInput } from "./components/ChatInput.jsx";
import ChatMessages from "./components/ChatMessages.jsx";

import "./App.css";
function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "hello chatbot", sender: "user", id: "id1" },
    { message: "hello! how can i help you", sender: "robot", id: "id2" },
    { message: "can you get me todays date", sender: "user", id: "id3" },
    { message: "today is september 27", sender: "robot", id: "id4" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="app-container">
      <ChatMessages
        setChatMessages={setChatMessages}
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
