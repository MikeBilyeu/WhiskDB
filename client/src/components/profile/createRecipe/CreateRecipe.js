import React from "react";
import EditNewRecipe from "./EditNewRecipe";
import PreviewNewRecipe from "./PreviewNewRecipe";

const CreateRecipe = () => {
  return (
    <div style={{ height: "calc(100vh - 9rem)" }} className="ui grid">
      <EditNewRecipe />
      <PreviewNewRecipe />
    </div>
  );
};

export default CreateRecipe;
