import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FilterResults from "../../../filter_results";
import CategoryButton from "../../../category_button";
import { toggleFilterBtnProfile } from "../../../../actions/browse";
import { updateSavedFilterRecipe } from "../../../../actions/recipe";
import "./home-page_toggle.scss";

const PageToggle = props => {
  const handleClick = option => {
    // set the filterRecipes to the option selected
    props.updateSavedFilterRecipe(option);
    //window.scrollTo(0, 0);
  };
  return (
    <div className="page-toggle">
      <CategoryButton
        className="category-btn-d"
        category={props.category}
        active={props.activeFilterBtn === "Category"}
        toggleFilterButton={props.toggleFilterBtnProfile}
      />

      <FilterResults
        filterRecipes={props.filterRecipes}
        handleClick={handleClick}
        buttonToggled="Category"
      />
    </div>
  );
};

const mapSateToProps = state => ({
  category: state.auth.filterRecipes.category,
  activeFilterBtn: state.auth.activeFilterBtn,
  filterRecipes: state.auth.filterRecipes
});

PageToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(
  mapSateToProps,
  { toggleFilterBtnProfile, updateSavedFilterRecipe }
)(PageToggle);
