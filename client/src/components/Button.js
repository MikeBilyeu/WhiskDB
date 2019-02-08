import React from "react";

const Button = props => {
  return (
    <button className="ui active button">
      {props.text}
      <i className="arrow alternate circle right icon" />
    </button>
  );
};

export default Button;
