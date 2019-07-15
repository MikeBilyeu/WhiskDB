import React from "react";
import { reduxForm } from "redux-form";

import CheckboxInput from "../inputs/CheckboxInput";

// import validation
import { ValidateCategories } from "../RecipeValidation";

const CategoryInput = fields => {
  return (
    <div>
      <label>categories</label>
      <CheckboxInput
        fields={fields}
        label="Vegetarian"
        categoryType="diet"
        name="vegetarian"
      />
      <CheckboxInput
        fields={fields}
        label="Vegan"
        categoryType="diet"
        name="vegan"
      />
      <CheckboxInput
        fields={fields}
        label="Breakfast"
        categoryType="meal"
        name="breakfast"
      />
      <CheckboxInput
        fields={fields}
        label="Lunch"
        categoryType="meal"
        name="lunch"
      />
      <CheckboxInput
        fields={fields}
        label="Dinner"
        categoryType="meal"
        name="dinner"
      />
      <CheckboxInput
        fields={fields}
        label="Appetizer"
        categoryType="meal"
        name="appetizer"
      />
      <CheckboxInput
        fields={fields}
        label="Dessert"
        categoryType="meal"
        name="dessert"
      />
      <CheckboxInput
        fields={fields}
        label="Drink"
        categoryType="meal"
        name="drink"
      />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateCategories
})(CategoryInput);
