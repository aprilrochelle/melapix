import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import AllPhotos from '../components/AllPhotos/AllPhotos';
import Home from '../components/Home/Home';
// import Login from '../components/Login/Login';
// import Register from '../components/Register/Register';
// import MyCollection from '../components/MyCollection/MyCollection';
import Navbar from '../components/Navbar/Navbar';
// import Pics from '../components/Pics/Pics';
// import SinglePic from '../components/SinglePic/SinglePic';
import './App.css';

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

class App extends Component {
  state = {
    authed: false,
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PrivateRoute
                    path="/allphotos"
                    authed={this.state.authed}
                    component={AllPhotos}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
        {/*
        <Login />
        <Register />
        <MyCollection />
        <Pics />
        <SinglePic /> */}
      </div>
    );
  }
}

export default App;
