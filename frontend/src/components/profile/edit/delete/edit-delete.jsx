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

      <h1 className="edit-delete__msg">
        Are you sure you want to delete this account?
      </h1>
      <div className="edit-delete__delete-btn" onClick={props.deleteUser}>
        Yes, Delete Account
      </div>
    </div>
  );
};

export default connect(
  null,
  { toggleDelete, deleteUser }
)(Delete);
