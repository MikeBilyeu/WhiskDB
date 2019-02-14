import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

const NewRecipePreview = props => {
  const values = props.formValues;

  function renderTitle() {
    if (values && values.title) {
      return <h1>{values.title}</h1>;
    }
  }

  function renderTime() {
    if (values && values.time) {
      let hours = values.time.hours ? `${values.time.hours}h` : "";
      let minutes = values.time.minutes ? `${values.time.minutes}m` : "";

      return (
        <div>
          <i className="stopwatch icon" />
          Time: {`${hours} ${minutes}`}
        </div>
      );
    }
  }

  function renderServings() {
    if (values && values.servings) {
      return (
        <div>
          <i className="chart pie icon" />
          Servings: {values.servings}
        </div>
      );
    }
  }

  function renderIngredients() {
    if (values && values.ingredients) {
      return (
        <div>
          <div className="ui hidden divider" />
          <h3 className="ui dividing header">Ingredients</h3>
          <div className="ui hidden divider" />
          <div className="ui bulleted list">
            {values.ingredients.map((ingredientInfo, index) => {
              let amount = ingredientInfo.amount ? ingredientInfo.amount : "";
              let ingredient = ingredientInfo.ingredient
                ? ingredientInfo.ingredient
                : "";
              let unit = ingredientInfo.unit ? ingredientInfo.unit : "";
              let prep = ingredientInfo.prep ? `(${ingredientInfo.prep})` : "";
              if (ingredient !== "") {
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
  }

  function renderDirections() {
    if (values && values.directions) {
      return (
        <div>
          <div className="ui hidden divider" />
          <h3 className="ui dividing header">Directions</h3>
          <div className="ui hidden divider" />
          <div>
            {values.directions.map((direction, index) => {
              let step = direction.step ? direction.step : "";
              let tip = direction.tip ? `Tip: ${direction.tip}` : "";
              return (
                <div key={index}>
                  <div className="ui hidden divider" />
                  <h5 className="ui header">
                    {step ? `Step ${index + 1}` : ""}
                  </h5>
                  <p>{step}</p>
                  <p style={{ color: "#a5a5a5" }}>{tip}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  function renderImage() {
    if (values && values.image) {
      console.log(values.image);
      return (
        <img
          className="ui large image"
          src={URL.createObjectURL(values.image)}
        />
      );
    }
  }
  return (
    <div style={{ overflowY: "scroll" }} className="eight wide column">
      <div className="ui hidden divider" />
      <h1 className="ui dividing header">Preview Recipe</h1>
      <div className="ui hidden divider" />
      {renderTitle()}
      {renderImage()}
      {renderTime()}
      {renderServings()}
      <div className="ui hidden divider" />
      {renderIngredients()}
      {renderDirections()}
      <div className="ui hidden divider" />
    </div>
  );
};

const mapSateToProps = state => {
  return { formValues: getFormValues("newRecipe")(state) };
};

export default connect(mapSateToProps)(NewRecipePreview);
