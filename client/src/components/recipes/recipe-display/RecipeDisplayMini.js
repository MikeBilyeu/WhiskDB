import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Rating from "./rating/Rating";

import "./rd-styles.css";

import { saveRecipe } from "../../../actions/recipeActions";

class RecipeDisplay extends React.Component {
  render() {
    const {
      title,
      votes,
      rating,
      username,
      recipe_id,
      total_time_mins
    } = this.props.recipe;
    return (
      <li>
        <Link className="recipe-card mini" to={`/recipe/${recipe_id}`}>
          <img
            className="thumbnail mini"
            src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            alt=""
          />

          <div className="title mini">{title}</div>
          <div className="rating-time mini">
            <Rating className="rating" rating={rating} votes={votes} />
          </div>
        </Link>
      </li>
    );
  }
}
const mapStateToProps = state => {
  return { user_id: state.auth.user.user_id };
};
export default connect(
  mapStateToProps,
  { saveRecipe }
)(RecipeDisplay);
