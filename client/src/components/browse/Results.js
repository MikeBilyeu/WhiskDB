import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBrowseRecipes } from "../../actions/recipeActions";

import { Loading } from "../loading/Loading";
import RecipeDisplay from "../recipes/recipe-display/RecipeDisplay";

import HomeHeader from "./header/HomeHeader";
class Results extends React.Component {
  componentDidMount() {
    this.props.getBrowseRecipes();
  }

  render() {
    const { recipes, isFetching } = this.props.recipes;

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
      <ul style={{ listStyleType: "none", marginLeft: ".8rem", padding: "0" }}>
        {renderRecipeList}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.browseRecipes
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes }
)(Results);
