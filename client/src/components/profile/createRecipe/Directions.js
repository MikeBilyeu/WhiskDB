import React from "react";
import { Field } from "redux-form";

// Components
import TextArea from "../../form-inputs/TextArea";
import Input from "../../form-inputs/Input";

// Parse Functions
import { minuteParse, numberParse, footnoteParse } from "./input-parse";

const Directions = () => {
  const placeholder = {
    directions:
      "Sift the flour, sugar, baking powder, and salt into a large bowl.",
    footnote: "Drop batter by large spoonfuls onto the griddle…"
  };
  return (
    <div className="cr-section">
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
        placeholder={placeholder.directions}
      />
      <Field
        name="footnote"
        className="cr-footnote"
        type="text"
        component={TextArea}
        label="Footnote"
        normalize={footnoteParse}
        placeholder={placeholder.footnote}
      />
    </div>
  );
};

export default Directions;
