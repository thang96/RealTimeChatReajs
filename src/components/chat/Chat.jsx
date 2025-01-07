import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setOpenEmoji(false);
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
          <div className="message own">
            <div className="texts">
              <img src="./avatar.png" alt="" />
              <p>
                What are y doing, some time you need to hangout?, i got some
                thing importand wont to telling you
              </p>
              <span>1 min ago</span>
            </div>
            <div ref={endRef}></div>
          </div>
          <div className="message">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <p>
                What are y doing, some time you need to hangout?, i got some
                thing importand wont to telling you
              </p>
              <span>1 min ago</span>
            </div>
          </div>
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
          <button className="sendButton">Send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
