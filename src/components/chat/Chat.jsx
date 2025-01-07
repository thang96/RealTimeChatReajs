import "./chat.css";
const Chat = () => {
  return (
    <>
      <div className="chat">
        <div className="top">
          <div className="user">
            <img src="./avatar.png" alt="" />
            <div className="texts">
              <span>Bui Duc Thang</span>
              <p>What are y doing, some time you need to hangout</p>
            </div>
          </div>
          <div className="icons">
            <img src="./phone.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./info.png" alt="" />
          </div>
        </div>
        <div className="center"></div>
        <div className="bottom">
          <div className="icons"></div>
          <input type="text" placeholder="Type a message..." />
          <div className="emoji"></div>
        </div>
      </div>
    </>
  );
};

export default Chat;
