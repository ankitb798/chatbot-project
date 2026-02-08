import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
function ChatMessages({ chatMessages }) {
      const chatMessageRef = useRef(null);
      useEffect(() => {
        const containerElem = chatMessageRef.current;
        if (containerElem) {
          containerElem.scrollTop = containerElem.scrollHeight;
        }
      }, [chatMessages]);
  //  const [chatMessages,setChatMessages]=array;
  //  const chatMessages=array[0];
  //  const setChatMessages=array[1];
  //  function sendMessage(){
  //            setChatMessages([
  //                 ...chatMessages,
  //                 {
  //                 message:'test',
  //                 sender:'user',
  //                 id:crypto.randomUUID()
  //             }
  //         ]);
  //         }
  return (
    <div className="chat-message-container" ref={chatMessageRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            className="message"
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}
export default ChatMessages;
