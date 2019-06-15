import React from "react";

import { connect } from "react-redux";

import FilterButton from "./filter-buttons/FilterButton";
import RemoveFilter from "./filter-buttons/RemoveFilter";

const HeaderOption = props => {
  return (
    <div
      style={{
        height: "2.5rem",
        display: "grid",
        width: "100%",
        padding: "0 .1rem",
        gridAutoFlow: "column",
        placeItems: "center",
        userSelect: "none",
        MozUserSelect: "none",
        WebkitUserSelect: "none",
        MsUserSelect: "none",
        margin: ".5rem 0"
      }}
    >
      {props.dietFilter !== "None" ? (
        <RemoveFilter
          color="#00A39D"
          filter={props.dietFilter}
          type="diet"
          buttonName="Diet"
        />
      ) : (
        <FilterButton buttonName="Diet" />
      )}
      {props.cuisineFilter !== "All" ? (
        <RemoveFilter
          color="#C45353"
          filter={props.cuisineFilter}
          type="cuisine"
          buttonName="Cuisine"
        />
      ) : (
        <FilterButton buttonName="Cuisine" />
      )}
      <FilterButton buttonName="Sort" />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    dietFilter: state.browseRecipes.browseData.diet,
    cuisineFilter: state.browseRecipes.browseData.cuisine
  };
};

export default connect(mapSateToProps)(HeaderOption);
