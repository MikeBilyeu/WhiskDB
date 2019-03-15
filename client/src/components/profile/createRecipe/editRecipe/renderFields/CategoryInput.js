import React from "react";

import CheckboxInput from "../inputs/CheckboxInput";

const CategoryInput = fields => {
  return (
    <div className="ui form">
      <div className="grouped fields">
        <label>Diet Type:</label>
        <CheckboxInput
          fields={fields}
          label="Vegetarian"
          categoryType="diet"
          name="vegetarian"
        />
        <CheckboxInput
          fields={fields}
          label="Non-Vegetarian"
          categoryType="diet"
          name="nonvegetarian"
        />
        <CheckboxInput
          fields={fields}
          label="Vegan"
          categoryType="diet"
          name="vegan"
        />
      </div>
      <div className="grouped fields">
        <label>Meal type:</label>
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
      <div className="grouped fields">
        <label>Cuisine type:</label>
        <CheckboxInput
          fields={fields}
          label="Chinese"
          categoryType="cuisine"
          name="chinese"
        />
        <CheckboxInput
          fields={fields}
          label="Indian"
          categoryType="cuisine"
          name="indian"
        />
        <CheckboxInput
          fields={fields}
          label="Italian"
          categoryType="cuisine"
          name="italian"
        />
        <CheckboxInput
          fields={fields}
          label="Mexican"
          categoryType="cuisine"
          name="mexican"
        />
        <CheckboxInput
          fields={fields}
          label="Thia"
          categoryType="cuisine"
          name="thia"
        />
        <CheckboxInput
          fields={fields}
          label="Other*"
          categoryType="cuisine"
          name="other"
        />
      </div>
    </div>
  );
};

export default CategoryInput;
