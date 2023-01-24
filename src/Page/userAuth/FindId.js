import React, { useEffect, useState } from "react";
import Email from "../../_assets/mail-icon.svg";
import NoCircleCheck from "../../_assets/check-icon.svg";
import { useNavigate } from "react-router-dom";

function FindId(props) {
  let navigate = useNavigate();

  useEffect(() => {
    if (props.isLogined) {
      navigate("/");
    }
  });

  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState("");

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
    <div className="Auth-area">
      <div className="boiler-area">
        <div className="find-user findId">
          <h2 className="header">아이디 찾기</h2>
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
            {/* 이메일이 db에 존재하지 않을 경우 */}
            <blockquote className="warning">
              이메일이 존재하지 않습니다.
            </blockquote>
          </div>
          <div>
            {/* 발송 후에는 문구를 '다시 발송하기'로 바꾸기 */}
            {/* 인증이 완료되면 버튼을 disable로 바꾸고, bgblack 속성을 준 후 
              문구를 '인증이 완료되었습니다.' 로 바꾸기 */}
            <button
              className={
                inspectEmail ? "mainColor auth-button" : "gray auth-button"
              }
            >
              인증 메일을 발송합니다.
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
            {/* 인증이 완료되면 버튼을 disable로 바꾸고, bgblack 속성을 준 후 
              문구를 '인증 완료' 로 바꾸기 */}
            <button className={inspectEmail ? "mainColor" : "gray"}>
              인증번호 확인
            </button>
          </div>
          <div>
            {/* 인증번호가 올바르지 않을 경우 */}
            {!auth && (
              <blockquote className="warning">
                인증번호가 올바르지 않습니다.
              </blockquote>
            )}
          </div>
          {/* 찾았을 때만 보여주기, className에 noshow 사용 */}
          <div className="find-result">고객님의 아이디는 ooooooo 입니다.</div>
          <div className="button-zon">
            <button
              onClick={() => {
                navigate("/findPassword");
              }}
            >
              비밀번호 찾기
            </button>
            <button>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindId;
