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
    <div
      onClick={handleClick}
      style={{
        gridArea: "sort",
        justifySelf: "start",
        display: "grid",
        cursor: "pointer",
        width: "2.5rem",
        placeItems: "center",
        paddingLeft: "0.3rem"
      }}
    >
      <SortIcon
        style={{ fill: props.buttonToggled === "Sort" ? "#0172C4" : "#676767" }}
        className="sort-icon"
      />
      <div style={{ fontSize: ".7rem", color: "#B7B7B7" }}>
        {props.sort === "Top Rated"
          ? "Rated"
          : props.sort === "Newest"
          ? "New"
          : props.sort}
      </div>
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton,
    sort: state.browseRecipes.browseData.sort
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(SortButton);
