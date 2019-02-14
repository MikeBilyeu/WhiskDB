import React from "react";

const TextInput = ({
  input,
  label,
  meta,
  placeholder,
  type = "text",
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
      />
    </div>
  );
};

export default TextInput;
