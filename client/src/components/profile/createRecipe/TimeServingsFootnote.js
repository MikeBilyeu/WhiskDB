import React from "react";
import { Field, reduxForm } from "redux-form";

// import validation
import { ValidateTimeServingsFootnote } from "./RecipeValidation";

import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import TimeInput from "./renderFields/TimeInput";

const TimeServingsFootnote = () => {
  const footnoteParse = value => {
    let strArr = value.match(/.{0,455}/) || [""];
    return value && strArr[0];
  };
  const minuteParse = value => {
    let strArr = value.match(/^[1-5][\d]?/) || [""];
    return value && strArr[0];
  };
  const numberParse = value => {
    let strArr = value.match(/^[1-9][\d]?/) || [""];
    return value && strArr[0];
  };
  return (
    <div>
      <Field
        name="servings"
        component={TextInput}
        label="Servings"
        placeholder="2"
        addClass="cr-servings"
        parse={numberParse}
        type="number"
        pattern="[0-9]*"
      />

      <TimeInput />

      <Field
        name="footnote"
        component={TextAreaInput}
        label="Footnote"
        placeholder="Add lemon juice for more flavor"
        parse={footnoteParse}
      />
    </div>
  );
};

// export default reduxForm({
//   form: "newRecipe",
//   destroyOnUnmount: false,
//   validate: ValidateTimeServingsFootnote
// })(TimeServingsFootnote);

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false
})(TimeServingsFootnote);
