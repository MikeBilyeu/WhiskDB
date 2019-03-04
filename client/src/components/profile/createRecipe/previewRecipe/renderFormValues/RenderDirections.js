import React from "react";

export const RenderDirections = props => {
  if (props.values.directions) {
    return (
      <div>
        <div className="ui hidden divider" />
        <h3 className="ui dividing header">Directions</h3>
        <div className="ui hidden divider" />
        <div>
          {props.values.directions.map((direction, index) => {
            let step = direction.step ? direction.step : "";
            return (
              <div key={index}>
                <div className="ui hidden divider" />
                <h5 className="ui header">{step ? `Step ${index + 1}` : ""}</h5>
                <p>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};
