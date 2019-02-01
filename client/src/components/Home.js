import React from 'react';

import SearchBar from './SearchBar';

const Home = (props) => {
  return (
    <div>
      <SearchBar onSubmit={props.onSubmit} placeholder='Search Recipes...' />
      <div className="ui horizontal divider">
        Or
      </div>
      <h1 className="ui header center aligned ">Data Base Recipes</h1>
      <ul>
          {props.data.length <= 0
            ? "NO DB ENTRIES YET"
            : props.data.map(recipe => (
                <li style={{ padding: "10px" }} key={recipe._id}>
                  <span style={{ color: "gray" }}> Recipe: </span>
                  <ul>
                    <li>{recipe.title}</li>
                    <li>{recipe.time}</li>
                    <li>{recipe.servings}</li>
                    <li>{recipe.ingredients}</li>
                    <li>{recipe.directions}</li>
                  </ul>
                </li>
              ))}
        </ul>
    </div>
  );
}

export default Home;
