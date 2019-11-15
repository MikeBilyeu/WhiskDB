import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { submit } from "redux-form";

// Action Creator
import { toggleEditRecipe } from "../../../actions/recipeActions";

import { ReactComponent as Arrow } from "../../../images/arrowLeft.svg";

const EditHeader = ({ history, submit, toggleEditRecipe }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        placeItems: "center"
      }}
    >
      <div
        style={{ cursor: "pointer", color: "#0172C4" }}
        onClick={() => {
          toggleEditRecipe();
        }}
      >
        Cancel
      </div>
      <h2>Edit Recipe</h2>
      <div
        style={{ cursor: "pointer", color: "#0172C4" }}
        onClick={() => {
          submit("edit-recipe");
        }}
      >
        Save
      </div>
    </div>
  );
};

export default withRouter(
  connect(
    null,
    { toggleEditRecipe, submit }
  )(EditHeader)
);
