import React from "react";
import { ReactComponent as Check } from "../../../../images/check.svg";

const CheckboxInput = ({ fields, label, name, categoryType }) => {
  return (
    <label
      style={{
        padding: "1rem 0",
        margin: "0",
        display: "grid",
        gridTemplateColumns: "2rem 1fr",
        placeItems: "center start",
        gridGap: ".5rem",
        color: fields.categories[categoryType][name].input.value
          ? "#0172C4"
          : "inherit"
      }}
    >
      <input
        style={{
          position: "absolute",
          opacity: "0",
          cursor: "pointer",
          height: "0",
          width: "0"
        }}
        {...fields.categories[categoryType][name].input}
        type="checkbox"
        checked={fields.categories[categoryType][name].input.value}
      />
      <span
        style={{
          display: "inline-block",
          border: "solid #707070 .1rem",
          borderRadius: ".5rem",
          width: "2rem",
          height: "2rem",
          display: "grid",
          placeItems: "center"
        }}
      >
        {fields.categories[categoryType][name].input.value ? (
          <Check style={{ width: "1.5rem" }} />
        ) : null}
      </span>
      {label}
    </label>
  );
};

export default CheckboxInput;
