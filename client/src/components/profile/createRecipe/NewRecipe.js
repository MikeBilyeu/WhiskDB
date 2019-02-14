import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";

import RenderDropDown from "./RenderDropDown";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import IngredientInputs from "./IngredientInput";
import DirectionInput from "./DirectionInput";

class NewRecipe extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onFormSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <div
        style={{ borderRight: "solid grey 2px", overflowY: "scroll" }}
        className="eight wide column"
      >
        <form
          onSubmit={this.props.handleSubmit(this.onFormSubmit)}
          className="ui form error"
        >
          <div className="ui hidden divider" />
          <h1 className="ui dividing header">Create Recipe</h1>
          <div className="ui hidden divider" />
          <label htmlFor="imageFile" className="ui medium green button">
            <i className="ui upload icon" />
            Upload Recipe Image
          </label>
          <div className="ui hidden divider" />
          <Field
            name="title"
            component={TextInput}
            label="Recipe Title"
            placeholder="The Best Homemade Pizza"
          />
          <div className="ui hidden divider" />
          <Field
            name="servings"
            component={TextInput}
            label="Number of servings"
            placeholder="3"
            addClassName="five wide"
          />
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

          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Ingredients</h4>
          <div className="ui hidden divider" />
          <FieldArray name="Ingredients" component={IngredientInputs} />
          <div className="ui hidden divider" />

          <h4 className="ui dividing header">Directions</h4>
          <div className="ui hidden divider" />
          <FieldArray name="directions" component={DirectionInput} />
          <div className="ui hidden divider" />
          <div className="ui hidden divider" />
          <button className="ui button big blue" type="submit">
            Submit Recipe
          </button>
          <div className="ui hidden divider" />
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  return errors;
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: validate
})(NewRecipe);
