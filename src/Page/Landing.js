import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  let navigate = useNavigate();

  return (
    <div>
      <p>로그인한 유저 이메일</p>
      <p>로그인한 유저 닉네임</p>

      <p>로그인한 유저 refresh토큰</p>
      <p>로그인한 유저 access토큰</p>
      <div
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인 페이지
      </div>
      <div
        onClick={() => {
          navigate("/register");
        }}
      >
        회원가입 페이지
      </div>
      <div
        onClick={() => {
          navigate("/findId");
        }}
      >
        아이디 찾기
      </div>
      <div
        onClick={() => {
          navigate("/findPassword");
        }}
      >
        비밀번호 찾기
      </div>
      <div
        onClick={() => {
          navigate("/userInfo");
        }}
      >
        유저페이지
      </div>
      <div
        onClick={() => {
          navigate("/passwordChange");
        }}
      >
        비밀번호변경
      </div>
    </div>
  );
}

export default Landing;
