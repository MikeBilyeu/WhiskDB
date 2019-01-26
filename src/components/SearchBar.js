import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  render() {
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input
            className='promt'
            type="text"
            placeholder="Search Recipes..."
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    );
  }
}

export default SearchBar;
