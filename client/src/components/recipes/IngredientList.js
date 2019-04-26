import React from "react";
import { connect } from "react-redux";

//selector
import convertIngredients from "../../selectors/ingredientsSelector";

const renderIngredientList = props => {
  return props.ingredients.map((ingredientObj, i) => {
    let { amount, unit, ingredient, prep } = ingredientObj;
    unit = unit ? unit : "";
    prep = prep ? `(${prep})` : "";
    if (typeof amount === "object") {
      let amounts = amount.map(amount => {
        return `${amount.amount} ${amount.unit}`;
      });
      return (
        <li key={`ingredient${i}`}>{`${amounts.join(
          " + "
        )} ${ingredient} ${prep}`}</li>
      );
    }
    return (
      <li key={`ingredient${i}`}>
        {`${amount} ${unit} ${ingredient} ${prep}`}
      </li>
    );
  });
};

const IngredientList = props => {
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>{renderIngredientList(props)}</ul>
    </div>
  );
};

const mapStateToProps = state => ({
  // redux memoized selector
  ingredients: convertIngredients(state)
});
export default connect(mapStateToProps)(IngredientList);
