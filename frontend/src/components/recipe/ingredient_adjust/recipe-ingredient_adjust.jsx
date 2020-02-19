import React from "react";
import { connect } from "react-redux";
import Servings from "./servings";
import Units from "./units";
import "./recipe-ingredient_adjust.scss";

class IngredientAdjust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ingredient-adjust">
        <Units />
        <Servings />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unit: state.recipe.unit
});

export default connect(mapStateToProps)(IngredientAdjust);
