import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.isLogined) {
      navigate("/");
    }
  });

  const [click, setClick] = useState(false); //로그인 유지 여부
  const [show, setShow] = useState(false); //비밀번호 보이기 여부

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [subClick, setSub] = useState(false);

  const [loginResult, setresult] = useState(true);

  function keyup(e) {
    const regExp = /[^0-9a-zA-Z`~!@#$%^&*()-_=+]/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
    }
  }

  let inspectId = id && /(?=.*\d)(?=.*[a-z]).{6,12}/.test(id);
  let inspectPassword =
    password && /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/.test(password);

  function onLogin() {
    let user = {
      id: id,
      password: password,
      maintainLogin: click,
    };

    axios
      .post(`${process.env.REACT_APP_API_USER}/login`, user, {
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);

        if (response.data.success) {
          navigate("/");
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        } else {
          setresult(false);
        }
      });
  }

  return (
    <div className="Auth-area">
      <div className="boiler-area">
        <div className="find-user login">
          <h2 className="header">로그인</h2>
          <div>
            <div className="id input">
              <img src={Idicon} className="input-icon" alt="id" />
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                maxLength="12"
                placeholder="아이디를 입력해주세요."
              ></input>
            </div>
            <div>
              {subClick && !id && (
                <blockquote className="warning">
                  아이디를 입력해 주세요.
                </blockquote>
              )}
              {!inspectId && id && (
                <blockquote className="warning">
                  아이디 형식이 올바르지 않습니다. 최소 하나의 숫자와 하나의
                  영소문자를 포함하여 6~12자의 아이디를 설정해 주세요.
                </blockquote>
              )}
            </div>
            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                placeholder="비밀번호를 입력해주세요."
                type={show ? "" : "password"}
                maxLength="16"
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
            <div>
              {password && !inspectPassword && (
                <blockquote className="warning">
                  하나 이상의 영어, 숫자, 특수문자를 포함하여 최소 8자 이상,
                  16자 이하의 비밀번호를 설정해 주세요.
                </blockquote>
              )}
              {subClick && !id && (
                <blockquote className="warning">
                  비밀번호를 입력해 주세요.
                </blockquote>
              )}
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
          {/* 로그인 결과가 틀리면.. */}
          <div id={loginResult ? "noshow" : ""} className="warning">
            아이디 또는 비밀번호가 올바르지 않습니다.
            <br />
            입력하신 내용을 다시 확인해주세요!
          </div>
          <button
            onClick={() => {
              setSub(!subClick);
              onLogin();
            }}
            className="mainColor boiler-button"
          >
            로그인
          </button>
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
                {/* <a href="http://localhost:8080/api/user/kakao"> */}
                <a href={`${process.env.REACT_APP_API_USER}/kakao`}>
                  <img src={Kakao} />
                </a>
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
