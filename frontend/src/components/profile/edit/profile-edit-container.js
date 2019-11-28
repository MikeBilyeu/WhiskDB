import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, isDirty } from "redux-form";
import {
  logoutUser,
  editProfile,
  toggleDelete
} from "../../../actions/authActions";
import { validateUsername } from "../../auth/utils/validation.js";
import { usernameValidate } from "../../auth/utils/async-validation";
import Input from "../../form-inputs/input";
import Header from "./header";
import Delete from "./delete";
import "./profile-edit.scss";

class Edit extends React.Component {
  handleSubmit = values => {
    this.props.editProfile(values, this.props.history);
  };

  render() {
    if (this.props.openDelete) {
      return <Delete />;
    }
    return (
      <div className="edit-profile">
        <Header />
        <form
          className="auth-form"
          style={{ marginTop: "4rem" }}
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
            borderRadius: ".5rem"
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
    validate: validateUsername,
    asyncValidate: usernameValidate,
    asyncBlurFields: ["username"],
    enableReinitialize: true
  })(Edit)
);
