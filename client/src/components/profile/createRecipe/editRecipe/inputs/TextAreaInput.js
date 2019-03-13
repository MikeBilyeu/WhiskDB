import React from "react";

const TextAreaInput = ({ input, label, placeholder, addClass, meta }) => {
  const className = `field ${addClass} ${
    meta.error && meta.touched ? "error" : ""
  }`;
  return (
    <div className={className}>
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
