import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFilterButton } from "../../../actions/browseActions";
import SearchBar from "../search-bar";
import SortButton from "../../sort-button";
import CategoryButton from "../../category-button";
import "./home-header.scss";

const Header = ({ filterRecipes, buttonToggled, toggleFilterButton }) => {
  const mealBtnActive = buttonToggled === "Meal";
  const sortBtnActive = buttonToggled === "Sort";
  const { meal, sort } = filterRecipes;

  return (
    <div className="header">
      <SortButton
        onClick={() => toggleFilterButton("Sort")}
        sortActive={sortBtnActive}
        sortBy={sort}
        className="sort-btn"
      />
      {/*<SearchBar />*/}
      <CategoryButton
        className="categoryBtn"
        active={mealBtnActive}
        name={meal === "All Meals" ? "Categories" : meal}
        selected={meal !== "All Meals"}
        handleClick={() => toggleFilterButton("Meal")}
      />
    </div>
  );
};

Header.propTypes = {
  filterRecipes: PropTypes.object.isRequired,
  activeFilterBtn: PropTypes.string.isRequired,
  toggleFilterButton: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleFilterButton }
)(Header);
