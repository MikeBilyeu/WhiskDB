import React from "react";

import { connect } from "react-redux";

// diet action creator
import { toggleDiet } from "../../../actions/browseActions";

const FilterButton = props => {
  const handleClick = () => {
    props.toggleDiet(props.buttonName);
  };
  return (
    <div
      style={{
        width: "7rem",
        borderRadius: ".2rem",
        cursor: "pointer",
        backgroundColor: "#313131",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: "1.2rem",
        margin: "1rem .2rem",
        padding: ".6rem"
      }}
      onClick={handleClick}
    >
      {props.buttonName}
    </div>
  );
};

export default connect(
  null,
  { toggleDiet }
)(FilterButton);
