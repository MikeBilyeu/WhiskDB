import React from "react";
import { connect } from "react-redux";
import { toggleDelete, deleteUser } from "../../../../actions/auth";

const Delete = props => {
  return (
    <div>
      <h1>Delete Account</h1>
      <div onClick={props.toggleDelete}>Cancel</div>

      <div onClick={props.deleteUser}>Delete Account</div>
    </div>
  );
};

export default connect(
  null,
  { toggleDelete, deleteUser }
)(Delete);
