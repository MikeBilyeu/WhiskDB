import React from "react";
import { FieldArray, reduxForm } from "redux-form";

// import validation
import { ValidateDirections } from "./RecipeValidation";

import DirectionInput from "./renderFields/DirectionInput";

const Directions = props => {
  return (
    <div>
      <h4>Directions</h4>
      <DirectionInput change={props.change} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateDirections
})(Directions);
