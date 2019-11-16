import React from "react";
import { connect } from "react-redux";
import {
  getBrowseRecipes,
  getSearchRecipes
} from "../../../actions/browseActions";
import Loading from "../../loading";
import RecipeDisplay from "../../recipe-display";
import NoResults from "./no-results";

import "./home-results.scss";

class Results extends React.Component {
  componentDidMount() {
    if (this.props.browseData.search === "") {
      this.props.getBrowseRecipes(this.props.browseData);
    } else {
      this.props.getSearchRecipes(this.props.browseData);
    }
  }

  renderRecipeList = () => {
    return this.props.recipes.recipes.map((recipe, i) => {
      return <RecipeDisplay key={i} recipe={recipe} />;
    });
  };

  render() {
    const { isFetching } = this.props.recipes;

    if (isFetching) {
      return <Loading />;
    }
    if (this.props.recipes.recipes.length < 1) {
      return <NoResults />;
    }
    return (
      <div className="recipe-results">
        <ul>{this.renderRecipeList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.browseRecipes,
  browseData: state.browseRecipes.browseData,
  user_id: state.auth.user.user_id
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes, getSearchRecipes }
)(Results);
