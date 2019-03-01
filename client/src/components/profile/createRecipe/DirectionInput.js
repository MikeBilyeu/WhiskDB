import React from "react";
import { Field, FieldArray } from "redux-form";

import TextAreaInput from "./TextAreaInput";
// Renders all steps of directions
const DirectionInput = ({ fields, meta: { touched, error } }) => {
  return (
    <div>
      {fields.map((step, index) => (
        <div key={index}>
          <div className="ui hidden divider" />
          <div className="field">
            <Field
              name={`${step}.step`}
              component={TextAreaInput}
              label={`Step ${index + 1}`}
              placeholder="Set oven to 375(f)..."
            />
            <div className="ui hidden divider" />
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
          Add Step
        </button>
      </div>
    </div>
  );
};

export default DirectionInput;
