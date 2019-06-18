import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Action Creator
import { createRecipe } from "../../../../actions/recipeActions";

// Single Inputs
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import ToggleSwitch from "./inputs/ToggleSwitch";

// Field Components
import ImageUpload from "./renderFields/ImageUpload";
import IngredientInput from "./renderFields/IngredientInput";
import DirectionInput from "./renderFields/DirectionInput";
import CategoryInput from "./renderFields/CategoryInput";

// import validation
import { Validate } from "./RecipeValidation";

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

  handleSubmit = values => {
    const newRecipe = {
      ...values,
      created_by: this.props.auth.user.user_id
    };
    this.props.createRecipe(newRecipe, this.props.history);
  };

  // onImageChange(event) {
  //   console.log(event.target.files[0]);
  // }
  // handleSubmit = e => {
  //   // maybe get the created_by user id from the backend after it ahs been
  //   e.preventDefault();
  // };

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
      "categories.cuisine.chinese",
      "categories.cuisine.indian",
      "categories.cuisine.italian",
      "categories.cuisine.mexican",
      "categories.cuiisine.southern",
      "categories.cuisine.thai",
      "categories.cuisine.other"
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
      <div>
        <h1 className="ui dividing header centered">Create Recipe</h1>

        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            name="title"
            component={TextInput}
            label="Recipe Title"
            placeholder="The Best Homemade Pizza"
            normalize={capitalize}
            parse={titleParse}
          />

          <Field name="image" component={ImageUpload} />

          <h4 className="ui dividing header">Time Required</h4>

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

          <h4 className="ui dividing header">Servings</h4>
          <Field
            name="servings"
            component={TextInput}
            label="Number of servings"
            placeholder="2"
            addClass="four wide"
            parse={numberParse}
          />

          <h4 className="ui dividing header">Ingredients</h4>

          <FieldArray name="ingredients" component={IngredientInput} />

          <h4 className="ui dividing header">Directions</h4>

          <FieldArray name="directions" component={DirectionInput} />

          <h4>Footnotes/Tips</h4>

          <Field
            name="footnote"
            component={TextAreaInput}
            label="Note"
            placeholder="Add lemon juice for more flavor"
            parse={footnoteParse}
          />

          <Field
            name="privateRecipe"
            label="Private Recipe"
            component={ToggleSwitch}
          />

          <h4>Categories</h4>
          <Fields names={categoryNames} component={CategoryInput} />

          <button type="submit" className="ui button big blue fluid">
            Submit Recipe
          </button>
        </form>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    auth: state.auth
  };
};

EditNewRecipe = connect(
  mapSateToProps,
  { createRecipe }
)(EditNewRecipe);

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [{}, {}],
    directions: [{}],
    privateRecipe: false,
    categories: { diet: {}, meal: {}, cuisine: {} }
  },
  validate: Validate
})(withRouter(EditNewRecipe));
