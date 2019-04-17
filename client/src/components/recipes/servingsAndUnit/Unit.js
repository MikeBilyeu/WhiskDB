import React from "react";

import { connect } from "react-redux";

//actions creater
import { toggleUnit } from "../../../actions/recipeActions";

class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // Sets the Unit to US on mount
    this.props.toggleUnit("US");
  }
  handleClick = () => {
    this.props.toggleUnit(this.props.unitName);
  };
  render() {
    let componentClasses = [];
    if (this.props.unitName === this.props.unitSelect) {
      componentClasses.push("selected");
    } else {
      // remove the class
      componentClasses.pop();
    }

    return (
      <div
        className={componentClasses.join(" ")}
        style={{
          width: "20%",
          display: "inline-block",
          textAlign: "center",
          cursor: "pointer",
          fontWeight:
            this.props.unitName === this.props.unitSelect ? "bold" : "normal",
          opacity: this.props.unitName === this.props.unitSelect ? "1" : ".5"
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
