import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import auth from '../../firebaseReq/auth';
import './Navbar.css';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    photog: PropTypes.bool.isRequired,
    rollOut: PropTypes.func.isRequired,
  }

  render () {
    const { authed, photog, rollOut } = this.props;
    const logoutClick = () => {
      auth.logoutUser();
      rollOut();
    };

    let navDisplay;
    if (authed && !photog) {
      navDisplay = (
        <ul className="nav navbar-nav navbar-right navbar-form">
          <li>
            <Link to="/allphotos"><span className="glyphicon glyphicon-shopping-cart"> </span> Shop Photos</Link>
          </li>
          <li>
            <Link to="/mycollection"><span className="glyphicon glyphicon-picture"> </span> My Collection</Link>
          </li>
          <li className="navbar-form">
            <button
              onClick={logoutClick}
              className="btn btn-success"
            >
              <span className="glyphicon glyphicon-log-out"> </span> Log Out
            </button>
          </li>
        </ul>
      );
    } else if (authed && photog) {
      navDisplay = (
        <ul className="nav navbar-nav navbar-right navbar-form">
          <li>
            <Link to="/dashboard"><span className="glyphicon glyphicon-signal"> </span> Dashboard</Link>
          </li>
          <li>
            <Link to="/mywork"><span className="glyphicon glyphicon-camera"> </span> My Work</Link>
          </li>
          <li className="navbar-form">
            <button
              onClick={logoutClick}
              className="btn btn-success"
            >
              <span className="glyphicon glyphicon-log-out"> </span> Log Out
            </button>
          </li>
        </ul>
      );
    } else {
      navDisplay = (
        <ul className="nav navbar-nav navbar-right navbar-form">
          <li>
            <Link to="/login"><span className="glyphicon glyphicon-log-in"> </span> Login</Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand navbar-form">
                <img className="logo" src={require('./images/melapixWhite.png')} alt="melapix-logo" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {navDisplay}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
