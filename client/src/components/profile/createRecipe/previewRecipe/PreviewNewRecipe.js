import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Action Creator
import { createRecipe } from "../../../../actions/recipeActions";

// Render Form values
import { RenderTitle } from "./renderFormValues/RenderTitle";
import { RenderImage } from "./renderFormValues/RenderImage";
import { RenderTime } from "./renderFormValues/RenderTime";
import { RenderServings } from "./renderFormValues/RenderServings";
import { RenderIngredients } from "./renderFormValues/RenderIngredients";
import { RenderDirections } from "./renderFormValues/RenderDirections";
import { RenderFootnote } from "./renderFormValues/RenderFootnote";

class PreviewNewRecipe extends React.Component {
  onRecipeSubmit = () => {
    // maybe get the created_by user id from the backend after it ahs been
    const newRecipe = {
      ...this.props.formValues,
      created_by: this.props.auth.user.user_id
    };
    console.log(newRecipe);
    // this.props.createRecipe(newRecipe, this.props.history);
  };
  render() {
    const values = this.props.formValues;

    if (values) {
      return (
        <div className="seven wide column">
          <div className="ui hidden divider" />
          <h1 className="ui dividing header center aligned">Preview Recipe</h1>
          <button
            className="ui button green fluid big blue"
            onClick={this.onRecipeSubmit}
          >
            Submit Recipe
          </button>
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
          <button
            className="ui button green fluid big blue"
            onClick={this.onRecipeSubmit}
          >
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
