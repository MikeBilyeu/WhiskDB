import React from "react";

const FilterButton = props => {
  return <button>{props.buttonName}</button>;
};

const RecipeFilter = props => {
  return (
    <div>
      <FilterButton buttonName="Diet" />
      <FilterButton buttonName="Cuisine" />
      <FilterButton buttonName="Sort" />
    </div>
  );
};

export default RecipeFilter;
