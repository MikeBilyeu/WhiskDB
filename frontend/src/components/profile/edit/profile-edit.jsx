import React, { useEffect } from "react";
import MediaQuery from "react-responsive";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Field, reduxForm, isDirty, getFormSyncErrors } from "redux-form";
import { logoutUser, editProfile, toggleDelete } from "../../../actions/auth";
import { validateUsername } from "../../auth/utils/validation.js";
import asyncValidate from "../../auth/utils/async-validation";
import Input from "../../form_inputs/input";
import { ReactComponent as Arrow } from "../../../assets/images/arrowLeft.svg";
import ImageUpload from "../../image_upload";

import Header from "./header";
import HeaderDesktop from "../../header_desktop";
import Delete from "./delete";
import "./profile-edit.scss";

const Edit = props => {
  useEffect(() => {
    document.title = "Zipiwisk | Edit Profile";
  }, []);

  const handleSubmit = values =>
    props.editProfile(values, props.history).catch(err => {
      console.log(err);
    });

  const onLogoutClick = e => {
    e.preventDefault();
    props.logoutUser();
  };

  const handleBackClick = () => {
    props.history.location.key
      ? props.history.goBack()
      : props.history.push("/profile");
  };

  return (
    <div className="edit-profile">
      <MediaQuery maxDeviceWidth={649}>
        <Header />
      </MediaQuery>
      <MediaQuery minDeviceWidth={650}>
        <HeaderDesktop isAuth={true} user_img={props.userImg}>
          <div className="edit-profile__d-back-btn" onClick={handleBackClick}>
            <Arrow className="edit-profile__d-back-icon" />
            Go back
          </div>
          <div className="edit-profile__d-logout-btn" onClick={onLogoutClick}>
            Logout
          </div>
        </HeaderDesktop>
      </MediaQuery>
      <form
        className="edit-profile-form"
        onSubmit={props.handleSubmit(handleSubmit)}
      >
        <Field
          name="image_url"
          className="edit-profile-form__user-img"
          component={ImageUpload}
        />
        <div className="edit-profile-form__email">{props.email}</div>
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

        <button
          disabled={props.submitting || !props.dirty}
          className={classNames("edit-profile-form__save-btn", {
            "edit-profile-form__save-btn--disabled":
              Object.keys(props.formSyncErrors).length ||
              props.submitFailed ||
              !props.dirty,
            "edit-profile-form__save-btn--success": props.submitting
          })}
          type="submit"
        >
          Save changes
        </button>

        <button
          className="edit-profile-form__delete-btn"
          onClick={e => {
            e.preventDefault();
            props.toggleDelete();
          }}
        >
          Delete account
        </button>

        {props.openDelete && <Delete />}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  initialValues: {
    ...state.auth.user,
    currentUsername: state.auth.user.username, //pass currentUsername to bypass if no change made to username
    diet: state.auth.user.diet || "none"
  },
  dirty: isDirty("edit-profile"),
  openDelete: state.auth.openDelete,
  userImg: state.auth.user.image_url,
  email: state.auth.user.email,
  formSyncErrors: getFormSyncErrors("edit-profile")(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser, editProfile, toggleDelete }
  )(
    reduxForm({
      form: "edit-profile",
      validate: validateUsername,
      asyncValidate: asyncValidate,
      asyncBlurFields: ["username"],
      enableReinitialize: true
    })(Edit)
  )
);
