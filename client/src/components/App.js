import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Header from './Header';
import NavigationBar from './NavigationBar';
import Home from './Home';
import Profile from './Profile';
import SignUp from './SignUp';
import Login from './Login';


require('dotenv').config();

class App extends React.Component {
  state = { data: [] }

  // componentDidMount() {
  //   this.getDataFromDb();
  // }

  // getDataFromDb = () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }));
  // };


  onSearchSubmit(term) {
    axios.get('https://api.edamam.com/search', {
      params: {
        q: term,
        app_id: process.env.REACT_APP_APP_ID,
        app_key: process.env.REACT_APP_APP_KEY
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const HomeROUTE = () => <Home onSubmit={this.props.onSubmit} data={this.state.data} />;
    const ProfileROUTE = ({ match }) => <Profile />;
    const SignUpROUTE = () => <SignUp />;
    const LoginROUTE = () => <Login />;
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={HomeROUTE} />
          <Route path="/profile" component={ProfileROUTE} />
          <Route path="/sign-up" component={SignUpROUTE} />
          <Route path="/Login" component={LoginROUTE} />
          <NavigationBar />
        </div>
      </Router>
    );
  }


}

export default App;
