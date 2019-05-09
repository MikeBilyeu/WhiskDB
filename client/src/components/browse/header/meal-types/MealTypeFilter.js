import React from "react";

import MealTypes from "./MealTypes";

const MealTypeFilter = () => {
  const renderMealType = () => {
    const mealTypes = [
      "Breakfast",
      "lunch",
      "Dinner",
      "Appitizer",
      "Dessert",
      "Drink"
    ];
    return mealTypes.map((meal, i) => {
      return <MealTypes key={"meal" + i} type={meal} />;
    });
  };
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
        padding: ".9rem",
        overflow: "hidden"
      }}
    >
      {renderMealType()}
    </div>
  );
};
export default MealTypeFilter;
