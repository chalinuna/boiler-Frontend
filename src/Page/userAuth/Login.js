import React, { useState } from "react";
import "../userAuth/userAuth.scss";
import Idicon from "../../_assets/id-icon.svg";
import Passwordicon from "../../_assets/password-icon.svg";
import Eye from "../../_assets/mdi_eye.svg";
import EyeOff from "../../_assets/eye-off.svg";
// import Check from "../../_assets/check.svg";
import { ReactComponent as Check } from "../../_assets/check.svg";
import Naver from "../../_assets/naver-icon.png";
import Kakao from "../../_assets/kakao.png";
import Google from "../../_assets/google.png";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div className="Auth-area">
      <div className="boiler-area">
        <div className="find-user login">
          <h2 className="header">로그인</h2>
          <div>
            <div className="id input">
              <img src={Idicon} className="input-icon" alt="id" />
              <input placeholder="아이디를 입력해주세요."></input>
            </div>
            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                placeholder="비밀번호를 입력해주세요."
                type={show ? "" : "password"}
              ></input>
              <img
                onClick={() => {
                  setShow(!show);
                }}
                src={show ? Eye : EyeOff}
                className="eye-icon"
                alt="show password"
              />
            </div>
          </div>
          <div className="login-option smallbutton">
            <Check
              className={click ? `check-icon black` : "" + "check-icon click"}
            />
            <span
              onClick={() => {
                setClick(!click);
              }}
              className={
                click ? `black ` + "isMaintain click" : "" + "isMaintain click"
              }
            >
              로그인 유지하기
            </span>
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="click"
            >
              회원가입
            </span>
          </div>
          <div className="warning">
            아이디 또는 비밀번호가 올바르지 않습니다.
            <br />
            입력하신 내용을 다시 확인해주세요!
          </div>
          <button className="mainColor boiler-button">로그인</button>
          <div className="find-button smallbutton">
            <span
              onClick={() => {
                navigate("/findId");
              }}
              className="click"
            >
              아이디 찾기
            </span>
            <span
              onClick={() => {
                navigate("/findPassword");
              }}
              className="click"
            >
              비밀번호 찾기
            </span>
          </div>
          <div className="sns-login">
            <div className="line">간편 로그인</div>
            <div className="iconzone">
              <span>
                <img src={Naver} />
              </span>
              <span>
                <img src={Kakao} />
              </span>
              <span>
                <img src={Google} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
