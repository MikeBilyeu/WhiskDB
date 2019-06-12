import React from "react";

import { connect } from "react-redux";

import { ReactComponent as Arrow } from "./filterArrow.svg";

// diet action creator
import { toggleFilterButton } from "../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleFilterButton(props.buttonName);
  };

  let style = {
    borderRadius: ".2rem",
    cursor: "pointer",
    backgroundColor: "#313131",
    color: "#FFF",
    display: "grid",
    placeItems: "center",
    gridGap: ".5rem",
    gridAutoFlow: "column",
    textAlign: "center",
    fontSize: "1rem",
    margin: ".2rem",
    padding: ".3rem 0.8rem",
    transition: "all .2s ease-out",
    fontWeight: "bold"
  };
  let arrowStyle = {
    width: ".8rem",
    transition: "all .2s ease-out"
  };

  if (props.buttonName === props.buttonToggled) {
    arrowStyle = { ...arrowStyle, transform: "rotate(90deg)" };
  }
  if (
    props.buttonToggled !== "Meal" &&
    props.buttonName !== props.buttonToggled
  ) {
    style = { ...style, backgroundColor: "#E2E2E2" };
  }

  return (
    <div style={style} onClick={handleClick}>
      <div>{props.buttonName}</div>
      <Arrow style={arrowStyle} />
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
