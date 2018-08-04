import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import auth from '../../firebaseReq/auth';
import './Navigate.css';

class Navigate extends React.Component {
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
        <Nav pullRight>
          <NavItem componentClass='span' className='nav-item-wrapper'>
            <Link to="/allphotos"><span className="glyphicon glyphicon-shopping-cart"> </span> Shop Photos</Link>
          </NavItem>
          <NavItem componentClass='span' className='nav-item-wrapper'>
            <Link to="/mycollection"><span className="glyphicon glyphicon-picture"> </span> My Collection</Link>
          </NavItem>
          <NavItem componentClass='span' className='nav-item-wrapper' onClick={logoutClick}>
            <span className="glyphicon glyphicon-log-out"> </span> Log Out
          </NavItem>
        </Nav>
      );
    } else if (authed && photog) {
      navDisplay = (
        <Nav pullRight>
          <NavItem componentClass='span' className='nav-item-wrapper'>
            <Link to="/dashboard"><span className="glyphicon glyphicon-signal"> </span> Dashboard</Link>
          </NavItem>
          <NavItem componentClass='span' className='nav-item-wrapper'>
            <Link to="/mywork"><span className="glyphicon glyphicon-camera"> </span> My Work</Link>
          </NavItem>
          <NavItem componentClass='span' className='nav-item-wrapper' onClick={logoutClick}>
            <span className="glyphicon glyphicon-log-out"> </span> Log Out
          </NavItem>
        </Nav>
      );
    } else {
      navDisplay = (
        <Nav pullRight>
          <NavItem componentClass='span' className='nav-item-wrapper'>
            <Link to="/login"><span className="glyphicon glyphicon-log-in"> </span> Login</Link>
          </NavItem>
        </Nav>
      );
    }
    return (
      <div className="Navigate col-md-12">
        <Navbar inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">
                <img className="logo" src={require('./images/melapixWhite.png')} alt="melapix-logo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
            </Nav>
            {navDisplay}
          </Navbar.Collapse>
        </Navbar>
      </div>
      // <div className="Navbar">
      //   <nav className="navbar navbar-inverse navbar-fixed-top">
      //     <div className="container-fluid">
      //       <div className="navbar-header">
      //         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      //           <span className="sr-only">Toggle navigation</span>
      //           <span className="icon-bar"></span>
      //           <span className="icon-bar"></span>
      //           <span className="icon-bar"></span>
      //         </button>
      //         <Link to="/" className="navbar-brand navbar-form">
      //           <img className="logo" src={require('./images/melapixWhite.png')} alt="melapix-logo" />
      //         </Link>
      //       </div>
      //       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      //         {navDisplay}
      //       </div>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}

export default Navigate;
