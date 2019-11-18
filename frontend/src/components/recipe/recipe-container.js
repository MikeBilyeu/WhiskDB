import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Whiskdb from "../../assets/images/whiskdb.png";
import Edit from "./edit";
import Header from "./header";
import RecipeDetails from "./RecipeDetails";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Rate from "./rate";
import Share from "./share";
import { getRecipe } from "../../actions/recipeActions";
import Loading from "../loading";
import "./recipe.scss";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params.recipe_id;
    const user_id = this.props.auth.user.user_id || null;
    this.props.getRecipe(recipe_id, user_id);
  }
  formatMinsToHours = totalMinutes => {
    const hours =
      Math.floor(totalMinutes / 60) !== 0
        ? `${Math.floor(totalMinutes / 60)}hr`
        : ``;
    const minutes = totalMinutes % 60 !== 0 ? `${totalMinutes % 60}min` : ``;
    return `${hours} ${minutes}`;
  };

  render() {
    const {
      reviewOpen,
      shareOpen,
      isFetching,
      editRecipe,
      recipe: { image_url, directions, footnote, total_time_mins, num_reviews }
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
    //<img className="whiskdb-logo" src={Whiskdb} alt="Whiskdb logo" />
    return (
      <div className="recipe">
        <Header recipe_id={recipe_id} user_id={user_id} />
        {shareOpen ? <Share /> : null}

        <img
          className="recipe-img"
          href="recipe photo"
          alt=""
          src="https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        />
        <div className="card">
          <RecipeDetails />
          <Ingredients />
          <Directions
            directions={directions}
            time={this.formatMinsToHours(total_time_mins)}
            footnote={footnote}
          />
          {reviewOpen ? (
            <Rate recipe_id={recipe_id} num_reviews={num_reviews} />
          ) : null}
        </div>
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
