import React from "react";
import { Field, reduxForm } from "redux-form";

// import validation
import { ValidateIngredients } from "./RecipeValidation";

import TextInput from "./inputs/TextInput";
import IngredientInput from "./renderFields/IngredientInput";
import IngredientOutput from "./renderFields/IngredientOutput";

// const ingredients = () => {
//   return (
//     <div>
//       <h4>Ingredients</h4>
//       <Field name="ingredients" component={TextInput} />
//       <IngredientOutput />
//     </div>
//   );
// };

const ingredients = props => {
  return (
    <div>
      <h4>Ingredients</h4>
      <IngredientInput change={props.change} />
      <IngredientOutput change={props.change} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateIngredients
})(ingredients);

// export default reduxForm({
//   form: "newRecipe",
//   destroyOnUnmount: false
// })(ingredients);
