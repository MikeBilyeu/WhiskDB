import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, isDirty } from "redux-form";
import { logoutUser, editProfile, toggleDelete } from "../../../actions/auth";
import { validateUsername } from "../../auth/utils/validation.js";
import { usernameValidate } from "../../auth/utils/async-validation";
import Input from "../../form-inputs/input";
import ImageUpload from "../../image-upload";
import Header from "./header";
import Delete from "./delete";
import "./profile-edit.scss";

class Edit extends React.Component {
  componentDidMount() {
    document.title = "WhiskDB | Edit Profile";
  }
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
          style={{ marginTop: "3rem" }}
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Field
            name="image_url"
            className="imageInput circle"
            component={ImageUpload}
          />
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
          <div>
            <h2>Diet</h2>
            <div>
              <label className="radio">
                <Field
                  name="diet"
                  component={Input}
                  type="radio"
                  value="none"
                />
                None
              </label>
              <label className="radio">
                <Field
                  name="diet"
                  component={Input}
                  type="radio"
                  value="vegetarian"
                />
                Vegetarian
              </label>
              <label className="radio">
                <Field
                  name="diet"
                  component={Input}
                  type="radio"
                  value="vegan"
                />
                Vegan
              </label>
            </div>
          </div>

          {this.props.dirty ? (
            <button className="saveBtn" type="submit">
              Save changes
            </button>
          ) : null}

          <div className="deleteBtn" onClick={this.props.toggleDelete}>
            Delete Account
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: {
    ...state.auth.user,
    currentUsername: state.auth.user.username, //pass currentUsername to bypass if no change made to username
    diet: state.auth.user.diet || "none"
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
