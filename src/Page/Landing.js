import React from "react";
import { useNavigate } from "react-router-dom";
import "../Page/Landing.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DELETE_USER } from "../_reducers/user";

function Landing(props) {
  let navigate = useNavigate();

  // 로그인 페이지에서 redux에 id와 닉네임 저장해오기 ,,
  let store = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  let id = store.user.user_id;
  let nikname = store.user.user_nikname;

  function onLogout() {
    axios
      .post(
        `${process.env.REACT_APP_API_USER}/logout`,
        { id: store.user.user_id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        sessionStorage.clear();
        dispatch(DELETE_USER);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  }

  return (
    <div className="Auth-area">
      <div className="boiler-area">
        <div className="landing">
          <div className="landing-top">
            <span className="logo">CHALIE_</span>
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </span>
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              회원가입
            </span>
          </div>
          <hr />
          <div className="landing-second">
            <span
              className="leftside"
              onClick={() => {
                navigate("/findId");
              }}
            >
              아이디 찾기
            </span>
            <span
              className="logo"
              onClick={() => {
                navigate("/findPassword");
              }}
            >
              비밀번호 찾기
            </span>
          </div>
          <div>
            <span
              className="leftside"
              onClick={() => {
                navigate("/userInfo");
              }}
            >
              유저 페이지
            </span>
            <span
              onClick={() => {
                navigate("/passwordChange");
              }}
            >
              비밀번호 변경
            </span>
          </div>
          <hr />
          <div> 로그인 아이디 : {id}</div>
          <div> 로그인 닉네임 : {nikname}</div>
          <div
            onClick={() => {
              onLogout();
            }}
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
