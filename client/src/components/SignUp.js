import React from 'react';

const SignUp = () => {
  return (
    <form className="ui form">
      <h2 className="ui center aligned icon header">
        <i className="user circle icon"></i>
        Sign up
      </h2>
      <div className="field">
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="Password" name="Password" placeholder="Password" />
      </div>
      <button className="ui button blue" type="submit">Sign up</button>
    </form>
  );
}

export default SignUp;
