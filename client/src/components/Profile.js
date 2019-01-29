import React from 'react';

class Profile extends React.Component {
  state={ title: '' }

  onButtonClick = () => {
    this.props.onCreateRecipeClick('create');
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.putData(this.state.recipe)
  }

  render() {
    if(this.props.profilePage === 'profile') {
      return (
        <div>
          <h1>Profile</h1>
          <h2>{this.props.userName}</h2>
          <button onClick={this.onButtonClick}>Create New Recipe</button>
        </div>
      );
    } else if(this.props.profilePage === 'create') {
      return (
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Recipe Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Recipe Title"
            />
          </div>
          <button className="ui button" type="submit">Submit Recipe</button>
        </form>
      );
    }

  }
}

export default Profile;
