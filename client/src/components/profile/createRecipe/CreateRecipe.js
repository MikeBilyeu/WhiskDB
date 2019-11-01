import React from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  change
} from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Action Creator
import { createRecipe } from "../../../actions/recipeActions";

// Components
import Header from "./Header";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import Categories from "./Categories";
import Keywords from "./Keywords";
import Input from "../../form-inputs/Input";

// Parse Functions
import { capitalize, titleParse } from "./input-parse";

import "./create-recipe-styles.css";

class CreateRecipe extends React.Component {
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

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  render() {
    return (
      <div>
        <Header onClick={this.props.history.goBack} />
        <form
          className="recipe-form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
          onKeyDown={this.handleKeyDown}
        >
          <Field
            name="title"
            component={Input}
            label="Title"
            placeholder="Juicy Roasted Chicken"
            normalize={capitalize}
            parse={titleParse}
          />
          <Field
            name="image"
            component={Input}
            type="file"
            accept="image/.jpg, image/.png, image/.jpeg"
          />
          <FieldArray name="ingredients" component={Ingredients} />
          <Directions />
          <Categories
            categories={this.props.categories}
            change={this.props.change}
          />
          <Keywords keywords={this.props.keywords} change={this.props.change} />
          <button type="submit">Save Recipe</button>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    auth: state.auth,
    keywords: selector(state, "keywords"),
    categories: selector(state, "categories")
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
    privateRecipe: false,
    categories: [],
    keywords: []
  }
})(withRouter(CreateRecipe));
