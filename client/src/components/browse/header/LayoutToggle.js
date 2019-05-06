import React from "react";

const LayoutToggle = () => {
  return (
    <div
      style={{
        border: ".2rem solid #313131",
        borderRadius: ".5rem",
        width: "6rem",
        height: "2.9rem",
        cursor: "pointer"
      }}
    >
      <div
        style={{
          backgroundColor: "#313131",
          width: "3.1rem",
          height: "2.6rem",
          borderRadius: "0 .5rem .5rem 0",
          position: "relative",
          left: "-0.05rem"
        }}
      />
    </div>
  );
};

export default LayoutToggle;
