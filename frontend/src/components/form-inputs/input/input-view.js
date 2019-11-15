import React from "react";

const Input = ({
  input,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  label,
  className
}) => {
  return (
    <label>
      {label}
      <input
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        className={className}
      />
      {touched && error && <div className="error">*{error}</div>}
    </label>
  );
};

export default Input;
