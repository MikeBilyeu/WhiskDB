import React from "react";
import { connect } from "react-redux";

// actions
import { toggleFilterButton } from "../../../actions/browseActions";

// components
import SearchBar from "./search-bar/SearchBar";
import Whiskdb from "../../../images/whiskdb.png";
import { SortButton } from "../../sort-button/SortButton";
import { Button } from "../../Button";
import { ReactComponent as Arrow } from "../../../images/filterArrow.svg";

//styles
import "./header-styles.css";

const HomeHeader = ({
  sortBy,
  diet,
  meal,
  activeFilterBtn,
  toggleFilterButton
}) => {
  const dietBtnActive = activeFilterBtn === "Diet";
  const mealBtnActive = activeFilterBtn === "Meal";
  const sortBtnActive = activeFilterBtn === "Sort";

  const dietBtnStyle = `filter-btn diet ${dietBtnActive &&
    "filter-active"} ${diet !== "None" && "filter-select"}`;
  const dietArrowStyle = `filter-arrow ${dietBtnActive && "filter-active"}`;

  const mealBtnStyle = `filter-btn meal ${mealBtnActive &&
    "filter-active"} ${meal !== "All Meals" && "filter-select"}`;
  const mealArrowStyle = `filter-arrow ${mealBtnActive && "filter-active"}`;

  return (
    <div className="header">
      <SearchBar />
      <img className="whisk-title" src={Whiskdb} alt="Whiskdb logo" />
      <SortButton
        onClick={() => toggleFilterButton("Sort")}
        sortActive={sortBtnActive}
        sortBy={sortBy}
      />

      <Button
        className={dietBtnStyle}
        onClick={() => toggleFilterButton("Diet")}
      >
        {diet === "None" ? "Diet" : diet}
        <Arrow className={dietArrowStyle} />
      </Button>

      <Button
        className={mealBtnStyle}
        onClick={() => toggleFilterButton("Meal")}
      >
        {meal === "All Meals" ? "Meal" : meal}
        <Arrow className={mealArrowStyle} />
      </Button>
    </div>
  );
};

const mapSateToProps = state => {
  return {
    activeFilterBtn: state.browseRecipes.toggleFilterButton,
    sortBy: state.browseRecipes.browseData.sort,
    diet: state.browseRecipes.browseData.diet,
    meal: state.browseRecipes.browseData.meal
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(HomeHeader);
