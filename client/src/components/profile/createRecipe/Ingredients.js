import React from "react";
import { Field, reduxForm } from "redux-form";

// import validation
import { ValidateIngredients } from "./RecipeValidation";

import TextInput from "./inputs/TextInput";
import IngredientInput from "./renderFields/IngredientInput";
import IngredientOutput from "./renderFields/IngredientOutput";

const ingredients = props => {
  return (
    <div>
      <h4>Ingredients</h4>
      <IngredientOutput change={props.change} />
      <IngredientInput change={props.change} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateIngredients
})(ingredients);
