import React from 'react';
import SearchBar from './SearchBar';

const ContentContainer = (props) => {
  return (
    <div>
      <SearchBar onSubmit={props.onSubmit} placeholder='Search Recipes...' />
    </div>
  );
}

export default ContentContainer;
