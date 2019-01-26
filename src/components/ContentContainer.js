import React from 'react';
import SearchBar from './SearchBar';

const ContentContainer = (props) => {
  return (
    <div>
      <SearchBar onSubmit={props.onSubmit} placeholder='Search Recipes...' />
      <div className="ui horizontal divider">
        Or
      </div>
      <h1 className="ui header center aligned ">Browse Recipes</h1>
    </div>
  );
}

export default ContentContainer;
