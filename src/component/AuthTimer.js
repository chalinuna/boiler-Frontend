import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthTimer = () => {
  const [time, setTime] = useState(179);
  const { verification } = useSelector((state) => state.auth);
  const { expireAt } = verification.OTP;
  useEffect(() => {
    if (time > 0) {
      const Counter = setInterval(() => {
        const gap = Math.floor(
          (new Date(expireAt).getTime() - new Date().getTime()) / 1000
        );
        setTime(gap);
      }, 1000);
      return () => clearInterval(Counter);
    }
  }, [expireAt, time]);
  const timeFormat = (time) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };
  return (
    <>
      <p
        style={{
          textAlign: "right",
          fontSize: "14px",
          color: "#ff5252",
          position: "absolute",
          right: "92px",
          bottom: "14px",
          letterSpacing: "-0.4px",
        }}
      >
        {timeFormat(time)}
      </p>
    </>
  );
};

export default AuthTimer;
