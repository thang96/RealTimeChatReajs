import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, use, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Lib/firebase";
// Dương Hương Hướng Hảo
function App() {
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className="container">
      <StrictMode>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<ChatRoom />} /> */}
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </div>
  );
}

export default App;
