import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography, Flex } from "antd";
import { logout } from "../firebase/config";
import Chat from "../chat/Chat";
import Detail from "../detail/Detail";
import List from "../list/List";
import { useChatStore } from "../../lib/chatStore";

const { Title } = Typography;

const ChatRoom = () => {
  const { chatId } = useChatStore();

  useEffect(() => {
    // logout();
  }, []);
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <List />
      {chatId && <Chat />}
      {chatId && <Detail />}
    </div>
  );
};

export default ChatRoom;
