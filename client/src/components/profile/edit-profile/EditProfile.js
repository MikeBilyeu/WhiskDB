import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, isDirty } from "redux-form";
import { withRouter } from "react-router-dom";

import {
  logoutUser,
  editProfile,
  toggleDelete
} from "../../../actions/authActions";

import { ValidateUsername } from "../../auth/AuthValidation";
import { usernameValidate } from "../../auth/AsyncValidation";

import { Input } from "../../auth/Input";
import EditHeader from "./EditHeader";
import Delete from "./Delete";

class EditProfile extends React.Component {
  handleSubmit = values => {
    this.props.editProfile(values, this.props.history);
  };

  render() {
    const lower = value => value && value.toLowerCase();
    if (this.props.openDelete) {
      return <Delete />;
    }
    return (
      <div>
        <EditHeader />
        <form
          className="authForm"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Field
            name="full_name"
            component={Input}
            inputId="fullname"
            placeholder="Enter full name"
            label="Full name"
          />
          <Field
            name="username"
            component={Input}
            inputId="username"
            placeholder="Enter new username"
            label="Username"
          />
          {this.props.dirty ? (
            <button type="submit">Save changes</button>
          ) : null}
        </form>
        <div
          style={{
            border: "solid #C40801 .05rem",
            width: "13rem",
            textAlign: "center",
            color: "#C40801",
            padding: ".5rem",
            postion: "relative",
            margin: "3rem auto",
            cursor: "pointer",
            borderRadius: "10rem"
          }}
          onClick={this.props.toggleDelete}
        >
          Delete Account
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    ...state.userData.user,
    currentUsername: state.userData.user.username //pass currentUsername to bypass if no change made to usename
  },
  dirty: isDirty("edit-profile"),
  openDelete: state.auth.openDelete
});

export default connect(
  mapStateToProps,
  { logoutUser, editProfile, toggleDelete }
)(
  reduxForm({
    form: "edit-profile",
    validate: ValidateUsername,
    asyncValidate: usernameValidate,
    asyncBlurFields: ["username"],
    enableReinitialize: true
  })(EditProfile)
);
