import React from "react";

export const RenderFootnote = props => {
  if (props.values.footnote) {
    let note = props.values.footnote ? props.values.footnote : "";
    return (
      <div>
        <div className="ui hidden divider" />
        <h3 className="ui dividing header">Footnote</h3>
        <div className="ui hidden divider" />
        <p style={{ color: "grey" }}>{note}</p>
      </div>
    );
  }
  return null;
};
