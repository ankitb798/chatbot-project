import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
export function ChatMessage({ message, sender }) {
  // const message=props.message;
  // const sender=props.sender;
  // const {message,sender}=props;
  /*if(sender==='robot')
                        {return ( 
                            <div>
                              <img src="robot.png"  width="50" />
                              {message}
                            </div>
                        );
            }*/
  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="message">{message}</div>
      {sender === "user" && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}
function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "hello chatbot", sender: "user", id: "id1" },
    { message: "hello! how can i help you", sender: "robot", id: "id2" },
    { message: "can you get me todays date", sender: "user", id: "id3" },
    { message: "today is september 27", sender: "robot", id: "id4" },
  ]);
  return (
    <div className="app-container">
      <ChatMessages
        setChatMessages={setChatMessages}
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={false}
      />
    </div>
  );
}
