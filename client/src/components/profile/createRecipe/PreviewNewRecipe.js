import React from "react";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { createRecipe } from "../../../actions/recipeActions";

// onSubmit={this.props.handleSubmit(this.onFormSubmit)}

const PreviewNewRecipe = props => {
  const values = props.formValues;

  function renderTitle() {
    if (values && values.title) {
      return <h1 className="ui header center aligned">{values.title}</h1>;
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

  // onRecipeSubmit = formValues => {
  //   console.log(formValues);
  //   const newRecipe = {
  //     ...formValues,
  //     created_by: this.props.auth.user.id
  //   };
  //
  //   this.props.createRecipe(newRecipe, this.props.history);
  // };

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
              return (
                <div key={index}>
                  <div className="ui hidden divider" />
                  <h5 className="ui header">
                    {step ? `Step ${index + 1}` : ""}
                  </h5>
                  <p>{step}</p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  function renderFootnotes() {
    if (values && values.footnote) {
      let note = values.footnote ? values.footnote : "";
      return (
        <div>
          <div className="ui hidden divider" />
          <h3 className="ui dividing header">Footnote</h3>
          <div className="ui hidden divider" />
          <p style={{ color: "grey" }}>{note}</p>
        </div>
      );
    }
  }

  function renderImage() {
    if (values && values.image) {
      console.log(values.image);
      return (
        <img
          alt=""
          className="ui medium image centered"
          src={URL.createObjectURL(values.image)}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "27rem",
            height: "20rem",
            borderRadius: ".1rem"
          }}
        />
      );
    }
  }
  return (
    <div className="seven wide column">
      <div className="ui hidden divider" />
      <h1 className="ui dividing header center aligned">Preview Recipe</h1>
      <div className="ui hidden divider" />
      {renderTitle()}
      {renderImage()}
      <div className="ui hidden divider" />

      {renderTime()}
      {renderServings()}

      <div className="ui hidden divider" />
      {renderIngredients()}
      {renderDirections()}
      {renderFootnotes()}
      <div className="ui hidden divider" />

      <button className="ui button green fluid big blue">Submit Recipe</button>
    </div>
  );
};

const mapSateToProps = state => {
  return {
    auth: state.auth,
    formValues: getFormValues("newRecipe")(state)
  };
};

export default connect(
  mapSateToProps,
  { createRecipe }
)(withRouter(PreviewNewRecipe));
