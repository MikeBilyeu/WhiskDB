import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

// Action Creator
import { getRecipe } from "../../actions/recipeActions";

import { Loading } from "../loading/Loading";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params;
    this.props.getRecipe(recipe_id);
  }
  renderFootnote = footnote => {
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

  formatDate(dateTime) {
    const date = new Date(dateTime);
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const month = allMonths[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  render() {
    const {
      title,
      created_at,
      total_time_mins,
      image_url,
      servings,
      ingredients,
      directions,
      footnote,
      username
    } = this.props.recipe.recipe;
    const { isFetching } = this.props.recipe;

    const renderIngredientList =
      ingredients &&
      ingredients.map((ingredientObj, i) => {
        let { amount, unit, ingredient, prep } = ingredientObj;
        unit = unit ? unit : "";
        prep = prep ? `(${prep})` : "";
        return (
          <li key={`ingredient${i}`}>
            {`${amount} ${unit} ${ingredient} ${prep}`}
          </li>
        );
      });

    const renderDirections =
      directions &&
      directions.map((step, i) => {
        return (
          <li key={`step${i}`}>
            <h4>Step {i + 1}</h4>
            {step.step}
          </li>
        );
      });

    // display loading if isFetching
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        <h1>{title}</h1>
        <div>{this.formatDate(created_at)}</div>
        <div>rating</div>
        <div>Time:{total_time_mins}</div>
        <div>-{username}</div>
        <img href="recipe photo" src={image_url} />
        <button>Servings {servings}</button>
        <h2>Ingredients</h2>
        <ul>{renderIngredientList}</ul>
        <h2>directions</h2>
        <ol>{renderDirections}</ol>
        {this.renderFootnote(footnote)}
        <h3>How was it?</h3>
        <button>Like</button>
        <button>Dislike</button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipe: state.recipe
});
Recipe = connect(
  mapStateToProps,
  { getRecipe }
)(Recipe);

export default withRouter(Recipe);
