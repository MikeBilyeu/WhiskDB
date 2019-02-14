import React from "react";

const TextAreaInput = ({ input, label, placeholder }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea
        {...input}
        placeholder={placeholder}
        style={{ marginTop: "0px", marginBottom: "0px", height: "115px" }}
      />
    </div>
  );
};

export default TextAreaInput;
