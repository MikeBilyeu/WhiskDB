import React from "react";
import NewRecipe from "./NewRecipe";
import NewRecipePreview from "./NewRecipePreview";

const CreateRecipe = () => {
  return (
    <div className="ui grid">
      <NewRecipe />
      <NewRecipePreview />
    </div>
  );
};

export default CreateRecipe;
