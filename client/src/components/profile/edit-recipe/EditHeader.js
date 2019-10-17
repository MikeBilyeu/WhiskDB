import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Action Creator
import { ReactComponent as Arrow } from "../../../images/arrowLeft.svg";

class EditHeader extends React.Component {
  onSaveClick = () => {
    this.props.handleSave();
  };
  render() {
    const { history } = this.props;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          placeItems: "center"
        }}
      >
        <Arrow className="back-btn" onClick={() => history.goBack()} />
        <h2>Edit Recipe</h2>
        <div
          style={{ cursor: "pointer", color: "#0172C4" }}
          onClick={this.onSaveClick}
        >
          Save
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    {}
  )(EditHeader)
);
