import React from "react";
import { reduxForm, getFormSyncErrors } from "redux-form";
import { connect } from "react-redux";

import KeywordInput from "./renderFields/KeywordInput";
import KeywordOutput from "./renderFields/KeywordOutput";

// import validation
import { ValidateKeywords } from "./RecipeValidation";

const TagAndSubmit = props => {
  const handleClick = e => {
    if (Object.keys(props.syncErrors).length) {
      e.preventDefault();
    }
  };
  return (
    <div>
      <KeywordInput change={props.change} />
      <KeywordOutput change={props.change} />

      <button
        onClick={handleClick}
        type="submit"
        style={{
          padding: ".5rem 3rem",
          backgroundColor: "#0172C4",
          border: "none",
          borderRadius: ".5rem",
          margin: "auto",
          color: "#fff",
          opacity: Object.keys(props.syncErrors).length ? ".5" : "1"
        }}
      >
        Submit Recipe
      </button>
    </div>
  );
};

const mapSateToProps = state => {
  return { syncErrors: getFormSyncErrors("newRecipe")(state) };
};

// export default reduxForm({
//   form: "newRecipe",
//   destroyOnUnmount: false,
//   validate: ValidateKeywords
// })(connect(mapSateToProps)(TagAndSubmit));
export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false
})(connect(mapSateToProps)(TagAndSubmit));
