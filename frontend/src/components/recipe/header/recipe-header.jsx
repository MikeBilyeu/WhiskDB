import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleShowMore, saveRecipe } from "../../../actions/recipe";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as More } from "../../../assets/images/more.svg";

import "./recipe-header.scss";

const Header = props => {
  console.log(props);
  return (
    <div className="recipe-header">
      <Arrow
        className="recipe-header__back-btn"
        onClick={props.handleBackClick}
      />
      {props.isAuth && !props.author ? (
        <div
          className={classNames("recipe-header__save-btn", {
            "recipe-header__save-btn--active": props.recipeSaved
          })}
          onClick={props.handleSaveClick}
        >
          {props.recipeSaved ? "Unsave" : "Save"}
        </div>
      ) : !props.isAuth ? (
        <Link
          className="recipe-header__login-btn"
          to={{
            pathname: "/auth",
            state: { from: props.location.pathname }
          }}
        >
          Login to save
        </Link>
      ) : null}

      <More
        onClick={props.toggleShowMore}
        className="recipe-header__more-btn"
      />
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
