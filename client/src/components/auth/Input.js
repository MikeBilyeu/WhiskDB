import React from "react";

export const Input = ({
  input,
  meta: { touched, error, warning, active },
  placeholder,
  inputId,
  type = "text",
  label
}) => {
  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          padding: "0 .5rem",
          backgroundColor: "#FFF",
          position: "absolute",
          left: ".8rem",
          bottom: "2.4rem",
          color: active ? "#0172C4" : "#535662",
          fontWeight: "normal"
        }}
      >
        {label}
      </label>
      <input
        style={{
          border: active ? "solid #0172C4 .07rem " : "solid #AFAFAF .07rem"
        }}
        {...input}
        autoComplete="off"
        type={type}
        id={inputId}
        placeholder={placeholder}
      />
      {touched && error ? (
        <div style={{ position: "absolute", color: "red" }}>*{error}</div>
      ) : null}
    </div>
  );
};
