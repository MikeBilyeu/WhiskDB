import React from "react";
import { connect } from "react-redux";

//action creator
import { toggleDelete, deleteUser } from "../../../actions/authActions";

class Delete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1
          style={{
            color: "#313131",
            textAlign: "center",
            width: "100%",
            paddingBottom: "1rem",
            fontSize: "1.5rem",
            borderBottom: "solid #E3E3E3 .02rem"
          }}
        >
          Delete Account
        </h1>
        <div
          style={{
            color: "#0172C4",
            cursor: "pointer",
            padding: ".1rem 1rem",
            fontSize: "1.2rem"
          }}
          onClick={this.props.toggleDelete}
        >
          Cancel
        </div>
        <h2
          style={{
            marginBottom: ".2rem",
            fontSize: "1.2rem",
            color: "#1C1D21"
          }}
        >
          Why are you leaving WhiskDB?
        </h2>
        <div style={{ margin: "0", color: "#535662", fontWeight: "000" }}>
          We would love to hear from you.
        </div>
        <div
          style={{
            fontWeight: "900",
            width: "13rem",
            textAlign: "center",
            color: "#FFF",
            backgroundColor: "#C40801",
            padding: ".5rem",
            postion: "relative",
            margin: "3rem auto",
            cursor: "pointer",
            borderRadius: "10rem"
          }}
          onClick={this.props.deleteUser}
        >
          Delete Account
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleDelete, deleteUser }
)(Delete);
