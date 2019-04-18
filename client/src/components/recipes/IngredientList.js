import React from "react";
import { connect } from "react-redux";

//selector
import convertIngredients from "../../selectors/ingredientsSelector";

class IngredientList extends React.Component {
  renderIngredientList = () => {
    return this.props.ingredients.map((ingredientObj, i) => {
      let { amount, unit, ingredient, prep } = ingredientObj;
      unit = unit ? unit : "";
      prep = prep ? `(${prep})` : "";
      return (
        <li key={`ingredient${i}`}>
          {`${amount} ${unit} ${ingredient} ${prep}`}
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Ingredients</h2>
        <ul>{this.renderIngredientList()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // redux memoized selector
  ingredients: convertIngredients(state)
});
export default connect(mapStateToProps)(IngredientList);
