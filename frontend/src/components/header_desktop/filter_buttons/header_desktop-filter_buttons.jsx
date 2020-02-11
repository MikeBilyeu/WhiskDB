import React from "react";
import { connect } from "react-redux";
import FilterResults from "../../filter_results";
import { SortButtonDesktop } from "../../sort_button";
import CategoryButton from "../../category_button";
import { toggleFilterButton } from "../../../actions/browseActions";

const FitlerButtons = ({ toggleFilterButton, filterRecipes, handleClick }) => {
  const { sort } = filterRecipes;
  return (
    <>
      <CategoryButton className="category-btn-desktop" />

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
