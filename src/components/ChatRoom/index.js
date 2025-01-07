import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography, Flex } from "antd";
import { logout } from "../firebase/config";
import Chat from "../chat/Chat";
import Detail from "../detail/Detail";
import List from "../list/List";

const { Title } = Typography;

const ChatRoom = () => {
  useEffect(() => {
    // logout();
  }, []);
  return (
      <div style={{flex:1,display:"flex"}}>
        {/* <Row justify={"center"} style={{ height: 800 }}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chatttttttt
          </Title>
        </Row> */}
        <List/>
        <Chat/>
        <Detail/>
      </div>
  );
};

export default ChatRoom;
