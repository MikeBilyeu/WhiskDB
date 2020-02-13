import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageUpload from "../image_upload";
import Ingredients from "./ingredients";
import Directions from "./directions";
import Categories from "./categories";
import Input from "../form_inputs/input";
import {
  capitalize,
  titleParse,
  minuteParse,
  numberParse
} from "./utils/input-parse";

import "./recipe_upsert.scss";

const RecipeUpsert = props => {
  const handleKeyDown = e => {
    if (e.target.type !== "textarea" && e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <form
      action="#"
      className="recipe-upsert"
      onKeyDown={handleKeyDown}
      onSubmit={props.handleSubmit(props.onSubmit)}
    >
      <Field
        name="title"
        className="recipe-upsert__title"
        component={Input}
        label="Name"
        placeholder="Juicy Roasted Chicken"
        normalize={capitalize}
        parse={titleParse}
      />

      <Field name="image_url" className="ru-image" component={ImageUpload} />
      <Field
        name="servings"
        component={Input}
        label="Yield"
        placeholder="2"
        type="number"
        pattern="[0-9]*"
        normalize={numberParse}
        className="recipe-upsert__yield"
      />

      <Ingredients />
      <label className="ru-time">
        Time
        <div className="ru-time__border">
          <Field
            name="time.hours"
            component={Input}
            label="Hr"
            placeholder="1"
            normalize={numberParse}
            pattern="[0-9]*"
            className="ru-time__hours"
          />
          <Field
            name="time.minutes"
            component={Input}
            label="Min"
            placeholder="15"
            normalize={minuteParse}
            pattern="[0-9]*"
            className="ru-time__minutes"
          />
        </div>
      </label>
      <Directions />
      <Field
        name="keywords"
        component={Input}
        label="Tags"
        placeholder="Tags (e.g., baked, crunchy, healthy)"
      />

      <Categories categories={props.categories} change={props.change} />
      <button className="recipe-upsert__sbmt-btn" type="submit">
        {props.submitText}
      </button>
    </form>
  );
};

RecipeUpsert.propTypes = {
  initialValues: PropTypes.object.isRequired,
  destroyOnUnmount: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector("newRecipe");

const mapSateToProps = state => ({
  recipeData: state.recipe,
  keywords: selector(state, "keywords"),
  categories: selector(state, "categories")
});

export default reduxForm({
  form: "newRecipe"
})(withRouter(connect(mapSateToProps)(RecipeUpsert)));
