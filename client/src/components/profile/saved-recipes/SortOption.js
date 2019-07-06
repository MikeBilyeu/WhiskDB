import React from "react";
import { connect } from "react-redux";

//action
import { sortSavedRecipes } from "../../../actions/recipeActions";

const SortOption = props => {
  const handleClick = () => {
    props.sortSavedRecipes(props.sort);
  };

  return (
    <div
      className={
        "filter-option" + (props.sortBy === props.sort ? " so-active" : "")
      }
      onClick={handleClick}
    >
      {props.option}
    </div>
  );
};

const mapSateToProps = state => {
  return { sortBy: state.savedRecipes.sortBy };
};

export default connect(
  mapSateToProps,
  { sortSavedRecipes }
)(SortOption);
