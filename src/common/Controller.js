import React, { Component } from 'react';
import Profile from '../screens/profile/Profile';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "https://graph.instagram.com/";
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={(props) => (<Login {...props} baseUrl={this.baseUrl} />)} />
          <Route path='/home' render={(props) => (<Home {...props} baseUrl={this.baseUrl} />)} />
          <Route path='/profile' render={(props) => (<Profile {...props} baseUrl={this.baseUrl} />)} />
        </div>
      </Router>
    )
  }
}

export default Controller;