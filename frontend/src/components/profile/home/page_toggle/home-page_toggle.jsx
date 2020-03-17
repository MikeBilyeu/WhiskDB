import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import FilterResults from "../../../filter_results";
import CategoryButton from "../../../category_button";
import { toggleFilterBtnProfile } from "../../../../actions/browse";
import { updateFilterRecipe } from "../../../../actions/recipeActions";
import "./home-page_toggle.scss";

const PageToggle = props => {
  const handleClick = option => {
    // set the filterRecipes to the option selected
    props.updateFilterRecipe(option);
    //window.scrollTo(0, 0);
  };
  return (
    <div className="page-toggle">
      <CategoryButton
        className="category-btn-d"
        meal={props.meal}
        active={props.activeFilterBtn === "Meal"}
        toggleFilterButton={props.toggleFilterBtnProfile}
      />

      <FilterResults
        filterRecipes={props.filterRecipes}
        handleClick={handleClick}
        buttonToggled="Meal"
      />
    </div>
  );
};

const mapSateToProps = state => ({
  meal: state.auth.filterRecipes.meal,
  activeFilterBtn: state.auth.activeFilterBtn,
  filterRecipes: state.auth.filterRecipes
});

PageToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(
  mapSateToProps,
  { toggleFilterBtnProfile, updateFilterRecipe }
)(PageToggle);
