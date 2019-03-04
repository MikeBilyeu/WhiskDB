import React from "react";

export const RenderTime = props => {
  if (props.values.time) {
    const time = props.values.time;
    let hours = time.hours ? `${time.hours}h` : "";
    let minutes = time.minutes ? `${time.minutes}m` : "";

    return (
      <div>
        <i className="stopwatch icon" />
        Time: {`${hours} ${minutes}`}
      </div>
    );
  }
  return null;
};
