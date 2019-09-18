import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import IngredientList from "./IngredientList";
import Directions from "./Directions";
import Vote from "./vote/Vote";

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
  formatMinsToHours = totalMinutes => {
    const hours =
      Math.floor(totalMinutes / 60) !== 0
        ? `${Math.floor(totalMinutes / 60)}hr`
        : ``;
    const minutes = totalMinutes % 60 !== 0 ? `${totalMinutes % 60}min` : ``;
    return `${hours} ${minutes}`;
  };

  render() {
    const {
      image_url,
      directions,
      footnote,
      total_time_mins
    } = this.props.recipeData.recipe;
    const { isFetching } = this.props.recipeData;
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="recipe">
        <RecipeHeader recipe_id={recipe_id} user_id={user_id} />
        <RecipeDetails time={this.formatMinsToHours(total_time_mins)} />

        <IngredientList />
        <Directions
          directions={directions}
          time={this.formatMinsToHours(total_time_mins)}
          footnote={footnote}
        />
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
