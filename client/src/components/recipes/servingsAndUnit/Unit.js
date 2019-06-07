import React from "react";

import { connect } from "react-redux";

//actions creater
import { toggleUnit } from "../../../actions/recipeActions";

class Unit extends React.Component {
  componentDidMount() {
    // Sets the Unit to US on mount
    this.props.toggleUnit("US");
  }
  handleClick = () => {
    this.props.toggleUnit(this.props.unitName);
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          lineHeight: "3.5rem",
          display: "inline-block",
          textAlign: "center",
          color: "#fff",
          cursor: "pointer",
          fontWeight:
            this.props.unitName === this.props.unitSelect ? "bold" : "normal",
          opacity: this.props.unitName === this.props.unitSelect ? "1" : ".7"
        }}
        onClick={this.handleClick}
      >
        {this.props.unitName}
      </div>
    );
  }
}
const mapStateToProps = state => ({ unitSelect: state.recipe.unit });

export default connect(
  mapStateToProps,
  { toggleUnit }
)(Unit);
