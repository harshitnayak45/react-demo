import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import Register from '../core/Register';
import Login from '../core/Login';
import RegisterUser from '../core/RegisterUser';
import Home from '../core/Home';
import AuthService from '../../services/AuthService';
const Url = 'http://localhost:3300';
const Auth = new AuthService();



class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  componentWillMount() {

  }


  render() {
    return (
      <div>
        <Router>


        </Router>
      </div>
    );
  }
}

export default Header;