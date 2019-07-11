import React from "react";

const FormStatus = props => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "center",
        borderBottom: "solid 1px #B7B7B7",
        color: "#464646",
        marginBottom: "1rem",
        position: "fixed",
        top: "3rem",
        width: "100%",
        backgroundColor: "#FFF",
        zIndex: "1"
      }}
    >
      <div
        style={{
          visibility: props.page < 2 ? "hidden" : "visible",
          cursor: "pointer",
          padding: "1rem 1rem .5rem 1rem",
          justifySelf: "start"
        }}
        onClick={() => {
          props.handleClick(-1);
        }}
      >
        Previous
      </div>

      <div
        style={{
          visibility: props.page <= 5 ? "visible" : "hidden",
          cursor: "pointer",
          padding: " 1rem 1rem .5rem 1rem",
          justifySelf: "end"
        }}
        onClick={() => {
          props.handleClick(+1);
        }}
      >
        Next
      </div>
    </div>
  );
};

export default FormStatus;
