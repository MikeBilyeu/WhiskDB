import React from "react";

import CheckboxInput from "../inputs/CheckboxInput";

const CategoryInput = fields => {
  return (
    <div>
      <label>categories</label>
      <CheckboxInput
        fields={fields}
        label="None"
        categoryType="diet"
        name="none"
      />
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

export default CategoryInput;
