import React, { useRef, useState } from "react";
import Previews from "../../component/Previews";
import Idicon from "../../_assets/id-icon.svg";
import Email from "../../_assets/mail-icon.svg";
import GrayEdit from "../../_assets/edit.svg";
import BlackEdit from "../../_assets/editBlack.svg";
import NoCircleCheck from "../../_assets/check-icon.svg";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [changeEmail, setchangeEmail] = useState(false);
  const [auth, setAuth] = useState("");
  const [changeNikname, setchangeNikname] = useState(false);

  let inspectEmail =
    email && /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  function keyup(e) {
    const regExp = /[^0-9a-zA-Z`~!@#$%^&*()-_=+]/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
    }
  }

  return (
    <div className="Auth-area userInfo">
      <div className="boiler-area">
        <div className="find-user change userInfo">
          <h2 className="header">회원정보</h2>
          <hr />
          <div className="userInfo-page">
            <div className="preview-zone">
              <Previews />
              <span className="change-img click">편집</span>
            </div>
            <div className="nikname-change">
              <input
                disabled={changeNikname ? false : true}
                defaultValue="유저닉네임"
                className={changeNikname ? "black" : "fontGray"}
              />
              <hr className="bar" />
              <img
                onClick={() => {
                  setchangeNikname(!changeNikname);
                }}
                alt="nikname change"
                src={changeNikname ? GrayEdit : BlackEdit}
              />
            </div>
            <div className="nametag">아이디</div>
            <div className="id input">
              <img src={Idicon} className="input-icon" alt="id" />
              <input
                disabled
                placeholder="유저 아이디 가져와 입력해두기."
              ></input>
            </div>
            <hr />
            <div className="nametag">이메일</div>
            <div className="email input">
              <span
                onClick={() => {
                  setchangeEmail(!changeEmail);
                }}
                className={changeEmail ? "change-icon" : "fontGray change-icon"}
              >
                편집
              </span>
              <img src={Email} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                placeholder="본래 이메일 가져와 입력해두기."
              ></input>
            </div>
            <div>
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
                className={
                  inspectEmail ? "mainColor auth-button" : "gray auth-button"
                }
              >
                인증메일을 발송합니다.
              </button>
            </div>
            <div className="auth-number input">
              <img src={NoCircleCheck} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setAuth(e.target.value);
                }}
                placeholder="인증번호를 입력해주세요."
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                }}
              ></input>
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, 문구를 '인증 완료.' 로 바꾸기 */}
              <button className={inspectEmail ? "mainColor" : "gray"}>
                인증번호 확인
              </button>
            </div>
            <div>
              {/* 인증번호가 올바르지 않을 경우 표시 */}
              {!auth && (
                <blockquote className="warning">
                  인증번호가 올바르지 않습니다.
                </blockquote>
              )}
            </div>
            {/* 이메일을 변경하고, 인증번호가 올바를 경우 표시 noshow 이용 */}
            <div className="find-result">
              <hr />
              이메일을 변경하였습니다.
              <br />
              저장을 클릭하면 반영됩니다.
              <hr />
            </div>
            <button className="mainColor boiler-button">회원정보 저장</button>
            <div className="info-option smallbutton">
              <span className="secession click">회원탈퇴</span>
              <span
                className="click"
                onClick={() => {
                  navigate("/passwordChange");
                }}
              >
                비밀번호 변경
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
