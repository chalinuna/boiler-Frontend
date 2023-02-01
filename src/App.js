import "./App.scss";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GET_USER } from "./_reducers/user";

function App() {
  let store = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  const [isLogined, setLogined] = useState(false);

  // ===========================CSS=============================
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // =======================check Cookies=======================

  useEffect(() => {
    setScreenSize();
  });

  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log("서버실행");
    });

    axios
      .post(`${process.env.REACT_APP_API_USER}/auth`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isLogined) {
          console.log("auth 결과", response);
          setLogined(response.data.isLogined);
          dispatch(
            GET_USER({
              id: response.data.user.id,
              nikname: response.data.user.nikname,
              provider: response.data.user.provider,
            })
          );
        } else if (!response.data.isLogined) {
          setLogined(response.data.isLogined);
          sessionStorage.clear();
        }
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login isLogined={isLogined} />} />
        <Route path="/register" element={<Register isLogined={isLogined} />} />
        <Route path="/findId" element={<FindId isLogined={isLogined} />} />
        <Route
          path="/findPassword"
          element={<FindPassword isLogined={isLogined} />}
        />
        <Route path="/userInfo" element={<UserInfo isLogined={isLogined} />} />
        <Route
          path="/passwordChange"
          element={<UserPassword isLogined={isLogined} />}
        />
      </Routes>
    </div>
  );
}

export default App;
