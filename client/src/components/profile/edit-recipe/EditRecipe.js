import React from "react";
import { Field, reduxForm } from "redux-form";

import EditHeader from "./EditHeader";
import TextInput from "../createRecipe/inputs/TextInput";

// create an Edit Recipe redux-form
// set the inital values to that of the recipe that is being edited
//

const EditRecipe = () => {
  const capitalize = value => {
    return (
      value &&
      value
        .charAt(0)
        .toUpperCase()
        .trim() + value.substring(1)
    );
  };
  const titleParse = value => {
    let strArr = value.match(/.{0,55}/) || [""];
    return value && strArr[0];
  };
  return (
    <div>
      <EditHeader />
      <form>
        <Field
          addClass={"full-input"}
          name="title"
          component={TextInput}
          label="Title"
          placeholder="The Best Homemade Pizza"
          normalize={capitalize}
          parse={titleParse}
        />
      </form>
    </div>
  );
};

export default reduxForm({
  form: "edit-recipe" // a unique identifier for this form
})(EditRecipe);
