import React from "react";
import NewRecipe from "./NewRecipe";
import NewRecipePreview from "./NewRecipePreview";

const CreateRecipe = () => {
  return (
    <div style={{ height: "calc(100vh - 9rem)" }} className="ui grid">
      <NewRecipe />
      <NewRecipePreview />
    </div>
  );
};

export default CreateRecipe;
