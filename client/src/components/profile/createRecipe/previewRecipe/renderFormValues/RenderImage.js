import React from "react";

export const RenderImage = props => {
  if (props.values.image) {
    return (
      <img
        alt=""
        className="ui medium image centered"
        src={URL.createObjectURL(props.values.image)}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "27rem",
          height: "20rem",
          borderRadius: ".1rem"
        }}
      />
    );
  }
  return null;
};
