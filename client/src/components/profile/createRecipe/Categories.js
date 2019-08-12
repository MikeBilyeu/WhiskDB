import React from "react";
import { reduxForm, Fields } from "redux-form";

import CheckboxInput from "./inputs/CheckboxInput";

// import validation
import { ValidateCategories } from "./RecipeValidation";

const Categories = () => {
  const categoryNames = [
    "categories.diet.vegetarian",
    "categories.diet.vegan",
    "categories.meal.breakfast",
    "categories.meal.lunch",
    "categories.meal.dinner",
    "categories.meal.appetizer",
    "categories.meal.dessert",
    "categories.meal.drink"
  ];
  return (
    <Fields
      names={categoryNames}
      component={fields => {
        return (
          <div>
            <h4 style={{ marginBottom: "2rem" }}>categories</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
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
          </div>
        );
      }}
    />
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateCategories
})(Categories);
