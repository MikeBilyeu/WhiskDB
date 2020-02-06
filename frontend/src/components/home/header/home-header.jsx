import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFilterButton } from "../../../actions/browseActions";
import { SortButton } from "../../sort_button";
import CategoryButton from "../../category_button";
import SearchBar from "../../search_bar";

import "./home-header.scss";

const Header = ({
  filterRecipes,
  buttonToggled,
  handleClick,
  toggleFilterButton,
  isAuth,
  user_img
}) => {
  const mealBtnActive = buttonToggled === "Meal";
  const sortBtnActive = buttonToggled === "Sort";
  const { meal, sort } = filterRecipes;
  return (
    <header className="header">
      <SortButton onClick={() => toggleFilterButton("Sort")} sortBy={sort} />
      <CategoryButton
        className="categoryBtn"
        active={mealBtnActive}
        name={meal === "All Meals" ? "Categories" : meal}
        selected={meal !== "All Meals"}
        handleClick={() => toggleFilterButton("Meal")}
      />
      {/*<SearchBar />*/}
    </header>
  );
};

Header.propTypes = {
  filterRecipes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeFilterBtn: PropTypes.string.isRequired,
  toggleFilterButton: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default connect(
  null,
  { toggleFilterButton }
)(Header);
