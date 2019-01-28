import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContentContainer from './ContentContainer';
import NavigationBar from './NavigationBar';

require('dotenv').config();

class App extends React.Component {
  state = { recipes: [] };

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

  render() {
    return (
      <div>
        <Header />
        <ContentContainer onSubmit={this.onSearchSubmit} />
        <NavigationBar />
      </div>
    );
  }
}

export default App;