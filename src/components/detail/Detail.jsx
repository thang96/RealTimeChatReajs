import "./detail.css";
const Detail = () => {
  return (
    <>
      <div className="detail">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <h2>Bui Duc Thang</h2>
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

          <button>Block User</button>
          <button className="logout">Logout</button>
        </div>
      </div>
    </>
  );
};

export default Detail;
