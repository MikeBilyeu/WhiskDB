import React from "react";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  change
} from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Categories from "./categories";
import Keywords from "./keywords";
import Input from "../form-inputs/input";
import Loading from "../loading";
import { capitalize, titleParse } from "./utils/input-parse";
import styles from "./recipe-upsert.module.scss";

const RecipeUpsert = props => {
  // onImageChange(event) {
  //   console.log(event.target.files[0]);
  // }

  const { isFetching } = props.recipeData;

  const handleKeyDown = e => {
    if (e.target.type !== "textarea" && e.key === "Enter") {
      e.preventDefault();
    }
  };

  // function handleChange(e) {
  //   console.log(e.target.files[0]);
  //   // const {
  //   //   input: { onChange }
  //   // } = thisprops;
  //   return e.target.files[0];
  // }

  // if (isFetching) {
  //   return <Loading />;
  // }
  return (
    <div>
      {props.header}
      {/*
        when componentmounts check if clipboard contains a url with
      navigator.clipboard.readText()
      change opacity and click if so
      create action that takes the url with

      function paste() {
  var pasteText = document.querySelector("#output");
  pasteText.focus();
  document.execCommand("paste");
  console.log(pasteText.textContent);
}

              -- or --

navigator.clipboard.readText().then(clipText =>
  document.getElementById("outbox").innerText = clipText)

  in action make axios request to /copy-recipe
  pass recipe url as param

  make request to the reicpe url and extract the html
  try the array of querySelectors
  (https://github.com/MikeBilyeu/RecipeFilter/blob/master/src/js/main.js)
  convert the html data for recipe to json
  responed with the recipe in json
  or responed with couldn't process any recipe data

      use custom input
      take a string
      onClick -> action send url to server
      check url on backend
      responed with recipe if found
      dispatch action saying recipe found
      populate form with recipe data
      */}
      <form
        action="#"
        className={styles.form}
        onKeyDown={handleKeyDown}
        onSubmit={props.handleSubmit(props.onSubmit)}
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
          {props.submitText}
        </button>
      </form>
    </div>
  );
};

RecipeUpsert.propTypes = {
  initialValues: PropTypes.object.isRequired,
  destroyOnUnmount: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => {
  return {
    recipeData: state.recipe,
    keywords: selector(state, "keywords"),
    categories: selector(state, "categories")
  };
};

export default reduxForm({
  form: "newRecipe"
})(withRouter(connect(mapSateToProps)(RecipeUpsert)));
