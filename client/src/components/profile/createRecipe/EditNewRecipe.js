import React from "react";
import { Field, FieldArray, Fields, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Arrow } from "../../recipes/arrowLeft.svg";

// Action Creator
import { createRecipe } from "../../../actions/recipeActions";

// Single Inputs
import TextInput from "./inputs/TextInput";
import TextAreaInput from "./inputs/TextAreaInput";
import ToggleSwitch from "./inputs/ToggleSwitch";

// Field Components
import ImageUpload from "./renderFields/ImageUpload";
import IngredientInput from "./renderFields/IngredientInput";
import DirectionInput from "./renderFields/DirectionInput";
import CategoryInput from "./renderFields/CategoryInput";

import TitleAndImage from "./TitleAndImage";

// import validation
import { Validate } from "./RecipeValidation";

import "./create-recipe-styles.css";

class EditNewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return <div>{error}</div>;
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
      "categories.diet.none",
      "categories.diet.vegetarian",
      "categories.diet.vegan",
      "categories.meal.breakfast",
      "categories.meal.lunch",
      "categories.meal.dinner",
      "categories.meal.appetizer",
      "categories.meal.dessert",
      "categories.meal.drink"
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

    let formPage = null;
    switch (this.state.page) {
      case 1:
        formPage = <TitleAndImage normalize={capitalize} parse={titleParse} />;
        break;
      case 2:
        formPage = (
          <div>
            <h4>Ingredients</h4>

            <FieldArray name="ingredients" component={IngredientInput} />
          </div>
        );
        break;
      case 3:
        formPage = (
          <div>
            {" "}
            <h4>Directions</h4>
            <FieldArray name="directions" component={DirectionInput} />
          </div>
        );
        break;
      case 4:
        formPage = (
          <div>
            <Field
              name="servings"
              component={TextInput}
              label="Servings"
              placeholder="2"
              addClass="cr-servings"
              parse={numberParse}
              type="number"
              pattern="[0-9]*"
            />

            <h4>Time Required</h4>
            <Field
              name="time.hours"
              component={TextInput}
              label="Hours"
              placeholder="1"
              normalize={numberParse}
              pattern="[0-9]*"
            />
            <Field
              name="time.minutes"
              component={TextInput}
              label="Minutes"
              placeholder="15"
              parse={minuteParse}
              pattern="[0-9]*"
            />

            <Field
              name="footnote"
              component={TextAreaInput}
              label="Footnote"
              placeholder="Add lemon juice for more flavor"
              parse={footnoteParse}
            />
          </div>
        );
        break;
      case 5:
        formPage = <Fields names={categoryNames} component={CategoryInput} />;
        break;
      case 6:
        formPage = <button type="submit">Submit Recipe</button>;
        break;
      default:
        formPage = null;
    }
    return (
      <div>
        <div className="cr-header">
          <Arrow
            className="back-btn"
            onClick={() => this.props.history.goBack()}
          />
          <h1>Create Recipe</h1>
        </div>

        <form
          className="recipe-form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          {formPage}
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
    ingredients: [{}],
    directions: [{}],
    privateRecipe: false,
    categories: { diet: {}, meal: {} }
  },
  validate: Validate
})(withRouter(EditNewRecipe));
