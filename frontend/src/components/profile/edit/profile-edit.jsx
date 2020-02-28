import React from "react";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Field, reduxForm, isDirty } from "redux-form";
import { logoutUser, editProfile, toggleDelete } from "../../../actions/auth";
import { validateUsername } from "../../auth/utils/validation.js";
import { usernameValidate } from "../../auth/utils/async-validation";
import Input from "../../form_inputs/input";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import ImageUpload from "../../image_upload";

import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import Delete from "./delete";
import "./profile-edit.scss";

class Edit extends React.Component {
  componentDidMount() {
    document.title = "Zipiwisk | Edit Profile";
  }
  handleSubmit = values => {
    this.props.editProfile(values, this.props.history);
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleBackClick = () => {
    this.props.history.location.key
      ? this.props.history.goBack()
      : this.props.history.push("/profile");
  };

  render() {
    if (this.props.openDelete) {
      return <Delete />;
    }
    return (
      <div className="edit-profile">
        <MediaQuery maxDeviceWidth={649}>
          <Header />
        </MediaQuery>
        <MediaQuery minDeviceWidth={650}>
          <HeaderDesktop isAuth={true} user_img={this.props.userImg}>
            <div
              className="edit-profile__d-back-btn"
              onClick={this.handleBackClick}
            >
              <Arrow className="edit-profile__d-back-icon" />
              Go back
            </div>
            <div
              className="edit-profile__d-logout-btn"
              onClick={this.onLogoutClick}
            >
              Logout
            </div>
          </HeaderDesktop>
        </MediaQuery>
        <form
          className="edit-profile-form"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Field
            name="image_url"
            className="edit-profile-form__user-img"
            component={ImageUpload}
          />
          <Field
            name="full_name"
            component={Input}
            inputId="fullname"
            placeholder="Enter full name"
            label="Full name"
            className="edit-profile-form__input"
          />
          <Field
            name="username"
            component={Input}
            inputId="username"
            placeholder="Enter new username"
            label="Username"
            className="edit-profile-form__input"
          />
          {/*<div className="edit-profile-diet">
            <h2 className="edit-profile-diet__title">Diet</h2>

            <label className="edit-profile-diet__option">
              <Field name="diet" component={Input} type="radio" value="none" />
              None
            </label>
            <label className="edit-profile-diet__option">
              <Field
                name="diet"
                component={Input}
                type="radio"
                value="vegetarian"
              />
              Vegetarian
            </label>
            <label className="edit-profile-diet__option">
              <Field name="diet" component={Input} type="radio" value="vegan" />
              Vegan
            </label>
          </div>*/}

          {this.props.dirty ? (
            <button className="edit-profile-form__save-btn" type="submit">
              Save changes
            </button>
          ) : null}

          <div
            className="edit-profile-form__delete-btn"
            onClick={this.props.toggleDelete}
          >
            Delete account
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
  openDelete: state.auth.openDelete,
  userImg: state.auth.user.image_url
});

export default withRouter(
  connect(
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
  )
);
