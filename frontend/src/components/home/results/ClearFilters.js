import React from "react";
import { connect } from "react-redux";

import { getBrowseRecipes } from "../../../actions/browseActions";

const ClearFilters = ({ recipes, getBrowseRecipes }) => {
  const handleClick = () => {
    getBrowseRecipes({
      search: "",
      meal: "All Meals",
      diet: "None",
      cuisine: "All Cuisines",
      sort: "Top Rated"
    });
  };

  return (
    <div className="results_clear">
      <div className="numOfResults">
        ({recipes.length}) Result
        {recipes.length === 1 ? "" : "s"}
      </div>
      <div onClick={handleClick} className="clear-filters">
        Clear Filters
      </div>
    </div>
  );
};

const mapSateToProps = state => {
  return { recipes: state.browseRecipes.recipes };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(ClearFilters);
