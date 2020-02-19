import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Header from "./header";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Review from "./review";
import More from "./more";
import { getRecipe, submitEditRecipe } from "../../actions/recipe";
import convertTime from "../../selectors/time-selector";
import Loading from "../loading";
import Edit from "./edit";
import "./recipe.scss";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.user.user_id || null;
    this.props.getRecipe(recipe_id, user_id);
  }

  handleSubmit = values => {
    this.props.submitEditRecipe(values);
  };

  render() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.user.user_id || null;
    const {
      reviewOpen,
      shareOpen,
      isFetching,
      editRecipe,
      recipe: { image_url, directions, footnote, time, title, username }
    } = this.props.recipeData;
    document.title = !title ? document.title : `${title} |  Zipiwisk`;

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    if (editRecipe) {
      return <Edit />;
    }

    if (reviewOpen) {
      return <Review recipe_id={recipe_id} />;
    }

    return (
      <div className="recipe">
        <Header recipe_id={recipe_id} user_id={user_id} />
        {shareOpen ? <More /> : null}

        <img
          className="recipe__img"
          href="recipe photo"
          alt=""
          src={image_url}
        />

        <div className="recipe__container">
          <RecipeDetails time={time} />
          <Ingredients />
          <Directions directions={directions} time={time} footnote={footnote} />
          <div className="recipe__created-by">
            Recipe by {username.toLowerCase()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeData: {
    ...state.recipe,
    recipe: { ...state.recipe.recipe, time: convertTime(state) }
  },
  auth: state.auth
});
Recipe = connect(
  mapStateToProps,
  { getRecipe, submitEditRecipe }
)(Recipe);

export default withRouter(Recipe);
