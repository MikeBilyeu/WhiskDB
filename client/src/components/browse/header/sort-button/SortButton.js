import React from "react";
import { connect } from "react-redux";

// diet action creator
import { toggleFilterButton } from "../../../../actions/browseActions";

import { ReactComponent as SortIcon } from "./SortIcon.svg";

const SortButton = props => {
  const handleClick = () => {
    props.toggleFilterButton("Sort");
  };
  return (
    <SortIcon
      style={{ fill: props.buttonToggled === "Sort" ? "#0172C4" : "#676767" }}
      onClick={handleClick}
      className="sort-icon"
    />
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(SortButton);
