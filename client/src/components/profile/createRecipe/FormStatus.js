import React from "react";
import { getFormSyncErrors } from "redux-form";
import { connect } from "react-redux";

const FormStatus = props => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        placeItems: "center",
        borderBottom: "solid 1px #B7B7B7",
        color: "#464646",
        marginBottom: "1rem"
      }}
    >
      <div
        style={{
          visibility: props.page < 2 ? "hidden" : "visible",
          cursor: "pointer",
          padding: "1rem 1rem .5rem 1rem",
          justifySelf: "start"
        }}
        onClick={() => {
          props.handleClick(-1);
        }}
      >
        Previous
      </div>

      <div
        style={{
          visibility: props.page <= 5 ? "visible" : "hidden",
          cursor: "pointer",
          padding: " 1rem 1rem .5rem 1rem",
          justifySelf: "end",
          color:
            Object.keys(props.syncErrors).length < 1 ? "#0172C4" : "#E2E2E2"
        }}
        onClick={() => {
          console.log(props.syncErrors);
          if (Object.keys(props.syncErrors).length < 1) {
            props.handleClick(+1);
          }
        }}
      >
        Next
      </div>
    </div>
  );
};

const mapSateToProps = state => {
  return { syncErrors: getFormSyncErrors("newRecipe")(state) };
};

export default connect(mapSateToProps)(FormStatus);
