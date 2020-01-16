import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

const ImageUpload = ({ input: { onChange }, ...props }) => {
  const image =
    props.formValues && props.formValues.image ? props.formValues.image : null;
  return (
    <div>
      <label className="imageInput" htmlFor="ImageUpload">
        <i className="upload icon" />
        Upload Image
      </label>
      <input
        type="file"
        accept="image/.jpg, image/.png, image/.jpeg"
        onChange={e => {
          console.log(e.target.files[0]);
          onChange(e.target.files[0]);
        }}
        id="ImageUpload"
        style={{ display: "none" }}
      />
      {image ? (
        <img
          alt=""
          src={URL.createObjectURL(image)}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "20rem",
            height: "12rem",
            borderRadius: ".1rem",
            display: "block",
            margin: "1rem auto"
          }}
        />
      ) : null}
    </div>
  );
};

const mapSateToProps = state => {
  return { formValues: getFormValues("newRecipe")(state) };
};

export default connect(mapSateToProps)(ImageUpload);
