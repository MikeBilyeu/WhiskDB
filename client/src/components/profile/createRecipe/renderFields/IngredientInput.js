import React from "react";
import { Field } from "redux-form";
import { getFormSyncErrors } from "redux-form";
import { connect } from "react-redux";

import UnitDropDown from "../inputs/UnitDropDown";
import TextInput from "../inputs/TextInput";

// Renders all of the ingredient fields i.e. ingredient, unit, amount
const IngredientInput = ({
  fields = {},
  meta: { touched, error },
  syncErrors
}) => {
  const capitalize = value => {
    return value && value.charAt(0).toUpperCase() + value.substring(1);
  };
  const textParse = value => {
    let strArr = value.match(/.{0,55}/) || [""];
    return value && strArr[0];
  };
  return (
    <div>
      {fields.map((ingredient, index, arr) => {
        //only display last field in the fieldarray
        if (index === arr.length - 1) {
          return (
            <div key={index}>
              <div className="fields ingredients">
                <Field
                  name={`${ingredient}.ingredient`}
                  component={TextInput}
                  label={`Ingredient`}
                  addClass="full-input ingredient"
                  placeholder="E.g. Red Bell Pepper"
                  normalize={capitalize}
                  parse={textParse}
                />
                <Field
                  name={`${ingredient}.amount`}
                  component={TextInput}
                  label="Amount"
                  placeholder="1 1/2"
                  addClass="amount"
                />
                <Field
                  addClass="unit"
                  name={`${ingredient}.unit`}
                  component={UnitDropDown}
                />
                <Field
                  name={`${ingredient}.prep`}
                  component={TextInput}
                  label="Prep"
                  addClass="full-input prep"
                  placeholder="Diced"
                  parse={textParse}
                />
              </div>
            </div>
          );
        }
      })}
      <div className="add-remove-button">
        <div
          className="button add"
          type="button"
          onClick={() => {
            if (Object.keys(syncErrors).length < 1) {
              fields.push({});
            }
          }}
        >
          Add
        </div>
      </div>
    </div>
  );
};

const mapSateToProps = state => {
  return { syncErrors: getFormSyncErrors("newRecipe")(state) };
};

export default connect(mapSateToProps)(IngredientInput);
