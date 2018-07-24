import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../firebaseReq/auth';
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      email: 'test@test1.com',
      password: 'a12345',
    },
  }

  registerClickEvent = e => {
    const { user } = this.state;
    e.preventDefault();
    auth
      .registerUser(user)
      .then(() => {
        this.props.history.push('/allphotos');
      })
      .catch((err) => {
        console.error('error with registering user', err);
      });
  }

  emailChange = e => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  }

  passwordChange = e => {
    const tempUser = {...this.state.user};
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  }

  render () {
    const { user } = this.state;
    return (
      <div className="Register col-xs-12">
        <div id="register-form">
          <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 formBackground">
            <h1 className="text-center">Get Registered!</h1>
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
                <Link to="/login">Need to Login?</Link>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-success col-xs-12"
                  onClick={this.registerClickEvent}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
