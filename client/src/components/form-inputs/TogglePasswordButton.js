import React from "react";
import PropTypes from "prop-types";

export const TogglePasswordButton = props => {
  return (
    <div
      style={{
        cursor: "pointer",
        color: "#535662"
      }}
      onClick={props.handleClick}
    >
      {props.showPassword ? "hide" : "show"}
    </div>
  );
};

TogglePasswordButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired
};
