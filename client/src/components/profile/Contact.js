import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class Contact extends React.Component {
  renderInput = ({ input, label, meta, placeholder, type = "text" }) => {
    const className = `field ${meta.error && meta.submitFailed ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  };
  TextAreaInput = ({ input, label, placeholder }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <textarea
          {...input}
          placeholder={placeholder}
          style={{ marginTop: "0px", marginBottom: "0px", height: "115px" }}
        />
      </div>
    );
  };
  onFormSubmit = formValues => {
    console.log(formValues);
    const contactForm = {
      subject: formValues.subject,
      message: formValues.message
    };
  };
  render() {
    return (
      <div className="ui grid" style={{ margin: "1.5rem 0rem" }}>
        <div
          className="fluid column centered"
          style={{
            maxWidth: "40rem"
          }}
        >
          <div className="ui attached message">
            <div className="ui center aligned header">Contact</div>
          </div>
          <form
            onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            className="ui form error attached segment"
          >
            <Field
              name="subject"
              component={this.renderInput}
              label="Subject"
              placeholder="Subject"
            />
            <Field
              name="message"
              component={this.TextAreaInput}
              label="Message"
              placeholder="Message..."
            />

            <button className="ui button blue fluid" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Contact = connect(
  mapStateToProps,
  {}
)(Contact);

export default reduxForm({
  form: "contact",
  destroyOnUnmount: false
})(Contact);
