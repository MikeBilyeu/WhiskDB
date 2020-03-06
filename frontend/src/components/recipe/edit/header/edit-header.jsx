import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleEditRecipe } from "../../../../actions/recipe";

const Header = ({ history, toggleEditRecipe }) => {
  return (
    <header className="edit-recipe-header">
      <div
        className="edit-recipe-header__cancel-btn"
        onClick={toggleEditRecipe}
      >
        Cancel
      </div>
      <h1 className="edit-recipe-header__title">Edit Recipe</h1>
    </header>
  );
};

export default withRouter(
  connect(
    null,
    { toggleEditRecipe }
  )(Header)
);
