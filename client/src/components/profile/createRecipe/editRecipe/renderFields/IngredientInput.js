import React from "react";
import { Field } from "redux-form";

import UnitDropDown from "../inputs/UnitDropDown";
import TextInput from "../inputs/TextInput";

// Renders all of the ingredient fields i.e. ingredient, unit, amount
const IngredientInput = ({ fields = {}, meta: { touched, error } }) => {
  return (
    <div>
      {fields.map((ingredient, index) => (
        <div key={index}>
          <div className="ui hidden divider" />
          <div className="fields">
            <Field
              name={`${ingredient}.amount`}
              component={TextInput}
              label="Amount"
              addClass="three wide"
              placeholder="1 1/2"
            />
            <Field name={`${ingredient}.unit`} component={UnitDropDown} />
            <Field
              name={`${ingredient}.ingredient`}
              component={TextInput}
              label={`Ingredient ${index + 1}`}
              addClass="seven wide"
              placeholder="E.g. Red Bell Pepper"
            />
            <Field
              name={`${ingredient}.prep`}
              component={TextInput}
              label="Cut/Prep"
              addClass="four wide"
              placeholder="Diced"
            />
          </div>
          <div className="ui divider" />
        </div>
      ))}
      <div className="ui large buttons">
        <button
          className="ui button negative"
          type="button"
          onClick={() => fields.remove(fields.length - 1)}
        >
          Remove
        </button>
        <div className="or" />
        <button
          className="ui positive button"
          type="button"
          onClick={() => fields.push({})}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;
