import React from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

// import action creator
import { saveRecipe } from "../../actions/recipeActions";

const RecipeHeader = props => {
  const { recipe_id, user_id } = props;
  return (
    <div>
      <button onClick={() => props.history.goBack()}>Back</button>
      <button
        onClick={() => props.saveRecipe(recipe_id, user_id)}
        style={{
          color: props.recipeSaved && user_id !== null ? "Green" : "black"
        }}
      >
        Save
      </button>
      <button>Share</button>
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
