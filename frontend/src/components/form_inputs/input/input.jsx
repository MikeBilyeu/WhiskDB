import React from "react";

const Input = ({
  input,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  label,
  className,
  ...props
}) => {
  return (
    <label className={className}>
      {label}
      <input
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
      />
      {props.children}
      {touched && error && <div className="error">*{error}</div>}
    </label>
  );
};

export default Input;
