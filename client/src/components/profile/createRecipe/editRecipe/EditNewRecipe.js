import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Single Inputs
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import ToggleSwitch from "./inputs/ToggleSwitch";

// Field Components
import ImageUpload from "./renderFields/ImageUpload";
import IngredientInput from "./renderFields/IngredientInput";
import DirectionInput from "./renderFields/DirectionInput";
import CategoryInput from "./renderFields/CategoryInput";

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

  onImageChange(event) {
    console.log(event.target.files[0]);
  }
  handleSubmit = e => {
    // maybe get the created_by user id from the backend after it ahs been
    e.preventDefault();
  };

  render() {
    const categoryNames = [
      "categories.diet.vegetarian",
      "categories.diet.vegan",
      "categories.diet.nonvegetarian",
      "categories.meal.breakfast",
      "categories.meal.lunch",
      "categories.meal.dinner",
      "categories.meal.appetizer",
      "categories.meal.dessert",
      "categories.meal.drink",
      "categories.cusine.chinese",
      "categories.cusine.indian",
      "categories.cusine.italian",
      "categories.cusine.mexican",
      "categories.cusine.southern",
      "categories.cusine.thia"
    ];
    const capitalize = value => {
      return (
        value &&
        value
          .toLowerCase()
          .split(" ")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
      );
    };
    const titleParse = value => {
      let strArr = value.match(/[\w -]{0,55}/) || [""];
      return value && strArr[0];
    };
    const minuteParse = value => {
      let strArr = value.match(/^[1-5][\d]?/) || [""];
      return value && strArr[0];
    };
    const numberParse = value => {
      let strArr = value.match(/^[1-9][\d]?/) || [""];
      return value && strArr[0];
    };
    const footnoteParse = value => {
      let strArr = value.match(/[\w -]{0,455}/) || [""];
      return value && strArr[0];
    };
    return (
      <div className="fluid column">
        <div className="ui form error">
          <div className="ui hidden divider" />
          <h1 className="ui dividing header centered">Create Recipe</h1>
          <div className="ui hidden divider" />
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <Field
              name="title"
              component={TextInput}
              label="Recipe Title"
              placeholder="The Best Homemade Pizza"
              normalize={capitalize}
              parse={titleParse}
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
                normalize={numberParse}
              />
              <Field
                name="time.minutes"
                component={TextInput}
                label="Minutes"
                placeholder="15"
                parse={minuteParse}
              />
            </div>
            <div className="ui divider" />
            <div className="ui hidden divider" />
            <h4 className="ui dividing header">Servings</h4>
            <Field
              name="servings"
              component={TextInput}
              label="Number of servings"
              placeholder="3"
              addClass="four wide"
              parse={numberParse}
            />

            <div className="ui hidden divider" />
            <h4 className="ui dividing header">Ingredients</h4>
            <div className="ui hidden divider" />
            <FieldArray name="ingredients" component={IngredientInput} />
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
                parse={footnoteParse}
              />
              <div className="ui hidden divider" />
              <Field
                name="privateRecipe"
                label="Private Recipe"
                component={ToggleSwitch}
              />
            </div>
            <div className="ui hidden divider" />
            <h4 className="ui dividing header">Categories</h4>
            <Fields names={categoryNames} component={CategoryInput} />
            <div className="ui hidden divider" />

            <button
              type="submit"
              className="ui animated button big blue fluid"
              tabIndex="0"
            >
              <div className="visible content">Preview Recipe</div>
              <div className="hidden content">
                <i className="right arrow icon" />
              </div>
            </button>

            <div className="ui hidden divider" />
            <div className="ui hidden divider" />
          </form>
        </div>
      </div>
    );
  }
}
// validate on client side for better ux
const validate = formValues => {
  const errors = {};
  // store regex to check validation
  const titleRegEx = /^[A-Z]{1}((\s)?[a-zA-Z0-9\(\)])+$/;
  const amountRegEx = /^\d{0,3}(\.\d{1,2}|(?<=\d)\/\d{1,2}|(?<=\d) \d{0,2}((?<! )\/)(?<!\d)\d{1,2})?$/;
  const ingredientNameRegEx = /^[A-Z0-9][\w ]{2,255}$/;

  // Keep Recipe form inputs consistant w/ validation

  // Title validation
  if (!formValues.title) {
    errors.title = "Title field is required";
  } else if (!titleRegEx.test(formValues.title)) {
    errors.title = "Title is not valid";
  }
  // Time validation
  if (!formValues.time) {
    errors.time = {
      hours: "Time field is required",
      minutes: "Time field is required"
    };
  } else if (formValues.time.hours && isNaN(formValues.time.hours)) {
    errors.time = { hours: "Time field is required" };
  } else if (formValues.time.minutes && isNaN(formValues.time.minutes)) {
    errors.time = { minutes: "Time field is required" };
  }
  // Servings validation
  if (!formValues.servings) {
    errors.servings = "Servings field is required";
  } else if (isNaN(formValues.servings)) {
    errors.servings = "Servings is not valid";
  }

  // Making sure user enters two or more ingredients for the recipe
  if (formValues.ingredients && formValues.ingredients.length <= 1) {
    errors.ingredients = "Must add more ingredients";
  } else if (formValues.ingredients && formValues.ingredients.length > 1) {
    errors.ingredients = [];
    // Loop through ingredients array to validate each ingredient object
    for (let i = 0; i < formValues.ingredients.length; i++) {
      errors.ingredients.push({});
      // validate user enters an amount and ingredient name
      if (!formValues.ingredients[i].amount) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          amount: `Ingredient ${i +
            1} must contain an amount and ingredient name`
        };
      } else if (!amountRegEx.test(formValues.ingredients[i].amount)) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          amount: "Ingredient amount is not valid"
        };
      }
      if (!formValues.ingredients[i].ingredient) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          ingredient: `Ingredient ${i +
            1} must contain an amount and ingredient name`
        };
      } else if (
        !ingredientNameRegEx.test(formValues.ingredients[i].ingredient)
      ) {
        errors.ingredients[i] = {
          ...errors.ingredients[i],
          ingredient: `Ingredient ${i + 1} ingredient name is not valid`
        };
      }
    }
  }

  return errors;
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [{}, {}],
    directions: [{}],
    privateRecipe: false,
    categories: {}
  },
  validate: validate
})(withRouter(EditNewRecipe));
