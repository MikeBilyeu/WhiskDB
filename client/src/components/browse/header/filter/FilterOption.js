import React from "react";
import { connect } from "react-redux";

// import the actions
import { getBrowseRecipes } from "../../../../actions/browseActions";

let FilterOption = props => {
  const { option, browseData, filterType } = props;
  const handleClick = option => {
    // if filter type == diet or cuisine

    // make filterType an array of options
    let browse = { ...browseData, [filterType]: option };

    // don't run aciton if data obj is the same
    if (JSON.stringify(browse) !== JSON.stringify(browseData)) {
      props.getBrowseRecipes(browse);
    }
  };

  let style = {
    color: "#464646",
    cursor: "pointer",
    margin: "0 1rem",
    width: "8rem",
    textAlign: "center",
    userSelect: "none"
  };

  // check if option is in the browseData values to apply styles
  if (Object.values(props.browseData).indexOf(props.option) > 0) {
    style.color = "#0172C4";
    style.fontWeight = "bold";
  }

  return (
    <div
      key={props.option}
      style={style}
      onClick={() => {
        handleClick(props.option);
      }}
    >
      {props.option}
    </div>
  );
};

const mapSateToProps = state => {
  return {
    browseData: state.browseRecipes.browseData
  };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(FilterOption);
