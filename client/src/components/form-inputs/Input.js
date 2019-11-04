import React from "react";

const Input = ({
  input,
  meta: { touched, error, warning, active },
  placeholder,
  inputId,
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
        id={inputId}
        placeholder={placeholder}
        className={className}
      />
      {touched && error && <div className="error">*{error}</div>}
    </label>
  );
};

export default Input;

// label styles
// style={{
//   padding: "0 .5rem",
//   backgroundColor: "#FFF",
//   position: "absolute",
//   left: "1.5rem",
//   bottom: "2.4rem",
//   color: active ? "#0172C4" : "#535662",
//   fontWeight: "normal"
// }}

//input styles
// style={{
//   border: active ? "solid #0172C4 .07rem " : "solid #AFAFAF .07rem"
// }}
