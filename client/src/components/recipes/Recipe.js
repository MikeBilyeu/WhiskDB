import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import RecipeHeader from "./RecipeHeader";
import Rating from "./recipe-display/rating/Rating";
import ServingsAndUnit from "./servingsAndUnit/ServingsAndUnit";
import IngredientList from "./IngredientList";
import Vote from "./Vote";

// Action Creator
import { getRecipe } from "../../actions/recipeActions";

import { Loading } from "../loading/Loading";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getRecipe(recipe_id, user_id);
  }

  render() {
    const {
      title,
      total_time_mins,
      image_url,
      directions,
      footnote,
      username,
      rating,
      votes,
      date_created
    } = this.props.recipeData.recipe;
    const { isFetching } = this.props.recipeData;
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;

    const renderRating = (likes, dislikes) => {
      let totalVotes = likes + dislikes;
      // get a rating of 0 - 5
      // rating is num of likes divided by total votes multiplied by 5
      let rating = totalVotes === 0 ? 5 : (likes / totalVotes) * 5;
      return `${rating} stars from ${totalVotes} vote${
        totalVotes === 1 ? "" : "s"
      }`;
    };

    const renderFootnote = footnote => {
      if (footnote !== null) {
        return (
          <div>
            <h3>Footnote:</h3>
            <p>{footnote}</p>
          </div>
        );
      }
      return null;
    };

    const renderDirections =
      directions &&
      directions.map((step, i) => {
        return (
          <li key={`step${i}`} style={{ listStyleType: "none" }}>
            <h4>Step {i + 1}</h4>
            {step.step}
          </li>
        );
      });

    const renderTime = totalMinutes => {
      let hours =
        Math.floor(totalMinutes / 60) !== 0
          ? `${Math.floor(totalMinutes / 60)}h`
          : ``;
      let minutes = totalMinutes % 60 !== 0 ? `${totalMinutes % 60}m` : ``;
      return `${hours} ${minutes}`;
    };

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        <RecipeHeader recipe_id={recipe_id} user_id={user_id} />
        <h1>{title}</h1>
        <div>{date_created}</div>
        <Rating rating={rating} votes={votes} />
        <div>Time:{renderTime(total_time_mins)}</div>
        <div>{username}</div>
        <img href="recipe photo" alt="" src={image_url} />
        <ServingsAndUnit />
        <IngredientList />
        <h2>Directions</h2>
        <ol>{renderDirections}</ol>
        {renderFootnote(footnote)}
        <Vote user_id={user_id} recipe_id={recipe_id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeData: state.recipe,
  auth: state.auth
});
Recipe = connect(
  mapStateToProps,
  { getRecipe }
)(Recipe);

export default withRouter(Recipe);
