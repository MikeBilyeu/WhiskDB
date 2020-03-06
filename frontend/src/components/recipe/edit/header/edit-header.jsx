import React from "react";
import { connect } from "react-redux";
import { toggleEditRecipe } from "../../../../actions/recipe";

const Header = props => {
  return (
    <header className="edit-recipe-header">
      <div
        className="edit-recipe-header__cancel-btn"
        onClick={props.toggleEditRecipe}
      >
        Cancel
      </div>
      <h1 className="edit-recipe-header__title">Edit Recipe</h1>
    </header>
  );
};

export default connect(
  null,
  { toggleEditRecipe }
)(Header);
