import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import renderTime from "../../utils/time";
import { ReactComponent as SaveIcon } from "../../assets/images/heart.svg";
import clock from "../../assets/images/time.png";
import Rating from "../recipe/rating";
import "./recipe_card.scss";
import { saveRecipe } from "../../actions/recipe";

const RecipeCard = props => {
  const convertTime = total_time_mins => {
    const hours = Math.floor(parseInt(total_time_mins) / 60) || "";
    const minutes = parseInt(total_time_mins) % 60 || "";
    return renderTime({ hours, minutes });
  };

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
    <Link className="recipe-card" to={`/recipe/${props.recipe.recipe_id}`}>
      <img
        className="recipe-card__thumbnail"
        src={props.recipe.image_url.replace(
          "upload/",
          "upload/q_auto:good,w_1500/"
        )}
        alt=""
      />
      <div className="recipe-card__meta">
        <div className="recipe-card__title">{props.recipe.title}</div>
        {props.recipe.num_saves > 0 && (
          <div className="recipe-card__saves">
            <SaveIcon className="recipe-card__icon" />
            {convertSaves(props.recipe.num_saves)}
          </div>
        )}
      </div>
    </Link>
  );
};

const mapStateToProps = state => {
  return { user_id: state.auth.user.user_id };
};
export default connect(
  mapStateToProps,
  { saveRecipe }
)(RecipeCard);
