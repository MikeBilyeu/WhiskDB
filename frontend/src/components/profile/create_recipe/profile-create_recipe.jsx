import React, { useEffect } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router-dom";
import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import RecipeUpsert from "../../recipe_upsert";
import { createRecipe } from "../../../actions/recipe";

import "./profile-create_recipe.scss";

const CreateRecipe = props => {
  useEffect(() => {
    document.title = "Zipiwisk | Create Recipe";
  }, []);

  const handleSubmit = values => {
    props.createRecipe(values, props.history);
  };

  const handleBackClick = () => {
    props.history.location.key
      ? props.history.goBack()
      : props.history.push("/profile");
  };

  const initialValues = {
    categories: [],
    imageFile: null
  };

  return (
    <div className="create-recipe">
      <MediaQuery maxDeviceWidth={649}>
        <Header onClick={handleBackClick} />
      </MediaQuery>
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop>
          <div className="create-recipe__d-back-btn" onClick={handleBackClick}>
            <Arrow className="edit-profile__d-back-icon" />
            Go back
          </div>
        </HeaderDesktop>
        <h1 className="create-recipe__title">Create Recipe</h1>
      </MediaQuery>

      <RecipeUpsert
        initialValues={initialValues}
        destroyOnUnmount={false}
        submitText="Save"
        onSubmit={handleSubmit}
        form="create-recipe"
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
