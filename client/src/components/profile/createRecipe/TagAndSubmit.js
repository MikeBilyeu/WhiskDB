import React from "react";
import KeywordInput from "./renderFields/KeywordInput";
import KeywordOutput from "./renderFields/KeywordOutput";
const TagAndSubmit = props => {
  return (
    <div>
      <KeywordInput change={props.change} />
      <KeywordOutput change={props.change} />
      <button
        type="submit"
        style={{
          padding: ".5rem 3rem",
          backgroundColor: "#0172C4",
          border: "none",
          borderRadius: ".5rem",
          margin: "auto",
          color: "#fff"
        }}
      >
        Submit Recipe
      </button>
    </div>
  );
};

export default TagAndSubmit;
