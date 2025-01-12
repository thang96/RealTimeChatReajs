import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const endRef = useRef(null);
  const { chatId } = useChatStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(chatId);

  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setOpenEmoji(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId));
    } catch (error) {
      console.log(error, "error send");
    }
  };

  return (
    <>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Bui Duc Thang</span>
              <p>Live for my life</p>
            </div>
          </div>
          <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />
          </div>
        </div>
        <div className="center">
          {chat?.message?.map((message) => {
            <div className="message own">
              <div className="texts">
                {message.img && <img src={message?.img} />}
                <p>{message?.text}</p>
                {/* <span>{message}</span> */}
              </div>
              <div ref={endRef}></div>
            </div>;
          })}

          {/* <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                What are y doing, some time you need to hangout?, i got some
                thing importand wont to telling you
              </p>
              <span>1 min ago</span>
            </div>
          </div> */}
        </div>
        <div className="bottom">
          <div className="icons">
            <img src="./img.png" alt="" />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="emoji">
            <img
              src="./emoji.png"
              alt=""
              onClick={() => setOpenEmoji((prev) => !prev)}
            />
            <div className="picker">
              <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="sendButton" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
