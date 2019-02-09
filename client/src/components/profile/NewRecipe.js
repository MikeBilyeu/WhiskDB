import React from "react";
import { Field, reduxForm } from "redux-form";
import InputField from "../InputField";

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
  renderInput = ({ input, label, meta }) => {
    const className = `field twelve wide ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={label} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea({ input, label }) {
    return (
      <div className="field twelve wide">
        <label>{label}</label>
        <textarea
          {...input}
          placeholder={label}
          style={{ marginTop: "0px", marginBottom: "0px", height: "115px" }}
        />
      </div>
    );
  }

  onFormSubmit(formValues) {
    console.log(formValues);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form error"
      >
        <h2 className="ui header">Create Recipe</h2>
        <Field name="title" component={this.renderInput} label="Recipe Title" />
        <Field
          name="ingredient"
          component={this.renderInput}
          label="Ingredient"
        />
        <Field
          name="ingredient"
          component={this.renderInput}
          label="Ingredient"
        />
        <Field
          name="ingredient"
          component={this.renderInput}
          label="Ingredient"
        />
        <div className="ui buttons">
          <button type="button" className="ui button">
            Remove
          </button>
          <div className="or" />
          <button type="button" className="ui positive button">
            Add Ingredient
          </button>
        </div>
        <Field name="servings" component={this.renderInput} label="Servgins" />
        <Field
          name="directions"
          component={this.renderTextArea}
          label="Directions"
        />
        <Field name="tips" component={this.renderTextArea} label="Tips" />
        <Field name="time" component={this.renderInput} label="Time" />
        <Field name="imageURL" component={this.renderInput} label="Image URL" />
        <button className="ui button" type="submit">
          Submit Recipe
        </button>
      </form>
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
  validate: validate
})(NewRecipe);
