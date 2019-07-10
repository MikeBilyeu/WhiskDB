import React from "react";
import { Field, reduxForm } from "redux-form";

import ImageUpload from "./renderFields/ImageUpload";
import TextInput from "./inputs/TextInput";

const TitleAndImage = props => {
  return (
    <div>
      <Field
        addClass="full-input"
        name="title"
        component={TextInput}
        label="Title"
        placeholder="The Best Homemade Pizza"
        normalize={props.normalize}
        parse={props.parse}
      />

      <Field name="image" component={ImageUpload} />
    </div>
  );
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false
})(TitleAndImage);
