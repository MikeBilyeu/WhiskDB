import React from "react";
import { connect } from "react-redux";
import HeaderOption from "../options/HeaderOption";
import { Link } from "react-router-dom";

import { Loading } from "../loading/Loading";

// action Creator
import { getSavedRecipes } from "../../actions/recipeActions";
class SavedRecipes extends React.Component {
  componentDidMount() {
    const user_id = this.props.auth.isAuthenticated
      ? this.props.auth.user.user_id
      : null;
    this.props.getSavedRecipes(user_id);
  }
  render() {
    const { recipes, isFetching } = this.props.recipes;

    const renderRating = recipe => {
      let totalVotes = recipe.likes + recipe.dislikes;
      // get a rating of 0 - 5
      // rating is num of likes divided by total votes multiplied by 5
      let rating = totalVotes === 0 ? 5 : (recipe.likes / totalVotes) * 5;
      return rating;
    };

    const sortRecipes = {
      alphabetical: recipes => {
        let sorted = recipes.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        return sorted;
      },
      time: recipes => {
        let sorted = recipes.sort((a, b) => {
          if (a.total_time_mins < b.total_time_mins) {
            return -1;
          } else if (a.total_time_mins > b.total_time_mins) {
            return 1;
          }
          return 0;
        });
        return sorted;
      },
      rating: recipes => {
        let sorted = recipes.sort((a, b) => {
          if (renderRating(a) > renderRating(b)) {
            return -1;
          } else if (renderRating(a) < renderRating(b)) {
            return 1;
          }
          return 0;
        });
        return sorted;
      }
    };

    const renderRecipeList =
      recipes &&
      recipes.map((recipe, i) => {
        let totalVotes = recipe.likes + recipe.dislikes;

        let hours =
          Math.floor(recipe.total_time_mins / 60) !== 0
            ? `${Math.floor(recipe.total_time_mins / 60)}h`
            : ``;
        let minutes =
          recipe.total_time_mins % 60 !== 0
            ? `${recipe.total_time_mins % 60}m`
            : ``;

        return (
          <Link key={`recipe${i}`} to={`/recipe/${recipe.recipe_id}`}>
            <li>
              <div>{`${recipe.title}`}</div>
              <div>{`${renderRating(recipe)} stars ${totalVotes} vote${
                totalVotes !== 1 ? "s" : ""
              }`}</div>
              <div>{` Time: ${hours} ${minutes}`}</div>
            </li>
          </Link>
        );
      });

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        <h1>Saved Recipes</h1>
        <HeaderOption buttonName="Sort" />
        <ul>{renderRecipeList}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipes: state.savedRecipes
});

export default connect(
  mapStateToProps,
  { getSavedRecipes }
)(SavedRecipes);
