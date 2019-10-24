import React from "react";
import { connect } from "react-redux";

// diet action creator
import { toggleFilterButton } from "../../../actions/browseActions";

import SearchBar from "./search-bar/SearchBar";
import Whiskdb from "../../../images/whiskdb.png";
import { SortButton } from "../../sort-button/SortButton";
import FilterButton from "./filter-buttons/FilterButton";

//styles
import "./header-styles.css";

const HomeHeader = ({ sortBy, buttonToggled, toggleFilterButton }) => {
  return (
    <div className="header">
      <SearchBar />
      <img className="whisk-title" src={Whiskdb} alt="Whiskdb logo" />
      <SortButton
        onClick={() => toggleFilterButton("Sort")}
        sortActive={buttonToggled === "Sort"}
        sortBy={sortBy}
      />
      <FilterButton buttonName="Diet" />
      <FilterButton buttonName="Meal" />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton,
    sortBy: state.browseRecipes.browseData.sort
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(HomeHeader);
