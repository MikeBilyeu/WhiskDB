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
  const className = `${addClass} ${error && touched ? "error" : ""}`;
  return (
    <div className={className} style={{ width: "5rem" }}>
      <input
        style={{
          width: "2.5rem",
          fontSize: "1.5rem",
          textAlign: "right",
          border: "none",
          WebkitAppearance: "none",
          color: "#454852"
        }}
        {...input}
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      <label
        style={{
          margin: "0",
          marginLeft: ".2rem",
          color: active ? "#0172C4" : "inherit"
        }}
      >
        {label}
      </label>
    </div>
  );
};

const TimeInput = () => {
  const minuteParse = value => {
    let strArr = value.match(/^[\d]{0,2}/) || [""];
    return value && strArr[0];
  };
  const numberParse = value => {
    let strArr = value.match(/^[1-9][\d]?/) || [""];
    return value && strArr[0];
  };
  return (
    <div style={{ display: "grid", margin: "4rem auto" }}>
      <h4
        style={{
          borderBottom: "solid .05rem #EFEFF1",
          display: "inline",
          margin: "0 auto .7rem auto",
          padding: ".5rem 1rem"
        }}
      >
        Time Required
      </h4>
      <div
        style={{
          borderBottom: "solid #464646 .1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          placeItems: "center",
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
