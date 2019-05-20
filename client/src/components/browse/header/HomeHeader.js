import React from "react";
import { connect } from "react-redux";

import LayoutToggle from "./LayoutToggle";
import SearchBar from "./SearchBar";
import HeaderOption from "./HeaderOption";
import Filter from "./filter/Filter";

const mealOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizer",
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

const HomeHeader = props => {
  let options = mealOptions;
  let type = "meal";

  if (props.toggleDiet) {
    options = dietOptions;
    type = "diet";
  } else if (props.toggleCuisine) {
    options = cuisineOptions;
    type = "cuisine";
  } else {
    options = mealOptions;
    type = "meal";
  }

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
      {/*if diet is toggle is false*/}

      <Filter filterType={type} filterOptions={options} />

      {/* if diet toggle is true*/}
      {/* display diet options on diet button click*/}
      {/*<Filter filterType={"diet"} filterOptions={dietOptions} />
      <Filter filterType={"cuisine"} filterOptions={cuisineOptions} />*/}
    </div>
  );
};

const mapSateToProps = state => {
  return {
    toggleDiet: state.browseRecipes.toggleDiet,
    toggleCuisine: state.browseRecipes.toggleCuisine
  };
};

export default connect(mapSateToProps)(HomeHeader);
