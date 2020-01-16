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
import ImageUpload from "./image";
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

        <Field name="image" component={ImageUpload} />

        <Ingredients />
        <Directions />
        <Keywords keywords={props.keywords} change={props.change} />
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
