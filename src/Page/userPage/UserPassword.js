import React, { useState } from "react";

import Passwordicon from "../../_assets/password-icon.svg";
import Eye from "../../_assets/mdi_eye.svg";
import EyeOff from "../../_assets/eye-off.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import Message from "../../component/Message";
import { useNavigate } from "react-router-dom";

function UserPassword() {
  let store = useSelector((state) => {
    return state;
  });

  let navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [changePassword, setchangePassword] = useState("");
  const [check, setCheck] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [messageShow, setmessageShow] = useState(false);
  const [message, setmessage] = useState("");

  const [able, setAble] = useState(false);

  let inspectPassword =
    changePassword &&
    /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,16}$/.test(changePassword);

  function setModal(message) {
    setmessageShow(true);
    setmessage(message);
  }

  function originPassword() {
    let user = {
      id: store.user.user_id,
      password: password,
    };

    axios
      .post(`${process.env.REACT_APP_API_USER}/checkPassword`, user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.isMatch) {
          setModal("비밀번호가 일치합니다.");
          setAble(true);
        } else if (!response.data.isMatch) {
          setModal("비밀번호가 일치하지 않습니다.");
        }
      });
  }

  function onSave() {
    let user = {
      id: store.user.user_id,
      password: changePassword,
    };

    axios
      .post(`${process.env.REACT_APP_API_USER}/changePassword`, user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setModal(`비밀번호 변경을 완료하였습니다.
          2초 뒤 메인페이지로 이동합니다.`);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setModal("비밀번호 변경에 실패했습니다.");
        }
      });
  }

  return (
    <div className="Auth-area">
      {messageShow ? (
        <Message
          messageShow={messageShow}
          setmessageShow={setmessageShow}
          message={message}
        />
      ) : (
        ""
      )}
      <div className="boiler-area">
        <div className="find-user change password">
          <h2 className="header">비밀번호 변경</h2>
          <hr />
          <div className="password-page">
            <div className="nametag">비밀번호</div>
            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요."
                type={show1 ? "" : "password"}
              ></input>
              <img
                onClick={() => {
                  setShow1(!show1);
                }}
                src={show1 ? Eye : EyeOff}
                className="eye-icon"
                alt="show password"
              />
            </div>
            <div>
              {/* 비밀번호가 확인되었을 경우 disable, .bgblack 속성 주기 */}
              <button
                disabled={password ? false : true}
                className={
                  password ? "mainColor auth-button" : "gray auth-button"
                }
                onClick={() => {
                  originPassword();
                }}
              >
                현재 비밀번호 확인
              </button>
            </div>
            {/* 비밀번호가 올바를 경우에만 disble을 해제한다. */}
            <hr />
            <div className="nametag">변경할 비밀번호</div>
            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                disabled={!able}
                onChange={(e) => {
                  setchangePassword(e.target.value);
                }}
                placeholder="변경할 비밀번호를 입력해주세요."
                type={show2 ? "" : "password"}
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
              {changePassword && !inspectPassword && (
                <blockquote className="warning">
                  하나 이상의 문자 또는, 숫자, 특수문자를 포함하여 최소 8자
                  이상, 16자 이하의 비밀번호를 설정해 주세요.
                </blockquote>
              )}
            </div>

            <div className="password input">
              <img src={Passwordicon} className="input-icon" alt="password" />
              <input
                disabled={!able}
                onChange={(e) => {
                  setCheck(e.target.value);
                }}
                placeholder="비밀번호를 한번 더 입력해주세요."
                type={show3 ? "" : "password"}
              ></input>
              <img
                onClick={() => {
                  setShow3(!show3);
                }}
                src={show3 ? Eye : EyeOff}
                className="eye-icon"
                alt="show password"
              />
            </div>
            <div>
              {changePassword !== check && (
                <blockquote className="warning">
                  비밀번호가 서로 일치하지 않습니다.
                </blockquote>
              )}
            </div>
            <button
              disabled={
                changePassword && inspectPassword && changePassword === check
                  ? false
                  : true
              }
              className={
                changePassword && inspectPassword && changePassword === check
                  ? "mainColor boiler-button"
                  : "gray boiler-button"
              }
              onClick={() => {
                onSave();
              }}
            >
              비밀번호 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPassword;
