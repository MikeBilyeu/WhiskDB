import React from 'react';
import Header from './Header';
import ContentContainer from './ContentContainer';
import SearchBar from './SearchBar';

class App extends React.Component {
  state = { term: '' }

  componentDidUpdate() {
    console.log(this.state.term);
  }
  
  render() {
    return (
      <div>
        <Header />
        <ContentContainer />
      </div>
    );
  }
}

export default App;
