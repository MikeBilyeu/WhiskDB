import React from "react";
import { connect } from "react-redux";
import { toggleFilterButton } from "../../../actions/browseActions";
import SearchBar from "../search-bar";
import SortButton from "../../sort-button";
import Button from "../../button";
import { ReactComponent as Arrow } from "../../../assets/images/filterArrow.svg";
import Whiskdb from "../../../assets/images/whiskdb.png";
import "./home-header.scss";

const Header = ({
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

      <Button className={dietBtnStyle}>
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
)(Header);
