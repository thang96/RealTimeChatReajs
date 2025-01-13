import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Login from "../login/Login";
import ChatRoom from "../ChatRoom";
import { useUserStore } from "../../lib/userStore";

const MainNavigations = () => {
  const { fetchUserInfo } = useUserStore();
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid).finally(() => {
        setAuthChecked(true);
        if (user) {
          navigate("/home"); // Điều hướng đến /home nếu đã đăng nhập
        } else {
          navigate("/login"); // Điều hướng đến /login nếu chưa đăng nhập
        }
      });
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo, navigate]);

  if (!authChecked) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ChatRoom />} />
        {/* Nếu người dùng truy cập đường dẫn không hợp lệ, chuyển hướng về /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default MainNavigations;
