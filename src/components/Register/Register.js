import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import AlertDismissable from '../Alerts/Alerts';
import auth from '../../firebaseReq/auth';
import users from '../../firebaseReq/users';
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isPhotog: false,
      uid: '',
    },
    showAlert: false,
    alertText: '',
  }

  registerClickEvent = e => {
    const { user } = this.state;
    e.preventDefault();
    auth
      .registerUser(user)
      .then(() => {
        user.uid = firebase.auth().currentUser.uid;
        users
          .postNewUser(user)
          .then(() => {
            this.props.history.push('/');
          });
      })
      .catch((err) => {
        console.error('error with registering user', err);
        this.setState({showAlert: true, alertText: err.message});
      });
  }

  //  Sets state of firstName to the input value
  firstNameChange = e => {
    const tempUser = {...this.state.user};
    tempUser.firstName = e.target.value;
    this.setState({user: tempUser});
  }

  //  Sets state of lastName to the input value
  lastNameChange = e => {
    const tempUser = {...this.state.user};
    tempUser.lastName = e.target.value;
    this.setState({user: tempUser});
  }

  //  Sets state of user email to the input value
  emailChange = e => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  }

  //  Sets state of user password to the input value
  passwordChange = e => {
    const tempUser = {...this.state.user};
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  }

  //  Sets state of isPhotog to true if checkbox is checked
  toggle (e) {
    const tempUser = {...this.state.user};
    tempUser.isPhotog = !this.state.user.isPhotog;
    this.setState({user: tempUser});
  }

  //  Closes alert
  onDismiss = () => {
    this.setState({showAlert: false});
  }

  render () {
    const { user } = this.state;
    return (
      <div className="Register col-xs-12">
        <AlertDismissable
          text={this.state.alertText}
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
        />
        <div id="register-form">
          <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 formBackground">
            <h1 className="text-center">Get Registered!</h1>
            <div className="form-group">
              <label htmlFor="inputFirst" className="col-sm-2 control-label">
                First Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputFirst"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={this.firstNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputLast" className="col-sm-2 control-label">
                Last Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputLast"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-2 control-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-2 control-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" onClick={this.toggle.bind(this)}/> <b>Check here if you are creating a seller account.</b>
              </label>
            </div>
            <br/>
            <div className="form-group">
              <div className="col-sm-12">
                <button
                  type="submit"
                  className="btn btn-success col-xs-6 col-xs-offset-3"
                  onClick={this.registerClickEvent}
                >
                  Register
                </button>
              </div>
            </div>
            <br/>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <Link to="/login">Need to Login?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
