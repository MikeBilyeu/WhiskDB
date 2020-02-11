import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../../../button";
import CategoryButton from "../../../category_button";
import { toggleFilterButton } from "../../../../actions/browseActions";
import "./home-page_toggle.scss";

const PageToggle = ({
  page,
  onClick,
  activeFilterBtn,
  meal,
  toggleFilterButton,
  numSaved,
  numPosted,
  isFetching,
  savedRecipes
}) => {
  const savedActive = page === "saved";
  const postedActive = !savedActive;
  const mealBtnActive = activeFilterBtn === "Meal";
  return (
    <div className="page-toggle">
      <CategoryButton className="category-btn" />

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
  activeFilterBtn: state.browseRecipes.toggleFilterButton,
  meal: state.auth.filterRecipes.meal
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
  { toggleFilterButton }
)(PageToggle);
