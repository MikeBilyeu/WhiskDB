import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";
import ServingsAndUnit from "./servingsAndUnit/ServingsAndUnit";
import IngredientList from "./IngredientList";
import Directions from "./Directions";
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

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="recipe">
        <RecipeHeader recipe_id={recipe_id} user_id={user_id} />
        <RecipeDetails />
        <img
          href="recipe photo"
          alt=""
          src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        />
        <ServingsAndUnit />
        <IngredientList />
        <Directions directions={directions} time={total_time_mins} />
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
