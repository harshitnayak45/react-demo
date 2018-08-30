import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Intro from './components/layout/Intro';
import Footer from './components/layout/Footer';


import registerServiceWorker from './registerServiceWorker';
import AuthService from './services/AuthService';
import withAuth from './withAuth';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/pro-solid-svg-icons'

library.add(faStroopwafel);
const Auth = new AuthService();



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Intro />
        <Footer />
      </div>
    );
  }
}


class Number extends Component {
  componentDidMount() {
    console.log("component did mount here");

  }
  componentWillMount() {
    console.log("component didqq mount here");
    if (!Auth.loggedIn())
      this.props.history.replace('/login');
  }
  componentWillReceiveProps(newProps) {
    console.log("component Will Receive props here");
  }

  render() {
    return (
      <div>
        {this.props.myNumber}

      </div>

    );
  }
}


export default App;
