import React from "react";
import { Field } from "redux-form";

const NumberInput = ({
  input,
  label,
  meta: { touched, error, warning, active },
  placeholder,
  type = "text",
  pattern = null,
  addClass
}) => {
  const className = `${addClass} ${error && touched ? "error" : ""} ${
    active ? "input-active" : ""
  }`;
  console.log(active);
  return (
    <div className={className} style={{ width: "5rem" }}>
      <input
        style={{
          width: "3rem",
          fontSize: "2rem",
          textAlign: "center",
          border: "none",
          WebkitAppearance: "none",
          appearance: "none"
        }}
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      <label style={{ margin: "0", color: active ? "#0172C4" : "inherit" }}>
        {label}
      </label>
    </div>
  );
};

const TimeInput = () => {
  const minuteParse = value => {
    let strArr = value.match(/^[1-5][\d]?/) || [""];
    return value && strArr[0];
  };
  const numberParse = value => {
    let strArr = value.match(/^[1-9][\d]?/) || [""];
    return value && strArr[0];
  };
  return (
    <div>
      <h4>Time Required</h4>
      <div
        style={{
          borderBottom: "solid #464646 .1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center",
          width: "15rem",
          margin: "auto",
          padding: "0 2rem"
        }}
      >
        <Field
          name="time.hours"
          component={NumberInput}
          label="Hr"
          placeholder="1"
          normalize={numberParse}
          pattern="[0-9]*"
        />
        <Field
          name="time.minutes"
          component={NumberInput}
          label="Min"
          placeholder="15"
          parse={minuteParse}
          pattern="[0-9]*"
        />
      </div>
    </div>
  );
};

export default TimeInput;
