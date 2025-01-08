import { useState } from "react";
import "./login.css";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (event) => {
    if (event.target.files[0]) {
      setAvatar({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault()
  };

  return (
    <>
      <div className="login">
        <div className="item">
          <h2>Welcome back</h2>
          <form action="" onSubmit={handleLogin}>
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign In</button>
          </form>
        </div>
        <div className="separator"></div>
        <div className="item">
          <h2>Create an Account</h2>
          <form action="">
            <label htmlFor="file">
              <img src={avatar.url || "./avatar.png"} alt="" />
              Upload an image
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
