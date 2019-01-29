import React from 'react';
import SearchBar from './SearchBar';
import Profile from './Profile';

const ContentContainer = (props) => {

  if(props.page === 'profile') {
    return <Profile userName='User Name'/>;
  }

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
