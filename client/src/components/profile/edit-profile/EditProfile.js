import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import { logoutUser, editProfile } from "../../../actions/authActions";

import { Input } from "../../auth/Input";

import EditHeader from "./EditHeader";

class EditProfile extends React.Component {
  handleSubmit = values => {
    this.props.editProfile(values, this.props.history);
  };
  render() {
    const lower = value => value && value.toLowerCase();
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
          <button type="submit">Save changes</button>
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
        >
          Delete Account
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.userData.user
});

export default connect(
  mapStateToProps,
  { logoutUser, editProfile }
)(
  reduxForm({
    form: "edit-profile",
    enableReinitialize: true
  })(EditProfile)
);
