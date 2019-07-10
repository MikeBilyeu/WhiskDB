import React from "react";
import { FieldArray, reduxForm } from "redux-form";

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
  destroyOnUnmount: false
})(Directions);
