import React from 'react';

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
          <button onClick={this.onButtonClick}>Create Recipe</button>
        </div>
      );
    } else if(this.props.profilePage === 'create') {
      return (
        <div>
          <h1>Create Recipe</h1>
          <input type="text" placeholder="Recipe Title" />
          <button>Done</button>
        </div>
      );
    }

  }
}

export default Profile;
