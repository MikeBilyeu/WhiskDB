import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

// Action Creator
import { getRecipe } from "../../actions/recipeActions";

class Recipe extends React.Component {
  componentDidMount() {
    const recipe_id = this.props.match.params;
    this.props.getRecipe(recipe_id);
  }

  render() {
    console.log(this.props.recipe);
    const {
      title,
      created_at,
      total_time_mins,
      image_url,
      servings,
      ingredients,
      directions,
      footnote
    } = this.props.recipe;

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
        return <li key={`step${i}`}>{step.step}</li>;
      });

    return (
      <div>
        <h1>{title}</h1>
        <div>{created_at}</div>
        <div>rating</div>
        <div>Time:{total_time_mins}</div>
        <div>-Create_by</div>
        <img href="recipe photo" src={image_url} />
        <button>Servings {servings}</button>
        <h2>Ingredients</h2>
        <ul>{renderIngredientList}</ul>
        <h2>directions</h2>
        <ol>{renderDirections}</ol>
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
