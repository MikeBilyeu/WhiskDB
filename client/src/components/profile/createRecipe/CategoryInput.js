import React from "react";
import { Field } from "redux-form";

import CheckboxInput from "./inputs/CheckboxInput";

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
          name="nonVegetarian"
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
      </div>
    </div>
  );
};

export default CategoryInput;
