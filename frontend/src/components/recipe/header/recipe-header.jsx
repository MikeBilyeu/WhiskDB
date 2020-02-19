import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleShare, saveRecipe } from "../../../actions/recipe";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/saveIcon.svg";
import { ReactComponent as More } from "../../../assets/images/more.svg";

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
    history.location.key ? history.goBack() : history.push("/");
  };

  return (
    <div className="recipe-header">
      <Arrow className="recipe-header__back-btn" onClick={handleBackClick} />
      <button
        className={classNames("recipe-header__save-btn", {
          "recipe-header__save-btn--active": recipeSaved
        })}
        onClick={() => saveRecipe(recipe_id, user_id)}
      >
        {recipeSaved ? "Saved" : "Save"}
      </button>

      <More onClick={toggleShare} className="recipe-header__more-btn" />
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
