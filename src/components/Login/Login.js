import React from 'react';
import { Link } from 'react-router-dom';
import AlertDismissable from '../Alerts/Alerts';
import auth from '../../firebaseReq/auth';
import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: 'test@test1.com',
      password: 'a12345',
    },
    showAlert: false,
    alertText: '',
  }

  loginClickEvent = e => {
    const { user } = this.state;
    e.preventDefault();
    auth
      .loginUser(user)
      .then(() => {

      })
      .catch(error => {
        console.error('error with login', error);
        this.setState({showAlert: true, alertText: error.message});
      });
  };

  //  Sets state of user email to the input value
  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  };

  //  Sets state of user password to the input value
  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  };

  //  Closes alert
  onDismiss = () => {
    this.setState({showAlert: false});
  }

  render () {
    const { user } = this.state;
    return (
      <div className="Login col-xs-12">
        <AlertDismissable
          text={this.state.alertText}
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
        />
        <div id="login-form">
          <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 formBackground">
            <h1 className="text-center">Login</h1>
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
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10 text-center">
                <Link to="/register">Need to Register?</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-success col-xs-12"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
