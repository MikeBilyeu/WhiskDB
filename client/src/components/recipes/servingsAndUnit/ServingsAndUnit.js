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
          width: "100%",
          height: "4rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 4fr",
          placeItems: "center"
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
