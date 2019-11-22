import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import RecipeUpsert from "../../recipe-upsert";
import { createRecipe } from "../../../actions/recipeActions";

const CreateRecipe = props => {
  const handleSubmit = values => {
    props.createRecipe(values, props.history);
  };

  const handleBackClick = () => {
    props.history.goBack();
  };

  const initialValues = {
    categories: [],
    keywords: []
  };

  return (
    <div>
      <Header onClick={handleBackClick} />
      <RecipeUpsert
        initialValues={initialValues}
        destroyOnUnmount={false}
        submitText="Save Recipe"
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default withRouter(
  connect(
    null,
    { createRecipe }
  )(CreateRecipe)
);
