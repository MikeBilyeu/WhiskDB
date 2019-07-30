import React from "react";
import { Fields, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Arrow } from "../../recipes/arrowLeft.svg";

// Action Creator
import { createRecipe } from "../../../actions/recipeActions";

// Field Components
import CategoryInput from "./renderFields/CategoryInput";
import FormStatus from "./FormStatus";
import TitleAndImage from "./TitleAndImage";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import TimeServingsFootnote from "./TimeServingsFootnote";
import TagAndSubmit from "./TagAndSubmit";

import "./create-recipe-styles.css";

class CreateRecipe extends React.Component {
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

  handleClick = click => {
    this.setState(prevState => {
      return { page: prevState.page + click };
    });
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
      "categories.meal.breakfast",
      "categories.meal.lunch",
      "categories.meal.dinner",
      "categories.meal.appetizer",
      "categories.meal.dessert",
      "categories.meal.drink"
    ];

    let formPage = null;
    switch (this.state.page) {
      case 1:
        formPage = <TitleAndImage />;
        break;
      case 2:
        formPage = <Ingredients change={this.props.change} />;
        break;
      case 3:
        formPage = <Directions />;
        break;
      case 4:
        formPage = <TimeServingsFootnote />;
        break;
      case 5:
        formPage = <Fields names={categoryNames} component={CategoryInput} />;
        break;
      case 6:
        formPage = <TagAndSubmit />;
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
        <FormStatus handleClick={this.handleClick} page={this.state.page} />

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

CreateRecipe = connect(
  mapSateToProps,
  { createRecipe }
)(CreateRecipe);

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    ingredients: [],
    directions: [{}],
    privateRecipe: false,
    categories: { diet: {}, meal: {} }
  }
})(withRouter(CreateRecipe));
