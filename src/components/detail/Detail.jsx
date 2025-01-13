import { signOut } from "firebase/auth";
import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const navigate = useNavigate();
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changedBlock,
  } = useChatStore();
  const { currentUser } = useUserStore();
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changedBlock();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("./login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      <div className="detail">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <h2></h2>
          <p>i alway try to be better</p>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Privacy & help</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Share photos</span>
              <img src="./arrowDown.png" alt="" className="icon" />
            </div>
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    width={300}
                    src="https://images.hdqwalls.com/download/dota-2-game-art-2020-ld-1920x1080.jpg"
                    alt=""
                  />
                  <span>photo_2024.png</span>
                </div>

                <img src="download.png" alt="" />
              </div>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Share Files</span>
              <img src="./arrowUp.png" alt="" />
            </div>
          </div>

          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked!"
              : isReceiverBlocked
              ? "User blocked"
              : "Block User"}
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
