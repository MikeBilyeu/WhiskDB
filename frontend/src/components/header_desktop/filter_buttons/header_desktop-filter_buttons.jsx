import React from "react";
import { connect } from "react-redux";
import FilterResults from "../../filter_results";
import { SortButtonDesktop } from "../../sort_button";
import { ReactComponent as OpenArrow } from "../../../assets/images/openArrow.svg";
import { toggleFilterButton } from "../../../actions/browseActions";

const FitlerButtons = ({ toggleFilterButton, filterRecipes, handleClick }) => {
  const { sort, meal } = filterRecipes;
  return (
    <>
      <button
        className="header-d__category-btn"
        onClick={() => toggleFilterButton("Meal")}
      >
        {meal === "All Meals" ? "All categories" : meal}
        <OpenArrow className="sort-btn-d__icon" />
      </button>

      <FilterResults
        filterRecipes={filterRecipes}
        handleClick={handleClick}
        buttonToggled="Meal"
      />
      <SortButtonDesktop
        onClick={() => toggleFilterButton("Sort")}
        sortBy={sort}
      />
    </>
  );
};

export default connect(
  null,
  { toggleFilterButton }
)(FitlerButtons);
