import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Previews from "../../component/Previews";
import Idicon from "../../_assets/id-icon.svg";
import Email from "../../_assets/mail-icon.svg";
import GrayEdit from "../../_assets/edit.svg";
import BlackEdit from "../../_assets/editBlack.svg";
import NoCircleCheck from "../../_assets/check-icon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "../../component/Message";
import Loading from "../../component/Loading";

function UserInfo() {
  let store = useSelector((state) => {
    return state;
  });
  let navigate = useNavigate();

  const [nikname, setNikname] = useState(store.user.user_nikname);

  const [originallEmail, setOriginal] = useState("");
  const [email, setEmail] = useState("");
  const [changeEmail, setchangeEmail] = useState(false);

  const [auth, setAuth] = useState("");
  const [changeNikname, setchangeNikname] = useState(false);

  const [authButton, setAuthButton] = useState(false);
  const [authResult, setauthResult] = useState(false);

  const [loading, setLoading] = useState(false);
  const [messageShow, setmessageShow] = useState(false);
  const [message, setmessage] = useState("");

  let inspectEmail =
    email && /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  function keyup(e) {
    const regExp = /[^0-9a-zA-Z`~!@#$%^&*()-_=+]/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      ele.value = ele.value.replace(regExp, "");
    }
  }

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_USER}/auth`,
        { id: "" },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setOriginal(response.data.user.email);
      });
  }, []);

  // ==============email auth==============

  function setModal(message) {
    setLoading(false);
    setmessageShow(true);
    setmessage(message);
  }

  // 클릭하면 인증메일 전송

  const sendEmail = async () => {
    let user = {
      id: store.user.user_id,
      email: email,
    };
    setLoading(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_API_USER}/changeEmail`, user, {
          // .post(`/api/user/changeEmail`, user, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.joinable === false) {
            setModal("사용 불가능한 이메일입니다.");
          } else {
            setAuthButton(true);
            setModal("인증 메일을 발송하였습니다.");
          }
        });
    } catch (e) {
      console.log(e, "에러");
      setLoading(false);
    }
  };

  function inspectEmailRouter() {
    // 만일 기존 이메일과 현재 이메일이 같다면 setModal ('이메일이 변경되지 않았습니다.')
    if (originallEmail == email) {
      setModal("이메일이 변경되지 않았습니다.");
    } else {
      sendEmail();
    }
  }

  function getAuth() {
    let user = {
      id: store.user.user_id,
      email: originallEmail,
      auth: auth,
    };

    if (auth === "") {
      setModal("인증번호를 입력해주세요.");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_USER}/getAuth`, user, {
          // .post(`/api/user/getAuth`, user, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            setauthResult(true);
            setModal("인증이 완료되었습니다.");
          } else {
            console.log(response);
            setauthResult(false);
            setModal("인증번호가 일치하지 않습니다.");
          }
        });
    }
  }
  //  ==================save======================

  function onSave() {
    // 이메일을 변경했을 경우, 이메일을 인증한 경우에만 이메일 저장 authResult = true 일때만
    // 아니면 닉네임만 저장
    let user = {
      id: store.user.user_id,
      email: authResult ? email : originallEmail,
      nikname: nikname,
      image: "변동없음",
    };

    axios
      .post(`${process.env.REACT_APP_API_USER}/userUpdate`, user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setModal(
            "회원 정보를 변경하였습니다. 2초 뒤 메인페이지로 이동합니다."
          );
          setTimeout(() => {
            navigate("/");
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }, 2000);
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
      {loading ? <Loading /> : ""}
      <div className="boiler-area">
        <div className="find-user change userInfo">
          <h2 className="header">회원정보</h2>
          <hr />
          <div className="userInfo-page">
            <div className="preview-zone">
              <Previews />
              <span className="change-img click">편집</span>
            </div>
            {/* 닉네임 */}
            <div className="nikname-change">
              <input
                disabled={changeNikname ? false : true}
                defaultValue={nikname}
                className={changeNikname ? "black" : "fontGray"}
                onChange={(e) => {
                  setNikname(e.target.value);
                }}
                maxLength="18"
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
              <input disabled placeholder={store.user.user_id}></input>
            </div>
            <hr />
            <div className="nametag">이메일</div>
            <div className="email input">
              <span
                onClick={() => {
                  setchangeEmail(!changeEmail);
                }}
                className={changeEmail ? "change-icon" : "fontGray change-icon"}
                id={authResult ? "noshow" : ""}
              >
                편집
              </span>
              <img src={Email} className="input-icon" alt="password" />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(email);
                }}
                onKeyUp={(e) => {
                  keyup(e);
                }}
                defaultValue={originallEmail && originallEmail}
                disabled={!changeEmail}
                id={authResult ? "noshow" : ""}
              ></input>
              {/* 바뀐 뒤의 이메일 */}
              <input
                defaultValue={email}
                disabled
                id={authResult ? "" : "noshow"}
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
              {/* 편집된 후에만 disabled */}
              {/* 발송 후에는 문구를 '다시 발송하기'로 바꾸기 */}
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, bgblack 속성을 준 후 
              문구를 '인증이 완료되었습니다.' 로 바꾸기 */}
              <button
                id={authResult ? "noshow" : ""}
                disabled={inspectEmail && changeEmail ? false : true}
                className={
                  inspectEmail && changeEmail
                    ? "mainColor auth-button"
                    : "gray auth-button"
                }
                onClick={() => {
                  inspectEmailRouter();
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
            <div
              className="auth-number input"
              id={!authButton ? "noshow" : "'"}
            >
              <img src={NoCircleCheck} className="input-icon" alt="password" />
              <input
                disabled={authResult}
                onChange={(e) => {
                  setAuth(e.target.value);
                }}
                placeholder="인증번호를 입력해주세요."
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                }}
                maxLength="6"
              ></input>
              {/* 인증이 완료되면 버튼을 disable로 바꾸고, 문구를 '인증 완료.' 로 바꾸기 */}
              <button
                disabled={inspectEmail && changeEmail ? false : true}
                className={inspectEmail && changeEmail ? "mainColor" : "gray"}
                onClick={() => {
                  getAuth();
                }}
                id={!authResult ? "" : "noshow"}
              >
                인증번호 확인
              </button>
            </div>
            <div>
              {/* 인증번호가 올바르지 않을 경우 표시 */}
              {authButton && !authResult ? (
                <blockquote className="warning">
                  인증번호가 올바르지 않습니다.
                </blockquote>
              ) : (
                ""
              )}
            </div>
            {/* 이메일을 변경하고, 인증번호가 올바를 경우 표시 noshow 이용 */}
            <div className="find-result" id={authResult ? "" : "noshow"}>
              <hr />
              이메일을 변경하였습니다.
              <br />
              저장을 클릭하면 반영됩니다.
              <hr />
            </div>
            <button
              className="mainColor boiler-button"
              onClick={() => {
                onSave();
              }}
            >
              회원정보 저장
            </button>
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
