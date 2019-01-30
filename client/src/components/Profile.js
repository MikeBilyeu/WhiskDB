import React from 'react';
import InputField from './InputField';

class Profile extends React.Component {
  state = { title: '', ingredient: '' }

  onButtonClick = () => {
    this.props.onCreateRecipeClick('create');
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.putData(this.state)
  }


  onInputChange = (key, value) => {
    console.log('onInputChange: ', key, value);
    this.setState({ [key]: value });
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
          <InputField
            inputLabel="Title"
            stateKey="title"
            inputType="text"
            placeholder="Recipe Title"
            onInputChange={this.onInputChange}
          />
          <InputField
            inputLabel="Ingredient"
            stateKey="ingredient"
            inputType="text"
            placeholder="Ingredient"
            onInputChange={this.onInputChange}
          />

          <button className="ui button" type="submit">Submit Recipe</button>
        </form>
      );
    }

  }
}

export default Profile;
