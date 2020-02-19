import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { toggleUnit } from "../../../../actions/recipeActions";

class Units extends React.Component {
  handleClick = () => {
    this.props.toggleUnit();
  };
  render() {
    return (
      <div className="ingredient-adjust__units" onClick={this.handleClick}>
        <span
          className={classNames({
            "ingredient-adjust__units--active": this.props.unit === "US"
          })}
        >
          US
        </span>
        {" / "}
        <span
          className={classNames({
            "ingredient-adjust__units--active": this.props.unit === "Metric"
          })}
        >
          Metric
        </span>
      </div>
    );
  }
}
const mapStateToProps = state => ({ unit: state.recipe.unit });

export default connect(
  mapStateToProps,
  { toggleUnit }
)(Units);
