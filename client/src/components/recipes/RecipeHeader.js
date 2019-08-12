import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { ReactComponent as Arrow } from "./arrowLeft.svg";
import { ReactComponent as Check } from "../../images/check.svg";
import { ReactComponent as Share } from "./share.svg";

//styles
import "./recipe-styles.css";
// import action creator
import { saveRecipe } from "../../actions/recipeActions";

const RecipeHeader = props => {
  const { recipe_id, user_id, saveRecipe, recipeSaved, history } = props;
  return (
    <div className="recipe-header">
      <Arrow className="back-btn" onClick={() => history.goBack()} />

      <div
        className={
          "save-btn" + (recipeSaved && user_id !== null ? " saved" : "")
        }
        onClick={() => saveRecipe(recipe_id, user_id)}
      >
        {recipeSaved && user_id !== null ? "Saved" : "Save"}
        {recipeSaved && user_id !== null ? (
          <Check style={{ width: "1rem", marginLeft: ".2rem" }} />
        ) : null}
      </div>

      <Share className="share-btn" />
    </div>
  );
};

const mapStateToProps = state => {
  return { recipeSaved: state.recipe.saved };
};

export default withRouter(
  connect(
    mapStateToProps,
    { saveRecipe }
  )(RecipeHeader)
);
