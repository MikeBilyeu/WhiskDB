import React from 'react';
import CreateRecipe from './CreateRecipe';
import SignUp from './SignUp';

class Profile extends React.Component {

  onButtonClick = () => {
    this.props.onCreateRecipeClick('create');
  }

  render() {



    if(this.props.profilePage === 'profile') {
      return <SignUp />;
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
