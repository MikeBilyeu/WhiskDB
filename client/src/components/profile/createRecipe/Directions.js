import React from "react";
import { Field } from "redux-form";

// Components
import TextArea from "../../form-inputs/TextArea";
import Input from "../../form-inputs/Input";

// Parse Functions
import { minuteParse, numberParse } from "./input-parse";

const Directions = () => {
  return (
    <div>
      <h2>Directions</h2>
      <Field
        name="time.hours"
        component={Input}
        label="Hr"
        placeholder="1"
        normalize={numberParse}
        pattern="[0-9]*"
      />
      <Field
        name="time.minutes"
        component={Input}
        label="Min"
        placeholder="15"
        normalize={minuteParse}
        pattern="[0-9]*"
      />
      <label>Time</label>
      <Field
        name="directions"
        type="text"
        component={TextArea}
        label="Directions"
      />
      <Field
        name="footnote"
        type="text"
        component={TextArea}
        label="Footnote"
      />
    </div>
  );
};

export default Directions;
