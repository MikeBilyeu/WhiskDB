import React from "react";

const MealTypes = props => {
  return (
    <div style={{ color: "#464646", cursor: "pointer", margin: "0 1rem" }}>
      {props.type}
    </div>
  );
};

export default MealTypes;
