import React from "react";
import { connect } from "react-redux";

// impor the actions
import { getBrowseRecipes } from "../../../../actions/browseActions";

let MealTypes = props => {
  const { type, browseData } = props;
  const handleClick = mealType => {
    let browse = { ...browseData, mealType: mealType };

    // don't run aciton if data is the same
    if (JSON.stringify(browse) !== JSON.stringify(browseData)) {
      props.getBrowseRecipes(browse);
    }
  };

  return (
    <div
      key={props.type}
      style={{
        color: browseData.mealType === type ? "#0172C4" : "#464646",
        cursor: "pointer",
        margin: "0 1rem"
      }}
      onClick={() => {
        handleClick(props.type);
      }}
    >
      {props.type}
    </div>
  );
};

const mapSateToProps = state => {
  return { browseData: state.browseRecipes.browseData };
};

export default connect(
  mapSateToProps,
  { getBrowseRecipes }
)(MealTypes);
