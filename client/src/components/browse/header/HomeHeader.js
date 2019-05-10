import React from "react";

import LayoutToggle from "./LayoutToggle";
import SearchBar from "./SearchBar";
import HeaderOption from "./HeaderOption";
import Filter from "./filter/Filter";

const mealOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appitizer",
  "Dessert",
  "Drink"
];

const dietOptions = ["Vegetarian", "Non-Vegetarian", "Vegan", "Ketogenic"];

const cuisineOptions = [
  "Chinese",

  "Indian",

  "Italian",

  "Mexican",

  "Thai",

  "Other"
];

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
        <SearchBar />
      </div>

      <HeaderOption />
      <Filter filterType={"meal"} filterOptions={mealOptions} />
      <Filter filterType={"diet"} filterOptions={dietOptions} />
      <Filter filterType={"cuisine"} filterOptions={cuisineOptions} />
    </div>
  );
};

export default HomeHeader;
