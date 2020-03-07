import React from "react";
import classNames from "classnames";
import {
  Field,
  reduxForm,
  formValueSelector,
  getFormSyncErrors
} from "redux-form";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImageUpload from "../image_upload";
import Directions from "./directions";
import Categories from "./categories";
import Input from "../form_inputs/input";
import TextArea from "../form_inputs/textarea";
import {
  capitalize,
  titleParse,
  minuteParse,
  numberParse
} from "./utils/input-parse";

import { validate } from "./utils/recipe-validation";

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
        label="Title"
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

      <Field
        name="ingredients"
        className="recipe-upsert__ingredients"
        type="text"
        component={TextArea}
        label="Ingredients"
        placeholder="One ingredient per line"
      />

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
        {props.syncErrors.time && props.submitFailed && (
          <div className="validation-error">{props.syncErrors.time.hours}</div>
        )}
      </label>
      <Directions />
      <Field
        name="keywords"
        component={Input}
        label="Tags"
        placeholder="Tags (e.g., baked, crispy, healthy)"
      />

      <Categories
        categories={props.categories}
        change={props.change}
        errors={props.syncErrors}
        submitFailed={props.submitFailed}
      />
      <button
        className={classNames("recipe-upsert__sbmt-btn", {
          "recipe-upsert__sbmt-btn--disabled":
            Object.keys(props.syncErrors).length && props.submitFailed
        })}
        type="submit"
      >
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
  categories: selector(state, "categories"),
  syncErrors: getFormSyncErrors("newRecipe")(state)
});

export default reduxForm({
  form: "newRecipe",
  validate
})(withRouter(connect(mapSateToProps)(RecipeUpsert)));
