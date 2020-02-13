import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import FilterResults from "../../../filter_results";
import CategoryButton from "../../../category_button";
import { toggleFilterBtnProfile } from "../../../../actions/browse";
import { updateFilterRecipe } from "../../../../actions/recipeActions";
import "./home-page_toggle.scss";

const PageToggle = ({
  page,
  onClick,
  meal,
  numSaved,
  numPosted,
  isFetching,
  savedRecipes,
  activeFilterBtn,
  toggleFilterBtnProfile,
  updateFilterRecipe,
  filterRecipes
}) => {
  const savedActive = page === "saved";
  const postedActive = !savedActive;
  const handleClick = option => {
    // set the filterRecipes to the option selected
    updateFilterRecipe(option);
    //window.scrollTo(0, 0);
  };
  return (
    <div className="page-toggle">
      <CategoryButton
        className="category-btn-d"
        meal={meal}
        activeFilterBtn={activeFilterBtn}
        toggleFilterButton={toggleFilterBtnProfile}
      />

      <FilterResults
        filterRecipes={filterRecipes}
        handleClick={handleClick}
        buttonToggled="Meal"
      />

      <button
        className={classNames("page-toggle__btn", {
          "page-toggle__btn--active": savedActive
        })}
        onClick={() => onClick("saved")}
      >
        {!isFetching && numSaved} Saved
      </button>

      <button
        className={classNames("page-toggle__btn", {
          "page-toggle__btn--active": postedActive
        })}
        onClick={() => onClick("myRecipes")}
      >
        {!isFetching && numPosted} Posted
      </button>
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
  page: PropTypes.string.isRequired,
  numSaved: PropTypes.string.isRequired,
  numPosted: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(
  mapSateToProps,
  { toggleFilterBtnProfile, updateFilterRecipe }
)(PageToggle);
