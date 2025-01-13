import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const { chatId, user } = useChatStore();

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.id) return; // Chỉ chạy nếu có currentUser.id

    const userDocRef = doc(db, "userchats", currentUser.id); // Lấy reference của tài liệu người dùng

    const unSub = onSnapshot(userDocRef, async (res) => {
      const items = res?.data()?.chats || []; // Đảm bảo items là một mảng
      const promises = items.map(async (item) => {
        if (!item?.receiverId) return null; // Bỏ qua nếu không có receiverId
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });
      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b?.updatedAt - a?.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
    } catch (error) {
      console.log(error);
    }
    changeChat(chat.chatId, chat.user);
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className="chatList">
        <div className="search">
          <div className="searchBar">
            <img src="/search.png" alt="" />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <img
            src={addMode ? "./minus.png" : "/plus.png"}
            alt=""
            className="add"
            onClick={() => {
              setAddMode((prev) => !prev);
            }}
          />
        </div>
        {filteredChats.map((chat, index) => (
          <div
            className="item"
            key={`${index}`}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor: chats?.isSeen
                ? "transparent"
                : "rgb(53, 53, 243)",
            }}
          >
            <img
              src={
                chat?.user?.blocked.includes(currentUser.id)
                  ? chat?.user?.avatar
                  : "./avatar.png"
              }
              alt=""
            />
            <div className="texts">
              <span>
                {chat?.user?.blocked.includes(currentUser.id)
                  ? "User"
                  : chat?.user?.username}
              </span>
              <p>{chat?.lastMessage}</p>
            </div>
          </div>
        ))}
        {addMode && <AddUser />}
      </div>
    </>
  );
};

export default ChatList;
