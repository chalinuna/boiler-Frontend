import logo from "./logo.svg";
import styled from "styled-components";
import "./App.scss";
import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Login from "./Page/userAuth/Login";
import Register from "./Page/userAuth/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import FindId from "./Page/userAuth/FindId";
import FindPassword from "./Page/userAuth/FindPassword";
import Landing from "./Page/Landing";
import UserInfo from "./Page/userPage/UserInfo";
import UserPassword from "./Page/userPage/UserPassword";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    console.log(vh);
  }
  useEffect(() => {
    setScreenSize();
  });

  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log("서버실행", response);
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPassword" element={<FindPassword />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/passwordChange" element={<UserPassword />} />
      </Routes>
    </div>
  );
}

export default App;
