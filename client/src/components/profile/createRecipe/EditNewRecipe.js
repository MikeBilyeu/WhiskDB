import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";

import { withRouter } from "react-router-dom";

import { createRecipe } from "../../../actions/recipeActions";

import { connect } from "react-redux";

import TextInput from "./inputs/TextInput";
import IngredientInputs from "./IngredientInput";
import DirectionInput from "./DirectionInput";
import CategoryInput from "./CategoryInput";
import ImageUpload from "./ImageUpload";
import TextAreaInput from "./inputs/TextAreaInput";
import ToggleSwitch from "./inputs/ToggleSwitch";

class EditNewRecipe extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onFormSubmit = formValues => {
    console.log(formValues);
    const newRecipe = {
      ...formValues,
      created_by: this.props.auth.user.id
    };

    this.props.createRecipe(newRecipe, this.props.history);
  };

  onImageChange(event) {
    console.log(event.target.files[0]);
  }

  render() {
    const categoryNames = [
      "category.diet.vegetarian",
      "category.diet.vegan",
      "category.diet.nonVegetarian",
      "category.meal.breakfast",
      "category.meal.lunch",
      "category.meal.dinner"
    ];
    return (
      <div
        style={{
          borderRight: "solid grey 2px",
          height: "calc(100% - 8.5rem)",
          position: "fixed",
          overflowY: "scroll"
        }}
        className="nine wide column"
      >
        <form
          onSubmit={this.props.handleSubmit(this.onFormSubmit)}
          className="ui form error"
        >
          <div className="ui hidden divider" />
          <h1 className="ui dividing header">Create Recipe</h1>
          <div className="ui hidden divider" />
          <Field
            name="title"
            component={TextInput}
            label="Recipe Title"
            placeholder="The Best Homemade Pizza"
          />
          <div className="ui hidden divider" />
          <Field name="image" component={ImageUpload} />
          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Time Required</h4>
          <div className="fields">
            <Field
              name="time.hours"
              component={TextInput}
              label="Hours"
              placeholder="1"
              classStyle="eight wide"
            />
            <Field
              name="time.minutes"
              component={TextInput}
              label="Minutes"
              placeholder="15"
              classStyle="eight wide"
            />
          </div>
          <div className="ui divider" />
          <div className="ui hidden divider" />

          <Field
            name="servings"
            component={TextInput}
            label="Number of servings"
            placeholder="3"
            addclassName="three wide"
          />

          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Ingredients</h4>
          <div className="ui hidden divider" />
          <FieldArray name="ingredients" component={IngredientInputs} />
          <div className="ui hidden divider" />

          <h4 className="ui dividing header">Directions</h4>
          <div className="ui hidden divider" />
          <FieldArray name="directions" component={DirectionInput} />
          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Footnotes/Tips</h4>
          <div className="field">
            <Field
              name="footnote"
              component={TextAreaInput}
              label="Note"
              placeholder="Add lemon juice for more flavor"
            />
            <div className="ui hidden divider" />
            <Field
              name="private"
              label="Private Recipe"
              component={ToggleSwitch}
            />
          </div>
          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Categories</h4>
          <Fields names={categoryNames} component={CategoryInput} />
          <div className="ui hidden divider" />

          <button className="ui button big blue" type="submit">
            Submit Recipe
          </button>
          <div className="ui hidden divider" />
          <div className="ui hidden divider" />
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  // if (!formValues.title) {
  //   errors.title = "You must enter a title";
  // }
  return errors;
};
const mapStateToProps = state => ({
  auth: state.auth
});

EditNewRecipe = connect(
  mapStateToProps,
  { createRecipe }
)(withRouter(EditNewRecipe));

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [{}],
    directions: [{}],
    private: false
  },
  validate: validate
})(EditNewRecipe);
