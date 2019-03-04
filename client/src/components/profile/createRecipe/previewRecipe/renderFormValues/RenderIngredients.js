import React from "react";

export const RenderIngredients = props => {
  if (props.values.ingredients) {
    return (
      <div>
        <div className="ui hidden divider" />
        <h3 className="ui dividing header">Ingredients</h3>
        <div className="ui hidden divider" />
        <div className="ui bulleted list">
          {props.values.ingredients.map((ingredientInfo, index) => {
            let amount = ingredientInfo.amount ? ingredientInfo.amount : "";
            let ingredient = ingredientInfo.ingredient
              ? ingredientInfo.ingredient
              : "";
            let unit = ingredientInfo.unit ? ingredientInfo.unit : "";
            let prep = ingredientInfo.prep ? `(${ingredientInfo.prep})` : "";
            if (ingredient !== "" || amount !== "") {
              return (
                <div key={index} className="item">
                  {`${amount} ${unit} ${ingredient} ${prep}`}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
  return null;
};
