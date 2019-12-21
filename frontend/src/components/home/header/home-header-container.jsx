import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFilterButton } from "../../../actions/browseActions";
import SearchBar from "../search-bar";
import SortButton from "../../sort-button";
import CategoryButton from "../../category-button";
import Whiskdb from "../../../assets/images/whiskdb.png";
import "./home-header.scss";

const Header = ({
  sortBy,
  diet,
  meal,
  activeFilterBtn,
  toggleFilterButton
}) => {
  const mealBtnActive = activeFilterBtn === "Meal";
  const sortBtnActive = activeFilterBtn === "Sort";

  return (
    <div className="header">
      <SortButton
        onClick={() => toggleFilterButton("Sort")}
        sortActive={sortBtnActive}
        sortBy={sortBy}
        className="sort-btn"
      />
      <img className="whisk" src={Whiskdb} alt="Whiskdb logo" />
      <SearchBar />
      <CategoryButton
        active={mealBtnActive}
        name={meal === "All Meals" ? "Meal" : meal}
        selected={meal !== "All Meals"}
        handleClick={() => toggleFilterButton("Meal")}
      />
    </div>
  );
};

Header.propTypes = {
  sortBy: PropTypes.string.isRequired,
  diet: PropTypes.string.isRequired,
  meal: PropTypes.string.isRequired,
  activeFilterBtn: PropTypes.string.isRequired,
  toggleFilterButton: PropTypes.func.isRequired
};

const mapSateToProps = state => ({
  activeFilterBtn: state.browseRecipes.toggleFilterButton,
  sortBy: state.browseRecipes.browseData.sort,
  diet: state.browseRecipes.browseData.diet,
  meal: state.browseRecipes.browseData.meal
});

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(Header);
