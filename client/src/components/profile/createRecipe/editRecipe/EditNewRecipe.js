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
    const minuteLimit = value => {
      if (value && !isNaN(value)) {
        return value.charAt(0) > 5 || value.charAt(0) < 1
          ? null
          : value.length > 2
          ? value.substring(0, 2)
          : value;
      }
      return null;
    };
    const numberLimit = value => {
      return value && !isNaN(value)
        ? value.charAt(0) < 1
          ? null
          : value.length > 2
          ? value.substring(0, 2)
          : value
        : null;
    };
    return (
      <div className="fluid column">
        <div className="ui form error">
          <div className="ui hidden divider" />
          <h1 className="ui dividing header centered">Create Recipe</h1>
          <div className="ui hidden divider" />
          <Field
            name="title"
            component={TextInput}
            label="Recipe Title"
            placeholder="The Best Homemade Pizza"
            normalize={capitalize}
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
              normalize={numberLimit}
            />
            <Field
              name="time.minutes"
              component={TextInput}
              label="Minutes"
              placeholder="15"
              normalize={minuteLimit}
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
            normalize={numberLimit}
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
          <Link to="/profile/create-recipe/preview">
            <div className="ui animated button big blue fluid" tabIndex="0">
              <div className="visible content">Preview Recipe</div>
              <div className="hidden content">
                <i className="right arrow icon" />
              </div>
            </div>
          </Link>

          <div className="ui hidden divider" />
          <div className="ui hidden divider" />
        </div>
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

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [{}],
    directions: [{}],
    privateRecipe: false,
    categories: {}
  },
  validate: validate
})(withRouter(EditNewRecipe));
