import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import "./alerts.scss";

const Alerts = props => {
  const className = classNames("alerts", `alerts--${props.alert.type}`);
  if (props.alert.visible) {
    return <div className={className}>{props.alert.text}</div>;
  }
  return null;
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alerts);
