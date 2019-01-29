import React from 'react';
import SearchBar from './SearchBar';
import Profile from './Profile';

const ContentContainer = (props) => {

  if(props.childState.page === 'profile') {
    return (
      <Profile
        profilePage={props.childState.profilePage}
        onCreateRecipeClick={props.onCreateRecipeClick}
        userName='User Name'
        putData={props.putData}
        />
    );
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
