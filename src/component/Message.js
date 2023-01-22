import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Message(props) {
  return (
    <>
      <Modal
        size="sm"
        style={{
          textAlign: "center",
        }}
        show={props.messageShow}
        centered
        keyboard={false}
      >
        <Modal.Body style={{ fontSize: "15px", fontWeight: "bold" }}>
          <div>{props.message}</div>
          <Button
            size="sm"
            style={{ marginTop: "10px", width: "100%" }}
            onClick={() => {
              props.setmessageShow(false);
            }}
          >
            닫기
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Message;
