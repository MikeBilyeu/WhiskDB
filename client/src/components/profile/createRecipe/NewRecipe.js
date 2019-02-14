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

  renderInput = ({
    input,
    label,
    meta,
    placeholder,
    type = "text",
    addClass
  }) => {
    const className = `field ${addClass} ${
      meta.error && meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  //Drop down select
  renderDropDown(formProps) {
    return (
      <div className="field">
        <label>Unit</label>
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
          <option value="drop">Drop</option>
          <option value="smidgen">Smidgen</option>
          <option value="pinch">Pinch</option>
          <option value="dash">Dash</option>
          <option value="handful">Handful</option>
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
              />
              <Field
                name={`${ingredient}.amount`}
                component={this.renderInput}
                label="Amount"
                placeholder="1 1/2"
              />
              <Field
                name={`${ingredient}.unit`}
                component={this.renderDropDown}
              />
              <Field
                name={`${ingredient}.prep`}
                component={this.renderInput}
                label="Cut/Prep"
                placeholder="Diced"
              />
            </div>
            <div className="ui divider" />
          </div>
        ))}
        <div className="ui large buttons">
          <button
            className="ui button negative"
            type="button"
            onClick={() => fields.remove(fields.length - 1)}
          >
            remove
          </button>
          <div className="or" />
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

  // Dynamiclly render timers for each step
  renderTimer = ({ fields, step }) => {
    return (
      <div>
        {fields.map((timer, index) => {
          return (
            <div key={index}>
              <div className="ui hidden divider" />
              <h5 className="ui dividing header">Timer for step {step}</h5>
              <div className="fields">
                <Field
                  name={`${timer}.hour`}
                  component={this.renderInput}
                  label="Hours"
                  placeholder="1"
                />
                <Field
                  name={`${timer}.minute`}
                  component={this.renderInput}
                  label="Minutes"
                  placeholder="15"
                />
              </div>
            </div>
          );
        })}
        <div className="ui small buttons">
          <button
            className="ui button"
            type="button"
            onClick={() => fields.remove(fields.length - 1)}
          >
            remove
          </button>
          <div className="or" />
          <button
            className="ui yellow button"
            type="button"
            onClick={() => fields.push({})}
          >
            Add Timer
          </button>
        </div>

        <div className="ui hidden divider" />
      </div>
    );
  };

  // Renders all steps of directions
  renderDirections = ({ fields, meta: { touched, error } }) => {
    return (
      <div>
        {fields.map((step, index) => (
          <div key={index}>
            <div className="ui hidden divider" />
            <div className="field">
              <Field
                name={`${step}.step`}
                component={this.renderTextArea}
                label={`Step ${index + 1}`}
                placeholder="Set oven to 375(f)..."
              />
              <div className="ui hidden divider" />
              <Field
                name={`${step}.tip`}
                component={this.renderInput}
                label="Tip"
                placeholder="Cover hands in flour to prevent sticky fingers"
              />
              <FieldArray
                name={`${step}.timer`}
                step={index + 1}
                component={this.renderTimer}
              />
              <div className="ui hidden divider" />
            </div>
            <div className="ui divider" />
          </div>
        ))}
        <div className="ui large buttons">
          <button
            className="ui button negative"
            type="button"
            onClick={() => fields.remove(fields.length - 1)}
          >
            remove
          </button>
          <div className="or" />
          <button
            className="ui positive button"
            type="button"
            onClick={() => fields.push({})}
          >
            Add Step
          </button>
        </div>
      </div>
    );
  };

  renderTextArea({ input, label, placeholder }) {
    return (
      <div className="field">
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
            component={this.renderInput}
            label="Recipe Title"
            placeholder="The Best Homemade Pizza"
          />
          <div className="ui hidden divider" />
          <Field
            name="servings"
            component={this.renderInput}
            label="Number of servings"
            placeholder="3"
            addClassName="five wide"
          />
          <div className="ui hidden divider" />

          <h4 className="ui dividing header">Time Required</h4>
          <div className="fields">
            <Field
              name="time.hours"
              component={this.renderInput}
              label="Hours"
              placeholder="1"
              classStyle="eight wide"
            />
            <Field
              name="time.minutes"
              component={this.renderInput}
              label="Minutes"
              placeholder="15"
              classStyle="eight wide"
            />
          </div>

          <div className="ui hidden divider" />
          <h4 className="ui dividing header">Ingredients</h4>
          <div className="ui hidden divider" />
          <FieldArray
            name="allIngredients"
            component={this.renderIngredients}
          />
          <div className="ui hidden divider" />

          <h4 className="ui dividing header">Directions</h4>
          <div className="ui hidden divider" />
          <FieldArray name="directions" component={this.renderDirections} />
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
