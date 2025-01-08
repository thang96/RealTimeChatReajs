import React, { useState } from "react";
import { Row, Col, Button, Typography } from "antd";
import {
  auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "../firebase/config"; // Import auth và FacebookAuthProvider
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup từ Firebase v9+
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const loginWithFB = () => {
    const providerFB = new FacebookAuthProvider(); // Tạo provider Facebook
    signInWithPopup(auth, providerFB)
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginWithGG = () => {
    const providerGG = new GoogleAuthProvider(); // Tạo provider Facebook
    signInWithPopup(auth, providerGG)
      .then((result) => {
        console.log(result);
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      // console.log('changeeeeeeeeeeeeeeeeeee');
      // console.log(user);
      //   navigate('/home');
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <>
      <div style={{ width: "100%" }}>
        <Row justify={"center"} style={{ height: 800 }}>
          <Col span={8}>
            <Title style={{ textAlign: "center" }} level={3}>
              Fun Chat
            </Title>

            <Button
              style={{ width: "100%", marginBottom: 5 }}
              onClick={loginWithGG}
            >
              Login with Google
            </Button>
            <Button style={{ width: "100%" }} onClick={loginWithFB}>
              Login with Facebook
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
