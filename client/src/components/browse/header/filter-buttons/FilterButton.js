import React from "react";

import { connect } from "react-redux";

import { ReactComponent as Arrow } from "./filterArrow.svg";

// diet action creator
import { toggleFilterButton } from "../../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleFilterButton(props.buttonName);
  };

  let style = {
    borderRadius: ".3rem",
    cursor: "pointer",
    backgroundColor: "#3B3B3B",
    color: "#FFF",
    display: "grid",
    placeItems: "center",
    gridGap: ".3rem",
    gridAutoFlow: "column",
    textAlign: "center",
    fontSize: "1rem",
    margin: ".2rem 0",
    padding: ".4rem 1rem",
    transition: "all .2s ease-out",
    fontWeight: "bold",
    opacity: 1
  };
  let arrowStyle = {
    width: ".8rem",
    transition: "all .2s ease-out"
  };

  if (props.buttonName === props.buttonToggled) {
    arrowStyle = { ...arrowStyle, transform: "rotate(90deg)" };
    style = { ...style, backgroundColor: "#0172C4" };
  }
  if (
    props.buttonToggled !== null &&
    props.buttonName !== props.buttonToggled
  ) {
    style = { ...style, opacity: ".2" };
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
