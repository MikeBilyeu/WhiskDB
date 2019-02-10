import React from "react";

const BrowseOption = props => {
  return (
    <div
      style={{
        border: "solid grey 1px",
        width: "15rem",
        height: "15rem",
        textAlign: "center",
        lineHeight: "15rem",
        borderRadius: "100%",
        margin: "0rem 1rem"
      }}
    >
      {props.text}
    </div>
  );
};

export default BrowseOption;
