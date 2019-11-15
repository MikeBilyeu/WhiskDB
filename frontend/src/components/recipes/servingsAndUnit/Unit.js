import React from "react";

import { connect } from "react-redux";

//actions creater
import { toggleUnit } from "../../../actions/recipeActions";

class Unit extends React.Component {
  handleClick = () => {
    this.props.toggleUnit();
  };
  render() {
    return (
      <div className="units">
        Unit:
        <div className="unit-option" onClick={this.handleClick}>
          {this.props.unitSelect}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ unitSelect: state.recipe.unit });

export default connect(
  mapStateToProps,
  { toggleUnit }
)(Unit);
