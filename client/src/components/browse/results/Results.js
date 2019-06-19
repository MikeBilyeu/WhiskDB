import React from "react";
import { connect } from "react-redux";

import { getBrowseRecipes } from "../../../actions/browseActions";

import { Loading } from "../../loading/Loading";
import RecipeDisplay from "../../recipes/recipe-display/RecipeDisplay";
import NoResults from "./NoResults";
import ClearFilters from "./ClearFilters";

//styles
import "./results-styles.css";

class Results extends React.Component {
  componentDidMount() {
    this.props.getBrowseRecipes(this.props.browseData);
  }

  renderRecipeList = () => {
    return this.props.recipes.recipes.map((recipe, i, { length }) => {
      return <RecipeDisplay recipe={recipe} />;
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
      <div results>
        <ClearFilters numOfResults={this.props.recipes.recipes.length} />
        <ul
          style={{
            padding: "0",
            display: "grid",
            gridGap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            padding: ".5rem"
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
