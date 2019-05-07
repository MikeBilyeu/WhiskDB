import React from "react";
import { connect } from "react-redux";
import HeaderOption from "../options/HeaderOption";
import { Link } from "react-router-dom";

import { Loading } from "../loading/Loading";
import RecipeDisplay from "../recipes/recipe-display/RecipeDisplay";

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

    // const sortRecipes = {
    //   alphabetical: recipes => {
    //     let sorted = recipes.sort((a, b) => {
    //       if (a.title.toLowerCase() < b.title.toLowerCase()) {
    //         return -1;
    //       } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //     return sorted;
    //   },
    //   time: recipes => {
    //     let sorted = recipes.sort((a, b) => {
    //       if (a.total_time_mins < b.total_time_mins) {
    //         return -1;
    //       } else if (a.total_time_mins > b.total_time_mins) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //     return sorted;
    //   },
    //   rating: recipes => {
    //     let sorted = recipes.sort((a, b) => {
    //       if (renderRating(a) > renderRating(b)) {
    //         return -1;
    //       } else if (renderRating(a) < renderRating(b)) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //     return sorted;
    //   }
    // };

    const renderRecipeList =
      recipes &&
      recipes.map((recipe, i) => {
        return (
          <Link key={`recipe${i}`} to={`/recipe/${recipe.recipe_id}`}>
            <RecipeDisplay recipe={recipe} />
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
        <ul style={{ listStyleType: "none" }}>{renderRecipeList}</ul>
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
