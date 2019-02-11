import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addIngredient, subtractIngredient } from "../../../actions";

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
          <option value="">Select a unit</option>
          <option value="tsp">Teaspoon</option>
          <option value="tbsp">Tablespoon</option>
          <option value="floz">Fluid Ounce</option>
          <option value="c">Cup</option>
          <option value="pt">Pint</option>
          <option value="qt">Quart</option>
          <option value="gal">Gallon</option>
          <option value="lb">Pound</option>
          <option value="oz">Ounce</option>
          <option value="ml">Milliliter</option>
          <option value="l">Liter</option>
        </select>
      </div>
    );
  }

  // Renders all of the ingredient inputs i.e. unit, amount
  renderIngredient = key => {
    return (
      <div key={key} className="fields">
        <Field
          name={`ingredient-${key}.ingredient`}
          component={this.renderInput}
          label="Ingredient"
          placeholder="E.g. All Purpose Flour"
          classStyle="six wide"
        />
        <Field
          name={`ingredient-${key}.amount`}
          component={this.renderInput}
          label="Amount"
          placeholder="1-1/2"
          classStyle="two wide"
        />
        <Field
          name={`ingredient-${key}.unit`}
          component={this.renderDropDown}
          label="Unit of Measurement"
        />
        <div className="ui hidden divider" />
      </div>
    );
  };

  renderAllIngredients = () => {
    let ingredientInputs = [];
    for (let i = 0; i < this.props.numOfIngredients; i++) {
      ingredientInputs.push(this.renderIngredient(i));
    }
    return ingredientInputs;
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
        {this.renderAllIngredients()}
        <div className="ui hidden divider" />
        <div className="ui buttons">
          <button
            onClick={this.props.subtractIngredient}
            type="button"
            className="ui button"
          >
            Remove
          </button>
          <div className="or" />
          <button
            onClick={this.props.addIngredient}
            type="button"
            className="ui positive button"
          >
            Add Ingredient
          </button>
        </div>
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

const mapStateToProps = state => {
  return { numOfIngredients: state.numOfIngredients };
};

NewRecipe = connect(
  mapStateToProps,
  {
    addIngredient,
    subtractIngredient
  }
)(NewRecipe);

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  validate: validate
})(NewRecipe);
