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
        <Unit />
        <Servings />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unit: state.recipe.unit
});
export default connect(mapStateToProps)(ServingsAndUnit);
