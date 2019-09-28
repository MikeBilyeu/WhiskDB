import React from "react";
import { connect } from "react-redux";
import { toggleShare } from "../../../actions/recipeActions";

import "./share-styles.css";

import { ReactComponent as Close } from "../../../images/removeDark.svg";

const Share = props => {
  return (
    <div className="share">
      <Close
        style={{
          width: "2rem",
          padding: ".5rem",
          cursor: "pointer"
        }}
        onClick={props.toggleShare}
      />
      <div
        className="share-option"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
        }}
      >
        Copy Link
      </div>
      <div
        className="print-option"
        onClick={() => {
          window.print();
        }}
      >
        Print
      </div>
    </div>
  );
};

export default connect(
  null,
  { toggleShare }
)(Share);
