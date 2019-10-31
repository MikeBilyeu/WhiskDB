import React from "react";

const TextArea = ({
  input,
  label,
  placeholder,
  meta: { touched, error, warning, active }
}) => {
  return (
    <div>
      <label>{label}</label>
      <textarea {...input} placeholder={placeholder} />
      {touched && error ? <span>*{error}</span> : null}
    </div>
  );
};

export default TextArea;
