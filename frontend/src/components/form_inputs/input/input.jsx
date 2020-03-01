import React from "react";

const Input = ({ type = "text", ...props }) => {
  return (
    <label className={props.className}>
      {props.label}
      <input
        {...props.input}
        autoComplete="off"
        type={type}
        placeholder={props.placeholder}
      />
      {props.children}
      {props.meta.touched && props.meta.error && (
        <div className={`${props.className}-error`}>*{props.meta.error}</div>
      )}
    </label>
  );
};

export default Input;
