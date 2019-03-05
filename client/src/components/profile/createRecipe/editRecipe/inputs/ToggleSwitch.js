import React from "react";

const ToggleSwitch = ({ input, label }) => {
  return (
    <div className="ui toggle checkbox">
      <input {...input} checked={input.value} type="checkbox" />
      <label>{label}</label>
    </div>
  );
};

export default ToggleSwitch;
