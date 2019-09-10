import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { logoutUser } from "../../../actions/authActions";

import { Input } from "../../auth/Input";

import EditHeader from "./EditHeader";

class EditProfile extends React.Component {
  render() {
    const lower = value => value && value.toLowerCase();
    const { user } = this.props.auth;
    return (
      <div>
        <EditHeader />
        <form className="authForm">
          <Field
            name="fullname"
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
          <Field
            name="email"
            component={Input}
            inputId="email"
            placeholder="Enter new email"
            normalize={lower}
            label="Email"
          />
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
  auth: state.auth
});

export default reduxForm({
  form: "edit-profile"
})(
  connect(
    mapStateToProps,
    { logoutUser }
  )(EditProfile)
);
