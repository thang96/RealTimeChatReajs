import ChatRoom from "./components/ChatRoom";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, use } from "react";
// Dương Hương Hướng Hảo
function App() {
  const user = false;
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
