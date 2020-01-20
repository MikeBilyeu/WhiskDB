import React from "react";
import { connect } from "react-redux";
import { imageUpload } from "../../../actions/recipeActions";
import styles from "../recipe-upsert.module.scss";

const ImageUpload = ({ input: { onChange }, ...props }) => {
  const onImgChange = e => {
    const file = e.target.files[0];
    // Upload image to cloudinary from client side get the url and store it in form
    props.imageUpload(file);
  };

  return (
    <div
      className={styles.imageInput}
      style={{ backgroundImage: `url(${props.imageFile})` }}
    >
      <label htmlFor="ImageUpload">
        <span>{props.imageFile ? "Change Image" : "Upload Image"}</span>
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

export default connect(
  null,
  { imageUpload }
)(ImageUpload);
