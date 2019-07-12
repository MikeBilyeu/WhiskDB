import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

const RenderImage = props => {
  const image =
    props.formValues && props.formValues.image ? props.formValues.image : null;

  if (image) {
    return (
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
    );
  }
  return null;
};

const mapSateToProps = state => {
  return { formValues: getFormValues("newRecipe")(state) };
};
export default connect(mapSateToProps)(RenderImage);
