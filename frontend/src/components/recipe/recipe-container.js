import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Whiskdb from "../../assets/images/whiskdb.png";
import Header from "./header";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Review from "./review";
import Share from "./share";
import { getRecipe, submitEditRecipe } from "../../actions/recipeActions";
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
    const {
      reviewOpen,
      shareOpen,
      isFetching,
      editRecipe,
      recipe: { image_url, directions, footnote, time, num_reviews }
    } = this.props.recipeData;
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.user.user_id || null;

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    if (editRecipe) {
      return <Edit />;
    }

    return (
      <div className="recipe">
        <img className="whiskdb-print-logo" src={Whiskdb} alt="Whiskdb logo" />
        <Header recipe_id={recipe_id} user_id={user_id} />
        {shareOpen ? <Share /> : null}
        {reviewOpen ? (
          <Review recipe_id={recipe_id} num_reviews={num_reviews} />
        ) : null}

        <img
          className="recipe-img"
          href="recipe photo"
          alt=""
          src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80"
        />
        <div className="card">
          <RecipeDetails />
          <Ingredients />
          <Directions directions={directions} time={time} footnote={footnote} />
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
