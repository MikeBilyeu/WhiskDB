import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";

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

  renderInput = ({ input, label, meta, placeholder, classStyle }) => {
    const className = `field ${classStyle} ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    );
  };

  //Drop down select
  renderDropDown(formProps) {
    return (
      <div className="four wide field">
        <label>Unit of Measurement</label>
        <select
          className="ui fluid dropdown"
          onChange={formProps.input.onChange}
          value={formProps.input.value}
        >
          <option value="">None</option>
          <option disabled>———Volume———</option>
          <option value="teaspoon">Teaspoon</option>
          <option value="tablespoon">Tablespoon</option>
          <option value="fluid_ounce">Fluid Ounce</option>
          <option value="gill">Gill</option>
          <option value="cup">Cup</option>
          <option value="pint">Pint</option>
          <option value="quart">Quart</option>
          <option value="gallon">Gallon</option>
          <option value="milliliter">Milliliter</option>
          <option value="liter">Liter</option>
          <option value="deciliter">Deciliter</option>
          <option disabled>———Approximate———</option>
          <option value="smidgen">Smidgen</option>
          <option value="pinch">Pinch</option>
          <option value="dash">Dash</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option disabled>———Mass & Weight———</option>
          <option value="pound">Pound</option>
          <option value="ounce">Ounce</option>
          <option value="milligram">Milligram</option>
          <option value="gram">Gram</option>
          <option value="kilogram">Kilogram</option>
        </select>
      </div>
    );
  }

  // Renders all of the ingredient fields i.e. ingredient, unit, amount
  renderIngredients = ({ fields, meta: { touched, error } }) => {
    return (
      <div>
        {fields.map((ingredient, index) => (
          <div key={index}>
            <div className="ui hidden divider" />
            <div className="fields">
              <Field
                name={`${ingredient}.ingredient`}
                component={this.renderInput}
                label={`Ingredient ${index + 1}`}
                placeholder="E.g. Red Bell Pepper"
                classStyle="four wide"
              />
              <Field
                name={`${ingredient}.amount`}
                component={this.renderInput}
                label="Amount"
                placeholder="1 1/2"
                classStyle="two wide"
              />
              <Field
                name={`${ingredient}.unit`}
                component={this.renderDropDown}
                label="Unit of Measurement"
              />
              <Field
                name={`${ingredient}.prep`}
                component={this.renderInput}
                label="Cut/Prep"
                placeholder="Diced"
                classStyle="three wide"
              />
              <div className="ui buttons">
                <button
                  className="ui button"
                  type="button"
                  title="Remove"
                  onClick={() => fields.remove(index)}
                >
                  Remove
                </button>
              </div>
              <div className="ui hidden divider" />
            </div>
            <div className="ui hidden divider" />
          </div>
        ))}
        <div className="ui buttons">
          <button
            className="ui positive button"
            type="button"
            onClick={() => fields.push({})}
          >
            Add Ingredient
          </button>
        </div>
      </div>
    );
  };

  renderTextArea({ input, label, placeholder }) {
    return (
      <div className="field twelve wide">
        <label>{label}</label>
        <textarea
          {...input}
          placeholder={placeholder}
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
        <Field
          name="title"
          component={this.renderInput}
          label="Title"
          placeholder="Recipe Title"
        />
        <h4 className="ui dividing header">Ingredients</h4>
        <div className="ui hidden divider" />
        <FieldArray name="allIngredients" component={this.renderIngredients} />
        <div className="ui hidden divider" />

        <Field
          name="servings"
          component={this.renderInput}
          label="Servgins"
          placeholder="Serving Size"
        />
        <h5>Directions</h5>
        <Field
          name="directions-1"
          component={this.renderTextArea}
          label="Step"
          placeholder="Directions..."
        />
        <div className="ui buttons">
          <button type="button" className="ui button">
            Remove
          </button>
          <div className="or" />
          <button type="button" className="ui positive button">
            Add Step
          </button>
        </div>
        <Field
          name="tips"
          component={this.renderTextArea}
          label="Tips"
          placeholder="Any extra tips?"
        />
        <Field
          name="time"
          component={this.renderInput}
          label="Time"
          placeholder="minutes"
        />
        <Field
          name="imageURL"
          component={this.renderInput}
          label="Image URL"
          placeholder="Image URL"
        />
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
  destroyOnUnmount: false,
  validate: validate
})(NewRecipe);
