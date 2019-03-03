import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import { Route } from "react-router-dom";

import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";

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

  // onPreviewClick() {
  //   console.log("Preview Page");
  // }

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
      "category.meal.dinner",
      "category.meal.appetizer",
      "category.meal.dessert",
      "category.meal.drink",
      "category.cusine.chinese",
      "category.cusine.indian",
      "category.cusine.italian",
      "category.cusine.mexican",
      "category.cusine.southern",
      "category.cusine.thia"
    ];
    return (
      <div style={{}} className="fluid column">
        <div className="ui form error">
          <div className="ui hidden divider" />
          <h1 className="ui dividing header centered">Create Recipe</h1>
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
            />
            <Field
              name="time.minutes"
              component={TextInput}
              label="Minutes"
              placeholder="15"
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
          <Link to="/profile/create-recipe/preview">
            <button className="ui button big blue">Preview Recipe</button>
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
    private: false
  },
  validate: validate
})(withRouter(EditNewRecipe));
