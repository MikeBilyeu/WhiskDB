import React from "react";

const TextInput = ({
  input,
  label,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `field ${addClass} ${error && touched ? "error" : ""} ${
    active ? "input-active" : ""
  }`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      {touched && error ? <span>*{error}</span> : null}
    </div>
  );
};

export default TextInput;
