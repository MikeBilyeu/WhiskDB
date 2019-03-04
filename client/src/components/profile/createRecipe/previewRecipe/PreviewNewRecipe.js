import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { createRecipe } from "../../../../actions/recipeActions";

//render Form values
import { RenderTitle } from "./renderFormValues/RenderTitle";
import { RenderImage } from "./renderFormValues/RenderImage";
import { RenderTime } from "./renderFormValues/RenderTime";
import { RenderServings } from "./renderFormValues/RenderServings";
import { RenderIngredients } from "./renderFormValues/RenderIngredients";
import { RenderDirections } from "./renderFormValues/RenderDirections";
import { RenderFootnote } from "./renderFormValues/RenderFootnote";

// onSubmit={this.props.handleSubmit(this.onFormSubmit)}

class PreviewNewRecipe extends React.Component {
  // onRecipeSubmit = () => {
  //   // maybe get the created_by user id from the backend after it ahs been sent
  //   const newRecipe = {
  //     ...values,
  //     created_by: props.auth.user.user_id
  //   };
  //   console.log("The New Recipe: ", newRecipe);
  //   // this.props.createRecipe(newRecipe, this.props.history);
  // };

  render() {
    const values = this.props.formValues;
    console.log(this.props);
    console.log(values);

    if (values) {
      return (
        <div className="seven wide column">
          <div className="ui hidden divider" />
          <h1 className="ui dividing header center aligned">Preview Recipe</h1>
          <div className="ui hidden divider" />
          <RenderTitle values={values} />
          <RenderImage values={values} />
          <div className="ui hidden divider" />
          <RenderTime values={values} />
          <RenderServings values={values} />
          <div className="ui hidden divider" />
          <RenderIngredients values={values} />
          <RenderDirections values={values} />
          <RenderFootnote values={values} />
          <div className="ui hidden divider" />
          <button className="ui button green fluid big blue">
            Submit Recipe
          </button>
        </div>
      );
    }
    //redirect to the create-recipe page if not valid input or vlaues
    return null;
  }
}

const mapSateToProps = state => {
  return {
    auth: state.auth,
    formValues: getFormValues("newRecipe")(state)
  };
};

export default connect(
  mapSateToProps,
  { createRecipe }
)(withRouter(PreviewNewRecipe));
