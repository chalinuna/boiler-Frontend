import React, { useState, useEffect } from "react";
import Idicon from "../../_assets/id-icon.svg";
import Passwordicon from "../../_assets/password-icon.svg";
import Eye from "../../_assets/mdi_eye.svg";
import EyeOff from "../../_assets/eye-off.svg";
import Email from "../../_assets/mail-icon.svg";
import Pen from "../../_assets/pen-icon.svg";
import NoCircleCheck from "../../_assets/check-icon.svg";
import { ReactComponent as Check } from "../../_assets/check.svg";
import axios from "axios";

function Register() {
  const [id, setId] = useState("");

  const [email, setEmail] = useState("");

  const [authButton, setAuthButton] = useState(false);
  const [auth, setAuth] = useState("");
  const [authResult, setauthResult] = useState(false);

  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [nikname, setNikname] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [ableId, setableId] = useState("");

  const [agreeClick, setClick] = useState(false);
  const [subClick, setSub] = useState(false);

  let inspectId = id && /(?=.*\d)(?=.*[a-z]).{6,12}/.test(id);
  let inspectEmail =
    email && /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  let inspectPassword =
    password && /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/.test(password);

  function keyup(e) {
    const regExp = /[^0-9a-zA-Z`~!@#$%^&*()-_=+]/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
    }
  }

  function inspectIdRouter() {
    let user = {
      id: id,
    };
    axios.post("/api/user/inspectId", user).then((response) => {
      if (response.data.joinable === false) {
        alert("이미 존재하는 아이디입니다.");
      } else if (response.data.joinable === true) {
        setableId(response.data.joinable);
        alert("사용 가능한 아이디입니다.");
      }
    });
  }

  function inspectEmailRouter() {
    let user = {
      id: id,
      email: email,
    };
    axios.post("/api/user/authEmail", user).then((response) => {
      setableId(response.data.joinable);
      if (response.data.joinable === false) {
        alert("사용 불가능한 이메일입니다.");
      } else {
        alert("인증 메일을 발송하였습니다.");
      }
    });
  }

  function getAuth() {
    let user = {
      email: email,
      auth: auth,
    };

    axios.post("/api/user/getAuth", user).then((response) => {
      console.log("인증번호 결과", response);
      if (response.data.success) {
        console.log(response);
        setauthResult(true);
      } else {
        console.log(response);
        alert("인증번호가 일치하지 않습니다.");
      }
    });
  }

  // auth번호로 인증번호 인증해서 setauthResult(true) 하기

  function onRegister() {
    let user = {
      id: id,
      email: email,
      password: check,
      nikname: nikname,
      statusCode: 1,
    };

    if (!id || !email || !auth || !password || !nikname) {
      alert("작성하지 않은 항목이 있습니다.");
    } else {
      axios
        .post("/api/user/register", user)
        .then((response) =>
          console.log("회원가입 된 유저 정보 : ", response.data)
        );
    }
  }

  return (
    <div className="Auth-area registerView">
      <div className="boiler-area">
        <div className="find-user">
          <h2 className="header">회원가입</h2>
          <div className="register">
            <div className="id input">
              <img src={Idicon} className="input-icon" alt="id" />
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                placeholder="아이디를 입력해주세요."
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
                }}
                maxLength="12"
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
            <div>
              {/* 발송 후에는 문구를 '다시 발송하기'로 바꾸기 */}
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, bgblack 속성을 준 후 
              문구를 '인증이 완료되었습니다.' 로 바꾸기 */}
              <button
                disabled={inspectId ? false : true}
                className={
                  inspectId ? "mainColor auth-button" : "gray auth-button"
                }
                onClick={() => {
                  inspectIdRouter();
                }}
              >
                {ableId ? "사용 가능한 아이디입니다." : "아이디 중복 검사하기"}
              </button>
            </div>
            <div className="email input">
              <img src={Email} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                placeholder="이메일을 입력해주세요."
              ></input>
            </div>
            <div>
              {subClick && !email && (
                <blockquote className="warning">
                  이메일을 입력해 주세요.
                </blockquote>
              )}
              {email && !inspectEmail && (
                <blockquote className="warning">
                  이메일 형식이 올바르지 않습니다.
                </blockquote>
              )}
            </div>
            <div>
              {/* 발송 후에는 문구를 '다시 발송하기'로 바꾸기 */}
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, bgblack 속성을 준 후 
              문구를 '인증이 완료되었습니다.' 로 바꾸기 */}
              <button
                disabled={inspectEmail ? false : true}
                id={authResult ? "noshow" : ""}
                className={
                  inspectEmail ? "mainColor auth-button" : "gray auth-button"
                }
                onClick={() => {
                  inspectEmailRouter();
                  setAuthButton(true);
                }}
              >
                {authButton ? "다시 발송하기" : "인증번호를 메일로 발송합니다."}
              </button>
              <button
                disabled={authResult ? true : false}
                id={!authResult ? "noshow" : ""}
                className="gray auth-button"
              >
                인증이 완료되었습니다.
              </button>
            </div>
            <div className="auth-number input">
              <img src={NoCircleCheck} className="input-icon" alt="password" />
              <input
                maxLength="6"
                onChange={(e) => {
                  setAuth(e.target.value);
                }}
                placeholder="인증번호"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                }}
              ></input>
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, 문구를 '인증 완료.' 로 바꾸기 */}
              <button
                onClick={() => {
                  getAuth();
                }}
                disabled={authResult ? true : false}
                id={authResult ? "gray" : ""}
                className={inspectEmail ? "mainColor" : "gray"}
              >
                {authResult ? "인증 완료" : "인증번호 확인"}
              </button>
            </div>
            <div>
              {/* 인증번호가 올바르지 않을 경우 표시 */}
              {subClick && !auth && (
                <blockquote className="warning">
                  인증번호가 올바르지 않습니다.
                </blockquote>
              )}
            </div>

            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                disabled={authResult ? false : true}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요."
                type={show ? "" : "password"}
                onKeyUp={(e) => {
                  keyup(e);
                }}
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
                  하나 이상의 문자 또는, 숫자, 특수문자를 포함하여 최소 8자
                  이상, 16자 이하의 비밀번호를 설정해 주세요.
                </blockquote>
              )}
            </div>
            <div className="password input">
              <img
                onClick={() => {
                  setShow2(!show2);
                }}
                src={Passwordicon}
                className="input-icon"
                alt="password"
              />
              <input
                disabled={authResult ? false : true}
                onChange={(e) => {
                  setCheck(e.target.value);
                }}
                placeholder="비밀번호를 한번 더 입력해주세요."
                type={show2 ? "" : "password"}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                maxLength="16"
              ></input>
              <img
                onClick={() => {
                  setShow2(!show2);
                }}
                src={show2 ? Eye : EyeOff}
                className="eye-icon"
                alt="show password"
              />
            </div>
            <div>
              {subClick && password !== check && (
                <blockquote className="warning">
                  비밀번호가 서로 일치하지 않습니다.
                </blockquote>
              )}
            </div>
            <div className="nikname input">
              <img src={Pen} className="input-icon" alt="id" />
              <input
                onChange={(e) => {
                  setNikname(e.target.value);
                }}
                placeholder="닉네임을 입력해주세요."
              ></input>
            </div>
            <div>
              {subClick && !nikname && (
                <blockquote className="warning">
                  닉네임을 입력해 주세요.
                </blockquote>
              )}
            </div>
            <div className="register-option smallbutton">
              <div
                onClick={() => {
                  setClick(!agreeClick);
                }}
                className={
                  agreeClick
                    ? `black ` + "isMaintain click"
                    : "" + "isMaintain click"
                }
              >
                <Check
                  className={
                    agreeClick ? `check-icon black` : "" + "check-icon click"
                  }
                />{" "}
                모든 이용약관에 동의합니다.
              </div>
              <div
                className={
                  agreeClick ? `check-icon black` : "" + "check-icon click"
                }
              >
                서비스 이용 약관 동의 (보기)
              </div>
              <div
                className={
                  agreeClick ? `check-icon black` : "" + "check-icon click"
                }
              >
                개인정보 처리 방침 동의 (보기)
              </div>
            </div>

            <button
              onClick={() => {
                setSub(!subClick);
                onRegister();
              }}
              className="mainColor boiler-button"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
