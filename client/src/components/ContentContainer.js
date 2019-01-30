import React from 'react';
import SearchBar from './SearchBar';
import Profile from './Profile';

const ContentContainer = (props) => {
  console.log(props.childState.data);
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
      <h1 className="ui header center aligned ">Data Base Recipes</h1>
      <ul>
          {props.childState.data.length <= 0
            ? "NO DB ENTRIES YET"
            : props.childState.data.map(dat => (
                <li style={{ padding: "10px" }} key={dat.title}>
                  <span style={{ color: "gray" }}> Recipe: </span>
                  {dat.title}
                </li>
              ))}
        </ul>

    </div>
  );
}

export default ContentContainer;
