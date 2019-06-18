import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBrowseRecipes } from "../../../actions/browseActions";

import { Loading } from "../../loading/Loading";
import RecipeDisplay from "../../recipes/recipe-display/RecipeDisplay";
import NoResults from "./NoResults";

class Results extends React.Component {
  componentDidMount() {
    this.props.getBrowseRecipes(this.props.browseData);
  }

  renderRecipeList = () => {
    return this.props.recipes.recipes.map((recipe, i, { length }) => {
      return (
        <Link key={`recipe${i}`} to={`/recipe/${recipe.recipe_id}`}>
          <RecipeDisplay recipe={recipe} />
        </Link>
      );
    });
  };

  render() {
    const { recipes, isFetching } = this.props.recipes;

    if (isFetching) {
      return <Loading />;
    }
    if (this.props.recipes.recipes.length < 1) {
      return <NoResults />;
    }
    return (
      <div style={{ marginTop: "8rem" }}>
        <div style={{ marginLeft: "1rem" }}>
          ({this.props.recipes.recipes.length}) Result
          {this.props.recipes.recipes.length == 1 ? "" : "s"}
        </div>
        <ul
          style={{
            marginLeft: recipes.length > 0 ? ".3rem" : "0",
            padding: "0"
          }}
        >
          {this.renderRecipeList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.browseRecipes,
  browseData: state.browseRecipes.browseData
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes }
)(Results);
