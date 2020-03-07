import React, { useRef, useEffect } from "react";

const autoExpand = ({ current }) => {
  //Reset field height
  current.style.height = "2.7rem";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(current);

  //Calculate the height
  let height =
    parseInt(computed.getPropertyValue("padding-top"), 10) +
    current.scrollHeight -
    5;

  current.style.height = height + "px";
};

const Textarea = props => {
  const inputEl = useRef(null);

  useEffect(() => {
    autoExpand(inputEl);
  });

  return (
    <label className={`${props.className}__label`}>
      {props.label}
      <textarea
        {...props.input}
        placeholder={props.placeholder}
        className={props.className}
        ref={inputEl}
      />
      {props.meta.touched && props.meta.error && (
        <div className="validation-error">{props.meta.error}</div>
      )}
    </label>
  );
};

export default Textarea;
