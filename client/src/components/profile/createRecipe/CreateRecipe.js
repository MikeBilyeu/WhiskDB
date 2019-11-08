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

// Styles
import styles from "./create-recipe-styles.module.scss";

const CreateRecipe = props => {
  const handleSubmit = values => {
    const newRecipe = {
      ...values,
      created_by: props.auth.user.user_id
    };
    props.createRecipe(newRecipe, props.history);
  };

  // onImageChange(event) {
  //   console.log(event.target.files[0]);
  // }
  // handleSubmit = e => {
  //   // maybe get the created_by user id from the backend after it ahs been
  //   e.preventDefault();
  // };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  function handleChange(e) {
    console.log(e.target.files[0]);
    // const {
    //   input: { onChange }
    // } = thisprops;
    return e.target.files[0];
  }
  return (
    <div>
      <Header
        onBackClick={props.history.goBack}
        onSaveClick={props.handleSubmit(handleSubmit)}
      />
      <form
        className={styles.form}
        onSubmit={props.handleSubmit(handleSubmit)}
        onKeyDown={handleKeyDown}
      >
        <Field
          name="title"
          className={styles.title}
          component={Input}
          label="Title"
          placeholder="Juicy Roasted Chicken"
          normalize={capitalize}
          parse={titleParse}
        />
        {/*<Field
          input={{ onChange: handleChange }}
          name="image"
          className="cr-image"
          component={Input}
          type="file"
          accept="image/.jpg, image/.png, image/.jpeg"
        />*/}
        <FieldArray name="ingredients" component={Ingredients} />
        <Directions />
        <Categories categories={props.categories} change={props.change} />
        <Keywords keywords={props.keywords} change={props.change} />
        <button className={styles.submitBtn} type="submit">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    auth: state.auth,
    keywords: selector(state, "keywords"),
    categories: selector(state, "categories")
  };
};

export default reduxForm({
  form: "newRecipe",
  destroyOnUnmount: false,
  initialValues: {
    privateRecipe: false,
    categories: [],
    keywords: []
  }
})(
  withRouter(
    connect(
      mapSateToProps,
      { createRecipe }
    )(CreateRecipe)
  )
);
