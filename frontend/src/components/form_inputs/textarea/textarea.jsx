import React from "react";

const Textarea = props => {
  return (
    <label>
      {props.label}
      <textarea
        {...props.input}
        placeholder={props.placeholder}
        className={props.className}
      />
      {props.meta.touched && props.meta.error && (
        <div className="validation-error">{props.meta.error}</div>
      )}
    </label>
  );
};

export default Textarea;
