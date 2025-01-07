import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
// Dương Hương Hướng Hảo
function App() {
  return (
    <div className="container">
      <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
    </div>
  );
}

export default App;
