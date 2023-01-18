import React, { useState } from "react";
import Idicon from "../../_assets/id-icon.svg";

function FindPassword() {
  const [id, setId] = useState("");
  return (
    <div className="Auth-area">
      <div className="boiler-area">
        <div className="find-user findId">
          <h2 className="header">비밀번호 찾기</h2>
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
            {/* 아이디가 존재하지 않을 때만 .noshow 없애기 */}
            <blockquote className="warning">
              아이디가 존재하지 않습니다.
            </blockquote>
          </div>
          <div>
            {/* 아이디가 true일때만 disable 해제하기 */}
            {/* 발송 후에는 검은색으로 변경하기 */}
            <button
              className={id ? "mainColor auth-button" : "gray auth-button"}
            >
              임시 비밀번호를 이메일로 발송합니다.
            </button>
          </div>
          <div className="find-result">
            임시 비밀번호를 이메일로 발송하였습니다.
          </div>
          <button className="mainColor boiler-button">로그인</button>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
