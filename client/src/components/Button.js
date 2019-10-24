import React from "react";
import PropTypes from "prop-types";

export const Button = ({ children, onClick, className, ...props }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired
};

Button.defaultProps = {
  className: "button"
};
