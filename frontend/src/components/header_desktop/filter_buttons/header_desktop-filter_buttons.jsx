import React from "react";
import { connect } from "react-redux";
import FilterResults from "../../filter_results";
import SortButton from "../../sort_button";
import CategoryButton from "../../category_button";
import { toggleFilterBtnBrowse } from "../../../actions/browse";

const FitlerButtons = props => {
  return (
    <>
      <CategoryButton
        className="category-btn-d"
        category={props.category}
        active={props.activeFilterBtn === "Category"}
        toggleFilterButton={props.toggleFilterBtnBrowse}
      />
      <FilterResults
        filterRecipes={props.filterRecipes}
        handleClick={props.handleClick}
        buttonToggled="Category"
      />
      <SortButton className="sort-btn-d" />
    </>
  );
};

const mapSateToProps = state => ({
  category: state.browseRecipes.filterRecipes.category,
  activeFilterBtn: state.browseRecipes.activeFilterBtn
});

export default connect(
  mapSateToProps,
  { toggleFilterBtnBrowse }
)(FitlerButtons);
