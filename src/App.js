import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StrictMode, use, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import MainNavigations from "./components/navigations/mainNotification";
import Login from "./components/login/fistLogin";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid).finally(() => setAuthChecked(true));
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  // console.log(currentUser);

  if (isLoading || !authChecked)
    return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <StrictMode>
        <BrowserRouter>
          <MainNavigations/>
        </BrowserRouter>
      </StrictMode>
    </div>
  );
}

export default App;
