import React from "react";
import { connect } from "react-redux";
import { toggleDelete, deleteUser } from "../../../../actions/auth";
import "./edit-delete.scss";

const Delete = props => {
  return (
    <div className="edit-delete">
      <div className="edit-delete__cancle-btn" onClick={props.toggleDelete}>
        Cancel
      </div>
      <h1 className="edit-delete__title">Delete Account</h1>

      <h2 className="edit-delete__msg">Are you sure?</h2>
      <div className="edit-delete__delete-btn" onClick={props.deleteUser}>
        Delete Account
      </div>
    </div>
  );
};

export default connect(
  null,
  { toggleDelete, deleteUser }
)(Delete);
