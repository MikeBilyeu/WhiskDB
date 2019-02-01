import React from 'react';
import CreateRecipe from './CreateRecipe';

class Profile extends React.Component {

  onButtonClick = () => {
    this.props.onCreateRecipeClick('create');
  }

  render() {



    if(this.props.profilePage === 'profile') {
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
    } else if(this.props.profilePage === 'create') {
      return <CreateRecipe putData={this.props.putData} />;
    } else if(this.props.profilePage === 'loggedin') {
      return (
        <div>
          <h1>Profile</h1>
          <h2>{this.props.userName}</h2>
          <button className='ui button' onClick={this.onButtonClick}>Create New Recipe</button>
        </div>
      );
    }

  }
}

export default Profile;

//putData
