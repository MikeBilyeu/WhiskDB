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
  let nameOfButton = props.buttonName;

  if (props.buttonName === "Diet" && props.diet !== "None") {
    nameOfButton = props.diet;
    style = { ...style, color: "#0172C4" };
  } else if (
    props.buttonName === "Cuisine" &&
    props.cuisine !== "All Cuisines"
  ) {
    nameOfButton = props.cuisine;
    style = { ...style, color: "#0172C4" };
  } else if (props.buttonName === "Meal" && props.meal !== "All Meals") {
    nameOfButton = props.meal;
    style = { ...style, color: "#0172C4" };
  }

  return (
    <div className="filter-btn" style={style} onClick={handleClick}>
      <div>{nameOfButton}</div>
      <Arrow className="filter-arrow" style={arrowStyle} />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    buttonToggled: state.browseRecipes.toggleFilterButton,
    diet: state.browseRecipes.browseData.diet,
    cuisine: state.browseRecipes.browseData.cuisine,
    meal: state.browseRecipes.browseData.meal
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(FilterButton);
