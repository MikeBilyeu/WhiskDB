import React from "react";

export const RenderServings = props => {
  if (props.values.servings) {
    return (
      <div>
        <i className="chart pie icon" />
        Servings: {props.values.servings}
      </div>
    );
  }
  return null;
};
