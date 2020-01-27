import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageUpload from "../image-upload";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Categories from "./categories";
import Keywords from "./keywords";
import Input from "../form-inputs/input";
import { capitalize, titleParse } from "./utils/input-parse";
import styles from "./recipe-upsert.module.scss";

const RecipeUpsert = props => {
  const handleKeyDown = e => {
    if (e.target.type !== "textarea" && e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div>
      {props.header}
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

        <Field
          name="image_url"
          className="imageInput"
          component={ImageUpload}
        />

        <Ingredients />
        <Directions />
        <Field
          name="keywords"
          className={styles.keywordsContainer}
          component={Keywords}
        />
        <Categories categories={props.categories} change={props.change} />
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
