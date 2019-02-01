import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Home';
import Profile from './Profile';

const ContentContainer = (props) => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={
          <Home onSubmit={props.onSubmit} childState={props.childState} />
        } />
        <Route path="/profile" component={
          <Profile
            profilePage={props.childState.profilePage}
            onCreateRecipeClick={props.onCreateRecipeClick}
            userName='User Name'
            putData={props.putData}
            />
        } />
      </div>
    </Router>
  );
}

export default ContentContainer;
