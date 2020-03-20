import React from "react";
import { connect } from "react-redux";
//import "./recipe-ingredient_adjust.scss";

const IngredientAdjust = () => {
  return <div className="ingredient-adjust"></div>;
};

const mapStateToProps = state => ({
  unit: state.recipe.unit
});

export default connect(mapStateToProps)(IngredientAdjust);
