import React from "react";
import styles from "../recipe-upsert.module.scss";

const ImageUpload = ({ input: { onChange }, ...props }) => {
  const onImgChange = e => {
    onChange(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div
      className={styles.imageInput}
      style={{ backgroundImage: `url(${props.imageURL})` }}
    >
      <label htmlFor="ImageUpload">
        <span>{props.imageURL ? "Change Image" : "Upload Image"}</span>
      </label>
      <input
        type="file"
        accept="image/.jpg;.png;.jpeg;capture=camera"
        onChange={onImgChange}
        id="ImageUpload"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
