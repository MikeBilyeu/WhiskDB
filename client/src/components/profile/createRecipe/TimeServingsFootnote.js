import React from "react";
import { Field, reduxForm } from "redux-form";

// import validation
import { ValidateCategories } from "./RecipeValidation";

import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";

const TimeServingsFootnote = () => {
  const footnoteParse = value => {
    let strArr = value.match(/[\w -]{0,455}/) || [""];
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

      <h4>Time Required</h4>
      <Field
        name="time.hours"
        component={TextInput}
        label="Hours"
        placeholder="1"
        normalize={numberParse}
        pattern="[0-9]*"
      />
      <Field
        name="time.minutes"
        component={TextInput}
        label="Minutes"
        placeholder="15"
        parse={minuteParse}
        pattern="[0-9]*"
      />

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

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: ValidateCategories
})(TimeServingsFootnote);
