import React from "react";
import { connect } from "react-redux";

import Servings from "./Servings";
import Unit from "./Unit";

import "./su-styles.css";

class ServingsAndUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="servings-units">
        <div className="units">
          <Unit unitName="US" />
          <Unit unitName="Metric" />
        </div>
        <div className="split" />

        <Servings />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unit: state.recipe.unit
});
export default connect(mapStateToProps)(ServingsAndUnit);
