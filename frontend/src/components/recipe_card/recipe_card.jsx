import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as SaveIcon } from "../../assets/images/heart.svg";
import { getRecipe } from "../../actions/recipe";
import Rating from "../recipe/rating";
import "./recipe_card.scss";

const RecipeCard = props => {
  const convertSaves = num => {
    return num > 1000000
      ? parseFloat((num / 1000000).toFixed(1)) + "m"
      : num > 1000
      ? parseFloat((num / 1000).toFixed(1)) + "k"
      : num > 0
      ? num
      : "";
  };

  return (
    <Link
      className="recipe-card"
      to={`/recipe/${props.recipe.recipe_id}`}
      onClick={() => {
        props.getRecipe(props.recipe.recipe_id, props.user_id);
      }}
    >
      <img
        className="recipe-card__thumbnail"
        src={props.recipe.image_url.replace(
          "upload/",
          "upload/c_scale,h_1000,q_auto:good/"
        )}
        alt=""
      />
      <div className="recipe-card__meta">
        <div className="recipe-card__title">{props.recipe.title}</div>

        {props.recipe.num_saves > 0 && (
          <div
            className={classNames("recipe-card__saves", {
              "recipe-card__saves--two-rows": props.recipe.num_reviews > 0
            })}
          >
            <SaveIcon className="recipe-card__icon" />
            {convertSaves(props.recipe.num_saves)}
          </div>
        )}
        {props.recipe.num_reviews > 0 && (
          <Rating
            className="recipe-card"
            rating={props.recipe.rating}
            votes={props.recipe.num_reviews}
          />
        )}
        <div className="recipe-card__fade"></div>
      </div>
    </Link>
  );
};

const mapStateToProps = state => {
  return { user_id: state.auth.user.user_id };
};
export default connect(
  mapStateToProps,
  { getRecipe }
)(RecipeCard);
