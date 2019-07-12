import React from "react";
import { FieldArray, reduxForm } from "redux-form";

// import validation
import { ValidateIngredients } from "./RecipeValidation";

import IngredientInput from "./renderFields/IngredientInput";

const ingredients = () => {
  return (
    <div>
      <h4>Ingredients</h4>
      <FieldArray name="ingredients" component={IngredientInput} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false
  // validate: ValidateIngredients
})(ingredients);
