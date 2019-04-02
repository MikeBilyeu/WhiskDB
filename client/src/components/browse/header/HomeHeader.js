import React from "react";

import LayoutToggle from "./LayoutToggle";
import SearchBar from "./SearchBar";
import RecipeFilter from "./RecipeFilter";
import MealTypeFilter from "./MealTypeFilter";

const HomeHeader = () => {
  return (
    <div>
      <LayoutToggle />
      <SearchBar />
      <RecipeFilter />
      <MealTypeFilter />
    </div>
  );
};

export default HomeHeader;
