import React from "react";

import { connect } from "react-redux";

// diet action creator
import { toggleDiet } from "../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleDiet(props.buttonName);
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
    padding: ".6rem"
  };

  if (props.buttonName === "Diet" && props.toggleDietState) {
    style.backgroundColor = "#0172C4";
  } else if (props.buttonName === "Cuisine" && props.toggleCuisineState) {
    style.backgroundColor = "#0172C4";
  }
  return (
    <div style={style} onClick={handleClick}>
      {props.buttonName}
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
  { toggleDiet }
)(FilterButton);