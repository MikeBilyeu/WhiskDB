import React from "react";
import { Field } from "redux-form";

// Components
import TextArea from "../../form-inputs/TextArea";

const Directions = () => {
  return (
    <div>
      <h2>Directions</h2>
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
