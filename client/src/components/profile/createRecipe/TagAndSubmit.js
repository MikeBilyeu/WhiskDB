import React from "react";
import KeywordInput from "./renderFields/KeywordInput";
import KeywordOutput from "./renderFields/KeywordOutput";
const TagAndSubmit = props => {
  return (
    <div>
      <KeywordInput change={props.change} />
      <KeywordOutput change={props.change} />
      <button type="submit">Submit Recipe</button>
    </div>
  );
};

export default TagAndSubmit;
