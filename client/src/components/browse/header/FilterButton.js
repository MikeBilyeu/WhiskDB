import React from "react";

const FilterButton = props => {
  const handleClick = () => {
    console.log(props.buttonName, "clicked");
  };
  return (
    <div
      style={{
        width: "7rem",
        borderRadius: ".2rem",
        cursor: "pointer",
        backgroundColor: "#313131",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: "1.2rem",
        margin: "1rem .2rem",
        padding: ".6rem"
      }}
      onClick={handleClick}
    >
      {props.buttonName}
    </div>
  );
};

export default FilterButton;
