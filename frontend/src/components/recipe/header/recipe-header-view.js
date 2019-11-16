import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleShare, saveRecipe } from "../../../actions/recipeActions";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/saveIcon.svg";
import { ReactComponent as Share } from "../../../assets/images/share.svg";

const Header = props => {
  const {
    recipe_id,
    user_id,
    saveRecipe,
    toggleShare,
    recipeSaved,
    history
  } = props;
  return (
    <div className="recipe-header">
      <Arrow className="back-btn" onClick={() => history.goBack()} />

      <div
        className={
          "save-btn" + (recipeSaved && user_id !== null ? " saved" : "")
        }
        onClick={() => saveRecipe(recipe_id, user_id)}
      >
        <span style={{ margin: "0 1rem" }}>
          {recipeSaved && user_id !== null ? "Saved" : "Save"}
        </span>
        <SaveIcon
          style={{
            fill: recipeSaved && user_id !== null ? "#0172C4" : "#E2E2E2",
            width: "1rem"
          }}
        />
      </div>

      <Share onClick={toggleShare} className="share-btn" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recipeSaved: state.recipe.saved
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { saveRecipe, toggleShare }
  )(Header)
);
