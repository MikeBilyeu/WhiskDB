import React from "react";
import { connect } from "react-redux";

// Actions
import { sortSavedRecipes } from "../../actions/recipeActions";

// components
import { Button } from "../Button";

const SortBy = ({ sortBy, sortSavedRecipes }) => {
  const handleClick = sort => {
    sortSavedRecipes(sort);
  };

  return (
    <div className="filter-box">
      <Button
        className={`filter-option ${sortBy === "Date Saved" &&
          "option-active"}`}
        onClick={() => handleClick("Date Saved")}
      >
        Date Saved
      </Button>
      <Button
        className={`filter-option ${sortBy === "Top Rated" && "option-active"}`}
        onClick={() => handleClick("Top Rated")}
      >
        Top Rated
      </Button>
      <Button
        className={`filter-option ${sortBy === "A-Z" && "option-active"}`}
        onClick={() => handleClick("A-Z")}
      >
        A-Z
      </Button>
      <Button
        className={`filter-option ${sortBy === "Time" && "option-active"}`}
        onClick={() => handleClick("Time")}
      >
        Time
      </Button>
    </div>
  );
};

const mapSateToProps = state => {
  return { sortBy: state.savedRecipes.sortBy };
};

export default connect(
  mapSateToProps,
  { sortSavedRecipes }
)(SortBy);
