import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography, Flex } from "antd";
import { logout } from "../Firebase/config";
import Chat from "../Chat/Chat";
import Detail from "../Detail/Detail";
import List from "../List/List";

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
