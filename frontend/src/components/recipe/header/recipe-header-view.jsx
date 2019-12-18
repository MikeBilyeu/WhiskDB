import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleShare, saveRecipe } from "../../../actions/recipeActions";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/saveIcon.svg";
import { ReactComponent as More } from "../../../assets/images/more.svg";
import Whiskdb from "../../../assets/images/whiskdb.png";

const Header = props => {
  const {
    recipe_id,
    user_id,
    saveRecipe,
    toggleShare,
    recipeSaved,
    history
  } = props;

  const handleBackClick = () => {
    if (history.location.key) {
      history.goBack();
    }
    history.push("/");
  };

  return (
    <div className="recipe-header">
      <Arrow className="back-btn" onClick={handleBackClick} />
      <img className="whisk" src={Whiskdb} alt="Whiskdb logo" />
      <SaveIcon
        className="saveIcon"
        onClick={() => saveRecipe(recipe_id, user_id)}
        style={{
          fill: recipeSaved && user_id !== null ? "#0172C4" : "#E2E2E2"
        }}
      />

      <More onClick={toggleShare} className="more-btn" />
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
