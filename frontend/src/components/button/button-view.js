import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, onClick, className, ...props }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
};

Button.defaultProps = {
  className: "button"
};

export default Button;
