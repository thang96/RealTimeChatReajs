import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { upload } from "../../lib/upload";

const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.message]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
    setOpenEmoji(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgURL = null;

    try {
      if (img.file) {
        imgURL = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgURL && { img: imgURL }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error, "error send");
    }

    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  return (
    <>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src={user?.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{user?.username}</span>
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
          {chat?.message?.map((message, index) => (
            <div
              className={
                message.senderId === currentUser.id ? "message own" : "message"
              }
              key={`${index}`}
            >
              <div className="texts">
                {message?.img && <img src={message?.img} />}
                <p>{message?.text}</p>
                {/* <span>{message?.text}</span> */}
              </div>
              <div ref={endRef}></div>
            </div>
          ))}
          {img.url && (
            <div className="message own">
              <div className="texts">
                <img src={img.url} alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
              <img src="./img.png" alt="" />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImg}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <img src="./camera.png" alt="" />
            <img src="./mic.png" alt="" />
          </div>
          <input
            type="text"
            placeholder={
              isCurrentUserBlocked || isReceiverBlocked
                ? "You cannot send a message"
                : "Type a message..."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
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
          <button
            className="sendButton"
            onClick={handleSend}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
