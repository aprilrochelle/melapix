import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
// import AllPhotos from '../components/AllPhotos/AllPhotos';
import Home from '../components/Home/Home';
// import Login from '../components/Login/Login';
// import Register from '../components/Register/Register';
// import MyCollection from '../components/MyCollection/MyCollection';
import Navbar from '../components/Navbar/Navbar';
// import Pics from '../components/Pics/Pics';
// import SinglePic from '../components/SinglePic/SinglePic';
import './App.css';

class App extends Component {
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
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
        {/* <AllPhotos />
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
