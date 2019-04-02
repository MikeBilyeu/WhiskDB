import React from "react";

import HeaderOption from "../../options/HeaderOption";

const RecipeFilter = props => {
  return (
    <div>
      <HeaderOption buttonName="Diet" />
      <HeaderOption buttonName="Cuisine" />
      <HeaderOption buttonName="Sort" />
    </div>
  );
};

export default RecipeFilter;
