import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContentContainer from './ContentContainer';
import NavigationBar from './NavigationBar';

require('dotenv').config();

class App extends React.Component {
  state = {
    page: 'home',
    profilePage: 'profile'
  };

  onSearchSubmit(term) {
    axios.get('https://api.edamam.com/search', {
      params: {
        q: term,
        app_id: process.env.REACT_APP_APP_ID,
        app_key: process.env.REACT_APP_APP_KEY
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onNavClick = page => {
    this.setState({
      page: page,
      profilePage: page
    })
  }

  onCreateRecipeClick = page => {
    this.setState({
      profilePage: page
    });
  }


  render() {
    console.log('STATE: ', this.state);
    return (
      <div>
        <Header />
        <ContentContainer
          childState={this.state}
          onCreateRecipeClick={this.onCreateRecipeClick}
          onSubmit={this.onSearchSubmit}
        />
        <NavigationBar onNavClick={this.onNavClick} />
      </div>
    );
  }
}

export default App;
