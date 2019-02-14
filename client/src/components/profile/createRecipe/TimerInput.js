import React from "react";
import { Field } from "redux-form";

import TextInput from "./TextInput";

// Dynamiclly render timers for each step
const TimerInput = ({ fields, step }) => {
  return (
    <div>
      {fields.map((timer, index) => {
        return (
          <div key={index}>
            <div className="ui hidden divider" />
            <h5 className="ui dividing header">Timer for step {step}</h5>
            <div className="fields">
              <Field
                name={`${timer}.hour`}
                component={TextInput}
                label="Hours"
                placeholder="1"
              />
              <Field
                name={`${timer}.minute`}
                component={TextInput}
                label="Minutes"
                placeholder="15"
              />
            </div>
          </div>
        );
      })}
      <div className="ui small buttons">
        <button
          className="ui button"
          type="button"
          onClick={() => fields.remove(fields.length - 1)}
        >
          remove
        </button>
        <div className="or" />
        <button
          className="ui yellow button"
          type="button"
          onClick={() => fields.push({})}
        >
          Add Timer
        </button>
      </div>

      <div className="ui hidden divider" />
    </div>
  );
};

export default TimerInput;
