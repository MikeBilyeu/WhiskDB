import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";
import styles from "../recipe-upsert.module.scss";

const ImageUpload = ({ input: { onChange }, ...props }) => {
  const image =
    props.formValues && props.formValues.image ? props.formValues.image : null;

  const backgroundImage = image ? URL.createObjectURL(image) : null;
  return (
    <div
      className={styles.imageInput}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <label htmlFor="ImageUpload">
        <span>Upload Image</span>
      </label>
      <input
        type="file"
        accept="image/.jpg;.png;.jpeg;capture=camera"
        onChange={e => {
          console.log(e.target.files[0]);
          onChange(e.target.files[0]);
        }}
        id="ImageUpload"
        style={{ display: "none" }}
      />
    </div>
  );
};

const mapSateToProps = state => {
  return { formValues: getFormValues("newRecipe")(state) };
};

export default connect(mapSateToProps)(ImageUpload);
