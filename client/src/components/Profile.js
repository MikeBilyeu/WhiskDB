import React from 'react';

class Profile extends React.Component {
  state = { profileButton: '' }

  onButtonClick = (e) => {
    console.log(e);
    this.setState({ profileButton: 'create' });
  }

  render() {
    if(!this.state.profileButton) {
      return (
        <div>
          <h1>Profile</h1>
          <h2>{this.props.userName}</h2>
          <button onClick={this.onButtonClick}>Create Recipe</button>
        </div>
      );
    } else if(this.state.profileButton === 'create') {
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
