import React from "react";

export const RenderTitle = props => {
  if (props.values.title) {
    return <h1 className="ui header center aligned">{props.values.title}</h1>;
  }
  return null;
};
