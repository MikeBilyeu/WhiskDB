import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { toggleUnit } from "../../../actions/recipe";

const UnitsAdjust = props => {
  return (
    <div className={props.className} onClick={props.toggleUnit}>
      <span
        className={classNames({
          [`${props.className}--active`]: props.unit === "US"
        })}
      >
        US
      </span>
      {" / "}
      <span
        className={classNames({
          [`${props.className}--active`]: props.unit === "Metric"
        })}
      >
        Metric
      </span>
    </div>
  );
};

const mapStateToProps = state => ({ unit: state.recipe.unit });

export default connect(
  mapStateToProps,
  { toggleUnit }
)(UnitsAdjust);
