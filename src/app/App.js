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
import uzers from '../firebaseReq/users';
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

const PhotogRoute = ({component: Component, authed, photog, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        (authed === true && photog === true) ? (
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
    photog: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uzers
          .getUserById(user.uid)
          .then((userAccount) => {
            if (userAccount.isPhotog) {
              this.setState({authed: true, photog: true});
            } else if (!userAccount.isPhotog) {
              this.setState({authed: true, photog: false});
            }
          })
          .catch(err => {
            console.error(err);
          });
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
                  <PhotogRoute
                    path="/dashboard"
                    authed={this.state.authed}
                    photog={this.state.photog}
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
