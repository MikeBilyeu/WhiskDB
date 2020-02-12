import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../../../button";
import CategoryButton from "../../../category_button";
import { toggleFilterBtnProfile } from "../../../../actions/browse";
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
  toggleFilterBtnProfile
}) => {
  const savedActive = page === "saved";
  const postedActive = !savedActive;
  return (
    <div className="page-toggle">
      <CategoryButton
        className="category-btn-d"
        meal={meal}
        activeFilterBtn={activeFilterBtn}
        toggleFilterButton={toggleFilterBtnProfile}
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
  activeFilterBtn: state.auth.activeFilterBtn
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
  { toggleFilterBtnProfile }
)(PageToggle);
