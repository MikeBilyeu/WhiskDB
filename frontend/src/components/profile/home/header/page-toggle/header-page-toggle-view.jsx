import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../../../../button";
import CategoryButton from "../../../../category-button";
import { toggleFilterButton } from "../../../../../actions/browseActions";
import "./header-page-toggle.scss";

const PageToggle = ({
  page,
  onClick,
  activeFilterBtn,
  meal,
  toggleFilterButton
}) => {
  const savedActive = page === "saved" ? "active" : "";
  const myRecipesActive = page === "myRecipes" ? "active" : "";
  const mealBtnActive = activeFilterBtn === "Meal";
  return (
    <div className="page-toggle">
      <CategoryButton
        className="categoryBtn"
        active={mealBtnActive}
        name={meal === "All Meals" ? "Categories" : meal}
        selected={meal !== "All Meals"}
        handleClick={() => toggleFilterButton("Meal")}
      />
      <Button
        className={`btn saved ${savedActive}`}
        onClick={() => onClick("saved")}
      >
        <div>Saved</div>
      </Button>

      <Button
        className={`btn posted ${myRecipesActive}`}
        onClick={() => onClick("myRecipes")}
      >
        <div>Posted</div>
      </Button>
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
  numRecipesSaved: PropTypes.number.isRequired,
  numRecipesPosted: PropTypes.number.isRequired
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(PageToggle);
