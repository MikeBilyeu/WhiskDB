import React from "react";
import { FieldArray, reduxForm } from "redux-form";

// import validation
import { ValidateDirections } from "./RecipeValidation";

import DirectionInput from "./renderFields/DirectionInput";

const Directions = () => {
  return (
    <div>
      <h4>Directions</h4>
      <FieldArray name="directions" component={DirectionInput} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateDirections
})(Directions);
