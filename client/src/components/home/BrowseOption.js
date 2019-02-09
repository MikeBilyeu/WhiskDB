import React from "react";

const BrowseOption = props => {
  return (
    <div
      style={{
        border: "solid grey",
        width: "15rem",
        height: "15rem",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "15rem"
      }}
    >
      {props.text}
    </div>
  );
};

export default BrowseOption;
