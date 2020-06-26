import React from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import { submitEditRecipe, toggleEditRecipe } from "../../../actions/recipe";
import convertTime from "../../../selectors/time-selector";
import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import RecipeUpsert from "../../recipe_upsert";
import Loading from "../../loading";
import "./recipe-edit.scss";

const Edit = props => {
  const handleSubmit = values =>
    props.submitEditRecipe(values).catch(err => {
      console.error(err);
    });

  let { isFetching, recipe } = props.recipeData;
  const ingredientsStr = recipe.ingredients.join("\n");

  const initialValues = {
    ...recipe,
    time: props.recipeTime,
    ingredients: ingredientsStr
  };

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
            <Arrow className="edit-recipe__d-back-icon" />
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
        goBack={props.history.goBack}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  recipeData: state.recipe,
  recipeTime: convertTime(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    { submitEditRecipe, toggleEditRecipe }
  )(Edit)
);
