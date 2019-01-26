import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  }

  render() {
    return (
      <div className="ui search">
        <form className="ui fluid icon huge input" onSubmit={this.onFormSubmit}>
          <input
            className='prompt'
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <i onClick={this.onFormSubmit}  className="search link icon"></i>
        </form>
        <div className="results"></div>
      </div>
    );
  }
}

export default SearchBar;
