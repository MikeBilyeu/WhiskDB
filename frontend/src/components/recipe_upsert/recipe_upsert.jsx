import React from "react";
import classNames from "classnames";
import {
  Field,
  reduxForm,
  formValueSelector,
  getFormSyncErrors
} from "redux-form";
import PropTypes from "prop-types";
import { compose } from "redux";
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
import { deleteRecipe } from "../../actions/recipe";

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
      onSubmit={props.handleSubmit}
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

      <fieldset className="ru-time">
        <legend>Time</legend>
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
        {props.formSyncErrors.time && props.submitFailed && (
          <div className="validation-error">
            {props.formSyncErrors.time.hours}
          </div>
        )}
      </fieldset>
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
        errors={props.formSyncErrors}
        submitFailed={props.submitFailed}
      />
      <button
        disabled={props.submitting}
        className={classNames("recipe-upsert__sbmt-btn", {
          "recipe-upsert__sbmt-btn--disabled":
            Object.keys(props.formSyncErrors).length && props.submitFailed,
          "recipe-upsert__sbmt-btn--success": props.submitting
        })}
        type="submit"
      >
        {props.submitting ? "Saving..." : props.submitText}
      </button>
      {props.form === "recipe-upsert" && (
        <button
          disabled={props.submitting}
          onClick={e => {
            e.preventDefault();
            props
              .deleteRecipe(props.initialValues.recipe_id)
              .then(props.goBack)
              .catch(err => console.error(err));
          }}
          className="recipe-upsert__delete-btn"
        >
          Delete Recipe
        </button>
      )}
    </form>
  );
};

RecipeUpsert.propTypes = {
  initialValues: PropTypes.object.isRequired,
  destroyOnUnmount: PropTypes.bool,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: formValueSelector(ownProps.form)(state, "categories"),
    formSyncErrors: getFormSyncErrors(ownProps.form)(state)
  };
};

export default compose(
  reduxForm({ validate }),
  connect(
    mapStateToProps,
    { deleteRecipe }
  )
)(RecipeUpsert);
