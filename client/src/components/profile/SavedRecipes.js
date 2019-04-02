import React from "react";

import HeaderOption from "../options/HeaderOption";
class SavedRecipes extends React.Component {
  render() {
    return (
      <div>
        <h1>Saved Recipes</h1>
        <HeaderOption buttonName="Sort" />
      </div>
    );
  }
}

export default SavedRecipes;
