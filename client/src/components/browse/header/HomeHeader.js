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

const dietOptions = [
  "None",
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Ketogenic"
];

const cuisineOptions = [
  "All",
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
      <Filter filterType={type} filterOptions={options} />
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
