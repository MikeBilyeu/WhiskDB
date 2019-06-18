import React from "react";

import { connect } from "react-redux";

import { ReactComponent as Arrow } from "./filterArrow.svg";

// diet action creator
import { toggleFilterButton } from "../../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleFilterButton(props.buttonName);
  };

  let style = {};
  let arrowStyle = {};

  if (props.buttonName === props.buttonToggled) {
    arrowStyle = { ...arrowStyle, transform: "rotate(90deg)", fill: "#0172C4" };
    style = { ...style, border: "solid #0172C4 1px", color: "#0172C4" };
  }

  return (
    <div className="filter-btn" style={style} onClick={handleClick}>
      <div>{props.buttonName}</div>
      <Arrow className="filter-arrow" style={arrowStyle} />
    </div>
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
)(FilterButton);
