import React from "react";
import { connect } from "react-redux";

import { ReactComponent as Remove } from "./Remove.svg";

// import the actions
import { getBrowseRecipes } from "../../../../actions/browseActions";

const RemoveFilter = ({
  color,
  filter,
  type,
  browseData,
  getBrowseRecipes,
  buttonToggled,
  buttonName
}) => {
  const handleClick = filterType => {
    // make filterType an array of options, clear search
    let browse = {
      ...browseData,
      [filterType]: filterType == "diet" ? "None" : "All",
      search: ""
    };
    getBrowseRecipes(browse);
  };
  return (
    <div
      style={{
        borderRadius: "10rem",
        cursor: "pointer",
        backgroundColor: color,
        opacity:
          buttonToggled !== "Meal" && buttonName !== buttonToggled
            ? "0.2"
            : "1",
        color: "#FFF",
        display: "grid",
        gridGap: ".1rem",
        placeItems: "center",
        gridAutoFlow: "column",
        textAlign: "center",
        fontSize: "1rem",
        margin: ".2rem 0",
        padding: ".5rem .8rem",
        fontWeight: "bold",
        transition: "all .2s ease-out"
      }}
      onClick={() => {
        handleClick(type);
      }}
    >
      <div
        style={{
          overFlow: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        {filter}
      </div>
      <Remove style={{ width: ".9rem" }} />
    </div>
  );
};
const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData,
    buttonToggled: state.browseRecipes.toggleFilterButton
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(RemoveFilter);
