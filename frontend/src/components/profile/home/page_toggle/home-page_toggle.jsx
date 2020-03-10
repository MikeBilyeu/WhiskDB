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
  const savedActive = props.page === "saved";
  const postedActive = !savedActive;
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
      <button
        className={classNames("page-toggle__btn", {
          "page-toggle__btn--active": savedActive
        })}
        onClick={() => props.onClick("saved")}
      >
        {!props.isFetching && props.numSaved} Saved
      </button>

      <button
        className={classNames("page-toggle__btn", {
          "page-toggle__btn--active": postedActive
        })}
        onClick={() => props.onClick("myRecipes")}
      >
        {!props.isFetching && props.numPosted} Posted
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
  numSaved: PropTypes.number.isRequired,
  numPosted: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(
  mapSateToProps,
  { toggleFilterBtnProfile, updateFilterRecipe }
)(PageToggle);
