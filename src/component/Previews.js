import React, { useRef, useState } from "react";
import BasicImg from "../_assets/basicImg.png";

function Previews() {
  const imageInput = useRef();

  // 여기에 이미지 저장되어있음
  const [files, setFiles] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const onClickInput = () => {
    imageInput.current.click();
  };

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);

    let fileBlob = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onLoadFile}
        ref={imageInput}
      />
      <img
        className="uploadImage"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "2px solid lightgray",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: "white",
        }}
        onClick={onClickInput}
        src={imageSrc ? imageSrc : BasicImg}
      ></img>
    </div>
  );
}

export default Previews;
