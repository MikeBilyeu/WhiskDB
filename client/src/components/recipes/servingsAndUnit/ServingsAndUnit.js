import React from "react";
import { connect } from "react-redux";

import Servings from "./Servings";
import Unit from "./Unit";

class ServingsAndUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          border: "solid black .1rem",
          width: "25rem",
          height: "4rem",
          margin: "0 auto"
        }}
      >
        <Unit unitName="US" />
        <Unit unitName="Metric" />
        <Servings />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unit: state.recipe.unit
});
export default connect(mapStateToProps)(ServingsAndUnit);
