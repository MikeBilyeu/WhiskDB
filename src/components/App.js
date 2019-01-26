import React from 'react';
import edamam from '../api/edamam';
import Header from './Header';
import ContentContainer from './ContentContainer';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = { recipes: [] };

  onSearchSubmit(term) {
    console.log("This is the Search Term: ", term);
  }

  render() {
    return (
      <div>
        <Header />
        <ContentContainer onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
