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
        <label>Cusine type:</label>
        <CheckboxInput
          fields={fields}
          label="Chinese"
          categoryType="cusine"
          name="chinese"
        />
        <CheckboxInput
          fields={fields}
          label="Indian"
          categoryType="cusine"
          name="indian"
        />
        <CheckboxInput
          fields={fields}
          label="Italian"
          categoryType="cusine"
          name="italian"
        />
        <CheckboxInput
          fields={fields}
          label="Mexican"
          categoryType="cusine"
          name="mexican"
        />
        <CheckboxInput
          fields={fields}
          label="Thia"
          categoryType="cusine"
          name="thia"
        />
      </div>
    </div>
  );
};

export default CategoryInput;
