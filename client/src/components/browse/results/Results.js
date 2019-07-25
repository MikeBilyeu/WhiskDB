import React from "react";
import { connect } from "react-redux";

import {
  getBrowseRecipes,
  getSearchRecipes
} from "../../../actions/browseActions";

import { Loading } from "../../loading/Loading";
import RecipeDisplay from "../../recipes/recipe-display/RecipeDisplay";
import NoResults from "./NoResults";
import ClearFilters from "./ClearFilters";

//styles
import "./results-styles.css";

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
      <div>
        <ClearFilters numOfResults={this.props.recipes.recipes.length} />
        <ul
          style={{
            display: "grid",
            gridGap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
            padding: ".3rem",
            listStyleType: "none",
            listStyle: "none"
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
  browseData: state.browseRecipes.browseData,
  user_id: state.auth.user.user_id
});

export default connect(
  mapStateToProps,
  { getBrowseRecipes, getSearchRecipes }
)(Results);
