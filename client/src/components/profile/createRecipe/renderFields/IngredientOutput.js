import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("newRecipe");

const IngredientOutput = ingredients => {
  return (
    <div>
      {ingredients.ingredients.map((ingredient, i, arr) => {
        // don't render last field values must click add button to add
        if (i !== arr.length - 1) {
          return (
            <div key={ingredient.ingredient + i}>{`${
              ingredient.amount
            } ${ingredient.unit || ""} ${ingredient.ingredient}
              ${ingredient.prep ? `(${ingredient.prep})` : ""}`}</div>
          );
        }
        return null;
      })}
    </div>
  );
};

const mapSateToProps = state => {
  return { ingredients: selector(state, "ingredients") };
};

export default connect(mapSateToProps)(IngredientOutput);
