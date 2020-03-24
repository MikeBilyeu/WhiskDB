import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { reduxForm, isDirty } from "redux-form";
import {
  getRecipe,
  submitEditRecipe,
  toggleEditRecipe
} from "../../../actions/recipe";
import convertTime from "../../../selectors/time-selector";
import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import RecipeUpsert from "../../recipe_upsert";
import Loading from "../../loading";
import "./recipe-edit.scss";

const Edit = props => {
  const handleSubmit = values => {
    props.submitEditRecipe(values);
  };

  let { isFetching, recipe } = props.recipeData;
  const ingredientsStr = recipe.ingredients.join("\n");
  const keywordsStr = recipe.keywords.join(", ");

  const initialValues = {
    ...recipe,
    time: props.recipeTime,
    ingredients: ingredientsStr,
    keywords: keywordsStr
  };
  console.log("Recipe Data:", initialValues);

  return isFetching ? (
    <Loading />
  ) : (
    <div className="edit-recipe">
      <MediaQuery maxDeviceWidth={649}>
        <Header />
      </MediaQuery>
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop>
          <div
            className="edit-recipe__d-back-btn"
            onClick={props.toggleEditRecipe}
          >
            <Arrow className="edit-profile__d-back-icon" />
            Cancel
          </div>
        </HeaderDesktop>
        <h1 className="edit-recipe__title">Edit Recipe</h1>
      </MediaQuery>
      <RecipeUpsert
        initialValues={initialValues}
        submitText="Save Changes"
        onSubmit={handleSubmit}
        form="recipe-upsert"
      />
    </div>
  );
};

const mapStateToProps = state => ({
  dirty: isDirty("edit-profile"),
  recipeData: state.recipe,
  // redux memoized selector
  recipeTime: convertTime(state)
});

export default connect(
  mapStateToProps,
  { getRecipe, submitEditRecipe, toggleEditRecipe }
)(Edit);
