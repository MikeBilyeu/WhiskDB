import React from "react";
import { connect } from "react-redux";
import { reduxForm, isDirty } from "redux-form";
import { getRecipe, submitEditRecipe } from "../../../actions/recipe";
import convertTime from "../../../selectors/time-selector";
import Header from "./header";
import RecipeUpsert from "../../recipe_upsert";
import Loading from "../../loading";

const Edit = props => {
  const handleSubmit = values => {
    props.submitEditRecipe(values);
  };

  let { isFetching, recipe } = props.recipeData;
  const ingredientsStr = recipe.ingredients.join("\n");
  const keywordsStr = recipe.keywords.join(", ");

  recipe = {
    ...recipe,
    time: props.recipeTime,
    ingredients: ingredientsStr,
    keywords: keywordsStr
  };

  return isFetching ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <RecipeUpsert
        initialValues={recipe}
        submitText="Save Changes"
        onSubmit={handleSubmit}
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

// //submit function used for remote submit
// function submit(values, dispatch, props) {
//   props.submitEditRecipe(values);
// }

export default connect(
  mapStateToProps,
  { getRecipe, submitEditRecipe }
)(
  reduxForm({
    form: "edit-recipe",
    enableReinitialize: true
    //onSubmit: submit
  })(Edit)
);
