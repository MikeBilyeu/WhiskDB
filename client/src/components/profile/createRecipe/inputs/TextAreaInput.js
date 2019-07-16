import React from "react";

const TextAreaInput = ({
  input,
  label,
  placeholder,
  addClass,
  meta: { touched, error, warning, active }
}) => {
  const className = `field ${addClass} ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <textarea
        {...input}
        placeholder={placeholder}
        style={{ marginTop: "0px", marginBottom: "0px", height: "115px" }}
      />
      {touched && error ? <span>*{error}</span> : null}
    </div>
  );
};

export default TextAreaInput;
