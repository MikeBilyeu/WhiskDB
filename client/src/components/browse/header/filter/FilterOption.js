import React from "react";
import { connect } from "react-redux";

// import the actions
import { getBrowseRecipes } from "../../../../actions/browseActions";

let FilterOption = props => {
  const { option, browseData, filterType } = props;
  const handleClick = option => {
    // make filterType an array of options, clear search
    let browse = { ...browseData, [filterType]: option, search: "" };
    // call action if browse != browse or if search != ''
    if (
      JSON.stringify(browse) !== JSON.stringify(browseData) ||
      /\S/.test(browseData.search)
    ) {
      props.getBrowseRecipes(browse);
    }
  };

  let style = {
    color: "#969696",
    cursor: "pointer",
    margin: "0 ",
    padding: "0 1rem",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textAlign: "center",
    userSelect: "none",
    transition: "all .1s ease-out",
    borderRight: "solid #E2E2E2 1px"
  };

  // check if option is in the browseData values to apply styles
  if (
    Object.values(browseData).indexOf(option) > 0 &&
    !/\S/.test(browseData.search)
  ) {
    style.color = "#0172C4";
  }

  return (
    <div
      key={option}
      style={style}
      onClick={() => {
        handleClick(option);
      }}
    >
      {option}
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
