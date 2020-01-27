import React from "react";
import { connect } from "react-redux";
import Servings from "./servings";
import Units from "./units";
import "./recipe-units_servings.scss";

class UnitsAndServings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="servings-units">
        <Units />
        <Servings />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unit: state.recipe.unit
});

export default connect(mapStateToProps)(UnitsAndServings);
