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
  "Non Vegetarian",
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

const sortOptions = ["Top Rated", "A-Z", "Most Rated", "Shortest"];

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
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};

export default connect(mapSateToProps)(HomeHeader);
