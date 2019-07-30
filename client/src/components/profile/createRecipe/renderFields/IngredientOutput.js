import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
const selector = formValueSelector("newRecipe");

const IngredientOutput = ingredients => {
  return (
    <div>
      {ingredients.ingredients.map((ingredient, i, arr) => {
        console.log(ingredient);
        return <div key={"ingredient " + i}>{ingredient}</div>;
      })}
    </div>
  );
};

const mapSateToProps = state => {
  return { ingredients: selector(state, "ingredients") };
};

export default connect(mapSateToProps)(IngredientOutput);
