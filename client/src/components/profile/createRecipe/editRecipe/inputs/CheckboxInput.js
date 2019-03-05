import React from "react";

const CheckboxInput = ({ fields, label, name, categoryType }) => {
  return (
    <div className="field">
      <div className="ui checkbox">
        <input
          {...fields.category[categoryType][name].input}
          type="checkbox"
          checked={fields.category[categoryType][name].input.value}
        />
        <label>{label}</label>
      </div>
    </div>
  );
};

export default CheckboxInput;
