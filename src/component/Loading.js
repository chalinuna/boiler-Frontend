import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Loading() {
  return (
    <>
      <Modal
        size="sm"
        style={{
          textAlign: "center",
        }}
        centered
        show
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body style={{ fontSize: "13px", fontWeight: "bold" }}>
          <div>조금만 기다려 주세요,</div>
          <span style={{ marginRight: "10px" }}>
            요청을 처리하고 있습니다..
          </span>
          <Spinner size="sm" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Loading;
