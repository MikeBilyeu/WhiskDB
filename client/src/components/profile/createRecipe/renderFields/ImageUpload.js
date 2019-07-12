import React from "react";

import { ReactComponent as Plus } from "../../../../images/plus.svg";

const ImageUpload = ({ input: { onChange } }) => {
  return (
    <label
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3rem",
        placeItems: "center",
        cursor: "pointer",
        border: "solid #BFBFBF 1px",
        borderRadius: "10rem",
        width: "16rem",
        height: "2.7rem",
        textAlign: "center",
        margin: ".2rem auto",
        paddingLeft: "3rem"
      }}
    >
      Add photo
      <input
        type="file"
        accept="image/.jpg, image/.png, image/.jpeg"
        onChange={e => onChange(e.target.files[0])}
        style={{ display: "none" }}
      />
      <Plus style={{ width: "1.2rem" }} />
    </label>
  );
};

export default ImageUpload;
