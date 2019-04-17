import React from "react";

import { connect } from "react-redux";

class Servings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{ width: "60%", display: "inline-block", textAlign: "center" }}
      >
        {this.props.servings}
      </div>
    );
  }
}

const mapStateToProps = state => ({ servings: state.recipe.recipe.servings });
export default connect(mapStateToProps)(Servings);
