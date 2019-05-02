import React from "react";

import LayoutToggle from "./LayoutToggle";
import SearchBar from "./SearchBar";
import RecipeFilter from "./RecipeFilter";
import MealTypeFilter from "./meal-types/MealTypeFilter";

const HomeHeader = () => {
  return (
    <div>
      <div
        style={{
          height: "2.5rem",
          display: "grid",
          gridAutoFlow: "column",
          placeItems: "center",
          gridGap: "1rem",
          margin: "1rem"
        }}
      >
        <LayoutToggle />
        <SearchBar />
      </div>

      <RecipeFilter />
      <MealTypeFilter />
    </div>
  );
};

export default HomeHeader;
