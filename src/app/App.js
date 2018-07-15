import React, { Component } from 'react';
import AllPhotos from '../components/AllPhotos/AllPhotos';
import Home from '../components/Home/Home';
import MyCollection from '../components/MyCollection/MyCollection';
import Pics from '../components/Pics/Pics';
import SinglePic from '../components/SinglePic/SinglePic';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Home />
        <AllPhotos />
        <MyCollection />
        <Pics />
        <SinglePic />
      </div>
    );
  }
}

export default App;
