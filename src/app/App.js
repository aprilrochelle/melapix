import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import AllPhotos from '../components/AllPhotos/AllPhotos';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import MyCollection from '../components/MyCollection/MyCollection';
import Navbar from '../components/Navbar/Navbar';
import SinglePic from '../components/SinglePic/SinglePic';
import './App.css';
import fbConnection from '../firebaseReq/fbConnect';
import Dashboard from '../components/Dashboard/Dashboard';
fbConnection();

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location} }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/allphotos', state: {from: props.location} }}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  rollOut = () => {
    this.setState({authed: false});
  }

  render () {
    return (
      <div className="App text-center">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              rollOut={this.rollOut}
            />
            <div>
              <div className="container">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                  <PublicRoute
                    path="/register"
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PrivateRoute
                    path="/dashboard"
                    authed={this.state.authed}
                    component={Dashboard}
                  />
                  <PrivateRoute
                    path="/allphotos"
                    authed={this.state.authed}
                    component={AllPhotos}
                  />
                  <PrivateRoute
                    path="/mycollection"
                    authed={this.state.authed}
                    component={MyCollection}
                  />
                  <PrivateRoute
                    path="/singlepic/:id"
                    authed={this.state.authed}
                    component={SinglePic}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
