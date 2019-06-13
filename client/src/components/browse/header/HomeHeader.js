import React from "react";
import { connect } from "react-redux";

import LayoutToggle from "./LayoutToggle";
import SearchBar from "./search-bar/SearchBar";
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

const dietOptions = ["None", "Vegetarian", "Vegan"];

const cuisineOptions = [
  "All",
  "Chinese",
  "Indian",
  "Italian",
  "Mexican",
  "Thai",
  "Other"
];

const sortOptions = ["Top Rated", "A-Z", "Time", "Newest"];

const HomeHeader = props => {
  let options = mealOptions;
  let type = "meal";

  switch (props.buttonToggled) {
    case "Meal":
      options = mealOptions;
      type = "meal";
      break;
    case "Diet":
      options = dietOptions;
      type = "diet";
      break;
    case "Cuisine":
      options = cuisineOptions;
      type = "cuisine";
      break;
    case "Sort":
      options = sortOptions;
      type = "sort";
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        overflow: "hidden"
      }}
    >
      <SearchBar />
      <HeaderOption />
      <Filter filterType={type} filterOptions={options} />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};

export default connect(mapSateToProps)(HomeHeader);
