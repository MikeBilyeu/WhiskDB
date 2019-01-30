import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContentContainer from './ContentContainer';
import NavigationBar from './NavigationBar';

require('dotenv').config();

class App extends React.Component {
  state = {
    page: 'home',
    profilePage: 'profile',
    data: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
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

  putDataToDB = recipe => {
    console.log('This is the recipe: ', recipe);
    axios.post("http://localhost:3001/api/putData", {
      recipe
    });
  };


  render() {
    console.log('STATE: ', this.state);
    return (
      <div style={{height: '100%', paddingBottom: '7rem'}}>
        <Header />
        <ContentContainer
          childState={this.state}
          onCreateRecipeClick={this.onCreateRecipeClick}
          onSubmit={this.onSearchSubmit}
          putData={this.putDataToDB}
        />
        <NavigationBar onNavClick={this.onNavClick} />
      </div>
    );
  }
}

export default App;
