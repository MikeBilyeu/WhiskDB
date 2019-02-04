import React from "react";
import axios from "axios";

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  onNameChange = event => {
    let nameInput = event.target.value.toLowerCase().split(" ");
    let nameCap = nameInput
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    this.setState({ name: nameCap });
  };
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  onPassword2Change = event => {
    this.setState({ password2: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log("onFormSubit");
    axios
      .post("/api/users/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      })
      .then(res => {
        if (res.data) {
          console.log("success");
          console.log(res.data);
        } else {
          console.log("ERROR");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <form className="ui form" onSubmit={this.onFormSubmit}>
        <h2 className="ui center aligned icon header">
          <i className="user circle icon" />
          Sign up
        </h2>
        <div className="field">
          <label>Full Name</label>
          <input
            value={this.state.name}
            onChange={this.onNameChange}
            type="text"
            name="name"
            placeholder="First Last"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.onEmailChange}
            type="text"
            name="eamil"
            placeholder="Email"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={this.state.Password}
            onChange={this.onPasswordChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label>Verify Password</label>
          <input
            value={this.state.Password2}
            onChange={this.onPassword2Change}
            type="password"
            name="password2"
            placeholder="Password"
          />
        </div>
        <button className="ui button blue" type="submit">
          Sign up
        </button>
      </form>
    );
  }
}

export default SignUp;
