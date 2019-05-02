import React from "react";

import MealTypes from "./MealTypes";

const MealTypeFilter = () => {
  return (
    <div
      style={{
        backgroundColor: "#F7F7F7",
        borderTop: ".1rem solid #BFBFBF",
        borderBottom: ".1rem solid #BFBFBF",
        display: "grid",
        gridAutoFlow: "column",
        placeItems: "center",
        margin: "1.5rem 0",
        padding: ".9rem"
      }}
    >
      <MealTypes type="Breakfast" />
      <MealTypes type="Lunch" />
      <MealTypes type="Dinner" />
      <MealTypes type="Appitizer" />
      <MealTypes type="Dessert" />
      <MealTypes type="Drink" />
    </div>
  );
};
export default MealTypeFilter;
