import React from "react";
import { connect } from "react-redux";

import HomeHeader from "./header/HomeHeader";
import Filter from "./filter/Filter";
import Results from "./results/Results";

const mealOptions = [
  "All Meals",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizer",
  "Dessert",
  "Drink"
];

const dietOptions = ["None", "Vegetarian", "Vegan"];

const sortOptions = ["Top Rated", "A-Z", "Time", "Newest"];

const Home = props => {
  let options = mealOptions;
  let type = null;

  switch (props.buttonToggled) {
    case "Meal":
      options = mealOptions;
      type = "meal";
      break;
    case "Diet":
      options = dietOptions;
      type = "diet";
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
      <HomeHeader />
      {props.buttonToggled ? (
        <Filter filterOptions={options} filterType={type} />
      ) : null}
      <Results />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};
export default connect(mapSateToProps)(Home);
