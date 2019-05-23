import React from "react";

import { connect } from "react-redux";

import { ReactComponent as Arrow } from "./filterArrow.svg";

// diet action creator
import { toggleFilterButton } from "../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleFilterButton(props.buttonName);
  };
  // if button name and toggle name match set style
  let style = {
    width: "7rem",
    borderRadius: ".2rem",
    cursor: "pointer",
    backgroundColor: "#313131",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: "1.2rem",
    margin: "1rem .2rem",
    padding: ".6rem",
    transition: "all .1s ease-out"
  };
  let arrowStyle = {
    width: ".8rem",
    transition: "all .1s ease-out",
    marginLeft: ".4rem"
  };

  if (props.buttonName === "Diet" && props.toggleDietState) {
    style.backgroundColor = "#0172C4";
    arrowStyle.transform = "rotate(90deg)";
  } else if (props.buttonName === "Cuisine" && props.toggleCuisineState) {
    style.backgroundColor = "#0172C4";
    arrowStyle.transform = "rotate(90deg)";
  }
  return (
    <div style={style} onClick={handleClick}>
      {props.buttonName}
      <Arrow style={arrowStyle} />
    </div>
  );
};

const mapSateToProps = state => {
  return {
    toggleDietState: state.browseRecipes.toggleDiet,
    toggleCuisineState: state.browseRecipes.toggleCuisine
  };
};

export default connect(
  mapSateToProps,
  { toggleFilterButton }
)(FilterButton);
