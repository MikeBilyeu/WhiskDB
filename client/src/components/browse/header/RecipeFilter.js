import React from "react";

import HeaderOption from "../../options/HeaderOption";

const RecipeFilter = props => {
  return (
    <div
      style={{
        height: "2.5rem",
        display: "grid",
        gridAutoFlow: "column",
        placeItems: "center"
      }}
    >
      <HeaderOption buttonName="Diet" />
      <HeaderOption buttonName="Cuisine" />
      <HeaderOption buttonName="Sort" />
    </div>
  );
};

export default RecipeFilter;
