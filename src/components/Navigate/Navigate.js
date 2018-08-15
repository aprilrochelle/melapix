import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import auth from '../../firebaseReq/auth';
import uzers from '../../firebaseReq/users';
import './Navigate.css';

class Navigate extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
    photog: PropTypes.bool.isRequired,
    rollOut: PropTypes.func.isRequired,
  }

  state = {
    firstName: '',
    lastName: '',
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uzers
          .getUserById(user.uid)
          .then((userAccount) => {
            this.setState({firstName: userAccount.firstName, lastName: userAccount.lastName});
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.setState({firstName: '', lastName: ''});
      }
    });
  }

  render () {
    const { authed, photog, rollOut } = this.props;
    const { firstName, lastName } = this.state;

    //  Logs out current user and sets authed state to false.
    const logoutClick = () => {
      auth.logoutUser();
      rollOut();
    };

    //  Navbar links display based on authorization status and user type.
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
        {
          photog ? (
            <Navbar className="photog-nav" inverse collapseOnSelect fixedTop>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" className="navbar-brand">
                    <img className="logo" src={require('./images/melapixWhiteBlack.png')} alt="melapix-logo" />
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Navbar.Text>
                  {firstName} {lastName}
                </Navbar.Text>
                {navDisplay}
              </Navbar.Collapse>
            </Navbar>
          ) : (
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
                <Navbar.Text>
                  {firstName} {lastName}
                </Navbar.Text>
                {navDisplay}
              </Navbar.Collapse>
            </Navbar>
          )
        }
      </div>
    );
  }
}

export default Navigate;
