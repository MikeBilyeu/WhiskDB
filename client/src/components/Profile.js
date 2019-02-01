import React from 'react';
import CreateRecipe from './CreateRecipe';

class Profile extends React.Component {

  onButtonClick = () => {
    this.props.onCreateRecipeClick('create');
  }

  render() {

    if(this.props.profilePage === 'profile') {
      return (
        <div>
          <h1>Profile</h1>
          <h2>{this.props.userName}</h2>
          <button className='ui button' onClick={this.onButtonClick}>Create New Recipe</button>
        </div>
      );
    } else if(this.props.profilePage === 'create') {
      return <CreateRecipe putData={this.props.putData} />;
    }

  }
}

export default Profile;

//putData
