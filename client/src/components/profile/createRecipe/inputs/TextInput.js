import React from "react";

const TextInput = ({
  input,
  label,
  meta,
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `field ${addClass} ${
    meta.error && meta.touched ? "error" : ""
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
    </div>
  );
};

export default TextInput;
