import React from "react";
import PropTypes from "prop-types";

export const Button = ({ children, handleClick, className, ...props }) => {
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired
};

Button.defaultProps = {
  className: "button"
};
