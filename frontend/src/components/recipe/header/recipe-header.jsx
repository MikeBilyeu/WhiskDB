import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleShowMore, saveRecipe } from "../../../actions/recipe";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as SaveIcon } from "../../../assets/images/heart.svg";
import { ReactComponent as More } from "../../../assets/images/more.svg";

import "./recipe-header.scss";

const Header = ({
  recipe_id,
  user_id,
  saveRecipe,
  toggleShowMore,
  recipeSaved,
  handleBackClick
}) => {
  return (
    <div className="recipe-header">
      <Arrow className="recipe-header__back-btn" onClick={handleBackClick} />
      <div
        className={classNames("recipe-header__save-btn", {
          "recipe-header__save-btn--active": recipeSaved
        })}
        onClick={() => saveRecipe(recipe_id, user_id)}
      >
        <SaveIcon className="recipe-header__save-icon" />
        {recipeSaved ? "Saved" : "Save"}
      </div>

      <More onClick={toggleShowMore} className="recipe-header__more-btn" />
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
    { saveRecipe, toggleShowMore }
  )(Header)
);
