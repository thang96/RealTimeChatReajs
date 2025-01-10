import { useState } from "react";
import "./login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
    event.preventDefault();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, email, password } = Object.fromEntries(formData);
    toast.success("Account created! You can login now");
    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      // await setDoc(doc(db, "users", res.user.uid), {
      //   username,
      //   email,
      //   id: res.user.uid,
      //   blocked: [],
      // });
      // await setDoc(doc(db, "userchats", res.user.uid), {
      //   chats: [],
      // });
      // toast.success("Account created! You can login now");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
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
          <form action="" onSubmit={handleRegister}>
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
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
